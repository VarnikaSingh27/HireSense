import os
from dotenv import load_dotenv
import google.generativeai as genai

# load .env from the parent project directory
dotenv_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".env"))
load_dotenv(dotenv_path)

gemini_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=gemini_key)

try:
    response = genai.embed_content(
        model="models/gemini-embedding-001",
        content="Testing resume screening application connection",
        task_type="retrieval_document",
        output_dimensionality=768
    )
    print("Embedding generated successfully!")
    print("Embedding length:", len(response["embedding"]))
except Exception as e:
    print("Error:", e)
