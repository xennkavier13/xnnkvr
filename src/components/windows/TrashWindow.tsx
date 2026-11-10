"use client";

import React, { useState } from "react";
import { TrashCanIcon } from "@/components/icons/PixelIcons";

const TRASH_FILES = [
  {
    name: "unreleased_rnb_beat_v14_FINAL_REAL.flp",
    type: "FL Studio Project",
    size: "42 KB",
    note: "Needs 808 tuning before export.",
  },
  {
    name: "null_pointer_exception_2024.log",
    type: "Java Crash Dump",
    size: "4 KB",
    note: "Squashed during Mimala combat state refactor.",
  },
  {
    name: "sleep_schedule_capstone_semester.sys",
    type: "System Resource",
    size: "0 KB",
    note: "Replaced by Ariadne SAST sprint milestones.",
  },
  {
    name: "missing_semicolon_in_c.obj",
    type: "C Object File",
    size: "2 KB",
    note: "Found on line 247 after 40 minutes.",
  },
];

export default function TrashWindow() {
  const [emptied, setEmptied] = useState(false);

  return (
    <div className="p-5 sm:p-6 space-y-5">
      <div className="flex items-center justify-between border-b border-black pb-4">
        <div className="flex items-center gap-3">
          <div className="border border-black bg-neutral-50 p-1.5 shadow-[1px_1px_0px_#000]">
            <TrashCanIcon size={32} />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight text-black">
              System Trash
            </h2>
            <p className="text-xs text-neutral-600 font-mono">
              {emptied ? "0 items • Trash is empty" : "4 discarded artifacts"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setEmptied((prev) => !prev)}
          className="mac-interactive px-3 py-1 border border-black bg-white text-black font-retro text-sm hover:bg-black hover:text-white shadow-[1px_1px_0px_#000] transition-none"
        >
          {emptied ? "Restore Artifacts" : "Empty Trash"}
        </button>
      </div>

      {emptied ? (
        <div className="border border-black border-dashed p-8 text-center space-y-2">
          <p className="font-retro text-xl text-black">
            The Trash is completely clean.
          </p>
          <p className="text-xs text-neutral-600 font-mono">
            48 KB of classic Macintosh memory reclaimed.
          </p>
        </div>
      ) : (
        <div className="border border-black bg-white shadow-mac divide-y divide-black">
          {TRASH_FILES.map((item) => (
            <div
              key={item.name}
              className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-neutral-50"
            >
              <div>
                <p className="font-mono text-xs font-bold text-black">
                  {item.name}
                </p>
                <p className="text-xs text-neutral-600 mt-0.5">{item.note}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0 font-mono text-[11px]">
                <span className="px-2 py-0.5 border border-black bg-neutral-100">
                  {item.type}
                </span>
                <span className="text-neutral-500 w-12 text-right">
                  {item.size}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
