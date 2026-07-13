export type Project = {
  slug: string;
  title: string;
  kicker: string;
  category: "AI Systems" | "Product" | "Voice" | "Research";
  year: string;
  summary: string;
  detail: string;
  outcome: string;
  technologies: string[];
  features: { title: string; body: string }[];
  repository?: string;
  status: string;
};

export const profile = {
  name: "Haraprasad Hota",
  handle: "hk4crprasad",
  role: "AI Architect · Agentic Builder · CTO",
  email: "haraprasadhota1@gmail.com",
  location: "Puri, Odisha, India",
  github: "https://github.com/hk4crprasad",
  avatar: "https://avatars.githubusercontent.com/u/156574789?v=4",
};

export const projects: Project[] = [
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
    technologies: ["TypeScript", "Python", "AI tutoring", "WebSockets", "Azure OpenAI"],
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
    title: "Nutaan AI",
    kicker: "Enterprise reasoning without the hand-waving",
    category: "Research",
    year: "2025 — now",
    summary:
      "An enterprise LLM platform shaped around deeper research, higher-quality reasoning, and more dependable outputs.",
    detail:
      "Nutaan AI is an enterprise-scale LLM platform architected with a $200K development budget. It combines prompt templating, summarization, intelligent workflow automation, FastAPI services, OpenAI APIs, Docker, and Azure CI/CD to make advanced AI capabilities usable in production settings.",
    outcome: "Enterprise LLM platform · $200K development budget",
    technologies: ["FastAPI", "LLMOps", "OpenAI APIs", "Docker", "Azure CI/CD"],
    features: [
      {
        title: "Reasoning with guardrails",
        body: "Multi-step reasoning and deep-search techniques target practical reliability in an enterprise setting.",
      },
      {
        title: "From prompt to workflow",
        body: "Templating, summarization, and automation turn model capability into reusable operational tools.",
      },
      {
        title: "Architecture that survives contact",
        body: "Cloud delivery, containers, and CI/CD make production concerns a first-class part of the AI strategy.",
      },
    ],
    status: "Enterprise platform",
  },
];

export const experience = [
  {
    period: "2026 — now",
    company: "Cynerza",
    role: "Chief Technology Officer & AI Researcher",
    location: "Remote · Bhubaneswar, Odisha",
    copy: "Leading AI strategy, product architecture, and engineering for an AI-first platform spanning web, mobile, automation, custom APIs, and multimodal AI.",
    tags: ["AI strategy", "Technical roadmap", "Multimodal AI"],
  },
  {
    period: "2024 — 2025",
    company: "Tecosys",
    role: "Founding Member & AI/ML Architect",
    location: "Remote · Kolkata, West Bengal",
    copy: "Architected enterprise AI systems, led technical strategy, and established delivery practices across cloud, LLMOps, APIs, and the engineering team.",
    tags: ["Nutaan AI", "AWS + Azure", "Leadership"],
  },
  {
    period: "2022 — 2024",
    company: "Kreaitor",
    role: "AI & DevOps Engineer",
    location: "Remote · Singapore",
    copy: "Built and optimized FastAPI applications for AI services while strengthening CI/CD, Docker-based delivery, model deployment, and monitoring practices.",
    tags: ["FastAPI", "Docker", "Cloud delivery"],
  },
];

export const skills = [
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
];
