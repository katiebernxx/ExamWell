# ExamWell MVP

## 🚀 Overview
ExamWell is an AI-powered problem bank designed to help high school STEM teachers generate high-quality, curriculum-aligned exam questions. This Minimum Viable Product (MVP) showcases the core functionality, including:

- **AI-driven problem generation** using LangChain and OpenAI models
- **Customizable problem constraints** (subject, topic, difficulty, Bloom's taxonomy level, etc.)
- **Frontend demo** for interacting with the generator
- **Prompt engineering work** to ensure problem quality and solvability

This repository includes both the **frontend demo** and the **LangChain prompt engineering work** that powers problem generation.

## 📹 Demo Video

https://github.com/user-attachments/assets/3bbe4394-ce28-4a99-9206-a857f19c197e
Watch the demo!

## 🔥 Features
### 🎨 Frontend Demo
- Built with **Next.js** and **TailwindCSS** for a sleek and interactive experience.
- Allows users to input problem parameters and view AI-generated exam problems in real-time.
- Component-based architecture for easy customization and scalability.

### 🧠 AI-Powered Problem Generation
- Uses **LangChain** to structure problem generation with a **two-pass verification system**:
  1. **Generator Model:** Creates an exam problem based on specified constraints.
  2. **Fact-Checker Model:** Ensures the generated problem is valid, solvable, and meets educational standards.
- Problems are customizable based on:
  - **Subject** (e.g., Algebra 2, Calculus)
  - **Topic** (e.g., Systems of Equations, Optimization)
  - **Question Type** (e.g., Word Problem, Multiple Choice)
  - **Bloom’s Taxonomy Level** (e.g., Apply, Evaluate, Create)
  - **Difficulty Level** (1-4)
  - **Calculator Policy** (Allowed/Not Allowed)
  - **Diversity Considerations** (e.g., Name inclusivity)

### 🛠️ LangChain Prompt Engineering
The core problem generation logic is in `langchain_templates.py`, where the AI is guided by a structured prompt to ensure high-quality problem creation. 

#### Example Prompt Structure
```python
alg2_prompt = """
Generate a single math problem for a high school Algebra 2 teacher based on the given parameters:
- **Topic:** {topic}
- **Difficulty Level:** {difficulty} (1-4)
- **Bloom’s Taxonomy Objective:** {blooms}
- **Question Type:** {type}
- **Calculator Policy:** {calculator}
- **Number of Steps:** {steps}
- **Additional Notes:** {notes}

Ensure the problem is original, solvable, and adheres to curriculum standards.
"""
