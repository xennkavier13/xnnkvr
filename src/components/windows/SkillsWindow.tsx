"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { SystemSuitcaseIcon } from "@/components/icons/PixelIcons";

export default function SkillsWindow() {
  const { skills, owner } = PORTFOLIO_DATA;

  return (
    <div className="p-5 sm:p-6 space-y-6">
      {/* Header Banner */}
      <div className="flex items-center justify-between border-b border-black pb-4">
        <div className="flex items-center gap-3">
          <div className="border border-black bg-neutral-50 p-1.5 shadow-[1px_1px_0px_#000]">
            <SystemSuitcaseIcon size={32} />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight text-black">
              System Extensions &amp; Technical Stack
            </h2>
            <p className="text-xs text-neutral-600 font-mono">
              Languages, Frameworks, Libraries, &amp; Engineering Tooling
            </p>
          </div>
        </div>

        <span className="hidden sm:inline-block px-2 py-0.5 border border-black bg-black text-white font-mono text-[10px]">
          SYS_DRIVERS: OK
        </span>
      </div>

      {/* 1. Programming Languages */}
      <section className="border border-black bg-white shadow-mac">
        <div className="border-b border-black bg-neutral-100 px-3.5 py-2 flex items-center justify-between">
          <h3 className="font-retro text-lg tracking-wide uppercase font-bold">
            01 // Programming Languages (8)
          </h3>
          <span className="font-mono text-[10px] text-neutral-600">
            /usr/bin/lang
          </span>
        </div>
        <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {skills.languages.map((lang) => (
            <div
              key={lang.name}
              className="border border-black bg-neutral-50 p-2.5 flex flex-col justify-between hover:bg-black hover:text-white group transition-none"
            >
              <span className="font-bold text-sm">{lang.name}</span>
              <span className="mt-1 font-mono text-[10px] text-neutral-500 group-hover:text-neutral-300">
                {lang.tag}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Frameworks & Libraries */}
      <section className="border border-black bg-white shadow-mac">
        <div className="border-b border-black bg-neutral-100 px-3.5 py-2 flex items-center justify-between">
          <h3 className="font-retro text-lg tracking-wide uppercase font-bold">
            02 // Frameworks &amp; Libraries (5)
          </h3>
          <span className="font-mono text-[10px] text-neutral-600">
            /sys/frameworks
          </span>
        </div>
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {skills.frameworks.map((fw) => (
            <div
              key={fw.name}
              className="border border-black bg-white p-3 flex items-start justify-between gap-2 shadow-[1px_1px_0px_#000]"
            >
              <div>
                <p className="font-bold text-sm text-black">{fw.name}</p>
                <p className="text-xs text-neutral-600 mt-0.5">{fw.detail}</p>
              </div>
              <span className="px-1.5 py-0.5 bg-black text-white font-mono text-[10px] shrink-0">
                READY
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Tools & Platforms */}
      <section className="border border-black bg-white shadow-mac">
        <div className="border-b border-black bg-neutral-100 px-3.5 py-2 flex items-center justify-between">
          <h3 className="font-retro text-lg tracking-wide uppercase font-bold">
            03 // Developer Tools &amp; Workflow
          </h3>
          <span className="font-mono text-[10px] text-neutral-600">
            /opt/tools
          </span>
        </div>
        <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {skills.tools.map((tool) => (
            <div
              key={tool.name}
              className="border border-black bg-neutral-50 px-3 py-2 flex items-center justify-between"
            >
              <div>
                <p className="font-bold text-sm text-black">{tool.name}</p>
                <p className="font-mono text-[10px] text-neutral-600">
                  {tool.category}
                </p>
              </div>
              <span className="font-mono text-xs font-bold">■</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Methodologies & Core Disciplines */}
      <section className="border border-black bg-neutral-50 p-4">
        <div className="flex items-center justify-between border-b border-black pb-2 mb-3">
          <h3 className="font-retro text-lg tracking-wide uppercase font-bold">
            04 // Engineering Practices &amp; Methodologies
          </h3>
          <span className="font-mono text-[10px] text-neutral-600">
            ARCH.SPEC
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {owner.coreCompetencies.map((item) => (
            <span
              key={item}
              className="px-2.5 py-1 border border-black bg-white font-mono text-xs font-medium shadow-[1px_1px_0px_#000]"
            >
              {item}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
