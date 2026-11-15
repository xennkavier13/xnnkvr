"use client";

import React, { useState } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { ResumeDocIcon } from "@/components/icons/PixelIcons";

export default function ResumeWindow() {
  const { owner, skills, projects, credentials, contact } = PORTFOLIO_DATA;
  const [viewMode, setViewMode] = useState<"pdf" | "sheet">("pdf");

  return (
    <div className="p-4 sm:p-5 space-y-4 h-full flex flex-col">
      {/* MacWrite Toolbar */}
      <div className="border-2 border-black bg-neutral-100 p-3 shadow-mac flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="border border-black bg-white p-1">
            <ResumeDocIcon size={28} />
          </div>
          <div>
            <p className="font-retro text-base sm:text-lg leading-none font-bold">
              {contact.resumeFileName}
            </p>
            <p className="font-mono text-[10px] font-semibold text-neutral-600 mt-0.5">
              MacWrite PDF Viewer v1.0 • Mounted from /public/{contact.resumeFileName}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* View Mode Toggle: Embedded PDF vs MacWrite Sheet */}
          <button
            type="button"
            onClick={() =>
              setViewMode((prev) => (prev === "pdf" ? "sheet" : "pdf"))
            }
            className="mac-interactive px-2.5 py-1.5 border border-black bg-white text-black font-retro font-bold text-xs sm:text-sm hover:bg-black hover:text-white transition-none"
          >
            {viewMode === "pdf" ? "View: MacWrite Text" : "View: Original PDF"}
          </button>

          <a
            href={contact.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mac-interactive px-2.5 py-1.5 border border-black bg-white text-black font-retro font-bold text-xs sm:text-sm hover:bg-black hover:text-white transition-none"
          >
            Open in New Tab ↗
          </a>

          <a
            href={contact.resumeUrl}
            download={contact.resumeFileName}
            className="mac-interactive px-3 py-1.5 border border-black bg-black text-white font-retro font-bold text-xs sm:text-sm tracking-wide hover:bg-white hover:text-black shadow-[1px_1px_0px_#000] transition-none"
          >
            ⬇ Download PDF
          </a>
        </div>
      </div>

      {/* Main Content Area: Either Embedded PDF or Formatted MacWrite CV Sheet */}
      {viewMode === "pdf" ? (
        <div className="flex-1 min-h-[420px] border-2 border-black bg-neutral-900 shadow-mac overflow-hidden flex flex-col">
          <iframe
            src={`${contact.resumeUrl}#toolbar=1&navpanes=0`}
            title="Kenn Xavier Dabon Resume PDF"
            className="w-full flex-1 min-h-[420px] border-0 bg-white"
          />
        </div>
      ) : (
        <div className="border border-black bg-white p-5 sm:p-7 shadow-mac space-y-5">
          {/* CV Header */}
          <div className="border-b-2 border-black pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-black uppercase">
                {owner.name}
              </h1>
              <p className="text-sm font-medium text-neutral-700 mt-0.5">
                BS Information Technology Student (GPA: {owner.gpa}) •
                Full-Stack, QA &amp; Project Management
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
                <p className="font-bold text-sm text-black">
                  {owner.university}
                </p>
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
                <strong className="text-black">
                  Frameworks &amp; Libraries:
                </strong>{" "}
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
                  <p className="text-neutral-700 leading-relaxed">
                    {proj.summary}
                  </p>
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
      )}
    </div>
  );
}
