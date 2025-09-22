
# Maanam – Heal. Grow. Thrive.

**A privacy-first, AI-powered mental health support system for students.**

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://v0-mental-health-system-mvp.vercel.app/)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Styled with Tailwind CSS](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-black?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

Maanam is a modern, comprehensive digital mental health platform designed to address the unique challenges faced by students in higher education. Built with Next.js, TypeScript, and Node.js, this project serves as a Minimum Viable Product (MVP) demonstrating a scalable, secure, and stigma-free solution for campus well-being.

---

### Table of Contents

1.  [Overview & Mission](#overview--mission)
2.  [Core Features](#core-features)
3.  [Guiding Principles](#guiding-principles)
4.  [Live Demo](#live-demo)
5.  [Tech Stack](#tech-stack)
6.  [Getting Started](#-getting-started)
    * [Prerequisites](#prerequisites)
    * [Installation](#installation)
    * [Database Setup](#database-setup)
    * [Running the Application](#running-the-application)
7.  [Project Structure](#project-structure)
8.  [MVP Scope](#mvp-scope)
9.  [License](#license)

---

## Overview & Mission

The mental health of college students is a growing concern, yet access to support is often hindered by stigma, cost, and availability. Maanam aims to bridge this gap by providing a suite of digital tools that are accessible, confidential, and culturally relevant. Our mission is to empower students with first-line psychological support and provide institutions with the anonymous, aggregated data needed to create healthier campus environments.

## Core Features

This MVP showcases the foundational pillars of the Maanam platform:

* **🔐 Secure User Authentication:** Standard email/password registration and login system using JWT for secure session management.
* **🧠 AI-Powered First-Aid Chat:**
    * An interactive chat assistant built on a **Retrieval-Augmented Generation (RAG)** model.
    * Provides evidence-based coping strategies (e.g., CBT, mindfulness) in a conversational format.
    * Includes a **non-skippable crisis escalation protocol** that detects high-risk language and immediately presents emergency resources.
* **📊 Anonymous Self-Assessments:**
    * Validated screening tools like **GAD-7 (for Anxiety)** and **PHQ-9 (for Depression)**.
    * User scores are **never linked to their identity**. Results are immediately anonymized and aggregated to protect privacy while powering the admin dashboard.
* **📚 Psychoeducational Resource Hub:** A curated library of articles, videos, and audio guides on topics relevant to students, such as academic stress, anxiety, and building healthy habits.
* **📈 Admin Dashboard (Mockup):** A high-fidelity mockup demonstrating how institutions can view anonymized, aggregated well-being trends (e.g., "What percentage of students are reporting moderate anxiety this month?"). This feature is designed for data-driven policy making, **not** student surveillance.

## Guiding Principles

Our development is guided by a strong ethical framework:

1.  **Privacy-First by Design:** We physically separate user identity from sensitive data like assessment scores. It is technically impossible to trace an aggregated data point back to an individual user.
2.  **Ethical AI & User Safety:** The AI assistant is a supportive tool, not a therapist. Its primary function is to offer safe, evidence-based first aid and recognize its limitations by escalating crisis situations to real-world help.
3.  **Data-Driven, Not Data-Intrusive:** We believe in using data for good. The platform provides institutions with high-level insights to improve support systems, without compromising the privacy of the individuals they serve.

## Live Demo

The current MVP is deployed on Vercel:

**[https://v0-mental-health-system-mvp.vercel.app/](https://v0-mental-health-system-mvp.vercel.app/)**

## Tech Stack

| Area      | Technology                                                                                                  |
| :-------- | :---------------------------------------------------------------------------------------------------------- |
| **Frontend** | [Next.js](https://nextjs.org/), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/) |
| **Backend** | [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/), [TypeScript](https://www.typescriptlang.org/)                                                                          |
| **Database** | [PostgreSQL](https://www.postgresql.org/)                                                                   |
| **Auth** | [JWT](https://jwt.io/) (JSON Web Tokens)                                                                    |
| **AI/LLM** | An external LLM API (e.g., OpenAI, Google Gemini)                                                           |

## 🚀 Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

* [Node.js](https://nodejs.org/en) (v18.x or later)
* [pnpm](https://pnpm.io/installation) (or npm/yarn)
* [PostgreSQL](https://www.postgresql.org/download/) database instance

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/v0-mental-health-system-mvp.git](https://github.com/your-username/v0-mental-health-system-mvp.git)
    cd v0-mental-health-system-mvp
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and add the following variables.

    ```env
    # Database Connection
    POSTGRES_URL="postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE"

    # JWT Secret for Authentication
    JWT_SECRET="your-super-secret-key-that-is-at-least-32-characters-long"

    # LLM API Key (e.g., OpenAI)
    OPENAI_API_KEY="your-llm-api-key"
    ```

### Database Setup

The `scripts/schema.sql` file contains the necessary SQL commands to create the tables. You can execute this file against your PostgreSQL database using a tool like `psql` or a GUI client.

### Running the Application

1.  **Start the development server:**
    ```bash
    pnpm dev
    ```

2.  **Open your browser:**
    Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

## Project Structure

The codebase is organized to maintain a clean separation of concerns.

````

/
├── app/              \# Next.js App Router: Pages, layouts, and API routes
├── components/       \# Reusable React components (UI, layout, etc.)
├── lib/              \# Core logic, types, utilities, database functions
├── public/           \# Static assets (images, fonts)
└── scripts/          \# Database setup scripts (e.g., schema.sql)

```

## MVP Scope

To deliver a focused and functional prototype, the following features were prioritized:

#### ✅ In Scope:

* Functional AI Chatbot with crisis escalation.
* PHQ-9 & GAD-7 assessments with anonymous aggregation logic.
* Basic Resource Hub with sample content.
* High-fidelity mockup of the Admin Dashboard.
* Secure user authentication.

#### ❌ Out of Scope (Future Goals):

* Live counselor booking system.
* Moderated peer-to-peer support forum.
* Multi-language support.
* Real-time data pipelines for the admin dashboard.

## License

This project is intended for educational and demonstration purposes. It is not a certified medical device. The code is provided as-is, and you are free to fork, modify, and build upon it.
