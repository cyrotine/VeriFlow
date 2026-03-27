"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import InputPanel from "@/components/InputPanel";
import LoadingSteps from "@/components/LoadingSteps";
import { useAnalysis } from "@/context/AnalysisContext";



const HEADLINES = [
  "Is this claim real?",
  "Spot the fake news.",
  "Don't share misinformation.",
  "Truth is one click away.",
];

export default function Home() {
  const router = useRouter();
  const { setResultData, isAnalyzing, setIsAnalyzing } = useAnalysis();
  const [headlineIdx, setHeadlineIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  // Rotating sub-headline typewriter cycling
  useEffect(() => {
    const cycle = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setHeadlineIdx((i) => (i + 1) % HEADLINES.length);
        setVisible(true);
      }, 400);
    }, 3200);
    return () => clearInterval(cycle);
  }, []);

  const handleAnalyze = async (claim: string) => {
    setIsAnalyzing(true);
    setResultData(null);
    try {
      const response = await fetch("https://railway-deploy-production-04af.up.railway.app/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ claim }),
      });
      const data = await response.json();
      setResultData(data);
      router.push("/dashboard");
    } catch (error) {
      console.error("Analysis failed", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <main className="min-h-screen px-6 md:px-12 py-10 max-w-4xl mx-auto flex flex-col justify-center">
      {!isAnalyzing ? (
        <div className="space-y-10">
          {/* Hero Header */}
          <header className="flex flex-col items-center text-center space-y-6 pt-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 bg-brand-green/10 border border-brand-green/20 px-5 py-2 rounded-full">
              <ShieldCheck className="w-4 h-4 text-brand-green" />
              <span className="text-emerald-700 dark:text-emerald-300 font-semibold tracking-widest text-xs uppercase">
                AI-Powered Fact Verification
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green pulse-dot" />
            </div>

            {/* Main headline */}
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] text-stone-900 dark:text-white drop-shadow-sm">
              Verify the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-400 dark:from-brand-green dark:to-emerald-300 drop-shadow-md">Truth</span>{" "}
              <br className="hidden md:block" />in Seconds.
            </h1>

            {/* Rotating sub-headline */}
            <p
              className="text-xl md:text-2xl font-semibold text-stone-600 dark:text-stone-300 transition-all duration-400"
              style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(6px)" }}
            >
              {HEADLINES[headlineIdx]}
            </p>

            <p className="text-stone-600 dark:text-stone-400 max-w-xl text-lg leading-relaxed font-medium">
              Combat misinformation with Natural Language Processing. Paste any news
              claim and get a verdict backed by real web evidence in seconds.
            </p>


          </header>

          {/* Input Panel */}
          <InputPanel onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <LoadingSteps />
        </div>
      )}
    </main>
  );
}
