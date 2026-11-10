"use client";

import React, { useState } from "react";
import { PORTFOLIO_DATA, WindowId } from "@/data/portfolioData";
import { ContactCardIcon } from "@/components/icons/PixelIcons";

interface ContactWindowProps {
  onCopyToast: (text: string, label: string) => void;
  onOpenWindow: (id: WindowId) => void;
}

export default function ContactWindow({
  onCopyToast,
  onOpenWindow,
}: ContactWindowProps) {
  const { contact, owner } = PORTFOLIO_DATA;
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleDispatchEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const mailSubject = encodeURIComponent(
      subject.trim() || "Portfolio Inquiry — Kenn Xavier Dabon"
    );
    const mailBody = encodeURIComponent(message.trim());
    window.location.href = `mailto:${contact.email}?subject=${mailSubject}&body=${mailBody}`;
  };

  return (
    <div className="p-5 sm:p-6 space-y-6">
      {/* Header Banner */}
      <div className="flex items-center justify-between border-b border-black pb-4">
        <div className="flex items-center gap-3">
          <div className="border border-black bg-neutral-50 p-1.5 shadow-[1px_1px_0px_#000]">
            <ContactCardIcon size={32} />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight text-black">
              HyperCard Directory — Connect with Kenn
            </h2>
            <p className="text-xs text-neutral-600 font-mono">
              Direct Channels • GitHub, LinkedIn, Email, &amp; Resume
            </p>
          </div>
        </div>
      </div>

      {/* 4 Primary Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* GitHub */}
        <div className="border border-black bg-white p-4 shadow-mac flex flex-col justify-between gap-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-retro text-lg font-bold uppercase">
                01 // GitHub
              </span>
              <span className="px-1.5 py-0.5 bg-black text-white font-mono text-[10px]">
                CODE
              </span>
            </div>
            <p className="font-mono text-xs text-neutral-700 mt-1 truncate">
              {contact.githubHandle}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mac-interactive flex-1 text-center px-3 py-1.5 border border-black bg-black text-white font-retro text-sm tracking-wide hover:bg-white hover:text-black transition-none"
            >
              Open GitHub ↗
            </a>
            <button
              type="button"
              onClick={() => onCopyToast(contact.github, "GitHub URL")}
              className="mac-interactive px-2.5 py-1.5 border border-black bg-white text-black font-retro text-sm hover:bg-black hover:text-white transition-none"
            >
              Copy
            </button>
          </div>
        </div>

        {/* LinkedIn */}
        <div className="border border-black bg-white p-4 shadow-mac flex flex-col justify-between gap-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-retro text-lg font-bold uppercase">
                02 // LinkedIn
              </span>
              <span className="px-1.5 py-0.5 bg-black text-white font-mono text-[10px]">
                NETWORK
              </span>
            </div>
            <p className="font-mono text-xs text-neutral-700 mt-1 truncate">
              {contact.linkedinHandle}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mac-interactive flex-1 text-center px-3 py-1.5 border border-black bg-black text-white font-retro text-sm tracking-wide hover:bg-white hover:text-black transition-none"
            >
              Open LinkedIn ↗
            </a>
            <button
              type="button"
              onClick={() => onCopyToast(contact.linkedin, "LinkedIn URL")}
              className="mac-interactive px-2.5 py-1.5 border border-black bg-white text-black font-retro text-sm hover:bg-black hover:text-white transition-none"
            >
              Copy
            </button>
          </div>
        </div>

        {/* Email */}
        <div className="border border-black bg-white p-4 shadow-mac flex flex-col justify-between gap-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-retro text-lg font-bold uppercase">
                03 // Email
              </span>
              <span className="px-1.5 py-0.5 bg-black text-white font-mono text-[10px]">
                DIRECT
              </span>
            </div>
            <p className="font-mono text-xs text-neutral-700 mt-1 truncate">
              {contact.email}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`mailto:${contact.email}`}
              className="mac-interactive flex-1 text-center px-3 py-1.5 border border-black bg-black text-white font-retro text-sm tracking-wide hover:bg-white hover:text-black transition-none"
            >
              Send Email ✉
            </a>
            <button
              type="button"
              onClick={() => onCopyToast(contact.email, "Email Address")}
              className="mac-interactive px-2.5 py-1.5 border border-black bg-white text-black font-retro text-sm hover:bg-black hover:text-white transition-none"
            >
              Copy
            </button>
          </div>
        </div>

        {/* Resume */}
        <div className="border border-black bg-white p-4 shadow-mac flex flex-col justify-between gap-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-retro text-lg font-bold uppercase">
                04 // Resume
              </span>
              <span className="px-1.5 py-0.5 border border-black bg-neutral-100 text-black font-mono text-[10px]">
                PLACEHOLDER
              </span>
            </div>
            <p className="font-mono text-xs text-neutral-700 mt-1 truncate">
              Kenn_Xavier_Dabon_Resume.pdf
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenWindow("resume")}
              className="mac-interactive w-full text-center px-3 py-1.5 border border-black bg-black text-white font-retro text-sm tracking-wide hover:bg-white hover:text-black transition-none"
            >
              Open Resume Window ↗
            </button>
          </div>
        </div>
      </div>

      {/* Quick Memo Composer */}
      <form
        onSubmit={handleDispatchEmail}
        className="border border-black bg-neutral-50 p-4 shadow-mac space-y-3"
      >
        <div className="flex items-center justify-between border-b border-black pb-2">
          <h3 className="font-retro text-lg uppercase tracking-wide font-bold">
            Quick AppleTalk Memo → {owner.name}
          </h3>
          <span className="font-mono text-[10px] text-neutral-500">
            SMTP // READY
          </span>
        </div>

        <div className="space-y-1">
          <label className="block font-mono text-xs font-semibold text-black">
            Subject:
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g., Software Engineering Internship / Project Opportunity"
            className="w-full border border-black bg-white px-3 py-1.5 text-xs font-sans focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        <div className="space-y-1">
          <label className="block font-mono text-xs font-semibold text-black">
            Message Body:
          </label>
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Hi Kenn, I came across your xnnkvr OS portfolio..."
            className="w-full border border-black bg-white p-3 text-xs font-sans focus:outline-none focus:ring-1 focus:ring-black resize-none"
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="font-mono text-[11px] text-neutral-600">
            To: {contact.email}
          </span>
          <button
            type="submit"
            className="mac-interactive px-4 py-1.5 border border-black bg-black text-white font-retro text-base tracking-wide hover:bg-white hover:text-black shadow-[1px_1px_0px_#000] transition-none"
          >
            Transmit Memo ↗
          </button>
        </div>
      </form>
    </div>
  );
}
