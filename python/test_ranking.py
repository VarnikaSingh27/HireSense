import os
import google.generativeai as genai
from dotenv import load_dotenv
from pineconeClient import index

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def test_rank():
    query = "React developer with experience in Node.js and TypeScript"
    print(f"Testing ranking query: '{query}'")
    
    # 1. Generate query embedding
    try:
        response = genai.embed_content(
            model="models/gemini-embedding-001",
            content=query,
            task_type="retrieval_query",
        )
        query_embedding = response["embedding"]
        print("Success: Query embedding generated.")
    except Exception as e:
        print("Error generating embedding:", e)
        return

    # 2. Query Pinecone
    try:
        query_response = index.query(
            vector=query_embedding,
            top_k=10,
            include_metadata=True
        )
        print("Success: Pinecone query completed.")
    except Exception as e:
        print("Error querying Pinecone:", e)
        return

    # 3. Process matches
    candidates_scores = {}
    for match in query_response.get("matches", []):
        metadata = match.get("metadata", {})
        email = metadata.get("user_email")
        if not email:
            continue
        score = match.get("score", 0.0)
        if email not in candidates_scores:
            candidates_scores[email] = score
        else:
            candidates_scores[email] = max(candidates_scores[email], score)

    sorted_candidates = sorted(
        [{"email": email, "score": score} for email, score in candidates_scores.items()],
        key=lambda x: x["score"],
        reverse=True
    )

    print("Ranked Candidates:")
    for rank, cand in enumerate(sorted_candidates, 1):
        print(f"Rank {rank}: {cand['email']} - Score: {cand['score']:.4f}")

if __name__ == "__main__":
    test_rank()
