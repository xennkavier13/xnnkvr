"use client";

import dynamic from "next/dynamic";

const Desktop = dynamic(() => import("@/components/Desktop"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-black" />,
});

export default function HomePage() {
  return <Desktop />;
}
