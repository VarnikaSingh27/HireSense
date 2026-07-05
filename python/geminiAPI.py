import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

# Configure Gemini API
api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)


def get_gemini_embedding(text_list):
    embeddings = [] 
    for text in text_list:
        response = genai.embed_content(
            model="models/gemini-embedding-001",
            content=text,
            task_type="retrieval_document",  # recommended for chunked docs
        )
        embeddings.append(response["embedding"])
    return embeddings


def get_match_details(resume_text: str, job_description: str):
    try:
        model = genai.GenerativeModel("gemini-2.5-flash")
        prompt = f"""
        You are an AI recruiter assistant. Analyze the candidate's resume text against the job description below.
        
        Job Description:
        {job_description}
        
        Resume:
        {resume_text}
        
        Identify:
        1. "matched": Key skills, frameworks, tools, or requirements from the job description that the candidate explicitly has in their resume.
        2. "missing": Key skills, frameworks, tools, or requirements from the job description that are missing or not mentioned in the resume.
        
        Respond ONLY with a valid JSON object in this format:
        {{
            "matched": ["skill/requirement 1", "skill/requirement 2", ...],
            "missing": ["skill/requirement 3", "skill/requirement 4", ...]
        }}
        """
        response = model.generate_content(
            prompt,
            generation_config={"response_mime_type": "application/json"}
        )
        text = response.text.strip()
        
        # Clean potential code blocks or wrappers
        import re
        match = re.search(r'\{.*\}', text, re.DOTALL)
        if match:
            text = match.group(0)
            
        import json
        return json.loads(text)
    except Exception as e:
        print("Error getting match details from Gemini:", e)
        return {"matched": [], "missing": []}
