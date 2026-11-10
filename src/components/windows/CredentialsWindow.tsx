"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { CertificatePixelIcon } from "@/components/icons/PixelIcons";
import CRTImage from "@/components/CRTImage";

export default function CredentialsWindow() {
  const { credentials } = PORTFOLIO_DATA;

  return (
    <div className="p-5 sm:p-6 space-y-5">
      {/* Header Banner */}
      <div className="flex items-center justify-between border-b border-black pb-4">
        <div className="flex items-center gap-3">
          <div className="border border-black bg-neutral-50 p-1.5 shadow-[1px_1px_0px_#000]">
            <CertificatePixelIcon size={32} />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight text-black">
              Certifications, Honors &amp; Achievements
            </h2>
            <p className="text-xs text-neutral-600 font-mono">
              4 Verified Credentials • International Standards, Hackathons, &amp; Academic Honors
            </p>
          </div>
        </div>
      </div>

      {/* Credentials Cards */}
      <div className="grid grid-cols-1 gap-4">
        {credentials.map((cred, idx) => (
          <article
            key={cred.id}
            className="border border-black bg-white shadow-mac flex flex-col justify-between"
          >
            {/* Top Bar */}
            <div className="border-b border-black bg-neutral-100 px-3.5 py-2 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 bg-black text-white font-mono text-[10px] font-bold">
                  CERT_0{idx + 1}
                </span>
                <span className="font-mono text-xs text-neutral-700 font-medium">
                  {cred.category}
                </span>
              </div>
              <span className="px-2 py-0.5 border border-black bg-white font-mono text-[10px] font-semibold">
                {cred.badgeCode}
              </span>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-black">
                  {cred.title}
                </h3>
                <p className="text-xs font-medium text-neutral-600 mt-0.5">
                  Issued by: {cred.issuer}
                </p>
              </div>

              <p className="text-sm text-neutral-800 leading-relaxed">
                {cred.description}
              </p>

              {cred.screenshotUrl && (
                <CRTImage
                  src={cred.screenshotUrl}
                  alt={`${cred.title} certificate or photo`}
                  caption={`${cred.badgeCode}.BMP`}
                  aspectRatio="certificate"
                />
              )}

              {cred.verifyUrl && cred.verifyLabel && (
                <div className="pt-1 flex items-center justify-end">
                  <a
                    href={cred.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mac-interactive px-3 py-1.5 border border-black bg-black text-white font-retro text-sm tracking-wide hover:bg-white hover:text-black shadow-[1px_1px_0px_#000] transition-none inline-flex items-center gap-1.5"
                  >
                    <span>{cred.verifyLabel}</span>
                    <span className="font-mono text-xs">↗</span>
                  </a>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
