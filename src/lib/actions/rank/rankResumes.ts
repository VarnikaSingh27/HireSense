"use server";

import { prisma } from "@/src/lib/db";
import axios from "axios";

/**
 * Saves a candidate's uploaded resume URL to PostgreSQL.
 */
export async function saveResumeUrl(email: string, url: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { employee: true },
    });

    if (!user) {
      console.warn(`User with email ${email} not found when saving resume URL.`);
      return;
    }

    if (user.role !== "employee") {
      console.warn(`User ${email} is not an employee.`);
      return;
    }

    if (!user.employee) {
      await prisma.employee.create({
        data: {
          userId: user.id,
          resumeUrls: [url],
        },
      });
    } else {
      const existingUrls = user.employee.resumeUrls || [];
      if (!existingUrls.includes(url)) {
        await prisma.employee.update({
          where: { userId: user.id },
          data: {
            resumeUrls: {
              set: [...existingUrls, url],
            },
          },
        });
      }
    }
    console.log(`Successfully saved resume URL for ${email}.`);
  } catch (error) {
    console.error("Error in saveResumeUrl server action:", error);
    throw new Error("Failed to save resume URL.");
  }
}

/**
 * Loads all candidates registered as employees in PostgreSQL.
 */
export async function getAllCandidates() {
  try {
    const users = await prisma.user.findMany({
      where: { role: "employee" },
      include: {
        employee: true,
      },
    });

    return users.map((user, idx) => {
      return {
        id: user.id,
        name: `${user.firstName} ${user.lastName || ""}`.trim(),
        email: user.email,
        rank: idx + 1,
        role: "Developer",
        skills: "Resume Uploaded",
        score: null as number | null,
        resumeUrl: user.employee?.resumeUrls?.[0] || null,
      };
    });
  } catch (error) {
    console.error("Error fetching all candidates:", error);
    throw new Error("Failed to retrieve candidates.");
  }
}

/**
 * Calls the FastAPI backend to calculate cosine similarity ranking,
 * and fetches the candidate profile details from PostgreSQL.
 */
export async function rankResumesByJobDescription(jobDescription: string) {
  try {
    // 1. Fetch ranking scores from FastAPI
    const response = await axios.post("http://localhost:8000/rank-resumes", {
      description: jobDescription,
      top_k: 100,
    });

    const rankedEmails: { email: string; score: number }[] = response.data;
    if (!rankedEmails || rankedEmails.length === 0) {
      return [];
    }

    const emails = rankedEmails.map((item) => item.email);

    // 2. Fetch candidate info from database
    const users = await prisma.user.findMany({
      where: {
        email: { in: emails },
        role: "employee",
      },
      include: {
        employee: true,
      },
    });

    // 3. Map with similarity scores and maintain order
    const rankedCandidates = rankedEmails
      .map((item, idx) => {
        const user = users.find((u) => u.email === item.email);
        if (!user) return null;

        return {
          id: user.id,
          name: `${user.firstName} ${user.lastName || ""}`.trim(),
          email: user.email,
          rank: idx + 1,
          role: "Candidate",
          skills: "Resume Match",
          score: Math.round(item.score * 100), // convert similarity to percentage
          resumeUrl: user.employee?.resumeUrls?.[0] || null,
        };
      })
      .filter((c) => c !== null);

    return rankedCandidates;
  } catch (error) {
    console.error("Error in rankResumesByJobDescription:", error);
    throw new Error("Failed to rank resumes.");
  }
}

/**
 * Forwards uploaded local PDF files and a job description to FastAPI for ranking.
 */
export async function rankUploadedResumes(formData: FormData) {
  try {
    const response = await axios.post("http://localhost:8000/rank-uploaded-resumes", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data && response.data.error) {
      throw new Error(response.data.error);
    }

    const data: { filename: string; score: number; matched?: string[]; missing?: string[] }[] = response.data;
    return data.map((item, idx) => ({
      rank: idx + 1,
      filename: item.filename,
      score: Math.round(item.score * 100), // Convert to percentage
      matched: item.matched || [],
      missing: item.missing || [],
    }));
  } catch (error) {
    console.error("Error in rankUploadedResumes:", error);
    throw new Error("Failed to rank uploaded resumes.");
  }
}
