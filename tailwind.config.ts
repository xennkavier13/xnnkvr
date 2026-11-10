import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        retro: ["var(--font-vt323)", "monospace"],
        pixel: ["var(--font-press-start)", "monospace"],
        mono: ["var(--font-ibm-mono)", "monospace"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        mac: "2px 2px 0px #000000",
        "mac-lg": "4px 4px 0px #000000",
        "mac-inset": "inset 1px 1px 0px #000000, inset -1px -1px 0px #000000",
      },
    },
  },
  plugins: [],
};

export default config;
