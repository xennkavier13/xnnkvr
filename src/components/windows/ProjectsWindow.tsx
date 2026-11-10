"use client";

import React, { useState } from "react";
import { PORTFOLIO_DATA, ProjectItem } from "@/data/portfolioData";
import { FolderPixelIcon } from "@/components/icons/PixelIcons";
import CRTImage from "@/components/CRTImage";

export default function ProjectsWindow() {
  const [filter, setFilter] = useState<"all" | "fullstack" | "tools" | "game">("all");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects = PORTFOLIO_DATA.projects.filter((p) =>
    filter === "all" ? true : p.category === filter
  );

  return (
    <div className="p-5 sm:p-6 space-y-5">
      {/* Top Header & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black pb-4">
        <div className="flex items-center gap-3">
          <div className="border border-black bg-neutral-50 p-1.5 shadow-[1px_1px_0px_#000]">
            <FolderPixelIcon size={32} />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight text-black">
              Featured Software Projects
            </h2>
            <p className="text-xs text-neutral-600 font-mono">
              5 Repositories Mounted • Full-Stack, Developer Tools, &amp; Interactive Apps
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1">
          {[
            { id: "all", label: "All (5)" },
            { id: "tools", label: "SAST & Tools" },
            { id: "fullstack", label: "Full-Stack Web" },
            { id: "game", label: "Games & Audio" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id as typeof filter)}
              className={`mac-interactive px-2.5 py-1 border border-black font-retro text-sm tracking-wide transition-none ${
                filter === tab.id
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-black hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Project Cards List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredProjects.map((project, index) => {
          const isExpanded = selectedProject?.id === project.id;
          return (
            <article
              key={project.id}
              className="border border-black bg-white shadow-mac flex flex-col justify-between transition-none"
            >
              {/* Classic Window-Style Project Header Bar */}
              <div className="border-b border-black bg-neutral-100 px-3.5 py-2 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 bg-black text-white font-mono text-[10px] font-bold">
                    0{index + 1}
                  </span>
                  <h3 className="font-bold text-base sm:text-lg text-black">
                    {project.title}
                  </h3>
                  <span className="px-2 py-0.5 border border-black bg-white font-mono text-[11px] font-medium">
                    {project.role}
                  </span>
                </div>

                <span className="font-mono text-[11px] text-neutral-600">
                  {project.year} • {project.fileSize}
                </span>
              </div>

              {/* Project Body */}
              <div className="p-4 space-y-3">
                {project.screenshotUrl && (
                  <CRTImage
                    src={project.screenshotUrl}
                    alt={`${project.title} screenshot`}
                    caption={`${project.title.toUpperCase()}_PREVIEW.BMP`}
                    aspectRatio="video"
                  />
                )}

                <p className="text-sm text-neutral-800 leading-relaxed">
                  {project.summary}
                </p>

                {/* Key Highlights */}
                {isExpanded && (
                  <div className="border border-black bg-neutral-50 p-3 space-y-1.5">
                    <p className="font-retro text-sm uppercase tracking-wider font-bold text-black">
                      Engineering Highlights &amp; Responsibilities:
                    </p>
                    <ul className="space-y-1 text-xs text-neutral-800">
                      {project.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="font-mono font-bold mt-0.5">▪</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Stack Pills & Action Links */}
                <div className="pt-1 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 border border-black bg-neutral-50 font-mono text-[11px] text-neutral-800"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedProject(isExpanded ? null : project)
                      }
                      className="mac-interactive px-2.5 py-1 border border-black bg-white text-black font-retro text-sm hover:bg-black hover:text-white transition-none"
                    >
                      {isExpanded ? "Hide Specs ▲" : "Inspect Specs ▼"}
                    </button>

                    <a
                      href={project.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mac-interactive px-3 py-1 border border-black bg-black text-white font-retro text-sm tracking-wide hover:bg-white hover:text-black shadow-[1px_1px_0px_#000] transition-none flex items-center gap-1.5"
                    >
                      <span>{project.linkLabel}</span>
                      <span className="font-mono text-xs">↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
