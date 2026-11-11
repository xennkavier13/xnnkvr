"use client";

import React, { useState } from "react";

interface CRTImageProps {
  src?: string;
  images?: string[];
  alt: string;
  caption?: string;
  className?: string;
  aspectRatio?: "video" | "auto" | "certificate";
}

/**
 * Reusable CRT Image & Carousel Wrapper.
 * Displays full, uncropped images in full color by default while layering
 * horizontal CRT phosphor scanlines, subtle dot-matrix texture, and CRT vignette on top.
 * Automatically renders Prev/Next carousel controls when multiple images are provided.
 */
export default function CRTImage({
  src,
  images,
  alt,
  caption,
  className = "",
}: CRTImageProps) {
  const imageList =
    images && images.length > 0 ? images : src ? [src] : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [monochromeMode, setMonochromeMode] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [errorMap, setErrorMap] = useState<Record<number, boolean>>({});

  if (imageList.length === 0) return null;

  const totalSlides = imageList.length;
  const hasMultiple = totalSlides > 1;
  const safeIndex = currentIndex % totalSlides;
  const currentSrc = imageList[safeIndex];
  const hasError = !!errorMap[safeIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  return (
    <>
      <figure
        className={`border-2 border-black bg-neutral-100 shadow-mac overflow-hidden ${className}`}
      >
        {/* Mini MacPaint Image Header Bar */}
        <div className="min-h-7 py-1 border-b border-black bg-white px-2.5 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] font-bold text-black">
          <div className="flex items-center gap-2 truncate">
            <span className="truncate">{caption || alt}</span>
            {hasMultiple && (
              <span className="px-1.5 py-0.5 bg-black text-white text-[10px] shrink-0">
                {safeIndex + 1} / {totalSlides}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {hasMultiple && (
              <div className="flex items-center gap-1 mr-1">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="mac-interactive px-2 py-0.5 border border-black bg-white hover:bg-black hover:text-white transition-none"
                  title="Previous image"
                >
                  ◀ PREV
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="mac-interactive px-2 py-0.5 border border-black bg-white hover:bg-black hover:text-white transition-none"
                  title="Next image"
                >
                  NEXT ▶
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => setMonochromeMode((prev) => !prev)}
              className="mac-interactive px-2 py-0.5 border border-black bg-neutral-100 hover:bg-black hover:text-white transition-none"
              title="Toggle between Color CRT and B&W CRT"
            >
              {monochromeMode ? "MODE: B&W CRT" : "MODE: COLOR CRT"}
            </button>
            {!hasError && (
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                className="mac-interactive px-2 py-0.5 border border-black bg-black text-white hover:bg-white hover:text-black transition-none"
                title="Enlarge screenshot"
              >
                ZOOM ↗
              </button>
            )}
          </div>
        </div>

        {/* Full-Size Uncropped Image Viewport with Color CRT Overlay */}
        <div
          onClick={() => !hasError && setIsLightboxOpen(true)}
          className="relative w-full bg-neutral-900 overflow-hidden mac-interactive flex items-center justify-center"
        >
          {!hasError ? (
            <div className="relative w-full flex items-center justify-center">
              <img
                key={currentSrc}
                src={currentSrc}
                alt={`${alt}${hasMultiple ? ` (${safeIndex + 1} of ${totalSlides})` : ""}`}
                onError={() =>
                  setErrorMap((prev) => ({ ...prev, [safeIndex]: true }))
                }
                className={`w-full h-auto block object-contain transition-all duration-150 ${
                  monochromeMode
                    ? "grayscale contrast-[1.3] brightness-[1.04]"
                    : "contrast-[1.06] saturate-[1.08] brightness-[1.02]"
                }`}
              />

              {/* Always-On CRT Effect Layers (Scanlines + Phosphor Grid + Vignette) */}
              {/* 1. Subtle CRT Phosphor Dot Matrix */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-15 mix-blend-multiply"
                style={{
                  backgroundImage:
                    "radial-gradient(#000000 1px, transparent 0)",
                  backgroundSize: "3px 3px",
                }}
              />

              {/* 2. Horizontal CRT Scanlines */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to bottom, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, rgba(0,0,0,0.28) 2px, rgba(0,0,0,0.28) 3px)",
                }}
              />

              {/* 3. Subtle CRT Screen Edge Vignette */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  boxShadow: "inset 0 0 24px rgba(0,0,0,0.38)",
                }}
              />
            </div>
          ) : (
            <div className="p-6 text-center space-y-1 font-mono text-xs text-neutral-300">
              <p className="font-bold text-white">[IMAGE NOT FOUND]</p>
              <p className="text-[11px]">
                Expected at:{" "}
                <code className="bg-black text-white px-1 border border-white">
                  {currentSrc}
                </code>
              </p>
            </div>
          )}
        </div>

        {/* Bottom Carousel Footer Bar when multiple images exist */}
        {hasMultiple && (
          <div className="h-7 border-t border-black bg-white px-3 flex items-center justify-between font-mono text-[11px] font-bold">
            <button
              type="button"
              onClick={handlePrev}
              className="mac-interactive px-2 py-0.5 border border-black bg-white hover:bg-black hover:text-white transition-none"
            >
              ◀ Previous
            </button>

            {/* Pixel Slide Indicators */}
            <div className="flex items-center gap-1.5">
              {imageList.map((imgUrl, idx) => (
                <button
                  key={imgUrl}
                  type="button"
                  aria-label={`Go to slide ${idx + 1}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(idx);
                  }}
                  className={`mac-interactive w-3 h-3 border border-black transition-none ${
                    idx === safeIndex
                      ? "bg-black"
                      : "bg-white hover:bg-neutral-300"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="mac-interactive px-2 py-0.5 border border-black bg-white hover:bg-black hover:text-white transition-none"
            >
              Next ▶
            </button>
          </div>
        )}
      </figure>

      {/* Fullscreen Macintosh QuickLook Lightbox Modal */}
      {isLightboxOpen && (
        <div
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-[950] bg-black/75 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-5xl w-full bg-white border-2 border-black shadow-mac-lg p-1"
          >
            <div className="border border-black bg-white">
              <div className="min-h-8 py-1 border-b-2 border-black px-3 flex flex-wrap items-center justify-between gap-2 bg-white">
                <div className="flex items-center gap-2 truncate">
                  <span className="font-retro font-bold text-base truncate">
                    QuickLook — {caption || alt}
                  </span>
                  {hasMultiple && (
                    <span className="px-1.5 py-0.5 bg-black text-white font-mono text-[10px] font-bold">
                      {safeIndex + 1} / {totalSlides}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {hasMultiple && (
                    <>
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="mac-interactive px-2.5 py-0.5 border border-black font-mono text-xs font-bold bg-white hover:bg-black hover:text-white"
                      >
                        ◀ PREV
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="mac-interactive px-2.5 py-0.5 border border-black font-mono text-xs font-bold bg-white hover:bg-black hover:text-white"
                      >
                        NEXT ▶
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => setMonochromeMode((prev) => !prev)}
                    className="mac-interactive px-2.5 py-0.5 border border-black font-mono text-xs font-bold bg-white hover:bg-black hover:text-white"
                  >
                    {monochromeMode
                      ? "Switch to Color CRT"
                      : "Switch to B&W CRT"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsLightboxOpen(false)}
                    className="mac-interactive px-2.5 py-0.5 border border-black font-mono text-xs font-bold bg-black text-white hover:bg-white hover:text-black"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="relative bg-neutral-950 max-h-[82vh] overflow-auto flex items-center justify-center p-2">
                <img
                  src={currentSrc}
                  alt={alt}
                  className={`max-h-[78vh] w-auto object-contain ${
                    monochromeMode
                      ? "grayscale contrast-[1.3] brightness-[1.04]"
                      : "contrast-[1.06] saturate-[1.08] brightness-[1.02]"
                  }`}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(to bottom, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, rgba(0,0,0,0.28) 2px, rgba(0,0,0,0.28) 3px)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
