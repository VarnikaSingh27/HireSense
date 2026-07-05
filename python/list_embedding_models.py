import os
from dotenv import load_dotenv
import google.generativeai as genai

# load .env from the parent project directory
dotenv_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".env"))
print("Loading .env from:", dotenv_path)
load_dotenv(dotenv_path)

gemini_key = os.getenv("GEMINI_API_KEY")
print("Key exists:", bool(gemini_key))

genai.configure(api_key=gemini_key)

print("Listing available models...")
try:
    for m in genai.list_models():
        if 'embedContent' in m.supported_generation_methods:
            print(m.name)
except Exception as e:
    print("Error listing models:", e)
