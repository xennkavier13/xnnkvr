"use client";

import React, { useEffect, useRef } from "react";

/**
 * ============================================================================
 * CRT WALLPAPER FLICKER & STATIC TUNING KNOBS
 * Adjust these values anytime to make the effect stronger or softer!
 * ============================================================================
 */
export const CRT_TUNING = {
  // 1. How often the static updates in milliseconds (lower = faster, higher = slower)
  //    Try 60–110ms (default: 80ms = ~12.5 frames per second)
  FRAME_INTERVAL_MS: 80,

  // 2. Fraction of pixels on screen that flip/flicker every frame (0.0 to 1.0)
  //    0.01 = very subtle | 0.045 = balanced CRT static | 0.12 = heavy snow
  FLICKER_DENSITY: 0.045,

  // 3. Opacity of each static pixel (0 to 255)
  //    15 = barely visible | 45 = clearly noticeable | 90 = strong high-contrast static
  PIXEL_ALPHA: 46,

  // 4. Overall CSS opacity of the static canvas layer (0.0 to 1.0)
  CANVAS_OPACITY: 0.78,

  // 5. Probability (0.0 to 1.0) of a horizontal CRT signal jitter band appearing on a frame
  SCANLINE_GLITCH_CHANCE: 0.35,

  // 6. Pixel resolution of the static buffer (smaller numbers = chunkier retro pixels)
  BUFFER_WIDTH: 260,
  BUFFER_HEIGHT: 165,
};

interface CRTWallpaperProps {
  onClickDesktop?: () => void;
}

export default function CRTWallpaper({ onClickDesktop }: CRTWallpaperProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = 0;

    const width = CRT_TUNING.BUFFER_WIDTH;
    const height = CRT_TUNING.BUFFER_HEIGHT;
    canvas.width = width;
    canvas.height = height;

    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    // Seed initial static grain across the screen
    for (let i = 0; i < data.length; i += 4) {
      const val = Math.random() < 0.5 ? 15 : 240;
      data[i] = val;
      data[i + 1] = val;
      data[i + 2] = val;
      data[i + 3] = CRT_TUNING.PIXEL_ALPHA;
    }

    const renderFrame = (timestamp: number) => {
      if (timestamp - lastTime > CRT_TUNING.FRAME_INTERVAL_MS) {
        lastTime = timestamp;

        const totalPixels = width * height;
        const updatesCount = Math.floor(
          totalPixels * CRT_TUNING.FLICKER_DENSITY
        );

        // Random pixel static flips
        for (let k = 0; k < updatesCount; k++) {
          const p = Math.floor(Math.random() * totalPixels) * 4;
          const isDark = Math.random() < 0.5;
          const val = isDark ? 10 : 245;
          data[p] = val;
          data[p + 1] = val;
          data[p + 2] = val;
          data[p + 3] = CRT_TUNING.PIXEL_ALPHA;
        }

        // Occasional horizontal CRT sync jitter band
        if (Math.random() < CRT_TUNING.SCANLINE_GLITCH_CHANCE) {
          const bandY = Math.floor(Math.random() * (height - 4));
          const bandHeight = Math.floor(Math.random() * 3) + 1;
          for (let y = bandY; y < bandY + bandHeight; y++) {
            for (let x = 0; x < width; x++) {
              if (Math.random() < 0.35) {
                const idx = (y * width + x) * 4;
                const val = Math.random() < 0.5 ? 0 : 255;
                data[idx] = val;
                data[idx + 1] = val;
                data[idx + 2] = val;
                data[idx + 3] = Math.min(255, CRT_TUNING.PIXEL_ALPHA + 24);
              }
            }
          }
        }

        ctx.putImageData(imageData, 0, 0);
      }

      animationFrameId = requestAnimationFrame(renderFrame);
    };

    animationFrameId = requestAnimationFrame(renderFrame);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div
      onClick={onClickDesktop}
      className="fixed inset-0 z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Steady Classic 1-bit Dither / Crosshatch Base Pattern */}
      <div className="absolute inset-0 mac-crosshatch-wallpaper" />

      {/* Tunable CRT Static & Signal Jitter Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{
          imageRendering: "pixelated",
          opacity: CRT_TUNING.CANVAS_OPACITY,
        }}
      />
    </div>
  );
}
