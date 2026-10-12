export type Project = {
  slug: string;
  title: string;
  kicker: string;
  category: "AI Systems" | "Product" | "Voice";
  year?: string;
  summary: string;
  detail: string;
  outcome: string;
  technologies: string[];
  features: { title: string; body: string }[];
  repository?: string;
  packageUrl?: string;
  status: string;
};

export const profile = {
  name: "Haraprasad Hota",
  handle: "hk4crprasad",
  role: "AI/ML Engineer · AI Prompt & Loop Designer",
  email: "haraprasadhota1@gmail.com",
  location: "Puri, Odisha, India",
  github: "https://github.com/hk4crprasad",
  linkedin: "https://www.linkedin.com/in/haraprasad-hota-25585b248",
  gitlab: "https://gitlab.com/hk4crprasad",
  phone: "+91 8093383694",
  phoneHref: "tel:+918093383694",
  resume: "/resume.pdf",
  avatar: "/portrait.jpg",
};

export const projects: Project[] = [
  {
    slug: "nutaan-cli",
    title: "Nutaan CLI",
    kicker: "An autonomous coding agent, built for the terminal",
    category: "AI Systems",
    summary:
      "A terminal AI coding agent that plans tasks, edits code, runs shell commands, and searches the web through a LangGraph ReAct loop.",
    detail:
      "I single-handedly built nutaan-cli, an autonomous AI coding agent published on PyPI. It combines Python, LangChain, LangGraph, and Rich with task planning, progress tracking, a think mode, session history, and support for multiple LLM providers. A human-in-the-loop approval layer pauses risky shell commands and file writes, with approvals saved across sessions.",
    outcome: "Sole developer · Open-source package published on PyPI",
    technologies: ["Python", "LangChain", "LangGraph", "Rich", "AI agents", "Prompt design"],
    features: [
      {
        title: "A loop from planning to action",
        body: "A LangGraph ReAct loop connects task planning, reasoning, code edits, shell execution, and web search in one terminal workflow.",
      },
      {
        title: "Human approval at the boundary",
        body: "Risky tool calls pause for user approval. Saved approvals carry across sessions instead of requiring every decision to start over.",
      },
      {
        title: "Built for ongoing work",
        body: "Progress tracking, think mode, session history, and multi-provider LLM support help users keep context as a task develops.",
      },
    ],
    repository: "https://github.com/Tecosys/nutaan-cli",
    packageUrl: "https://pypi.org/project/nutaan-cli/",
    status: "Published on PyPI",
  },
  {
    slug: "medikiosk",
    title: "MediKiosk",
    kicker: "Patient history, gathered in the patient's language",
    category: "Product",
    year: "2026",
    summary:
      "An AI clinical-history intake kiosk where patients use touch or voice and doctors receive a physician-verified summary.",
    detail:
      "MediKiosk is a self-service OPD intake kiosk designed for government hospitals, addressing SIH26047 from the Ministry of AYUSH. Patients provide their history by touch or voice in their language. Adaptive question pathways, red-flag triage, speech-to-text, text-to-speech, OCR, and FHIR R4 export support the intake workflow. I built it solo by directing the OpenCode AI coding agent and owning design, architecture, code review, testing, and deployment.",
    outcome: "1st Runner-up · SIH 2026 Internal Round, IMIT Cuttack",
    technologies: ["FastAPI", "Next.js", "PostgreSQL", "Azure OpenAI", "Docker", "Azure Blob", "FHIR R4", "OpenCode"],
    features: [
      {
        title: "Accessible history intake",
        body: "Touch and voice interaction, speech recognition, and text-to-speech let patients describe their history in their language.",
      },
      {
        title: "A pathway to physician review",
        body: "Adaptive questions, red-flag triage, and OCR lead into a physician-verified AI summary, with FHIR R4 export for interoperability.",
      },
      {
        title: "Solo ownership, with an AI coding agent",
        body: "I directed OpenCode while owning the design, architecture, review, testing, and deployment on Docker and Azure Blob.",
      },
    ],
    status: "Hackathon project · Solo build",
  },
  {
    slug: "sih-2026-portal",
    title: "SIH 2026 Hackathon Portal",
    kicker: "The official internal-round registration portal for IMIT Cuttack",
    category: "Product",
    year: "2026",
    summary:
      "The official SIH 2026 internal-round registration portal at IMIT Cuttack, used by 18 teams and 108 students.",
    detail:
      "I built and ran the official registration portal for IMIT Cuttack's SIH 2026 internal hackathon as its sole developer. The Next.js application, hosted on Heroku, brings a six-step registration form, team-size validation, leader login, and problem-statement search into one workflow. It supported 18 teams comprising 108 students.",
    outcome: "18 teams · 108 students · Sole developer",
    technologies: ["Next.js", "Heroku", "Form validation", "Authentication"],
    features: [
      {
        title: "Registration in six steps",
        body: "A structured form guides teams through registration while validating the required team size.",
      },
      {
        title: "A place for team leaders",
        body: "Leader login provides the entry point for a team's registration workflow.",
      },
      {
        title: "From problem statement to participation",
        body: "Search helps students find problem statements, with the portal supporting the college's official internal round on Heroku.",
      },
    ],
    status: "Official college portal · Solo build",
  },
  {
    slug: "learnsync",
    title: "LearnSync",
    kicker: "Education, redesigned for every learner",
    category: "Product",
    year: "2025",
    summary:
      "An adaptive, AI-powered learning environment created to widen access to quality education in rural communities.",
    detail:
      "LearnSync combines a TypeScript frontend with a Python AI backend to shape learning around the student, not the syllabus. The product pairs personalized study plans and feedback with streaming chat, voice experiences, visual learning games, and an Odia-first AI assistant.",
    outcome: "3rd place · BPUT Hackathon 2025",
    technologies: [
      "TypeScript",
      "Python",
      "AI tutoring",
      "WebSockets",
      "Azure OpenAI",
    ],
    features: [
      {
        title: "Adaptive by design",
        body: "Performance-aware study plans, progressive hints, analytics, and tailored feedback turn practice into a living loop.",
      },
      {
        title: "Made for access",
        body: "Voice interaction, text-to-speech, and an Odia-focused chatbot make the experience more inclusive for rural learners.",
      },
      {
        title: "Learning with momentum",
        body: "Gamified practice and visual learning mechanics keep feedback immediate, specific, and encouraging.",
      },
    ],
    repository: "https://github.com/hk4crprasad/LearnSync",
    status: "Open-source build",
  },
  {
    slug: "youtube-summarizer",
    title: "YouTube Summarizer",
    kicker: "Long-form video, compressed into insight",
    category: "AI Systems",
    year: "2025",
    summary:
      "A production-minded workflow that turns long YouTube videos into usable, multilingual knowledge.",
    detail:
      "The system processes a source video end to end: it extracts audio, transcribes it through Azure Speech Services / Whisper, chunks large inputs efficiently, and calls Azure OpenAI to produce concise summaries. The project is packaged with Docker for repeatable delivery.",
    outcome: "Azure OpenAI + Whisper pipeline",
    technologies: ["Python", "Azure OpenAI", "Whisper", "Docker", "MongoDB"],
    features: [
      {
        title: "Designed for long context",
        body: "Chunking makes large videos practical to process without losing the shape of the original conversation.",
      },
      {
        title: "From speech to signal",
        body: "Transcription and language translation create a bridge between spoken content and a reader’s usable summary.",
      },
      {
        title: "Ready to ship",
        body: "Containerized packaging and a clear service configuration keep deployment concerns part of the build.",
      },
    ],
    repository: "https://github.com/hk4crprasad/youtube-summarizer",
    status: "Open-source build",
  },
  {
    slug: "deepgram-voice-agent",
    title: "Deepgram Voice Agent",
    kicker: "A conversational interface with a pulse",
    category: "Voice",
    year: "2025",
    summary:
      "An experiment in voice-first interfaces that brings real-time conversation closer to a natural exchange.",
    detail:
      "Built as a Next.js application, the Deepgram Voice Agent demo explores the product surface of spoken AI—where latency, responsiveness, and the clarity of a conversation are all part of the interface.",
    outcome: "Voice interaction, explored in the browser",
    technologies: ["Next.js", "React", "Deepgram", "Voice UX", "Tailwind"],
    features: [
      {
        title: "Voice as interface",
        body: "The work treats speech as a primary interaction model, not a novelty bolted onto a text experience.",
      },
      {
        title: "Product-minded prototype",
        body: "A polished web demo makes the behavior of a voice agent tangible before a larger system is committed.",
      },
      {
        title: "Built to iterate",
        body: "The Next.js architecture gives the experiment a pragmatic base for product refinement and integrations.",
      },
    ],
    repository: "https://github.com/hk4crprasad/deepgram-voice-agent-demo",
    status: "Open-source build",
  },
  {
    slug: "nutaan-ai",
    title: "Nutaan Voice AI",
    kicker: "A voice-AI calling assistant in more than 70 languages",
    category: "Voice",
    year: "2024 — 2025",
    summary:
      "Backend and AI engineering for a 24/7 voice-AI calling assistant serving 300+ paying and 150,000+ free users.",
    detail:
      "At Tecosys AI Pvt. Ltd., I worked as a backend and AI engineer on Nutaan, a 24/7 voice-AI calling assistant in 70+ languages. The product serves 300+ paying and 150,000+ free users. My contributions included FastAPI services, LLM workflows, and call summarization, alongside Docker-based CI/CD on Azure.",
    outcome: "70+ languages · 300+ paying users · 150,000+ free users",
    technologies: ["Python", "FastAPI", "LLM workflows", "Voice AI", "Docker", "Azure CI/CD"],
    features: [
      {
        title: "Backend services for voice AI",
        body: "FastAPI services support the application behind a multilingual, around-the-clock calling assistant.",
      },
      {
        title: "From calls to useful summaries",
        body: "LLM workflows and call summarization turn conversations into usable information.",
      },
      {
        title: "Repeatable delivery",
        body: "Docker-based CI/CD on Azure supports the services behind the product.",
      },
    ],
    status: "Backend & AI engineering at Tecosys",
  },
];

export const experience = [
  {
    period: "Jan 2026 — Present",
    company: "Cynerza Systems Pvt. Ltd.",
    role: "AI/ML Engineer",
    location: "Remote · Bhubaneswar, Odisha",
    copy: "Building LLM-based AI agents, automation workflows, and REST APIs with Python, FastAPI, and LangChain for a company serving 200+ paying customers. Developing generative and multimodal AI features and deploying services on Azure and AWS with Docker and CI/CD pipelines.",
    tags: ["Python + FastAPI", "AI agents", "Multimodal AI", "Azure + AWS"],
  },
  {
    period: "Jan 2024 — Dec 2025",
    company: "Tecosys AI Pvt. Ltd.",
    role: "AI/ML Engineer (Backend and AI)",
    location: "Remote · Kolkata, West Bengal",
    copy: "Backend and AI engineer on Nutaan, a 24/7 voice-AI calling assistant in 70+ languages with 300+ paying and 150,000+ free users. Built FastAPI services, LLM workflows, and call summarization; single-handedly developed nutaan-cli; and built YouTube-summarizer and lead-generation services with Docker-based CI/CD on Azure.",
    tags: ["Nutaan voice AI", "nutaan-cli", "FastAPI", "Docker + Azure"],
  },
  {
    period: "Jul 2022 — Jun 2024",
    company: "Kreaitor",
    role: "Backend and DevOps Engineer · Part-time",
    location: "Remote · Singapore",
    copy: "Built FastAPI backend services and AI integrations for a stealth crypto startup. Managed Docker deployments, CI/CD pipelines, and monitoring alongside my studies.",
    tags: ["FastAPI", "Docker", "Cloud delivery"],
  },
];

export const skills = [
  "AI prompt design",
  "Agent loop design",
  "LangGraph",
  "RAG",
  "Django",
  "FastAPI",
  "Python",
  "AI / ML",
  "Prompt engineering",
  "Agentic systems",
  "LangChain",
  "CrewAI",
  "LLMOps",
  "REST APIs",
  "Docker",
  "CI/CD",
  "AWS",
  "Azure",
  "PostgreSQL",
  "MongoDB",
  "JavaScript",
  "TypeScript",
  "SQL",
  "OpenAI / Azure OpenAI",
  "NLP",
  "Hugging Face",
  "Whisper",
  "Next.js",
  "Git / GitHub / GitLab",
  "Heroku",
  "Linux",
  "n8n",
  "Reverse engineering",
  "OpenCode",
];

export const education = [
  {
    qualification: "Master of Computer Applications (MCA)",
    institution: "IMIT Cuttack",
    period: "2025 — 2027 · Pursuing",
    result: "CGPA: 7.80 (Semester 1), 7.83 (Semester 2)",
  },
  {
    qualification: "Bachelor of Computer Applications (BCA)",
    institution: "College of Management and Technology, Puri",
    period: "2022 — 2025",
    result: "CGPA: 8.23",
  },
  {
    qualification: "Higher Secondary · Science (CHSE Odisha)",
    institution: "Regional H.S. School, Nimapara, Puri",
    period: "2020 — 2022",
    result: "73.67%",
  },
  {
    qualification: "Secondary (BSE Odisha)",
    institution: "Bhagabati Nodal High School, Rupadeipur, Puri",
    period: "2020",
    result: "74.50%",
  },
];

export const certifications = [
  { title: "AI For Everyone", issuer: "DeepLearning.AI · Coursera", date: "Dec 2025", url: "https://coursera.org/share/e81397b07df2b0b6f3f7a669c50feaa3" },
  { title: "Backend Development and API Creation", issuer: "Packt · Coursera", date: "Dec 2025", url: "https://coursera.org/share/904ca720036d6c5d04fb1aeeb2f2a3e6" },
  { title: "Advanced Frontend Development and Deployment", issuer: "Packt · Coursera", date: "Dec 2025", url: "https://coursera.org/share/ad1bac07eb82bdf753866bbbf2f68481" },
  { title: "Advanced Relational Database and SQL", issuer: "Coursera Project Network", date: "Dec 2025", url: "https://coursera.org/share/f3a2471b9f7ab34757dd239658b7962e" },
];

export const achievements = [
  { title: "1st Runner-up · SIH 2026 Internal Round", detail: "MediKiosk · IMIT Cuttack" },
  { title: "3rd Position · BPUT Hackathon 2025", detail: "LearnSync · Biju Patnaik University of Technology" },
  { title: "Open-source package published on PyPI", detail: "nutaan-cli · Sole developer" },
  { title: "1,950+ GitHub contributions", detail: "Since January 2024" },
];
