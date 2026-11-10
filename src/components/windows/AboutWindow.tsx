"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { PORTFOLIO_DATA, WindowId } from "@/data/portfolioData";
import { HappyMacIcon, MusicNotePixelIcon } from "@/components/icons/PixelIcons";

interface AboutWindowProps {
  onOpenWindow: (id: WindowId) => void;
}

type DrumChannelId = "kick" | "snare" | "hihat" | "synth";

interface DrumChannel {
  id: DrumChannelId;
  label: string;
  code: string;
}

const DRUM_CHANNELS: DrumChannel[] = [
  { id: "kick", label: "808 KICK", code: "CH01" },
  { id: "snare", label: "SNARE", code: "CH02" },
  { id: "hihat", label: "HI-HAT", code: "CH03" },
  { id: "synth", label: "R&B SYNTH", code: "CH04" },
];

const NUM_STEPS = 8;

// Default Hip-Hop / R&B starter groove
const INITIAL_PATTERN: Record<DrumChannelId, boolean[]> = {
  kick: [true, false, false, true, false, true, false, false],
  snare: [false, false, true, false, false, false, true, false],
  hihat: [true, true, true, true, true, true, true, true],
  synth: [true, false, false, true, false, false, true, true],
};

// Pentatonic R&B / Indie frequencies per step for the Synth channel
const SYNTH_STEP_NOTES = [
  261.63, // C4
  311.13, // Eb4
  349.23, // F4
  392.0,  // G4
  466.16, // Bb4
  392.0,  // G4
  349.23, // F4
  523.25, // C5
];

export default function AboutWindow({ onOpenWindow }: AboutWindowProps) {
  const { owner } = PORTFOLIO_DATA;

  const [pattern, setPattern] =
    useState<Record<DrumChannelId, boolean[]>>(INITIAL_PATTERN);
  const [isPlayingBeat, setIsPlayingBeat] = useState(false);
  const [activeBeatStep, setActiveBeatStep] = useState<number>(0);
  const [bpm, setBpm] = useState<number>(110);

  const patternRef = useRef<Record<DrumChannelId, boolean[]>>(pattern);
  patternRef.current = pattern;

  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const getAudioContext = useCallback((): AudioContext | null => {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!audioCtxRef.current && AudioContextClass) {
      audioCtxRef.current = new AudioContextClass();
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  // Synthesize each drum/synth sound using Web Audio API
  const triggerChannelSound = useCallback(
    (channelId: DrumChannelId, stepIdx: number = 0) => {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      if (channelId === "kick") {
        // Punchy 808 Sub Kick
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(145, now);
        osc.frequency.exponentialRampToValueAtTime(36, now + 0.14);

        gain.gain.setValueAtTime(0.42, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.19);
      } else if (channelId === "snare") {
        // Crisp Snare (Noise burst + body snap)
        const bufferSize = Math.floor(ctx.sampleRate * 0.12);
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;

        const filter = ctx.createBiquadFilter();
        filter.type = "highpass";
        filter.frequency.setValueAtTime(900, now);

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.22, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.005, now + 0.12);

        whiteNoise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        whiteNoise.start(now);
        whiteNoise.stop(now + 0.12);

        // Snare tonal body
        const bodyOsc = ctx.createOscillator();
        const bodyGain = ctx.createGain();
        bodyOsc.type = "triangle";
        bodyOsc.frequency.setValueAtTime(185, now);
        bodyOsc.frequency.exponentialRampToValueAtTime(75, now + 0.06);

        bodyGain.gain.setValueAtTime(0.2, now);
        bodyGain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

        bodyOsc.connect(bodyGain);
        bodyGain.connect(ctx.destination);
        bodyOsc.start(now);
        bodyOsc.stop(now + 0.08);
      } else if (channelId === "hihat") {
        // Metallic Closed Hi-Hat
        const bufferSize = Math.floor(ctx.sampleRate * 0.05);
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;

        const filter = ctx.createBiquadFilter();
        filter.type = "highpass";
        filter.frequency.setValueAtTime(6500, now);

        const hatGain = ctx.createGain();
        hatGain.gain.setValueAtTime(0.14, now);
        hatGain.gain.exponentialRampToValueAtTime(0.002, now + 0.045);

        whiteNoise.connect(filter);
        filter.connect(hatGain);
        hatGain.connect(ctx.destination);
        whiteNoise.start(now);
        whiteNoise.stop(now + 0.05);
      } else if (channelId === "synth") {
        // Warm R&B / Chiptune Synth Pluck
        const freq = SYNTH_STEP_NOTES[stepIdx % SYNTH_STEP_NOTES.length];
        const osc = ctx.createOscillator();
        const subOsc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "square";
        subOsc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now);
        subOsc.frequency.setValueAtTime(freq * 0.5, now);

        gain.gain.setValueAtTime(0.055, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

        osc.connect(gain);
        subOsc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        subOsc.start(now);
        osc.stop(now + 0.23);
        subOsc.stop(now + 0.23);
      }
    },
    [getAudioContext]
  );

  // Toggle an individual step pad in the sequencer grid
  const handleToggleStep = (channelId: DrumChannelId, stepIdx: number) => {
    setPattern((prev) => {
      const nextRow = [...prev[channelId]];
      const willEnable = !nextRow[stepIdx];
      nextRow[stepIdx] = willEnable;

      // Audition the sound immediately when enabling a step while paused
      if (willEnable && !isPlayingBeat) {
        triggerChannelSound(channelId, stepIdx);
      }

      return {
        ...prev,
        [channelId]: nextRow,
      };
    });
  };

  // Generate a random musical beat pattern
  const handleRandomizePattern = () => {
    const nextPattern: Record<DrumChannelId, boolean[]> = {
      kick: Array.from({ length: NUM_STEPS }, (_, i) =>
        i === 0 ? true : Math.random() < 0.38
      ),
      snare: Array.from({ length: NUM_STEPS }, (_, i) =>
        i === 2 || i === 6 ? true : Math.random() < 0.2
      ),
      hihat: Array.from({ length: NUM_STEPS }, () => Math.random() < 0.72),
      synth: Array.from({ length: NUM_STEPS }, () => Math.random() < 0.45),
    };
    setPattern(nextPattern);
    if (!isPlayingBeat) {
      triggerChannelSound("synth", Math.floor(Math.random() * NUM_STEPS));
    }
  };

  // Clear all steps
  const handleClearPattern = () => {
    setPattern({
      kick: Array(NUM_STEPS).fill(false),
      snare: Array(NUM_STEPS).fill(false),
      hihat: Array(NUM_STEPS).fill(false),
      synth: Array(NUM_STEPS).fill(false),
    });
  };

  // Main Sequencer Clock Loop
  useEffect(() => {
    if (!isPlayingBeat) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setActiveBeatStep(0);
      return;
    }

    // 8th-note step duration in ms from BPM
    const stepMs = Math.round((60 / bpm / 2) * 1000);
    let currentStep = 0;

    const runStep = () => {
      const livePattern = patternRef.current;
      (Object.keys(livePattern) as DrumChannelId[]).forEach((chId) => {
        if (livePattern[chId][currentStep]) {
          triggerChannelSound(chId, currentStep);
        }
      });
      setActiveBeatStep(currentStep);
      currentStep = (currentStep + 1) % NUM_STEPS;
    };

    // Play step 0 immediately on Play press
    runStep();
    intervalRef.current = setInterval(runStep, stepMs);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlayingBeat, bpm, triggerChannelSound]);

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

      {/* Interactive FL Studio Channel Rack / Drum Machine Sequencer Emulator */}
      <div className="border-2 border-black bg-white p-4 shadow-mac space-y-3.5">
        {/* Top Sequencer Transport Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b-2 border-black">
          <div className="flex items-center gap-2">
            <div className="border border-black bg-neutral-100 p-1.5">
              <MusicNotePixelIcon size={16} />
            </div>
            <div>
              <p className="font-retro text-sm sm:text-base leading-none font-bold">
                FL_CHANNEL_RACK.EXE — Mini Drum &amp; Synth Sequencer
              </p>
              <p className="font-mono text-[10px] font-semibold text-neutral-600 mt-0.5">
                Click pads to toggle beats • Click channel names to preview sound
              </p>
            </div>
          </div>

          {/* Transport Controls: Play/Stop, Randomize, Clear, BPM */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setIsPlayingBeat((prev) => !prev)}
              className={`mac-interactive px-3 py-1 border-2 border-black font-retro font-bold text-xs sm:text-sm tracking-wide transition-none ${
                isPlayingBeat
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-black hover:text-white shadow-[1px_1px_0px_#000]"
              }`}
            >
              {isPlayingBeat ? "■ STOP" : "▶ PLAY"}
            </button>

            <button
              type="button"
              onClick={handleRandomizePattern}
              title="Generate a random drum & synth beat"
              className="mac-interactive px-2.5 py-1 border border-black bg-neutral-100 text-black font-retro font-bold text-xs sm:text-sm hover:bg-black hover:text-white transition-none"
            >
              RNDM
            </button>

            <button
              type="button"
              onClick={handleClearPattern}
              title="Clear all steps"
              className="mac-interactive px-2.5 py-1 border border-black bg-white text-black font-retro font-bold text-xs sm:text-sm hover:bg-black hover:text-white transition-none"
            >
              CLR
            </button>

            <button
              type="button"
              onClick={() =>
                setBpm((prev) => (prev === 95 ? 110 : prev === 110 ? 128 : 95))
              }
              title="Click to cycle Tempo (BPM)"
              className="mac-interactive px-2 py-1 border border-black bg-neutral-50 font-mono text-[11px] font-bold hover:bg-black hover:text-white transition-none"
            >
              {bpm} BPM
            </button>
          </div>
        </div>

        {/* Multi-Track Channel Rack Grid (4 Channels x 8 Steps) */}
        <div className="space-y-2">
          {/* Step Numbers Header */}
          <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] items-center gap-2">
            <span className="font-mono text-[10px] font-bold uppercase text-neutral-500 pl-1">
              CHANNEL
            </span>
            <div className="grid grid-cols-8 gap-1.5">
              {Array.from({ length: NUM_STEPS }).map((_, stepIdx) => {
                const isPlayhead = isPlayingBeat && activeBeatStep === stepIdx;
                return (
                  <div
                    key={stepIdx}
                    className={`h-4 flex items-center justify-center font-mono text-[10px] font-bold border ${
                      isPlayhead
                        ? "bg-black text-white border-black"
                        : "bg-neutral-100 text-neutral-600 border-neutral-400"
                    }`}
                  >
                    0{stepIdx + 1}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4 Instrument Rows */}
          {DRUM_CHANNELS.map((channel) => {
            const rowSteps = pattern[channel.id];
            return (
              <div
                key={channel.id}
                className="grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] items-center gap-2"
              >
                {/* Clickable Channel Label Button (Auditions Sound) */}
                <button
                  type="button"
                  onClick={() => triggerChannelSound(channel.id, 0)}
                  title={`Click to test ${channel.label}`}
                  className="mac-interactive h-8 px-2 border border-black bg-neutral-100 hover:bg-black hover:text-white flex items-center justify-between text-left transition-none shadow-[1px_1px_0px_#000]"
                >
                  <span className="font-mono text-[11px] font-bold truncate">
                    {channel.label}
                  </span>
                  <span className="hidden sm:inline-block font-mono text-[9px] opacity-60">
                    ♪
                  </span>
                </button>

                {/* 8 Step Pads for this Channel */}
                <div className="grid grid-cols-8 gap-1.5">
                  {rowSteps.map((isEnabled, stepIdx) => {
                    const isCurrentPlayhead =
                      isPlayingBeat && activeBeatStep === stepIdx;
                    const isSecondBar = stepIdx >= 4;

                    return (
                      <button
                        key={stepIdx}
                        type="button"
                        aria-label={`${channel.label} step ${stepIdx + 1} ${
                          isEnabled ? "enabled" : "disabled"
                        }`}
                        onClick={() => handleToggleStep(channel.id, stepIdx)}
                        className={`mac-interactive h-8 border border-black flex items-center justify-center transition-none relative ${
                          isEnabled
                            ? isCurrentPlayhead
                              ? "bg-white text-black border-2 border-black shadow-[inset_0_0_0_2px_#000]"
                              : "bg-black text-white shadow-[1px_1px_0px_#000]"
                            : isCurrentPlayhead
                            ? "bg-neutral-300 text-black border-2 border-black"
                            : isSecondBar
                            ? "bg-neutral-100 text-neutral-400 hover:bg-neutral-200"
                            : "bg-white text-neutral-400 hover:bg-neutral-100"
                        }`}
                      >
                        <span
                          className={`w-2 h-2 ${
                            isEnabled
                              ? isCurrentPlayhead
                                ? "bg-black"
                                : "bg-white"
                              : "border border-neutral-400"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
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
