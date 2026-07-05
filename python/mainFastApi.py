import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import io
from pypdf import PdfReader
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from pydantic import BaseModel
from textExtractor import extract_text_from_pdf_url, chunk_data
from geminiAPI import get_gemini_embedding, get_match_details
from pineconeClient import upsert_to_pinecone, index
import google.generativeai as genai
from dotenv import load_dotenv
try:
    from langchain_core.documents import Document
except ImportError:
    from langchain.schema import Document

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ResumeURL(BaseModel):
    url: str
    name: str
    email: str


@app.post("/upload-url")
async def receive_resume_url(data: ResumeURL):
    print("✅ PDF URL received:", data.url)
    print("✅ Name received:", data.name)
    print("✅ Email received:", data.email)

    full_text = extract_text_from_pdf_url(data.url)
    documents = [Document(page_content=full_text)]
    split_text = chunk_data(documents)
    chunks = [chunk.page_content for chunk in split_text]

    embeddings = get_gemini_embedding(chunks)

    upsert_to_pinecone(
    chunks,
    embeddings,
    data.email,
    data.name
)

    return {
        "message": "Embeddings generated and stored successfully!",
        "chunks": chunks,
        "embeddings": embeddings,
    }


class JobDescription(BaseModel):
    description: str
    top_k: int = 100


@app.post("/rank-resumes")
async def rank_resumes(data: JobDescription):
    description = data.description
    print("✅ Received job description for ranking:", description[:100], "...")

    # 1. Generate embedding for the job description using Google's models/gemini-embedding-001
    try:
        response = genai.embed_content(
            model="models/gemini-embedding-001",
            content=description,
            task_type="retrieval_query",  # recommended for query
        )
        query_embedding = response["embedding"]
    except Exception as e:
        print("❌ Error generating embedding:", e)
        return {"error": f"Failed to generate embedding: {str(e)}"}

    # 2. Query Pinecone
    try:
        query_response = index.query(
            vector=query_embedding,
            top_k=data.top_k,
            include_metadata=True
        )
    except Exception as e:
        print("❌ Error querying Pinecone:", e)
        return {"error": f"Failed to query Pinecone: {str(e)}"}

    # 3. Process matches.
    # Group results by user_email and find the maximum similarity score.
    candidates_scores = {}
    for match in query_response.get("matches", []):
        metadata = match.get("metadata", {})
        email = metadata.get("user_email")
        if not email:
            continue
        score = match.get("score", 0.0)
        
        # Keep the maximum score for each user
        if email not in candidates_scores:
            candidates_scores[email] = score
        else:
            candidates_scores[email] = max(candidates_scores[email], score)

    # Sort candidates by score descending
    sorted_candidates = sorted(
        [{"email": email, "score": score} for email, score in candidates_scores.items()],
        key=lambda x: x["score"],
        reverse=True
    )

    print(f"✅ Ranked {len(sorted_candidates)} candidates.")
    return sorted_candidates


def extract_text_from_pdf(pdf_file) -> str:
    try:
        reader = PdfReader(pdf_file)
        text = ""
        for page in reader.pages:
            extracted = page.extract_text()
            if extracted:
                text += extracted + "\n"
        return text.strip() if text else ""
    except Exception as e:
        print(f"❌ Error extracting PDF text: {e}")
        return ""


@app.post("/rank-uploaded-resumes")
async def rank_uploaded_resumes(
    job_description: str = Form(...),
    files: List[UploadFile] = File(...)
):
    print("✅ Received request to rank uploaded resumes")
    resumes_text = []
    filenames = []
    
    for file in files:
        try:
            content = await file.read()
            pdf_file = io.BytesIO(content)
            text = extract_text_from_pdf(pdf_file)
            if text:
                resumes_text.append(text)
                filenames.append(file.filename)
                print(f"📄 Extracted text from {file.filename} (Length: {len(text)})")
            else:
                print(f"⚠️ No readable text found in {file.filename}")
        except Exception as e:
            print(f"❌ Error reading file {file.filename}: {e}")
            
    if not resumes_text:
        return {"error": "No valid text could be extracted from any of the uploaded resumes."}
        
    try:
        # Compute TF-IDF similarities
        documents = [job_description] + resumes_text
        vectorizer = TfidfVectorizer().fit_transform(documents)
        vectors = vectorizer.toarray()
        job_vector = vectors[0]
        resume_vectors = vectors[1:]
        
        similarities = cosine_similarity([job_vector], resume_vectors).flatten()
        
        # Get matched and missing points using Gemini in parallel
        import asyncio
        tasks = [asyncio.to_thread(get_match_details, text, job_description) for text in resumes_text]
        details_list = await asyncio.gather(*tasks)

        # Zip, sort, and return
        ranked = []
        for name, score, details in zip(filenames, similarities, details_list):
            ranked.append({
                "filename": name,
                "score": float(score),
                "matched": details.get("matched", []),
                "missing": details.get("missing", [])
            })
            
        # Sort by score descending
        ranked.sort(key=lambda x: x["score"], reverse=True)
        print(f"✅ Ranked {len(ranked)} uploaded resumes with match analysis.")
        return ranked
    except Exception as e:
        print(f"❌ Error ranking resumes: {e}")
        return {"error": f"Failed to rank resumes: {str(e)}"}
