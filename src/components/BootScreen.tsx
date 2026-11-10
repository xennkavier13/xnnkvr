"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BootHappyMacIcon } from "@/components/icons/PixelIcons";

interface BootScreenProps {
  onComplete: () => void;
}

const BOOT_SEQUENCE = [
  { progress: 12, stage: "ROM CHECK OK // BOOTING xnnkvr OS..." },
  { progress: 28, stage: "Loading About..." },
  { progress: 48, stage: "Loading Projects..." },
  { progress: 66, stage: "Loading Skills & Tools..." },
  { progress: 82, stage: "Loading Credentials..." },
  { progress: 94, stage: "Mounting Resume..." },
  { progress: 100, stage: "Starting Desktop Finder..." },
];

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    // Total duration ~1.75 seconds (within 1-2s requirement)
    const stepDuration = 240;
    const interval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < BOOT_SEQUENCE.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, stepDuration);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, stepDuration * BOOT_SEQUENCE.length + 140);

    return () => {
      clearInterval(interval);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const currentStage = BOOT_SEQUENCE[stepIndex];
  const totalBlocks = 20;
  const filledBlocks = Math.round((currentStage.progress / 100) * totalBlocks);

  return (
    <motion.div
      key="boot-screen"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        filter: "contrast(200%) brightness(150%)",
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white select-none overflow-hidden"
    >
      {/* Subtle CRT Scanline & Phosphor Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          background:
            "repeating-linear-gradient(to bottom, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, rgba(0,0,0,0.38) 2px, rgba(0,0,0,0.38) 4px)",
        }}
      />
      {/* Subtle radial CRT phosphor vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.65) 85%, rgba(0,0,0,0.92) 100%)",
        }}
      />
      {/* Animated horizontal CRT refresh bar */}
      <motion.div
        animate={{ y: ["-10%", "110%"] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute inset-x-0 h-16 z-20 opacity-15"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(255,255,255,0.5), transparent)",
        }}
      />

      {/* Classic Macintosh Startup Dialog Box */}
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.15 }}
        className="relative z-10 w-[92vw] max-w-[460px] border-2 border-white bg-black p-1 shadow-[4px_4px_0px_#ffffff]"
      >
        <div className="border border-white px-6 py-8 flex flex-col items-center text-center">
          {/* Top CRT Terminal header */}
          <div className="w-full flex items-center justify-between text-[11px] font-mono tracking-widest text-neutral-400 uppercase pb-4 mb-5 border-b border-neutral-800">
            <span>XNNKVR ROM // 512K</span>
            <span>CRT SYNC: 60.15Hz</span>
          </div>

          {/* Centered Happy Mac Icon */}
          <div className="my-2 p-2 border border-neutral-700 bg-black">
            <BootHappyMacIcon size={76} />
          </div>

          {/* Computer Name "xnnkvr" beneath icon */}
          <h1 className="mt-3 font-pixel text-xl sm:text-2xl tracking-wider text-white">
            xnnkvr
          </h1>

          {/* Welcome Banner */}
          <p className="mt-1 font-retro text-xl tracking-wide text-neutral-200">
            Welcome to XNNKVR
          </p>

          {/* Version String & Build/Serial Number */}
          <div className="mt-3 space-y-0.5 font-mono text-xs text-neutral-400">
            <p className="text-white font-semibold tracking-wide">
              System 1.0 — xnnkvr OS
            </p>
            <p className="text-[11px] text-neutral-400">
              BUILD 2026.11.10 // S/N: XNN-KVR-443-BSIT
            </p>
          </div>

          {/* Chunky Retro-Styled Loading Bar */}
          <div className="mt-7 w-full">
            <div className="flex items-center justify-between font-retro text-base sm:text-lg text-white mb-1.5">
              <span className="truncate">{currentStage.stage}</span>
              <span className="ml-2 font-mono text-xs text-neutral-300">
                {currentStage.progress}%
              </span>
            </div>

            {/* Chunky Pixel Blocks Container */}
            <div className="w-full border-2 border-white bg-black p-1">
              <div
                className="grid gap-0.5 h-5"
                style={{ gridTemplateColumns: "repeat(20, minmax(0, 1fr))" }}
              >
                {Array.from({ length: totalBlocks }).map((_, idx) => {
                  const isFilled = idx < filledBlocks;
                  return (
                    <div
                      key={idx}
                      className={`h-full transition-none ${
                        isFilled ? "bg-white" : "bg-neutral-900"
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Stage Log Indicator */}
            <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <span>USER: KENN XAVIER DABON</span>
              <span className="animate-pulse">● DISK I/O ACTIVE</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
