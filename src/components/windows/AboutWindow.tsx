"use client";

import React, { useEffect, useRef, useState } from "react";
import { PORTFOLIO_DATA, WindowId } from "@/data/portfolioData";
import { HappyMacIcon, MusicNotePixelIcon } from "@/components/icons/PixelIcons";

interface AboutWindowProps {
  onOpenWindow: (id: WindowId) => void;
}

export default function AboutWindow({ onOpenWindow }: AboutWindowProps) {
  const { owner } = PORTFOLIO_DATA;
  const [isPlayingBeat, setIsPlayingBeat] = useState(false);
  const [activeBeatStep, setActiveBeatStep] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Interactive 1-bit FL Studio Step Sequencer using Web Audio API
  useEffect(() => {
    if (!isPlayingBeat) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setActiveBeatStep(0);
      return;
    }

    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!audioCtxRef.current && AudioContextClass) {
      audioCtxRef.current = new AudioContextClass();
    }

    // Chill R&B / Indie pentatonic progression in Hz
    const melodyNotes = [
      261.63, 329.63, 392.0, 493.88, 392.0, 329.63, 293.66, 349.23,
    ];
    let step = 0;

    intervalRef.current = setInterval(() => {
      const ctx = audioCtxRef.current;
      if (ctx && ctx.state === "suspended") {
        ctx.resume();
      }
      if (ctx) {
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = step % 2 === 0 ? "triangle" : "square";
        osc.frequency.setValueAtTime(
          melodyNotes[step % melodyNotes.length],
          now
        );

        gain.gain.setValueAtTime(0.035, now);
        gain.gain.exponentialRampToValueAtTime(0.0008, now + 0.22);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.24);
      }

      setActiveBeatStep(step % 8);
      step++;
    }, 260);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlayingBeat]);

  return (
    <div className="p-5 sm:p-6 space-y-6">
      {/* Hero Identity Card */}
      <div className="border border-black bg-neutral-50 p-4 shadow-mac flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Pixel Art Macintosh Badge */}
          <div className="border border-black bg-white p-2 shadow-[2px_2px_0px_#000] shrink-0">
            <HappyMacIcon size={56} />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-1.5 py-0.5 bg-black text-white font-mono text-[10px] font-bold uppercase tracking-widest">
                @{owner.handle}
              </span>
              <span className="px-1.5 py-0.5 border border-black bg-white font-mono text-[10px] font-bold">
                GPA: {owner.gpa}
              </span>
            </div>
            <h1 className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-black">
              {owner.name}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-700 font-medium">
              {owner.degree} • Frontend, Backend &amp; Project Management
            </p>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="border border-black bg-white px-3 py-1.5 font-mono text-xs font-bold flex items-center gap-2 self-start sm:self-center">
          <span className="w-2 h-2 bg-black inline-block animate-pulse" />
          <span>OPEN TO OPPORTUNITIES</span>
        </div>
      </div>

      {/* Primary Role Pills */}
      <div className="flex flex-wrap gap-1.5">
        {owner.primaryRoles.map((role) => (
          <span
            key={role}
            className="px-2.5 py-1 border border-black bg-white font-mono text-xs font-bold shadow-[1px_1px_0px_#000]"
          >
            {role}
          </span>
        ))}
      </div>

      {/* Short, Crisp Bio Paragraphs */}
      <div className="grid grid-cols-1 gap-4">
        {owner.aboutParagraphs.map((section, idx) => (
          <div
            key={section.heading}
            className="border border-black bg-white p-4 relative"
          >
            <div className="flex items-center justify-between border-b border-black pb-2 mb-2.5">
              <span className="font-retro text-base sm:text-lg tracking-wide uppercase font-bold">
                0{idx + 1} // {section.heading}
              </span>
              <span className="font-mono text-[10px] font-bold text-neutral-500">
                SECT_0{idx + 1}.TXT
              </span>
            </div>
            <p className="text-sm leading-relaxed text-neutral-800">
              {section.body}
            </p>
          </div>
        ))}
      </div>

      {/* Engineering Experience & Core Competencies */}
      <div className="border border-black bg-neutral-50 p-4">
        <div className="flex items-center justify-between border-b border-black pb-2 mb-3">
          <h3 className="font-retro text-base sm:text-lg uppercase tracking-wide font-bold">
            Core Engineering &amp; Stack Experience
          </h3>
          <span className="font-mono text-[10px] font-bold text-neutral-500">
            SYS.CAPABILITIES
          </span>
        </div>

        <p className="text-sm text-neutral-800 leading-relaxed mb-3">
          Experienced across{" "}
          <strong className="font-semibold text-black">
            Java, TypeScript &amp; React, Next.js, C, Python, and Spring Boot
          </strong>
          , with a strong foundation in{" "}
          <strong className="font-semibold text-black">
            Software Design, Object-Oriented Programming (OOP), and Agile workflows
          </strong>
          . Proven track record in shipping full-stack applications, collaborating
          in cross-functional teams, executing QA test suites, and leading project delivery.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {owner.coreCompetencies.map((comp) => (
            <div
              key={comp}
              className="flex items-center gap-2 border border-black bg-white px-2.5 py-1.5 text-xs font-medium"
            >
              <span className="font-mono text-xs font-bold">■</span>
              <span>{comp}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive FL Studio 1-Bit Mini Sequencer Card */}
      <div className="border border-black bg-white p-3.5 shadow-mac">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-black">
          <div className="flex items-center gap-2">
            <MusicNotePixelIcon size={16} />
            <div>
              <p className="font-retro text-sm sm:text-base leading-none font-bold">
                FL_STUDIO_1BIT.FLP — Hip-Hop / R&amp;B / Indie Loop
              </p>
              <p className="font-mono text-[10px] text-neutral-500 mt-0.5">
                Interactive Chiptune Pattern Preview
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsPlayingBeat((prev) => !prev)}
            className={`mac-interactive px-3 py-1 border border-black font-retro font-bold text-sm tracking-wide transition-none ${
              isPlayingBeat
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-black hover:text-white shadow-[1px_1px_0px_#000]"
            }`}
          >
            {isPlayingBeat ? "■ STOP LOOP" : "▶ PLAY BEAT"}
          </button>
        </div>

        {/* 8-Step Sequencer Grid */}
        <div className="mt-3 grid grid-cols-8 gap-1.5">
          {Array.from({ length: 8 }).map((_, idx) => {
            const active = isPlayingBeat && activeBeatStep === idx;
            return (
              <div
                key={idx}
                className={`h-6 border border-black flex items-center justify-center font-mono text-[10px] ${
                  active
                    ? "bg-black text-white font-bold"
                    : idx % 2 === 0
                    ? "bg-neutral-200 text-neutral-700"
                    : "bg-white text-neutral-500"
                }`}
              >
                0{idx + 1}
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Navigation Bar to Other Windows */}
      <div className="pt-1 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => onOpenWindow("projects")}
          className="mac-interactive px-3.5 py-1.5 border border-black bg-black text-white font-retro font-bold text-sm sm:text-base tracking-wide hover:bg-white hover:text-black shadow-mac transition-none"
        >
          Open Projects (5) ↗
        </button>
        <button
          type="button"
          onClick={() => onOpenWindow("skills")}
          className="mac-interactive px-3.5 py-1.5 border border-black bg-white text-black font-retro font-bold text-sm sm:text-base tracking-wide hover:bg-black hover:text-white shadow-mac transition-none"
        >
          View Tech Stack
        </button>
        <button
          type="button"
          onClick={() => onOpenWindow("credentials")}
          className="mac-interactive px-3.5 py-1.5 border border-black bg-white text-black font-retro font-bold text-sm sm:text-base tracking-wide hover:bg-black hover:text-white shadow-mac transition-none"
        >
          View Credentials (4)
        </button>
        <button
          type="button"
          onClick={() => onOpenWindow("resume")}
          className="mac-interactive px-3.5 py-1.5 border border-black bg-white text-black font-retro font-bold text-sm sm:text-base tracking-wide hover:bg-black hover:text-white shadow-mac transition-none"
        >
          Open Resume.pdf
        </button>
      </div>
    </div>
  );
}
