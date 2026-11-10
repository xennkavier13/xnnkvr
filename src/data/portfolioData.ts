export type WindowId =
  | "about"
  | "projects"
  | "skills"
  | "credentials"
  | "contact"
  | "resume"
  | "trash";

export interface ProjectItem {
  id: string;
  title: string;
  role: string;
  summary: string;
  highlights: string[];
  tech: string[];
  linkLabel: string;
  linkUrl: string;
  category: "tools" | "fullstack" | "game";
  year: string;
  fileSize: string;
  screenshotUrl?: string;
}

export interface CredentialItem {
  id: string;
  title: string;
  issuer: string;
  category: string;
  description: string;
  verifyLabel?: string;
  verifyUrl?: string;
  badgeCode: string;
  screenshotUrl?: string;
}

export const BOOT_STAGES = [
  { progress: 14, label: "Initializing xnnkvr ROM v1.0..." },
  { progress: 32, label: "Loading About.doc..." },
  { progress: 52, label: "Loading Projects/ (5 items)..." },
  { progress: 70, label: "Mounting Skills_&_Tools.sys..." },
  { progress: 86, label: "Verifying Credentials.cert..." },
  { progress: 96, label: "Mounting Resume.pdf..." },
  { progress: 100, label: "Starting Macintosh Desktop..." },
];

export const PORTFOLIO_DATA = {
  owner: {
    name: "Kenn Xavier Dabon",
    handle: "xnnkvr",
    systemVersion: "System 1.0 — xnnkvr OS",
    serialNumber: "BUILD 2026.11 // S/N: XNNKVR-443-BSIT",
    degree: "BS in Information Technology",
    gpa: "4.43 / 5.00",
    university: "Cebu Institute of Technology – University (CIT-U)",
    primaryRoles: [
      "Frontend Development",
      "Backend Development",
      "Project Management",
      "Quality Assurance (QA)",
    ],
    aboutParagraphs: [
      {
        heading: "What I Do",
        body: "I’m a dedicated BS Information Technology student (4.43 / 5.00 GPA) who adapts comfortably to any role a team needs, with a primary focus on Frontend Development, Backend Development, and Project Management. I enjoy building full-stack applications from the ground up, leading collaborative engineering teams, and ensuring software quality through structured QA.",
      },
      {
        heading: "What I’m Currently Building",
        body: "Right now, my team and I are developing our Capstone Project, Ariadne — a student-first Static Application Security Testing (SAST) extension for Visual Studio Code that inspects source code for security vulnerabilities without compromising academic integrity.",
      },
      {
        heading: "Beyond the Terminal",
        body: "Outside of my studies and software engineering, I love producing music in FL Studio. I spend my creative downtime making and listening to hip-hop, R&B, and indie tracks. I’m always eager to keep learning and excited for what the future holds — and the opportunities to build meaningful software along the way.",
      },
    ],
    coreCompetencies: [
      "Full-Stack Application Development",
      "Object-Oriented Programming (OOP)",
      "Software Architecture & Design",
      "Agile & Cross-Functional Teamwork",
      "Project Management & Documentation",
      "Software Quality Assurance (QA)",
    ],
  },

  skills: {
    languages: [
      { name: "Java", tag: "OOP / Backend" },
      { name: "TypeScript", tag: "Typed Web" },
      { name: "JavaScript", tag: "ES6+ / Web" },
      { name: "Python", tag: "Backend / Scripting" },
      { name: "C", tag: "Systems / Core" },
      { name: "Kotlin", tag: "JVM / Modern" },
      { name: "HTML", tag: "Semantic Markup" },
      { name: "CSS", tag: "Layout & Styling" },
    ],
    frameworks: [
      { name: "Spring Boot", detail: "Enterprise Java REST APIs & Backend Services" },
      { name: "React", detail: "Component-Driven Interactive UIs" },
      { name: "Next.js", detail: "Full-Stack React Framework & SSR" },
      { name: "Django", detail: "Batteries-Included Python Web Framework" },
      { name: "Tailwind CSS", detail: "Utility-First Modern Design Systems" },
    ],
    tools: [
      { name: "Git", category: "Version Control" },
      { name: "Postman", category: "API Testing" },
      { name: "Jira", category: "Agile Project Mgmt" },
      { name: "TestRail", category: "QA Test Case Mgmt" },
      { name: "Supabase", category: "BaaS & Postgres" },
      { name: "FL Studio", category: "Audio & Music Prod" },
    ],
  },

  projects: [
    {
      id: "ariadne",
      title: "Ariadne",
      role: "Documentation Lead & QA",
      summary:
        "Student-first Static Analysis (SAST) tool for Visual Studio Code that reviews code for security flaws without compromising academic integrity.",
      highlights: [
        "Published directly on the Visual Studio Code Marketplace for student and educator workflows.",
        "Led technical documentation, test plan authoring, and QA verification cycles.",
        "Designed to surface actionable security feedback while preserving learning outcomes.",
      ],
      tech: ["VS Code Extension", "Static Analysis (SAST)", "TypeScript", "QA & TestRail"],
      linkLabel: "VS Code Marketplace",
      linkUrl:
        "https://marketplace.visualstudio.com/items?itemName=tallbreadstick.ariadne-extension-vscode",
      category: "tools",
      year: "Capstone",
      fileSize: "148 KB",
      screenshotUrl: "/project/ariadne.jpg",
    },
    {
      id: "campusguru",
      title: "CampusGuru",
      role: "Fullstack Developer",
      summary:
        "Campus-exclusive tutor meetup logistics platform connecting students with peer tutors for real-time scheduling and collaboration.",
      highlights: [
        "Engineered end-to-end student-to-tutor booking, session logistics, and scheduling flows.",
        "Built both frontend user interfaces and backend API integrations.",
        "Tailored specifically for university peer-learning communities.",
      ],
      tech: ["React", "Spring Boot", "Full-Stack", "REST API"],
      linkLabel: "GitHub Repository",
      linkUrl: "https://github.com/xennkavier13/IT342-Dabon-CampusGuru",
      category: "fullstack",
      year: "IT342",
      fileSize: "212 KB",
      screenshotUrl: "/project/campusguru.jpg",
    },
    {
      id: "mimala",
      title: "Mimala",
      role: "Project Lead",
      summary:
        "Turn-based 2D fighting game built with pure Java and foundational Object-Oriented Programming (OOP) principles.",
      highlights: [
        "Directed project architecture, task delegation, and combat state machine design.",
        "Applied encapsulation, inheritance, polymorphism, and custom 2D game rendering in Java.",
        "Delivered complete turn-based battle mechanics, character roster, and UI loop.",
      ],
      tech: ["Java", "OOP", "2D Game Dev", "Project Leadership"],
      linkLabel: "GitHub Repository",
      linkUrl: "https://github.com/xennkavier13/MimalaFinal",
      category: "game",
      year: "Java OOP",
      fileSize: "184 KB",
      screenshotUrl: "/project/mimala.jpg",
    },
    {
      id: "quark",
      title: "Quark",
      role: "Frontend Developer",
      summary:
        "A web platform for STEM education through interactive programming, built with a React client and Spring Boot backend.",
      highlights: [
        "Crafted responsive, interactive STEM learning modules and code-exercise views in React.",
        "Integrated seamlessly with a Spring Boot backend for user progress and curriculum delivery.",
        "Focused on clarity and low-friction onboarding for students learning to code.",
      ],
      tech: ["React", "Spring Boot", "TypeScript", "Tailwind CSS"],
      linkLabel: "GitHub Repository",
      linkUrl: "https://github.com/tallbreadstick/quark-webclient",
      category: "fullstack",
      year: "Web App",
      fileSize: "164 KB",
      screenshotUrl: "/project/quark.jpg",
    },
    {
      id: "hygin",
      title: "Hygin",
      role: "Frontend Developer & Music Composer",
      summary:
        "Gamified hygiene learning app built for a nursing research team, making health education interactive and engaging.",
      highlights: [
        "Developed playful, accessible frontend interfaces tailored for health education research.",
        "Composed and produced original background music and soundtracks in FL Studio.",
        "Combined software engineering with audio design to boost learner engagement.",
      ],
      tech: ["Frontend UI", "Gamification", "FL Studio Audio", "Web App"],
      linkLabel: "GitHub Repository",
      linkUrl: "https://github.com/jermochi/Hygin",
      category: "game",
      year: "Research",
      fileSize: "196 KB",
      screenshotUrl: "/project/Hygienix.jpg",
    },
  ] as ProjectItem[],

  credentials: [
    {
      id: "philnits-fe",
      title: "PhilNITS FE Certification",
      issuer: "Information Technology Professionals Examination Council (ITPEC)",
      category: "International IT Standard Exam",
      description:
        "Passed the Fundamental Information Technology Engineer (FE) Examination — a rigorous international certification covering algorithms, computer architecture, networks, databases, cybersecurity, and software engineering management.",
      verifyLabel: "View Official List of Passers (PDF)",
      verifyUrl:
        "https://www.itpec.org/statsandresults/all-passers-information/Philippines/2026S_FE.pdf",
      badgeCode: "ITPEC-FE-2026S",
      screenshotUrl: "/credentials/philnits-fe.png",
    },
    {
      id: "ey-gds-hackathon",
      title: "EY GDS ServiceNow Hackathon Finalist",
      issuer: "EY Global Delivery Services (GDS)",
      category: "National / Industry Hackathon",
      description:
        "Selected as a Finalist in the EY GDS ServiceNow Hackathon, collaborating under tight deadlines to architect, prototype, and pitch an enterprise workflow solution.",
      badgeCode: "EY-GDS-FINALIST",
      screenshotUrl: "/credentials/servicenow-finalist.png",
    },
    {
      id: "citu-parangal-2025",
      title: "CITU Parangal 2025 — Academic Achiever",
      issuer: "Cebu Institute of Technology – University",
      category: "University Academic Honor",
      description:
        "Recognized at CIT-U Parangal 2025 as an Academic Achiever for maintaining an exemplary 4.43 / 5.00 GPA in the Bachelor of Science in Information Technology program.",
      badgeCode: "GPA-4.43/5.00",
      screenshotUrl: "/credentials/parangal-2025.png",
    },
    {
      id: "codechum-oop",
      title: "Java Object-Oriented Programming Certification",
      issuer: "CodeChum × CIT-U",
      category: "Technical Programming Certification",
      description:
        "Certified in Java Object-Oriented Programming after completing rigorous hands-on coding assessments covering classes, inheritance, polymorphism, abstraction, and exception handling.",
      verifyLabel: "Verify Certificate #9912",
      verifyUrl: "https://citu.codechum.com/certificates/9912",
      badgeCode: "CERT-ID-9912",
      screenshotUrl: "/credentials/codechum.jpg",
    },
  ] as CredentialItem[],

  contact: {
    github: "https://github.com/xennkavier13",
    githubHandle: "github.com/xennkavier13",
    linkedin: "https://www.linkedin.com/in/kenn-xavier-dabon/",
    linkedinHandle: "linkedin.com/in/kenn-xavier-dabon",
    email: "kennxavier15@gmail.com",
    resumePlaceholderNote:
      "Resume.pdf (Placeholder Mode) — Full interactive CV view is mounted below. Replace /public/Kenn_Xavier_Dabon_Resume.pdf anytime for direct PDF download.",
  },
};
