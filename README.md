# ResumeAI

> AI-powered resume tailoring platform that optimizes your resume against job descriptions and tracks ATS compatibility.

![React](https://img.shields.io/badge/React_18-20232A?style=flat&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Redux](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=flat&logo=redux&logoColor=white)

---

## Overview

ResumeAI takes your master profile and intelligently tailors it against any job description using a local Mistral 4B language model. Each generated resume is scored for ATS compatibility, exportable to PDF, and stored in your personal resume library — giving you a targeted resume for every application without starting from scratch.

---

## Features

- **AI Resume Tailoring** — Paste any job description and generate a resume tailored to its keywords, tone, and requirements
- **ATS Score Tracking** — Each resume is assigned an ATS compatibility score so you can optimize before applying
- **PDF Export** — Export any resume to a clean, print-ready PDF directly from the browser
- **Resume Library** — Store and manage multiple tailored resumes, each tied to a specific role and company
- **Secure Authentication** — JWT-based auth with protected routes and token management via Axios interceptors

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Styling | Tailwind CSS |
| Component Library | shadcn/ui |
| State Management | Redux Toolkit |
| API Client | Axios |
| PDF Export | react-to-print |
| Backend | Node.js |
| LLM | Mistral 4B |
| Auth | JWT (Access Token) |

---

## Backend API

[Backend](https://github.com/AynanshAadyant/resume-builder/tree/main)

## Project Structure

```
src/
├── api/                  # Axios instance and request interceptors
├── components/
│   ├── ui/               # shadcn/ui base components (Button, Input, etc.)
│   ├── Resumes/          # Resume preview and template components
│   └── ResumeEditor/     # Resume library, cards, and generation modal
├── store/
│   ├── slices/           # Redux slices (auth, profile, etc.)
│   └── hooks.ts          # Typed useAppSelector / useAppDispatch hooks
├── types/                # Global TypeScript interfaces and enums
├── utils/                # Helper functions (PDF downloader, formatters)
└── pages/                # Route-level page components
```

---

## Usage

1. **Create your profile** — Fill in your master profile with experience, skills, and education
2. **Add a job description** — Paste the JD you want to apply for
3. **Generate** — Click "New Resume" and select the JD; the AI tailors your profile to it
4. **Review your ATS score** — Check the compatibility score on your resume card
5. **Export** — Open the resume preview and download as PDF

---

## Known Issues

- Generated resumes are not guaranteed to fit a single page; content-heavy profiles may overflow when exported to PDF

---

## Roadmap

- [ ] **Multiple resume templates** — Choose from a library of ATS-friendly and design-forward layouts
- [ ] **Custom resume generation via prompt** — Guide the AI with freeform instructions (e.g. "emphasize leadership experience", "keep it under one page")
- [ ] **Activity history** — Track every resume generated, JD analyzed, and action taken with timestamps
- [ ] **Resume suggestions** — AI-driven recommendations to improve phrasing, fill keyword gaps, and boost ATS score
- [ ] **Profile enhancement suggestions** — Analyze uploaded JDs, generated resumes, and your master profile holistically to surface actionable gaps in skills, experience framing, and keywords you're consistently missing across applications

---
