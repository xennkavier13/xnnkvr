"use client";

import React, { useEffect, useRef, useState } from "react";
import { BrandXIcon, HappyMacIcon } from "@/components/icons/PixelIcons";
import { PORTFOLIO_DATA, WindowId } from "@/data/portfolioData";

interface MenuBarProps {
  onOpenWindow: (id: WindowId) => void;
  onOpenAllWindows: () => void;
  onCloseActiveWindow: () => void;
  onCloseAllWindows: () => void;
  onResetLayout: () => void;
  onToggleScanlines: () => void;
  scanlinesEnabled: boolean;
  onToggleInvert: () => void;
  invertedMode: boolean;
  onReplayBoot: () => void;
  onCopyToast: (text: string, label: string) => void;
  onOpenSystemModal: () => void;
}

type OpenMenu = "x" | "file" | "edit" | "special" | "contact" | null;

const MONTH_ABBR = [
  "Jan.",
  "Feb.",
  "Mar.",
  "Apr.",
  "May",
  "Jun.",
  "Jul.",
  "Aug.",
  "Sep.",
  "Oct.",
  "Nov.",
  "Dec.",
];

function formatMacClock(date: Date, showSeconds: boolean): string {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  if (hours === 0) hours = 12;

  const minStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const secStr = seconds < 10 ? `:0${seconds}` : `:${seconds}`;
  const monthStr = MONTH_ABBR[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${hours}:${minStr}${showSeconds ? secStr : ""}${ampm} - ${monthStr} ${day}, ${year}`;
}

export default function MenuBar({
  onOpenWindow,
  onOpenAllWindows,
  onCloseActiveWindow,
  onCloseAllWindows,
  onResetLayout,
  onToggleScanlines,
  scanlinesEnabled,
  onToggleInvert,
  invertedMode,
  onReplayBoot,
  onCopyToast,
  onOpenSystemModal,
}: MenuBarProps) {
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const [clockText, setClockText] = useState<string>("");
  const [showSeconds, setShowSeconds] = useState<boolean>(false);
  const menuRef = useRef<HTMLElement | null>(null);

  // Live clock updated every second
  useEffect(() => {
    const updateClock = () => {
      setClockText(formatMacClock(new Date(), showSeconds));
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, [showSeconds]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    window.addEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const toggleMenu = (menu: OpenMenu) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  const handleHoverSwitch = (menu: OpenMenu) => {
    if (openMenu !== null) {
      setOpenMenu(menu);
    }
  };

  return (
    <header
      ref={menuRef}
      className="fixed top-0 left-0 right-0 z-[500] h-8 bg-white border-b-2 border-black flex items-center justify-between px-2 select-none font-retro font-bold text-base sm:text-lg tracking-wide"
    >
      {/* Left Side: Brand "X" + File, Edit, Special, Contact */}
      <nav className="flex items-center h-full">
        {/* Brand "X" Menu */}
        <div className="relative h-full flex items-center">
          <button
            type="button"
            aria-label="xnnkvr System Menu"
            onClick={() => toggleMenu("x")}
            onMouseEnter={() => handleHoverSwitch("x")}
            className={`mac-interactive h-full px-3 flex items-center justify-center transition-none ${
              openMenu === "x"
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-black hover:text-white"
            }`}
          >
            <BrandXIcon inverted={openMenu === "x"} size={16} />
          </button>

          {openMenu === "x" && (
            <div className="absolute left-0 top-full w-72 bg-white border-2 border-black shadow-mac z-[600] py-1 text-black font-bold">
              {/* Fun Fake System Info Blurb */}
              <div className="px-3 py-2.5 border-b-2 border-black bg-neutral-50">
                <div className="flex items-center gap-2.5">
                  <div className="border border-black bg-white p-1 shrink-0">
                    <HappyMacIcon size={34} />
                  </div>
                  <div className="leading-tight">
                    <p className="font-pixel text-xs text-black font-bold">
                      xnnkvr OS 1.0
                    </p>
                    <p className="font-mono text-[11px] font-semibold text-neutral-800 mt-0.5">
                      Kenn Xavier Dabon Edition
                    </p>
                    <p className="font-mono text-[10px] font-semibold text-neutral-600">
                      RAM: 512K (4.43 GPA Alloc.)
                    </p>
                  </div>
                </div>
                <p className="mt-2 font-sans font-medium text-xs text-neutral-800 leading-relaxed">
                  Built on a nostalgic Motorola 68000 heart with Next.js + Framer
                  Motion smoothness. Powered by Kopiko Lucky Day, hopes and dreams, &amp; FL Studio.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setOpenMenu(null);
                  onOpenSystemModal();
                }}
                className="mac-interactive w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-black hover:text-white text-sm"
              >
                <span>About This Portfolio...</span>
                <span className="font-mono text-xs">⌘I</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpenMenu(null);
                  onOpenWindow("about");
                }}
                className="mac-interactive w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-black hover:text-white text-sm"
              >
                <span>Open Creator Profile (Kenn)</span>
                <span className="font-mono text-xs">↗</span>
              </button>
            </div>
          )}
        </div>

        {/* FILE MENU */}
        <div className="relative h-full flex items-center">
          <button
            type="button"
            onClick={() => toggleMenu("file")}
            onMouseEnter={() => handleHoverSwitch("file")}
            className={`mac-interactive h-full px-3 flex items-center transition-none ${
              openMenu === "file"
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-black hover:text-white"
            }`}
          >
            File
          </button>

          {openMenu === "file" && (
            <div className="absolute left-0 top-full w-60 bg-white border-2 border-black shadow-mac z-[600] py-1 text-black text-sm font-bold">
              <button
                type="button"
                onClick={() => {
                  setOpenMenu(null);
                  onOpenWindow("about");
                }}
                className="mac-interactive w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-black hover:text-white"
              >
                <span>Open About Me</span>
                <span className="font-mono text-xs">⌘1</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpenMenu(null);
                  onOpenWindow("projects");
                }}
                className="mac-interactive w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-black hover:text-white"
              >
                <span>Open Projects</span>
                <span className="font-mono text-xs">⌘2</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpenMenu(null);
                  onOpenWindow("skills");
                }}
                className="mac-interactive w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-black hover:text-white"
              >
                <span>Open Skills &amp; Tools</span>
                <span className="font-mono text-xs">⌘3</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpenMenu(null);
                  onOpenWindow("credentials");
                }}
                className="mac-interactive w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-black hover:text-white"
              >
                <span>Open Credentials</span>
                <span className="font-mono text-xs">⌘4</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpenMenu(null);
                  onOpenWindow("resume");
                }}
                className="mac-interactive w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-black hover:text-white"
              >
                <span>Open Resume.pdf</span>
                <span className="font-mono text-xs">⌘5</span>
              </button>

              <div className="my-1 border-t border-black border-dashed" />

              <button
                type="button"
                onClick={() => {
                  setOpenMenu(null);
                  onOpenAllWindows();
                }}
                className="mac-interactive w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-black hover:text-white"
              >
                <span>Open All Sections</span>
                <span className="font-mono text-xs">⌘O</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpenMenu(null);
                  onCloseActiveWindow();
                }}
                className="mac-interactive w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-black hover:text-white"
              >
                <span>Close Active Window</span>
                <span className="font-mono text-xs">⌘W</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpenMenu(null);
                  onCloseAllWindows();
                }}
                className="mac-interactive w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-black hover:text-white"
              >
                <span>Close All Windows</span>
                <span className="font-mono text-xs">⌥⌘W</span>
              </button>
            </div>
          )}
        </div>

        {/* EDIT MENU */}
        <div className="relative h-full flex items-center">
          <button
            type="button"
            onClick={() => toggleMenu("edit")}
            onMouseEnter={() => handleHoverSwitch("edit")}
            className={`mac-interactive h-full px-3 flex items-center transition-none ${
              openMenu === "edit"
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-black hover:text-white"
            }`}
          >
            Edit
          </button>

          {openMenu === "edit" && (
            <div className="absolute left-0 top-full w-60 bg-white border-2 border-black shadow-mac z-[600] py-1 text-black text-sm font-bold">
              <button
                type="button"
                onClick={() => {
                  setOpenMenu(null);
                  onCopyToast(PORTFOLIO_DATA.contact.email, "Email Address");
                }}
                className="mac-interactive w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-black hover:text-white"
              >
                <span>Copy Email Address</span>
                <span className="font-mono text-xs">⌘C</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpenMenu(null);
                  onCopyToast(PORTFOLIO_DATA.contact.github, "GitHub URL");
                }}
                className="mac-interactive w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-black hover:text-white"
              >
                <span>Copy GitHub URL</span>
                <span className="font-mono text-xs">⌘G</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpenMenu(null);
                  onCopyToast(PORTFOLIO_DATA.contact.linkedin, "LinkedIn URL");
                }}
                className="mac-interactive w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-black hover:text-white"
              >
                <span>Copy LinkedIn URL</span>
                <span className="font-mono text-xs">⌘L</span>
              </button>
            </div>
          )}
        </div>

        {/* SPECIAL MENU */}
        <div className="relative h-full flex items-center">
          <button
            type="button"
            onClick={() => toggleMenu("special")}
            onMouseEnter={() => handleHoverSwitch("special")}
            className={`mac-interactive h-full px-3 flex items-center transition-none ${
              openMenu === "special"
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-black hover:text-white"
            }`}
          >
            Special
          </button>

          {openMenu === "special" && (
            <div className="absolute left-0 top-full w-64 bg-white border-2 border-black shadow-mac z-[600] py-1 text-black text-sm font-bold">
              <button
                type="button"
                onClick={() => {
                  setOpenMenu(null);
                  onResetLayout();
                }}
                className="mac-interactive w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-black hover:text-white"
              >
                <span>Clean Up Desktop</span>
                <span className="font-mono text-xs">⌘K</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpenMenu(null);
                  onToggleScanlines();
                }}
                className="mac-interactive w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-black hover:text-white"
              >
                <span>CRT Scanlines: {scanlinesEnabled ? "ON" : "OFF"}</span>
                <span className="font-mono text-xs">
                  {scanlinesEnabled ? "●" : "○"}
                </span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpenMenu(null);
                  onToggleInvert();
                }}
                className="mac-interactive w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-black hover:text-white"
              >
                <span>1-Bit Invert: {invertedMode ? "ON" : "OFF"}</span>
                <span className="font-mono text-xs">◐</span>
              </button>

              <div className="my-1 border-t border-black border-dashed" />

              <button
                type="button"
                onClick={() => {
                  setOpenMenu(null);
                  onReplayBoot();
                }}
                className="mac-interactive w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-black hover:text-white"
              >
                <span>Restart (Replay Boot)...</span>
                <span className="font-mono text-xs">⌘R</span>
              </button>
            </div>
          )}
        </div>

        {/* CONTACT MENU */}
        <div className="relative h-full flex items-center">
          <button
            type="button"
            onClick={() => toggleMenu("contact")}
            onMouseEnter={() => handleHoverSwitch("contact")}
            className={`mac-interactive h-full px-3 flex items-center transition-none ${
              openMenu === "contact"
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-black hover:text-white"
            }`}
          >
            Contact
          </button>

          {openMenu === "contact" && (
            <div className="absolute left-0 top-full w-60 bg-white border-2 border-black shadow-mac z-[600] py-1 text-black text-sm font-bold">
              <a
                href={PORTFOLIO_DATA.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpenMenu(null)}
                className="mac-interactive w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-black hover:text-white"
              >
                <span>GitHub</span>
                <span className="font-mono text-xs">↗</span>
              </a>
              <a
                href={PORTFOLIO_DATA.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpenMenu(null)}
                className="mac-interactive w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-black hover:text-white"
              >
                <span>LinkedIn</span>
                <span className="font-mono text-xs">↗</span>
              </a>
              <a
                href={`mailto:${PORTFOLIO_DATA.contact.email}`}
                onClick={() => {
                  setOpenMenu(null);
                  onCopyToast(PORTFOLIO_DATA.contact.email, "Email");
                }}
                className="mac-interactive w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-black hover:text-white"
              >
                <span>Email</span>
                <span className="font-mono text-xs">✉</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  setOpenMenu(null);
                  onOpenWindow("resume");
                }}
                className="mac-interactive w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-black hover:text-white"
              >
                <span>Resume</span>
                <span className="font-mono text-xs">DOC</span>
              </button>

              <div className="my-1 border-t border-black border-dashed" />

              <button
                type="button"
                onClick={() => {
                  setOpenMenu(null);
                  onOpenWindow("contact");
                }}
                className="mac-interactive w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-black hover:text-white"
              >
                <span>Open Contact Card...</span>
                <span className="font-mono text-xs">⌘M</span>
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Right Side: System Handle + Live Clock (matching reference screenshot) */}
      <div className="flex items-center gap-3">
        <span className="hidden md:inline-block font-retro font-bold text-sm sm:text-base text-black">
          xnnkvr
        </span>
        <button
          type="button"
          onClick={() => setShowSeconds((prev) => !prev)}
          title="Click to toggle seconds display"
          className="mac-interactive px-2 py-0.5 text-sm sm:text-base font-retro font-bold text-black hover:bg-black hover:text-white transition-none whitespace-nowrap"
        >
          {clockText || "8:00PM - Nov. 10, 2026"}
        </button>
      </div>
    </header>
  );
}
