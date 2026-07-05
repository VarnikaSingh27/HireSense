import os
from dotenv import load_dotenv
import google.generativeai as genai

# load .env from the parent project directory
dotenv_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".env"))
load_dotenv(dotenv_path)

gemini_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=gemini_key)

models = ["models/gemini-embedding-001", "models/gemini-embedding-2"]

for model_name in models:
    try:
        response = genai.embed_content(
            model=model_name,
            content="Testing resume screening application connection",
            task_type="retrieval_document"
        )
        print(f"Model: {model_name}, Embedding length: {len(response['embedding'])}")
    except Exception as e:
        print(f"Model: {model_name}, Error: {e}")
