"use client";

import { AnalysisProvider } from "@/context/AnalysisContext";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";

const NEWS_BACKGROUNDS = [
  "/bright_newsroom_1.png",
  "/bright_newspapers_1.png",
  "/bright_pressroom_1.png",
  "/bright_newsdesk_1.png",
];

function NewsBackground() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(NEWS_BACKGROUNDS.length - 1);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setPrevIdx(currentIdx);
        setCurrentIdx((prev) => (prev + 1) % NEWS_BACKGROUNDS.length);
        setFading(false);
      }, 1200);
    }, 7000);
    return () => clearInterval(interval);
  }, [currentIdx]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Previous image (stays visible during fade) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${NEWS_BACKGROUNDS[prevIdx]})` }}
      />
      {/* Current image (fades in) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-[1200ms] ease-in-out"
        style={{
          backgroundImage: `url(${NEWS_BACKGROUNDS[currentIdx]})`,
          opacity: fading ? 0 : 1,
        }}
      />

      {/* Dark/Light overlay — main readability layer */}
      <div className="absolute inset-0 bg-white/70 dark:bg-black/78 transition-colors duration-1000" />

      {/* Brand radial glow top-right */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,_rgba(59,130,246,0.12),_transparent_55%)]" />

      {/* Bottom vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/60 dark:from-black/60 via-transparent to-transparent transition-colors duration-1000" />

      {/* Subtle dot-grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />


    </div>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NewsBackground />

      <AnalysisProvider>
        <div className="flex relative z-10 w-full min-h-screen max-w-[1600px] mx-auto">
          <Sidebar />
          <main className="flex-1 overflow-x-hidden min-h-screen">
            {children}
          </main>
        </div>
      </AnalysisProvider>
    </>
  );
}
