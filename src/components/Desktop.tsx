"use client";

import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BootScreen from "@/components/BootScreen";
import CRTWallpaper from "@/components/CRTWallpaper";
import MenuBar from "@/components/MenuBar";
import DesktopIcon from "@/components/DesktopIcon";
import MacWindow, { WindowBounds } from "@/components/MacWindow";
import AboutWindow from "@/components/windows/AboutWindow";
import ProjectsWindow from "@/components/windows/ProjectsWindow";
import SkillsWindow from "@/components/windows/SkillsWindow";
import CredentialsWindow from "@/components/windows/CredentialsWindow";
import ResumeWindow from "@/components/windows/ResumeWindow";
import ContactWindow from "@/components/windows/ContactWindow";
import TrashWindow from "@/components/windows/TrashWindow";
import {
  AboutDocIcon,
  CertificatePixelIcon,
  ContactCardIcon,
  FolderPixelIcon,
  HappyMacIcon,
  ResumeDocIcon,
  SystemSuitcaseIcon,
  TrashCanIcon,
} from "@/components/icons/PixelIcons";
import { PORTFOLIO_DATA, WindowId } from "@/data/portfolioData";

interface WindowConfig {
  id: WindowId;
  title: string;
  iconLabel: string;
  subtitleMeta: string;
  defaultBounds: WindowBounds;
  minWidth: number;
  minHeight: number;
}

const WINDOW_CONFIGS: Record<WindowId, WindowConfig> = {
  about: {
    id: "about",
    title: "About — Kenn Xavier Dabon",
    iconLabel: "About Me",
    subtitleMeta: "1 document • BSIT (4.43/5.00 GPA) • 128K in disk",
    defaultBounds: { x: 40, y: 52, width: 650, height: 550 },
    minWidth: 360,
    minHeight: 300,
  },
  projects: {
    id: "projects",
    title: "Projects — /xnnkvr/repositories",
    iconLabel: "Projects",
    subtitleMeta: "5 items • 904K in disk • Ariadne, CampusGuru, Mimala, Quark, Hygin",
    defaultBounds: { x: 88, y: 72, width: 680, height: 540 },
    minWidth: 380,
    minHeight: 300,
  },
  skills: {
    id: "skills",
    title: "Skills & Tools — System Extensions",
    iconLabel: "Skills & Tools",
    subtitleMeta: "19 extensions • Languages, Frameworks, & QA Tooling",
    defaultBounds: { x: 132, y: 90, width: 630, height: 510 },
    minWidth: 360,
    minHeight: 280,
  },
  credentials: {
    id: "credentials",
    title: "Credentials — Honors & Certifications",
    iconLabel: "Credentials",
    subtitleMeta: "4 verified records • PhilNITS FE, EY GDS, CITU Parangal, CodeChum",
    defaultBounds: { x: 172, y: 106, width: 630, height: 500 },
    minWidth: 360,
    minHeight: 280,
  },
  contact: {
    id: "contact",
    title: "Contact — HyperCard Directory",
    iconLabel: "Contact",
    subtitleMeta: "4 channels • GitHub, LinkedIn, Email, Resume",
    defaultBounds: { x: 210, y: 122, width: 590, height: 500 },
    minWidth: 350,
    minHeight: 280,
  },
  resume: {
    id: "resume",
    title: "Dabon_Resume.pdf — MacWrite Viewer",
    iconLabel: "Resume.pdf",
    subtitleMeta: "PDF Document • Kenn Xavier Dabon CV • Mounted",
    defaultBounds: { x: 116, y: 64, width: 660, height: 550 },
    minWidth: 360,
    minHeight: 300,
  },
  trash: {
    id: "trash",
    title: "Trash — System Wastebasket",
    iconLabel: "Trash",
    subtitleMeta: "4 items • 48K in trash • 512K available",
    defaultBounds: { x: 240, y: 148, width: 500, height: 370 },
    minWidth: 340,
    minHeight: 250,
  },
};

const DESKTOP_ICON_ORDER: WindowId[] = [
  "about",
  "projects",
  "skills",
  "credentials",
  "contact",
  "resume",
  "trash",
];

export default function Desktop() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [isBooting, setIsBooting] = useState<boolean>(true);
  const [selectedIcon, setSelectedIcon] = useState<WindowId | null>("about");
  const [openWindows, setOpenWindows] = useState<WindowId[]>(["about"]);
  const [minimizedWindows, setMinimizedWindows] = useState<WindowId[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<WindowId | null>("about");
  const [zIndexMap, setZIndexMap] = useState<Record<WindowId, number>>({
    about: 20,
    projects: 19,
    skills: 18,
    credentials: 17,
    contact: 16,
    resume: 15,
    trash: 14,
  });
  const [, setTopZ] = useState<number>(21);
  const [layoutVersion, setLayoutVersion] = useState<number>(0);

  // Display & Modal states
  const [scanlinesEnabled, setScanlinesEnabled] = useState<boolean>(true);
  const [invertedMode, setInvertedMode] = useState<boolean>(false);
  const [showSystemModal, setShowSystemModal] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 2800);
  }, []);

  const bringToFront = useCallback((id: WindowId) => {
    setActiveWindowId(id);
    setTopZ((prevTop) => {
      const nextZ = prevTop + 1;
      setZIndexMap((prevMap) => ({
        ...prevMap,
        [id]: nextZ,
      }));
      return nextZ;
    });
  }, []);

  const handleOpenWindow = useCallback(
    (id: WindowId) => {
      setOpenWindows((prev) => (prev.includes(id) ? prev : [...prev, id]));
      setMinimizedWindows((prev) => prev.filter((item) => item !== id));
      bringToFront(id);
    },
    [bringToFront]
  );

  const handleCloseWindow = useCallback((id: WindowId) => {
    setOpenWindows((prev) => {
      const remaining = prev.filter((w) => w !== id);
      setActiveWindowId((currActive) =>
        currActive === id ? remaining[remaining.length - 1] || null : currActive
      );
      return remaining;
    });
    setMinimizedWindows((prev) => prev.filter((w) => w !== id));
  }, []);

  const handleMinimizeWindow = useCallback((id: WindowId) => {
    setMinimizedWindows((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setActiveWindowId((curr) => (curr === id ? null : curr));
  }, []);

  const handleOpenAllWindows = useCallback(() => {
    const mainIds: WindowId[] = [
      "about",
      "projects",
      "skills",
      "credentials",
      "contact",
      "resume",
    ];
    setOpenWindows(mainIds);
    setMinimizedWindows([]);
    bringToFront("about");
  }, [bringToFront]);

  const handleCloseActiveWindow = useCallback(() => {
    if (activeWindowId) {
      handleCloseWindow(activeWindowId);
    }
  }, [activeWindowId, handleCloseWindow]);

  const handleCloseAllWindows = useCallback(() => {
    setOpenWindows([]);
    setMinimizedWindows([]);
    setActiveWindowId(null);
  }, []);

  const handleResetLayout = useCallback(() => {
    setLayoutVersion((v) => v + 1);
    setMinimizedWindows([]);
    showToast("Desktop windows cleaned up & reset");
  }, [showToast]);

  const handleCopyToast = useCallback(
    (text: string, label: string) => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).catch(() => {});
      }
      showToast(`Copied ${label} (${text}) to Clipboard`);
    },
    [showToast]
  );

  const handleToggleScanlines = useCallback(() => {
    setScanlinesEnabled((prev) => {
      const next = !prev;
      showToast(`CRT Scanlines Overlay: ${next ? "ON" : "OFF"}`);
      return next;
    });
  }, [showToast]);

  // Compute responsive initial bounds once when a window mounts or resets
  const getInitialBounds = useCallback((id: WindowId): WindowBounds => {
    const base = WINDOW_CONFIGS[id].defaultBounds;
    if (typeof window === "undefined") return base;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const isMobile = vw < 768;
    const rightIconReserve = isMobile ? 16 : 136;
    const maxAvailableW = Math.max(320, vw - rightIconReserve - 24);
    const maxAvailableH = Math.max(280, vh - 86);

    const width = Math.min(base.width, maxAvailableW);
    const height = Math.min(base.height, maxAvailableH);
    const x = isMobile
      ? 12
      : Math.min(base.x, Math.max(16, vw - width - rightIconReserve));
    const y = Math.min(base.y, Math.max(42, vh - height - 40));

    return { x, y, width, height };
  }, []);

  const renderDesktopIconGraphic = (id: WindowId, inverted: boolean) => {
    switch (id) {
      case "about":
        return <AboutDocIcon inverted={inverted} />;
      case "projects":
        return <FolderPixelIcon inverted={inverted} />;
      case "skills":
        return <SystemSuitcaseIcon inverted={inverted} />;
      case "credentials":
        return <CertificatePixelIcon inverted={inverted} />;
      case "contact":
        return <ContactCardIcon inverted={inverted} />;
      case "resume":
        return <ResumeDocIcon inverted={inverted} />;
      case "trash":
        return <TrashCanIcon inverted={inverted} />;
    }
  };

  const renderWindowContent = (id: WindowId) => {
    switch (id) {
      case "about":
        return <AboutWindow onOpenWindow={handleOpenWindow} />;
      case "projects":
        return <ProjectsWindow />;
      case "skills":
        return <SkillsWindow />;
      case "credentials":
        return <CredentialsWindow />;
      case "resume":
        return <ResumeWindow />;
      case "contact":
        return (
          <ContactWindow
            onCopyToast={handleCopyToast}
            onOpenWindow={handleOpenWindow}
          />
        );
      case "trash":
        return <TrashWindow />;
    }
  };

  if (!mounted) {
    return <div className="fixed inset-0 bg-black" suppressHydrationWarning />;
  }

  return (
    <div
      className={`relative w-screen h-screen overflow-hidden select-none ${
        invertedMode ? "invert" : ""
      }`}
    >
      {/* Boot / Loading Sequence on First Load or Reboot */}
      <AnimatePresence>
        {isBooting && <BootScreen onComplete={() => setIsBooting(false)} />}
      </AnimatePresence>

      {/* Full-Screen CRT Scanlines Overlay (Toggled via Special -> CRT Scanlines) */}
      {scanlinesEnabled && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[750] mac-crt-scanlines"
        />
      )}

      {/* Steady Black-and-White Dither Wallpaper + Gentle CRT Shimmer */}
      <CRTWallpaper onClickDesktop={() => setSelectedIcon(null)} />

      {/* Top Early Mac OS Menu Bar */}
      <MenuBar
        onOpenWindow={handleOpenWindow}
        onOpenAllWindows={handleOpenAllWindows}
        onCloseActiveWindow={handleCloseActiveWindow}
        onCloseAllWindows={handleCloseAllWindows}
        onResetLayout={handleResetLayout}
        onToggleScanlines={handleToggleScanlines}
        scanlinesEnabled={scanlinesEnabled}
        onToggleInvert={() => setInvertedMode((prev) => !prev)}
        invertedMode={invertedMode}
        onReplayBoot={() => setIsBooting(true)}
        onCopyToast={handleCopyToast}
        onOpenSystemModal={() => setShowSystemModal(true)}
      />

      {/* Desktop Workspace Area */}
      <main
        onClick={() => setSelectedIcon(null)}
        className="relative z-10 w-full h-full pt-8 pb-8 px-3 flex justify-end items-start"
      >
        {/* Right-Side Vertical Column of Classic Mac OS Desktop Icons */}
        <aside
          aria-label="Desktop Icons"
          className="pt-3 pr-1 flex flex-col items-center gap-3 max-h-[calc(100vh-48px)] flex-wrap-reverse content-end"
        >
          {DESKTOP_ICON_ORDER.map((iconId) => {
            const cfg = WINDOW_CONFIGS[iconId];
            const isOpen =
              openWindows.includes(iconId) && !minimizedWindows.includes(iconId);
            const isMinimized = minimizedWindows.includes(iconId);
            return (
              <DesktopIcon
                key={iconId}
                id={iconId}
                label={cfg.iconLabel}
                selected={selectedIcon === iconId}
                isOpen={isOpen}
                isMinimized={isMinimized}
                onSelect={(id) => setSelectedIcon(id)}
                onOpen={handleOpenWindow}
                renderIcon={(inv) => renderDesktopIconGraphic(iconId, inv)}
              />
            );
          })}
        </aside>

        {/* Open Windows Layer */}
        <AnimatePresence>
          {openWindows
            .filter((id) => !minimizedWindows.includes(id))
            .map((winId) => {
              const cfg = WINDOW_CONFIGS[winId];
              return (
                <MacWindow
                  key={winId}
                  id={winId}
                  title={cfg.title}
                  subtitleMeta={cfg.subtitleMeta}
                  isActive={activeWindowId === winId}
                  zIndex={zIndexMap[winId] || 10}
                  initialBounds={getInitialBounds(winId)}
                  resetTrigger={layoutVersion}
                  minWidth={cfg.minWidth}
                  minHeight={cfg.minHeight}
                  onFocus={bringToFront}
                  onClose={handleCloseWindow}
                  onMinimize={handleMinimizeWindow}
                >
                  {renderWindowContent(winId)}
                </MacWindow>
              );
            })}
        </AnimatePresence>
      </main>

      {/* Bottom-Left Minimized Windows Tray & Quick Hint Bar */}
      <div className="fixed bottom-2 left-2 z-[450] flex flex-wrap items-center gap-2 pointer-events-auto">
        {minimizedWindows.map((minId) => {
          const cfg = WINDOW_CONFIGS[minId];
          return (
            <button
              key={minId}
              type="button"
              onClick={() => handleOpenWindow(minId)}
              className="mac-interactive px-3 py-1 bg-white border-2 border-black shadow-mac font-retro font-bold text-sm sm:text-base flex items-center gap-1.5 hover:bg-black hover:text-white transition-none"
            >
              <span className="font-mono text-xs">▣</span>
              <span>{cfg.iconLabel}</span>
            </button>
          );
        })}

        {openWindows.length === 0 && (
          <div className="px-3 py-1 bg-white border-2 border-black shadow-mac font-retro font-bold text-sm sm:text-base text-black">
            Tip: Double-click any icon on the right (or use the File menu) to open a window.
          </div>
        )}
      </div>

      {/* Classic Mac OS "About This Portfolio" System Modal */}
      <AnimatePresence>
        {showSystemModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSystemModal(false)}
            className="fixed inset-0 z-[800] bg-black/40 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white border-2 border-black p-1 shadow-mac-lg"
            >
              <div className="border border-black p-5 space-y-4">
                <div className="flex items-start justify-between gap-4 border-b border-black pb-3">
                  <div className="flex items-center gap-3">
                    <div className="border border-black p-1.5 bg-neutral-50">
                      <HappyMacIcon size={44} />
                    </div>
                    <div>
                      <h2 className="font-pixel text-sm font-bold text-black">
                        xnnkvr OS
                      </h2>
                      <p className="font-retro font-bold text-base text-neutral-800 leading-tight">
                        {PORTFOLIO_DATA.owner.systemVersion}
                      </p>
                      <p className="font-mono text-[10px] font-semibold text-neutral-600">
                        {PORTFOLIO_DATA.owner.serialNumber}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowSystemModal(false)}
                    className="mac-interactive px-2 py-0.5 border border-black bg-white font-mono text-xs font-bold hover:bg-black hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-2 text-xs sm:text-sm font-sans font-medium text-neutral-800 leading-relaxed">
                  <p>
                    Personal portfolio operating system crafted for{" "}
                    <strong className="text-black font-bold">
                      {PORTFOLIO_DATA.owner.name}
                    </strong>{" "}
                    — reinterpreting the monochrome 1-bit pixel soul of Apple
                    Macintosh System 1–6 with modern Next.js, Tailwind CSS, and
                    Framer Motion fluidity.
                  </p>
                </div>

                {/* Fake Macintosh Memory Allocation Bars */}
                <div className="border border-black bg-neutral-50 p-3 space-y-2 font-mono text-[11px] font-semibold">
                  <div className="flex justify-between">
                    <span>Total System Memory:</span>
                    <span className="font-bold">512K RAM (4.43/5.00 GPA)</span>
                  </div>
                  <div className="w-full h-3 border border-black bg-white p-0.5 flex gap-0.5">
                    <div className="h-full w-[45%] bg-black" title="Frontend & Backend" />
                    <div className="h-full w-[25%] bg-neutral-600" title="QA & Project Mgmt" />
                    <div className="h-full w-[18%] bg-neutral-400" title="FL Studio Beats" />
                  </div>
                  <div className="flex flex-wrap justify-between text-[10px] text-neutral-700 pt-0.5">
                    <span>■ Full-Stack: 230K</span>
                    <span>■ PM &amp; QA: 128K</span>
                    <span>■ FL Studio: 92K</span>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setShowSystemModal(false);
                      setIsBooting(true);
                    }}
                    className="mac-interactive px-3 py-1 border border-black bg-white text-black font-retro font-bold text-sm hover:bg-black hover:text-white transition-none"
                  >
                    Reboot OS...
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSystemModal(false)}
                    className="mac-interactive px-4 py-1 border border-black bg-black text-white font-retro font-bold text-sm hover:bg-white hover:text-black shadow-[1px_1px_0px_#000] transition-none"
                  >
                    OK
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Classic Mac OS System Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed bottom-3 right-3 z-[900] bg-white border-2 border-black px-4 py-2 shadow-mac-lg flex items-center gap-2.5 font-retro font-bold text-sm sm:text-base text-black"
          >
            <span className="px-1.5 py-0.5 bg-black text-white font-mono text-xs font-bold">
              SYS
            </span>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
