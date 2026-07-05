# 🌐 AI-Powered Resume Screening System

## 🚀 Overview

An **AI-driven hiring platform** that automates resume screening, smart skill matching, and seamless communication between employers and candidates. This system streamlines the hiring workflow for HR professionals—leveraging the power of **AI and NLP** to **analyze resumes**, **shortlist candidates**, and **schedule interviews** effortlessly.

---

## 🌟 Features

### 📂 Resume Upload & AI-Powered Parsing

- Supports **PDF**, **DOCX**, **TXT**, and **JSON** formats
- Extracts:
  - ✅ Skills
  - ✅ Work Experience
  - ✅ Education
  - ✅ Projects
- Uses **Hugging Face Transformers** for deep NLP-based parsing

---

### 🎯 Smart Resume Ranking System

- Intelligent matching of resumes to job descriptions
- Ranking powered by **Cosine Similarity**
- **LangChain-based RAG** system to answer employer queries using resume data

#### 🔍 Feature Comparison Table

| Feature                              | Description                          | Technology Used                       |
| ------------------------------------ | ------------------------------------ | ------------------------------------- |
| Resume Ranking                       | Match resumes to job roles           | OpenAI Embeddings + Cosine Similarity |
| Semantic Search for Employer Queries | Query over resume database           | LangChain (RAG System)                |
| Skill-Based Filtering                | Filter by categorized skills         | Custom NLP + Categorization           |
| Resume Parsing                       | Extract structured info from resumes | Hugging Face Transformers             |

---

### 📊 HR Dashboard with Skill Visualization

- Powerful filtering (skills, experience, location, etc.)
- **Auto-categorizes skills** into fields like:
  - Machine Learning
  - Web Development
  - Data Science, etc.
- Skill analytics with **Plotly.js**

---

### 💬 Real-Time Communication & Scheduling

- **Live chat** using WebSockets
- **Google Calendar API integration** for scheduling interviews
- Automated **email and SMS** notifications for updates

---

## 🛠️ Tech Stack

### 🧩 Frontend

- **Next.js (React)** – Modern & performant UI
- **TailwindCSS** – Utility-first styling
- **Redux Toolkit** – Efficient state management

### 🔧 Backend

- **FastAPI (Python)** – For AI and NLP processing
- **Node.js + Express.js** – General purpose APIs
- **LangChain** – Handles resume search and retrieval

### 🤖 AI & Data Processing

- **Hugging Face Transformers** – Resume parsing
- **OpenAI Embeddings** – Skill matching logic
- **Pinecone / ChromaDB** – For vector-based searching

### 💾 Storage & Deployment

- **UploadThing / Firebase Storage** – Secure file uploads
- **PostgreSQL + MongoDB** – Hybrid storage for structured and unstructured data

---

## 📌 API Endpoints

### 🔍 Resume Upload & Parsing

- `POST /upload-resume` – Upload a resume and trigger parsing
- `GET /search-resumes` – Retrieve resumes based on job criteria

### 📅 Chat & Scheduling

- `POST /create-event` – Schedule an interview via Google Calendar API
- `GET /messages` – Get chat history between users

---

## 👤 Author

- 👩‍💻 **Varnika Singh**

---

## 🧩 ERD Diagram

> 📌 Here's the Entity-Relationship Diagram showing the system's data architecture:

![ERD Diagram](/public/Diagram.png)

---

## 📜 License

Licensed under the **MIT License** – Feel free to use, modify, and share.

---

## 🚀 Contributions Welcome

Got ideas or improvements?  
👉 Submit a PR or open an issue—we’d love your input!
