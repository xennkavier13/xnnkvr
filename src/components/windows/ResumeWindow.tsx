"use client";

import React, { useState } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { ResumeDocIcon } from "@/components/icons/PixelIcons";

export default function ResumeWindow() {
  const { owner, skills, projects, credentials, contact } = PORTFOLIO_DATA;
  const [placeholderNotice, setPlaceholderNotice] = useState(false);

  const handleDownloadPlaceholder = () => {
    setPlaceholderNotice(true);
    setTimeout(() => setPlaceholderNotice(false), 4500);
  };

  return (
    <div className="p-5 sm:p-6 space-y-5">
      {/* MacWrite Toolbar */}
      <div className="border border-black bg-neutral-100 p-3 shadow-mac flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="border border-black bg-white p-1">
            <ResumeDocIcon size={28} />
          </div>
          <div>
            <p className="font-retro text-lg leading-none font-bold">
              Kenn_Xavier_Dabon_Resume.pdf (Placeholder)
            </p>
            <p className="font-mono text-[10px] text-neutral-600 mt-0.5">
              MacWrite Preview v1.0 • 1 Page Mounted
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDownloadPlaceholder}
            className="mac-interactive px-3 py-1.5 border border-black bg-black text-white font-retro text-sm tracking-wide hover:bg-white hover:text-black shadow-[1px_1px_0px_#000] transition-none"
          >
            ⬇ Download PDF (Placeholder)
          </button>
        </div>
      </div>

      {/* Placeholder Alert Banner when clicked */}
      {placeholderNotice && (
        <div className="border-2 border-black bg-white p-3 shadow-mac flex items-center justify-between gap-3">
          <div className="font-mono text-xs text-black">
            <strong>[SYSTEM NOTICE]:</strong> Resume PDF link is currently set to{" "}
            <code className="px-1 py-0.5 bg-neutral-200 border border-black">
              PLACEHOLDER
            </code>
            . Drop your final PDF into{" "}
            <code className="px-1 py-0.5 bg-neutral-200 border border-black">
              /public/resume.pdf
            </code>{" "}
            anytime, or inspect the full interactive CV sheet below!
          </div>
          <button
            type="button"
            onClick={() => setPlaceholderNotice(false)}
            className="mac-interactive px-2 py-0.5 border border-black bg-black text-white font-mono text-xs shrink-0"
          >
            OK
          </button>
        </div>
      )}

      {/* Printable MacWrite CV Sheet */}
      <div className="border border-black bg-white p-5 sm:p-7 shadow-mac space-y-5">
        {/* CV Header */}
        <div className="border-b-2 border-black pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-black uppercase">
              {owner.name}
            </h1>
            <p className="text-sm font-medium text-neutral-700 mt-0.5">
              BS Information Technology Student (GPA: {owner.gpa}) • Full-Stack, QA &amp; Project Management
            </p>
          </div>
          <div className="font-mono text-xs text-neutral-700 space-y-0.5 sm:text-right">
            <p>{contact.email}</p>
            <p>{contact.githubHandle}</p>
            <p>{contact.linkedinHandle}</p>
          </div>
        </div>

        {/* Education */}
        <section className="space-y-1.5">
          <h2 className="font-retro text-lg uppercase tracking-wider border-b border-black pb-1 font-bold">
            Education
          </h2>
          <div className="flex flex-wrap items-baseline justify-between gap-2 pt-1">
            <div>
              <p className="font-bold text-sm text-black">{owner.university}</p>
              <p className="text-xs text-neutral-700">
                {owner.degree} • CITU Parangal 2025 Academic Achiever
              </p>
            </div>
            <span className="font-mono text-xs font-semibold border border-black px-2 py-0.5">
              GPA: {owner.gpa}
            </span>
          </div>
        </section>

        {/* Technical Skills Summary */}
        <section className="space-y-2">
          <h2 className="font-retro text-lg uppercase tracking-wider border-b border-black pb-1 font-bold">
            Technical Skills
          </h2>
          <div className="text-xs space-y-1.5 leading-relaxed text-neutral-800 pt-1">
            <p>
              <strong className="text-black">Languages:</strong>{" "}
              {skills.languages.map((l) => l.name).join(", ")}
            </p>
            <p>
              <strong className="text-black">Frameworks &amp; Libraries:</strong>{" "}
              {skills.frameworks.map((f) => f.name).join(", ")}
            </p>
            <p>
              <strong className="text-black">Tools &amp; Platforms:</strong>{" "}
              {skills.tools.map((t) => t.name).join(", ")}
            </p>
            <p>
              <strong className="text-black">Core Competencies:</strong>{" "}
              {owner.coreCompetencies.join(", ")}
            </p>
          </div>
        </section>

        {/* Selected Projects */}
        <section className="space-y-2.5">
          <h2 className="font-retro text-lg uppercase tracking-wider border-b border-black pb-1 font-bold">
            Key Projects
          </h2>
          <div className="space-y-3 pt-1">
            {projects.map((proj) => (
              <div key={proj.id} className="text-xs space-y-0.5">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <span className="font-bold text-sm text-black">
                    {proj.title}{" "}
                    <span className="font-mono text-xs font-normal text-neutral-600">
                      — {proj.role}
                    </span>
                  </span>
                  <a
                    href={proj.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mac-interactive font-mono text-[11px] underline hover:bg-black hover:text-white px-1"
                  >
                    {proj.linkLabel} ↗
                  </a>
                </div>
                <p className="text-neutral-700 leading-relaxed">{proj.summary}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications & Honors */}
        <section className="space-y-2">
          <h2 className="font-retro text-lg uppercase tracking-wider border-b border-black pb-1 font-bold">
            Credentials &amp; Honors
          </h2>
          <ul className="space-y-1.5 text-xs text-neutral-800 pt-1">
            {credentials.map((cred) => (
              <li
                key={cred.id}
                className="flex flex-wrap items-center justify-between gap-2"
              >
                <span>
                  <strong className="text-black">▪ {cred.title}</strong> —{" "}
                  {cred.issuer}
                </span>
                {cred.verifyUrl && (
                  <a
                    href={cred.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mac-interactive font-mono text-[11px] underline hover:bg-black hover:text-white px-1"
                  >
                    Verify ↗
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
