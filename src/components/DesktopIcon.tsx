"use client";

import React, { useRef } from "react";
import { WindowId } from "@/data/portfolioData";

interface DesktopIconProps {
  id: WindowId;
  label: string;
  selected: boolean;
  isOpen?: boolean;
  isMinimized?: boolean;
  onSelect: (id: WindowId, e: React.MouseEvent) => void;
  onOpen: (id: WindowId) => void;
  renderIcon: (inverted: boolean) => React.ReactNode;
}

export default function DesktopIcon({
  id,
  label,
  selected,
  isOpen = false,
  isMinimized = false,
  onSelect,
  onOpen,
  renderIcon,
}: DesktopIconProps) {
  const lastTapRef = useRef<number>(0);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(id, e);

    // Support rapid double-tap on touchscreens as well as standard double-click
    const now = Date.now();
    if (now - lastTapRef.current < 320) {
      onOpen(id);
    }
    lastTapRef.current = now;
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpen(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen(id);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${label} desktop icon. Double-click to open.`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
      className="mac-interactive group flex flex-col items-center w-28 p-1 select-none focus:outline-none"
    >
      {/* Icon Graphic Box with classic dashed/inverted selection highlight */}
      <div
        className={`relative p-1 transition-none ${
          selected
            ? "outline outline-1 outline-dashed outline-black bg-black/20"
            : ""
        }`}
      >
        {renderIcon(selected)}

        {/* Open / Minimized subtle pixel indicator */}
        {(isOpen || isMinimized) && (
          <span
            title={isMinimized ? "Window minimized" : "Window open"}
            className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 border border-black ${
              isMinimized ? "bg-white" : "bg-black"
            }`}
          />
        )}
      </div>

      {/* Label beneath in thick, high-contrast bitmap font (matching reference screenshot) */}
      <span
        className={`mt-1 px-2 py-0.5 font-retro text-sm sm:text-base font-bold leading-tight tracking-wide text-center border transition-none ${
          selected
            ? "bg-black text-white border-white outline outline-1 outline-dashed outline-black"
            : "bg-white text-black border-black shadow-[1px_1px_0px_#000000]"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
