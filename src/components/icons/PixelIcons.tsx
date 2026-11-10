import React from "react";

interface IconProps {
  className?: string;
  inverted?: boolean;
  size?: number;
}

/**
 * Happy Mac-style pixel art icon for Boot Screen & About System modal
 */
export function HappyMacIcon({ className = "", size = 64 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      className={className}
    >
      {/* Outer Macintosh Chassis */}
      <rect x="5" y="2" width="22" height="26" fill="white" />
      <rect x="5" y="2" width="22" height="1" fill="black" />
      <rect x="5" y="27" width="22" height="1" fill="black" />
      <rect x="4" y="3" width="1" height="24" fill="black" />
      <rect x="27" y="3" width="1" height="24" fill="black" />

      {/* Base / Foot */}
      <rect x="6" y="28" width="20" height="2" fill="white" />
      <rect x="5" y="28" width="1" height="2" fill="black" />
      <rect x="26" y="28" width="1" height="2" fill="black" />
      <rect x="6" y="30" width="20" height="1" fill="black" />

      {/* CRT Screen Bezel */}
      <rect x="7" y="5" width="18" height="14" fill="white" />
      <rect x="8" y="4" width="16" height="1" fill="black" />
      <rect x="8" y="19" width="16" height="1" fill="black" />
      <rect x="7" y="5" width="1" height="14" fill="black" />
      <rect x="24" y="5" width="1" height="14" fill="black" />

      {/* Happy Mac Eyes */}
      <rect x="11" y="8" width="2" height="3" fill="black" />
      <rect x="19" y="8" width="2" height="3" fill="black" />

      {/* Happy Mac Nose */}
      <rect x="15" y="9" width="1" height="4" fill="black" />
      <rect x="14" y="12" width="2" height="1" fill="black" />

      {/* Happy Mac Smile */}
      <rect x="11" y="14" width="1" height="1" fill="black" />
      <rect x="20" y="14" width="1" height="1" fill="black" />
      <rect x="12" y="15" width="8" height="1" fill="black" />

      {/* Floppy Disk Drive Slot */}
      <rect x="17" y="22" width="7" height="2" fill="black" />
      <rect x="21" y="21" width="2" height="1" fill="black" />

      {/* Little xnnkvr badge pixel on bottom-left */}
      <rect x="8" y="22" width="3" height="3" fill="black" />
      <rect x="9" y="23" width="1" height="1" fill="white" />
    </svg>
  );
}

/**
 * Dark-background CRT version of Happy Mac for the Boot Screen
 */
export function BootHappyMacIcon({ className = "", size = 76 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      className={className}
    >
      {/* Drop shadow */}
      <rect x="6" y="4" width="23" height="26" fill="black" />
      {/* Outer Macintosh Body */}
      <rect x="5" y="2" width="22" height="25" fill="white" />
      <rect x="6" y="1" width="20" height="1" fill="white" />
      {/* Inner outline */}
      <rect x="6" y="2" width="20" height="1" fill="black" />
      <rect x="5" y="3" width="1" height="23" fill="black" />
      <rect x="26" y="3" width="1" height="23" fill="black" />
      <rect x="6" y="26" width="20" height="1" fill="black" />

      {/* Base */}
      <rect x="6" y="27" width="20" height="3" fill="white" />
      <rect x="6" y="27" width="1" height="3" fill="black" />
      <rect x="25" y="27" width="1" height="3" fill="black" />
      <rect x="7" y="29" width="18" height="1" fill="black" />

      {/* CRT Screen */}
      <rect x="8" y="5" width="16" height="14" fill="black" />
      <rect x="9" y="6" width="14" height="12" fill="white" />

      {/* Smiling Pixel Face */}
      <rect x="12" y="8" width="2" height="3" fill="black" />
      <rect x="18" y="8" width="2" height="3" fill="black" />
      <rect x="15" y="9" width="1" height="4" fill="black" />
      <rect x="14" y="12" width="2" height="1" fill="black" />
      <rect x="11" y="14" width="1" height="1" fill="black" />
      <rect x="20" y="14" width="1" height="1" fill="black" />
      <rect x="12" y="15" width="8" height="1" fill="black" />

      {/* Floppy slot */}
      <rect x="17" y="22" width="6" height="2" fill="black" />
      <rect x="8" y="22" width="3" height="2" fill="black" />
    </svg>
  );
}

/**
 * Styled pixel-art "X" glyph for the leftmost Menu Bar item (replaces Apple logo)
 */
export function BrandXIcon({ inverted = false, size = 16 }: IconProps) {
  const fg = inverted ? "white" : "black";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
    >
      {/* Top-left to bottom-right thick pixel diagonal */}
      <rect x="2" y="2" width="3" height="2" fill={fg} />
      <rect x="4" y="4" width="3" height="2" fill={fg} />
      <rect x="6" y="6" width="4" height="4" fill={fg} />
      <rect x="9" y="10" width="3" height="2" fill={fg} />
      <rect x="11" y="12" width="3" height="2" fill={fg} />

      {/* Top-right to bottom-left thick pixel diagonal */}
      <rect x="11" y="2" width="3" height="2" fill={fg} />
      <rect x="9" y="4" width="3" height="2" fill={fg} />
      <rect x="4" y="10" width="3" height="2" fill={fg} />
      <rect x="2" y="12" width="3" height="2" fill={fg} />

      {/* Center knockout pixel for crisp retro emblem */}
      <rect
        x="7"
        y="7"
        width="2"
        height="2"
        fill={inverted ? "black" : "white"}
      />
    </svg>
  );
}

/**
 * Desktop Icon: About Me (MacPaint / Profile Document)
 */
export function AboutDocIcon({ inverted = false, size = 44 }: IconProps) {
  const bg = inverted ? "black" : "white";
  const fg = inverted ? "white" : "black";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
    >
      {/* Hard shadow */}
      <rect x="6" y="4" width="21" height="26" fill="black" />
      {/* Document body */}
      <rect x="5" y="2" width="20" height="26" fill={bg} />
      <rect x="5" y="2" width="16" height="1" fill={fg} />
      <rect x="5" y="27" width="20" height="1" fill={fg} />
      <rect x="5" y="2" width="1" height="26" fill={fg} />
      <rect x="24" y="6" width="1" height="22" fill={fg} />
      {/* Dog-ear fold */}
      <rect x="20" y="2" width="1" height="5" fill={fg} />
      <rect x="20" y="6" width="5" height="1" fill={fg} />
      <rect x="21" y="3" width="1" height="1" fill={fg} />
      <rect x="22" y="4" width="1" height="1" fill={fg} />
      <rect x="23" y="5" width="1" height="1" fill={fg} />

      {/* Pixel Portrait Frame inside doc */}
      <rect x="8" y="6" width="11" height="11" fill={bg} stroke={fg} strokeWidth="1" />
      {/* Little pixel head & shoulders */}
      <rect x="12" y="8" width="3" height="3" fill={fg} />
      <rect x="10" y="12" width="7" height="3" fill={fg} />

      {/* Text lines below portrait */}
      <rect x="8" y="19" width="14" height="1" fill={fg} />
      <rect x="8" y="21" width="12" height="1" fill={fg} />
      <rect x="8" y="23" width="14" height="1" fill={fg} />
    </svg>
  );
}

/**
 * Desktop Icon: Projects (Classic Mac OS System 1-6 Folder)
 */
export function FolderPixelIcon({ inverted = false, size = 44 }: IconProps) {
  const bg = inverted ? "black" : "white";
  const fg = inverted ? "white" : "black";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
    >
      {/* Drop shadow */}
      <rect x="4" y="8" width="26" height="20" fill="black" />
      {/* Folder Tab */}
      <rect x="4" y="5" width="10" height="4" fill={bg} />
      <rect x="4" y="5" width="10" height="1" fill={fg} />
      <rect x="3" y="6" width="1" height="3" fill={fg} />
      <rect x="14" y="6" width="1" height="3" fill={fg} />
      {/* Folder Body */}
      <rect x="3" y="8" width="25" height="18" fill={bg} />
      <rect x="3" y="8" width="25" height="1" fill={fg} />
      <rect x="3" y="25" width="25" height="1" fill={fg} />
      <rect x="2" y="9" width="1" height="16" fill={fg} />
      <rect x="28" y="9" width="1" height="16" fill={fg} />
      {/* Inner horizontal crease line */}
      <rect x="4" y="10" width="23" height="1" fill={fg} />
      {/* Pixel code brackets < / > inside folder */}
      <rect x="10" y="15" width="1" height="1" fill={fg} />
      <rect x="9" y="16" width="1" height="1" fill={fg} />
      <rect x="8" y="17" width="1" height="1" fill={fg} />
      <rect x="9" y="18" width="1" height="1" fill={fg} />
      <rect x="10" y="19" width="1" height="1" fill={fg} />

      <rect x="16" y="14" width="1" height="2" fill={fg} />
      <rect x="15" y="16" width="1" height="3" fill={fg} />
      <rect x="14" y="19" width="1" height="2" fill={fg} />

      <rect x="20" y="15" width="1" height="1" fill={fg} />
      <rect x="21" y="16" width="1" height="1" fill={fg} />
      <rect x="22" y="17" width="1" height="1" fill={fg} />
      <rect x="21" y="18" width="1" height="1" fill={fg} />
      <rect x="20" y="19" width="1" height="1" fill={fg} />
    </svg>
  );
}

/**
 * Desktop Icon: Skills & Tech Stack (Classic System Suitcase / IC Chip)
 */
export function SystemSuitcaseIcon({ inverted = false, size = 44 }: IconProps) {
  const bg = inverted ? "black" : "white";
  const fg = inverted ? "white" : "black";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
    >
      {/* Drop shadow */}
      <rect x="4" y="8" width="25" height="20" fill="black" />
      {/* Suitcase Handle */}
      <rect x="11" y="4" width="10" height="4" fill={bg} />
      <rect x="11" y="4" width="10" height="1" fill={fg} />
      <rect x="10" y="5" width="1" height="3" fill={fg} />
      <rect x="21" y="5" width="1" height="3" fill={fg} />
      <rect x="12" y="6" width="8" height="2" fill={fg} />
      <rect x="13" y="6" width="6" height="2" fill={bg} />

      {/* Suitcase Body */}
      <rect x="3" y="7" width="25" height="19" fill={bg} />
      <rect x="3" y="7" width="25" height="1" fill={fg} />
      <rect x="3" y="25" width="25" height="1" fill={fg} />
      <rect x="3" y="7" width="1" height="19" fill={fg} />
      <rect x="27" y="7" width="1" height="19" fill={fg} />

      {/* Clasps */}
      <rect x="7" y="7" width="2" height="3" fill={fg} />
      <rect x="22" y="7" width="2" height="3" fill={fg} />

      {/* Center Microchip Emblem */}
      <rect x="11" y="12" width="9" height="9" fill={fg} />
      <rect x="12" y="13" width="7" height="7" fill={bg} />
      <rect x="14" y="15" width="3" height="3" fill={fg} />
      {/* Chip Pins */}
      <rect x="9" y="13" width="2" height="1" fill={fg} />
      <rect x="9" y="16" width="2" height="1" fill={fg} />
      <rect x="9" y="19" width="2" height="1" fill={fg} />
      <rect x="20" y="13" width="2" height="1" fill={fg} />
      <rect x="20" y="16" width="2" height="1" fill={fg} />
      <rect x="20" y="19" width="2" height="1" fill={fg} />
    </svg>
  );
}

/**
 * Desktop Icon: Credentials & Honors (Certificate / Ribbon Document)
 */
export function CertificatePixelIcon({ inverted = false, size = 44 }: IconProps) {
  const bg = inverted ? "black" : "white";
  const fg = inverted ? "white" : "black";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
    >
      {/* Drop shadow */}
      <rect x="5" y="5" width="23" height="23" fill="black" />
      {/* Certificate Frame */}
      <rect x="3" y="3" width="24" height="23" fill={bg} />
      <rect x="3" y="3" width="24" height="1" fill={fg} />
      <rect x="3" y="25" width="24" height="1" fill={fg} />
      <rect x="3" y="3" width="1" height="23" fill={fg} />
      <rect x="26" y="3" width="1" height="23" fill={fg} />

      {/* Inner Ornamental Border */}
      <rect x="5" y="5" width="20" height="1" fill={fg} />
      <rect x="5" y="23" width="11" height="1" fill={fg} />
      <rect x="5" y="5" width="1" height="19" fill={fg} />
      <rect x="24" y="5" width="1" height="19" fill={fg} />

      {/* Text lines */}
      <rect x="8" y="8" width="14" height="2" fill={fg} />
      <rect x="8" y="12" width="12" height="1" fill={fg} />
      <rect x="8" y="14" width="10" height="1" fill={fg} />
      <rect x="8" y="16" width="8" height="1" fill={fg} />

      {/* Pixel Ribbon Seal at bottom right */}
      <rect x="17" y="15" width="6" height="6" fill={fg} />
      <rect x="18" y="16" width="4" height="4" fill={bg} />
      <rect x="19" y="17" width="2" height="2" fill={fg} />
      {/* Ribbon tails */}
      <rect x="18" y="21" width="2" height="6" fill={fg} />
      <rect x="21" y="21" width="2" height="6" fill={fg} />
    </svg>
  );
}

/**
 * Desktop Icon: Contact (Classic HyperCard / Rolodex Card)
 */
export function ContactCardIcon({ inverted = false, size = 44 }: IconProps) {
  const bg = inverted ? "black" : "white";
  const fg = inverted ? "white" : "black";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
    >
      {/* Drop shadow */}
      <rect x="4" y="7" width="25" height="20" fill="black" />
      {/* Index tabs at top */}
      <rect x="5" y="4" width="6" height="3" fill={bg} />
      <rect x="5" y="4" width="6" height="1" fill={fg} />
      <rect x="4" y="5" width="1" height="2" fill={fg} />
      <rect x="11" y="5" width="1" height="2" fill={fg} />

      <rect x="13" y="4" width="6" height="3" fill={fg} />
      <rect x="21" y="4" width="6" height="3" fill={bg} />
      <rect x="21" y="4" width="6" height="1" fill={fg} />
      <rect x="27" y="5" width="1" height="2" fill={fg} />

      {/* Main Card Body */}
      <rect x="3" y="6" width="25" height="19" fill={bg} />
      <rect x="3" y="6" width="25" height="1" fill={fg} />
      <rect x="3" y="24" width="25" height="1" fill={fg} />
      <rect x="3" y="6" width="1" height="19" fill={fg} />
      <rect x="27" y="6" width="1" height="19" fill={fg} />

      {/* Mail Envelope / @ glyph inside */}
      <rect x="6" y="10" width="9" height="7" fill={fg} />
      <rect x="7" y="11" width="7" height="5" fill={bg} />
      <rect x="7" y="11" width="2" height="1" fill={fg} />
      <rect x="9" y="12" width="1" height="1" fill={fg} />
      <rect x="10" y="13" width="1" height="1" fill={fg} />
      <rect x="11" y="12" width="1" height="1" fill={fg} />
      <rect x="12" y="11" width="2" height="1" fill={fg} />

      {/* Address lines on right */}
      <rect x="17" y="10" width="8" height="2" fill={fg} />
      <rect x="17" y="14" width="7" height="1" fill={fg} />
      <rect x="17" y="16" width="8" height="1" fill={fg} />

      {/* Rolodex notches at bottom */}
      <rect x="9" y="22" width="3" height="3" fill={fg} />
      <rect x="19" y="22" width="3" height="3" fill={fg} />
    </svg>
  );
}

/**
 * Desktop Icon: Resume.pdf (Classic MacWrite Document)
 */
export function ResumeDocIcon({ inverted = false, size = 44 }: IconProps) {
  const bg = inverted ? "black" : "white";
  const fg = inverted ? "white" : "black";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
    >
      {/* Drop shadow */}
      <rect x="6" y="4" width="21" height="26" fill="black" />
      {/* Page body */}
      <rect x="5" y="2" width="20" height="26" fill={bg} />
      <rect x="5" y="2" width="16" height="1" fill={fg} />
      <rect x="5" y="27" width="20" height="1" fill={fg} />
      <rect x="5" y="2" width="1" height="26" fill={fg} />
      <rect x="24" y="6" width="1" height="22" fill={fg} />
      {/* Dog ear */}
      <rect x="20" y="2" width="1" height="5" fill={fg} />
      <rect x="20" y="6" width="5" height="1" fill={fg} />
      <rect x="21" y="3" width="1" height="1" fill={fg} />
      <rect x="22" y="4" width="1" height="1" fill={fg} />
      <rect x="23" y="5" width="1" height="1" fill={fg} />

      {/* CV Header Banner */}
      <rect x="8" y="6" width="10" height="3" fill={fg} />
      {/* Document lines */}
      <rect x="8" y="11" width="14" height="1" fill={fg} />
      <rect x="8" y="13" width="11" height="1" fill={fg} />
      <rect x="8" y="16" width="14" height="1" fill={fg} />
      <rect x="8" y="18" width="13" height="1" fill={fg} />
      <rect x="8" y="21" width="14" height="1" fill={fg} />
      <rect x="8" y="23" width="9" height="1" fill={fg} />
    </svg>
  );
}

/**
 * Desktop Icon: Classic Macintosh Trash Can
 */
export function TrashCanIcon({ inverted = false, size = 44 }: IconProps) {
  const bg = inverted ? "black" : "white";
  const fg = inverted ? "white" : "black";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
    >
      {/* Drop shadow */}
      <rect x="8" y="7" width="18" height="22" fill="black" />
      {/* Lid handle */}
      <rect x="13" y="3" width="6" height="2" fill={bg} />
      <rect x="13" y="2" width="6" height="1" fill={fg} />
      <rect x="12" y="3" width="1" height="2" fill={fg} />
      <rect x="19" y="3" width="1" height="2" fill={fg} />

      {/* Lid */}
      <rect x="6" y="5" width="20" height="2" fill={bg} />
      <rect x="6" y="5" width="20" height="1" fill={fg} />
      <rect x="6" y="7" width="20" height="1" fill={fg} />
      <rect x="5" y="5" width="1" height="3" fill={fg} />
      <rect x="26" y="5" width="1" height="3" fill={fg} />

      {/* Can Body */}
      <rect x="7" y="8" width="18" height="19" fill={bg} />
      <rect x="7" y="8" width="1" height="19" fill={fg} />
      <rect x="24" y="8" width="1" height="19" fill={fg} />
      <rect x="8" y="27" width="16" height="1" fill={fg} />

      {/* Vertical Flutes */}
      <rect x="10" y="10" width="1" height="15" fill={fg} />
      <rect x="13" y="10" width="1" height="15" fill={fg} />
      <rect x="16" y="10" width="1" height="15" fill={fg} />
      <rect x="19" y="10" width="1" height="15" fill={fg} />
      <rect x="21" y="10" width="1" height="15" fill={fg} />
    </svg>
  );
}

/**
 * Pixel Music Note Icon for FL Studio hobby widget
 */
export function MusicNotePixelIcon({ size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
    >
      <rect x="6" y="2" width="8" height="2" fill="currentColor" />
      <rect x="6" y="4" width="2" height="8" fill="currentColor" />
      <rect x="12" y="4" width="2" height="7" fill="currentColor" />
      <rect x="3" y="10" width="5" height="4" fill="currentColor" />
      <rect x="9" y="9" width="5" height="4" fill="currentColor" />
    </svg>
  );
}
