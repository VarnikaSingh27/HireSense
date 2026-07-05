import re

SKILLS = {
    "python",
    "java",
    "c",
    "c++",
    "javascript",
    "typescript",
    "html",
    "css",
    "react",
    "node.js",
    "express",
    "mongodb",
    "mysql",
    "postgresql",
    "sql",
    "flask",
    "fastapi",
    "django",
    "docker",
    "kubernetes",
    "git",
    "github",
    "aws",
    "azure",
    "gcp",
    "tensorflow",
    "pytorch",
    "machine learning",
    "deep learning",
    "nlp",
    "computer vision",
    "opencv",
    "pandas",
    "numpy",
    "scikit-learn",
    "linux"
}

def extract_skills(text):
    text = text.lower()
    found = set()

    for skill in SKILLS:
        pattern = r"\b" + re.escape(skill.lower()) + r"\b"

        if re.search(pattern, text):
            found.add(skill)

    return sorted(list(found))