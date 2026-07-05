# 🌐 HireSense: AI-Powered Resume Screening & Ranking System

An **AI-driven recruitment and talent acquisition platform** that automates candidate resume parsing, smart semantic skill matching, and interview coordination. By leveraging state-of-the-art Natural Language Processing (NLP) models, vector search, and a hybrid backend architecture, HireSense streamlines candidate sourcing for HR teams and provides a transparent, data-driven ranking interface.

---

## 🛠️ Architecture & Core System Workflow

HireSense uses a split-backend design combining a high-performance **FastAPI** microservice (optimized for AI/ML tasks) with a robust **Next.js (React)** application server.

```mermaid
graph TD
    A[Recruiter / Candidate] -->|Upload PDF Resume| B[Next.js Frontend]
    B -->|Upload Event| C[FastAPI Backend]
    C -->|Extract Text| D[PDF Parser]
    D -->|Text Chunking| E[LangChain Splitter]
    E -->|Vector Embeddings| F[Google Gemini API]
    F -->|Insert Vectors 768d| G[Pinecone Vector Database]
    B -->|Submit Job Description| H[Prisma ORM & PostgreSQL]
    B -->|Query Matches| C
    C -->|Cosine Similarity Query| G
    G -->|Return Ranked Emails| C
    C -->|Extract Match Details| F
    C -->|Return Results| B
```

### 1. Ingestion & Embedding Pipeline
1. **PDF Parsing**: The candidate uploads a resume (PDF/DOCX/TXT). The FastAPI backend uses `pypdf` to extract the raw text content.
2. **Text Chunking**: The extracted text is divided into overlapping logical fragments using LangChain's chunking utilities.
3. **Vector Generation**: Text chunks are passed to the **Google Gemini Embedding model (`models/gemini-embedding-001`)** to produce 768-dimensional semantic vectors.
4. **Vector Storage**: The generated embeddings are stored in a **Pinecone** index under the candidate's metadata (email, name).

### 2. Semantic Match & Ranking
1. **Job Profiling**: The recruiter inputs a detailed job description text query.
2. **Similarity Scoring**: The description is vectorized using Gemini. We then query Pinecone to perform a **Cosine Similarity** check against all indexed resume chunks.
3. **Skill Analysis**: Candidates are ranked by score. A parallel FastAPI task queries Gemini to analyze the candidate's text against the job description, returning categorized **Matching Skills** and **Missing Skills**.

---

## 🌟 Key Platform Features

### 1. Interactive Matching Sandbox (Playground)
Recruiters can try a live simulation of the semantic search directly on the homepage. They can edit job requirements, run the AI ranker, view scan progress, and inspect matched vs. missing skills for candidate profiles.

### 2. Smart Resume Upload & Parsing
Automated extraction of technical skills, experience metrics, education milestones, and project involvement from multiple resume formats in real-time.

### 3. Future-Safe Interview Coordinator
Features an interactive scheduling calendar (re-rendering dates dynamically based on availability) with robust validation:
* **Past Date Prevention**: Dates prior to the present day are disabled and visually blocked from selection.
* **Interval Overlap Checks**: Validates schedule ranges and ensures at least a 30-minute gap between meetings.
* **Google Calendar API**: Integrates booking direct slots into calendar accounts.

### 4. Recruiter Analytics Dashboard
Visualization of candidates' skills distribution and profile ranks using Plotly charts. Includes advanced search filters for skills, locations, and experience ranges.

---

## 💻 Technology Stack

* **Frontend Framework**: Next.js (React) v14.2 (App Router, Server Actions)
* **Styling & Motion**: TailwindCSS, Framer Motion, Magic UI
* **Primary Database**: PostgreSQL managed through **Prisma ORM**
* **Vector Database**: Pinecone DB (768-dimension index)
* **AI & Embedding Models**: Google Gemini API (`gemini-embedding-001`, generative NLP)
* **Backend Processing**: FastAPI (Python 3.10+) & Node.js / Express
* **Document Parsing**: LangChain, PyPDF, Scikit-Learn (TF-IDF Vectorization)
* **Authorization**: Kinde Auth Integration

---

## ⚙️ Local Setup & Installation

### Prerequisites
* Node.js v18.x or higher
* Python 3.10 or higher
* PostgreSQL database instance (Neon.tech or Supabase recommended)
* Pinecone API Key
* Google Gemini API Key

---

### Step 1: Clone and Set Up Environment Variables
Create a [`.env`](file:///c:/Users/Hp/Desktop/ResumeScreening/Resume-Screening-System/.env) file in the root directory based on [`.env.example`](file:///c:/Users/Hp/Desktop/ResumeScreening/Resume-Screening-System/.env.example):

```env
# Database Credentials
DATABASE_URL="postgresql://username:password@your-db-host/postgres"
DIRECT_URL="postgresql://username:password@your-db-host/postgres"

# AI & Vector DB Keys
GEMINI_API_KEY="your-gemini-api-key"
PINECONE_API_KEY="your-pinecone-api-key"

# Kinde Authentication (Recruiter & Candidate Auth)
KINDE_CLIENT_ID="your-kinde-client-id"
KINDE_CLIENT_SECRET="your-kinde-client-secret"
KINDE_ISSUER_URL="https://your-domain.kinde.com"
KINDE_SITE_URL="http://localhost:3000"
KINDE_POST_LOGOUT_REDIRECT_URL="http://localhost:3000"
KINDE_POST_LOGIN_REDIRECT_URL="http://localhost:3000/post-login-handler"

# UploadThing (SaaS File Storage Token)
UPLOADTHING_TOKEN="your-uploadthing-token"
```

---

### Step 2: Database Setup & Migration
Initialize your database schemas:
```bash
npx prisma generate
npx prisma db push
```

---

### Step 3: Run the Next.js Client
Install the Node.js dependencies and start the local development server:
```bash
npm install
npm run dev
```
*The client dashboard will be available at: **`http://localhost:3000`***

---

### Step 4: Run the FastAPI Python Backend
1. Open a new terminal tab/window.
2. Activate your python virtual environment:
   * **Windows (PowerShell)**:
     ```powershell
     .\venv\Scripts\Activate.ps1
     ```
   * **macOS / Linux / Git Bash**:
     ```bash
     source venv/bin/activate
     ```
3. Install required libraries:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the API microservice:
   ```bash
   uvicorn python.mainFastApi:app --reload --port 8000
   ```
*The backend API documentation will be available at: **`http://localhost:8000/docs`***

---

## 👤 Author

* 👩‍💻 **Varnika Singh** (Full-Stack & AI Integration Lead)

---

## 📜 License

This project is licensed under the **MIT License** – feel free to use and build upon this implementation.
