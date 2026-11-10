"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { WindowId } from "@/data/portfolioData";

export interface WindowBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface MacWindowProps {
  id: WindowId;
  title: string;
  subtitleMeta?: string;
  isActive: boolean;
  zIndex: number;
  initialBounds: WindowBounds;
  resetTrigger: number;
  minWidth?: number;
  minHeight?: number;
  onFocus: (id: WindowId) => void;
  onClose: (id: WindowId) => void;
  onMinimize: (id: WindowId) => void;
  children: React.ReactNode;
}

export default function MacWindow({
  id,
  title,
  subtitleMeta = "5 items • 412K in disk • 100K available",
  isActive,
  zIndex,
  initialBounds,
  resetTrigger,
  minWidth = 360,
  minHeight = 280,
  onFocus,
  onClose,
  onMinimize,
  children,
}: MacWindowProps) {
  // Initialize bounds once on mount; preserve dragged/resized state across all re-renders
  const [bounds, setBounds] = useState<WindowBounds>(() => initialBounds);
  const [isMaximized, setIsMaximized] = useState(false);

  const boundsRef = useRef<WindowBounds>(bounds);
  boundsRef.current = bounds;

  const preMaxBoundsRef = useRef<WindowBounds>(initialBounds);
  const lastResetRef = useRef<number>(resetTrigger);

  // Only reset bounds when the user explicitly clicks "Special > Clean Up Desktop"
  useEffect(() => {
    if (lastResetRef.current !== resetTrigger) {
      lastResetRef.current = resetTrigger;
      setBounds(initialBounds);
      setIsMaximized(false);
    }
  }, [resetTrigger, initialBounds]);

  // Dragging via Title Bar
  const handleTitleBarPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button")) return;
    e.preventDefault();
    e.stopPropagation();
    onFocus(id);

    if (isMaximized) return;

    const startX = e.clientX;
    const startY = e.clientY;
    const origX = boundsRef.current.x;
    const origY = boundsRef.current.y;
    const currWidth = boundsRef.current.width;

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      const maxX = Math.max(0, window.innerWidth - 100);
      const maxY = Math.max(36, window.innerHeight - 56);

      const nextX = Math.min(Math.max(-currWidth + 140, origX + dx), maxX);
      const nextY = Math.min(Math.max(34, origY + dy), maxY);

      setBounds((prev) => ({
        ...prev,
        x: nextX,
        y: nextY,
      }));
    };

    const handlePointerUp = () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  // Resizing via Bottom-Right Grow Box, Right Edge, or Bottom Edge
  const startResize = (
    e: React.PointerEvent<HTMLDivElement>,
    direction: "br" | "r" | "b"
  ) => {
    e.preventDefault();
    e.stopPropagation();
    onFocus(id);

    if (isMaximized) setIsMaximized(false);

    const startX = e.clientX;
    const startY = e.clientY;
    const origWidth = boundsRef.current.width;
    const origHeight = boundsRef.current.height;
    const origX = boundsRef.current.x;
    const origY = boundsRef.current.y;

    const effectiveMinWidth = Math.min(minWidth, window.innerWidth - 24);
    const effectiveMinHeight = Math.min(minHeight, window.innerHeight - 64);

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      const maxW = Math.max(effectiveMinWidth, window.innerWidth - origX - 10);
      const maxH = Math.max(effectiveMinHeight, window.innerHeight - origY - 10);

      setBounds((prev) => ({
        ...prev,
        width:
          direction === "br" || direction === "r"
            ? Math.min(Math.max(effectiveMinWidth, origWidth + dx), maxW)
            : prev.width,
        height:
          direction === "br" || direction === "b"
            ? Math.min(Math.max(effectiveMinHeight, origHeight + dy), maxH)
            : prev.height,
      }));
    };

    const handlePointerUp = () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  const handleToggleZoom = () => {
    onFocus(id);
    if (!isMaximized) {
      preMaxBoundsRef.current = boundsRef.current;
      const pad = 16;
      const rightIconsReserve = window.innerWidth > 768 ? 132 : 16;
      setBounds({
        x: pad,
        y: 42,
        width: Math.max(minWidth, window.innerWidth - pad - rightIconsReserve),
        height: Math.max(minHeight, window.innerHeight - 64),
      });
      setIsMaximized(true);
    } else {
      setBounds(preMaxBoundsRef.current);
      setIsMaximized(false);
    }
  };

  return (
    <motion.section
      aria-label={`${title} window`}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.12 } }}
      transition={{ duration: 0.14, ease: "easeOut" }}
      onPointerDown={() => {
        if (!isActive) onFocus(id);
      }}
      style={{
        left: bounds.x,
        top: bounds.y,
        width: bounds.width,
        height: bounds.height,
        zIndex,
      }}
      className={`fixed flex flex-col bg-white border-2 border-black select-none ${
        isActive ? "shadow-mac-lg" : "shadow-mac"
      }`}
    >
      {/* CLASSIC MAC OS SYSTEM 1-6 TITLE BAR */}
      <div
        onPointerDown={handleTitleBarPointerDown}
        onDoubleClick={handleToggleZoom}
        className="relative h-8 border-b-2 border-black bg-white flex items-center justify-between px-2 cursor-move shrink-0"
      >
        {/* Horizontal Striped Lines when Focused (Active), Plain when Inactive */}
        {isActive && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-1.5 top-1.5 bottom-1.5 mac-titlebar-stripes"
          />
        )}

        {/* Left Side: Classic Decorative System Handle Square (like in reference screenshot) */}
        <div className="relative z-10 flex items-center bg-white px-1">
          <div className="w-3.5 h-3.5 border border-black bg-white flex items-center justify-center">
            <div className="w-1.5 h-1.5 border border-black bg-white" />
          </div>
        </div>

        {/* Center: Section Title in Thick Bold Retro Font */}
        <div className="relative z-10 bg-white px-3 py-0.5 max-w-[60%] truncate">
          <h2
            className={`font-retro text-base sm:text-lg leading-none tracking-wide font-bold truncate ${
              isActive ? "text-black" : "text-neutral-500"
            }`}
          >
            {title}
          </h2>
        </div>

        {/* Right Side: Minimize Button, Zoom Button, and Close Button grouped together */}
        <div className="relative z-10 flex items-center gap-1.5 bg-white px-1">
          {/* Minimize to Desktop Button */}
          <button
            type="button"
            aria-label={`Minimize ${title}`}
            title="Minimize to Desktop"
            onClick={(e) => {
              e.stopPropagation();
              onMinimize(id);
            }}
            className="mac-interactive w-4 h-4 border border-black bg-white hover:bg-black group flex items-center justify-center transition-none"
          >
            <span className="w-2 h-[2px] bg-black group-hover:bg-white translate-y-[1px]" />
          </button>

          {/* Zoom / Expand Button */}
          <button
            type="button"
            aria-label={`Zoom ${title}`}
            title="Zoom / Expand Window"
            onClick={(e) => {
              e.stopPropagation();
              handleToggleZoom();
            }}
            className="mac-interactive w-4 h-4 border border-black bg-white hover:bg-black group relative transition-none"
          >
            <span className="absolute top-0 left-0 w-2 h-2 border-r border-b border-black group-hover:border-white" />
          </button>

          {/* Classic Close Box (moved to the right side next to Minimize) */}
          <button
            type="button"
            aria-label={`Close ${title}`}
            title="Close Window"
            onClick={(e) => {
              e.stopPropagation();
              onClose(id);
            }}
            className="mac-interactive w-4 h-4 border border-black bg-white hover:bg-black active:bg-black flex items-center justify-center group transition-none font-mono text-[10px] font-bold leading-none text-black hover:text-white"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Classic Finder Sub-Header Metadata Bar */}
      <div className="h-6 border-b border-black bg-white px-3 flex items-center justify-between font-retro text-xs sm:text-sm font-bold text-neutral-800 shrink-0 relative">
        <span className="truncate">{subtitleMeta}</span>
        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-black">
          {isActive ? "● ACTIVE" : "IDLE"}
        </span>
        <div className="pointer-events-none absolute inset-x-0 bottom-[2px] border-b border-black" />
      </div>

      {/* Main Window Content Area (Readable Thicker Typography inside, Retro Scrollbar) */}
      <div className="relative flex-1 overflow-y-auto overflow-x-hidden bg-white text-black font-sans font-medium mac-scrollbar select-text">
        {children}
      </div>

      {/* Classic Mac OS Bottom Status Bar + Overlapping-Squares Resize Handle */}
      <div className="h-5 border-t border-black bg-neutral-100 flex items-center justify-between pl-2.5 pr-0 shrink-0">
        <div className="flex items-center gap-2 font-mono text-[11px] font-semibold text-neutral-800 truncate">
          <span>xnnkvr://desktop/{id}</span>
          <span>•</span>
          <span>
            {Math.round(bounds.width)}×{Math.round(bounds.height)}px
          </span>
        </div>

        {/* Classic Mac Grow Box (Bottom-Right Resize Handle) */}
        <div
          onPointerDown={(e) => startResize(e, "br")}
          title="Drag to resize window"
          className="w-5 h-5 border-l border-black bg-white flex items-center justify-center cursor-nwse-resize relative shrink-0 hover:bg-neutral-200"
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 10 10"
            fill="none"
            shapeRendering="crispEdges"
          >
            <rect x="1" y="1" width="5" height="5" fill="white" stroke="black" strokeWidth="1" />
            <rect x="3" y="3" width="6" height="6" fill="white" stroke="black" strokeWidth="1" />
          </svg>
        </div>
      </div>

      {/* Invisible Right & Bottom Edge Resize Strips for effortless resizing */}
      <div
        onPointerDown={(e) => startResize(e, "r")}
        className="absolute top-8 bottom-5 -right-1.5 w-2.5 cursor-ew-resize"
      />
      <div
        onPointerDown={(e) => startResize(e, "b")}
        className="absolute left-0 right-5 -bottom-1.5 h-2.5 cursor-ns-resize"
      />
    </motion.section>
  );
}
