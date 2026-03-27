"use client";

import { useAnalysis } from "@/context/AnalysisContext";
import TrustGauge from "@/components/TrustGauge";
import ArticleHighlight from "@/components/ArticleHighlight";
import { ShieldCheck, ArrowLeft, BarChart3 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const { resultData } = useAnalysis();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  if (!resultData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
        <div className="p-5 rounded-2xl bg-black/5 dark:bg-zinc-900/60 border border-black/5 dark:border-zinc-800 mb-6">
          <BarChart3 className="w-12 h-12 text-stone-400 dark:text-zinc-600 mx-auto" />
        </div>
        <h2 className="text-2xl font-bold mb-2">No Analysis Yet</h2>
        <p className="text-stone-500 dark:text-zinc-500 mb-8 max-w-xs">Run an analysis on the home page to see your fact-check results here.</p>
        <Link href="/" className="group inline-flex items-center gap-2 px-6 py-3 bg-brand-green hover:bg-green-600 text-white rounded-xl font-bold text-sm tracking-wide transition-all duration-200 hover:shadow-[0_4px_20px_rgba(16,185,129,0.4)] hover:-translate-y-0.5">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> New Analysis
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 md:p-10 max-w-5xl mx-auto space-y-8"
    >
      {/* Page header */}
      <header className="flex items-center gap-4 pb-6 border-b border-black/5 dark:border-white/[0.06]">
        <div className="p-2.5 rounded-xl bg-brand-green/10 border border-brand-green/15">
          <ShieldCheck className="w-6 h-6 text-brand-green" />
        </div>
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-stone-900 to-stone-500 dark:from-white dark:to-stone-400 drop-shadow-sm">Fact-Check Overview</h1>
          <p className="text-xs font-bold text-stone-500 mt-1 uppercase tracking-[0.2em]">Analysis Dashboard</p>
        </div>
        <div className="ml-auto flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" /> Analysis Complete
        </div>
      </header>

      {/* Trust gauge */}
      <TrustGauge verdict={resultData.verdict} confidence={resultData.confidence} />

      {/* Article analysis */}
      {resultData.sentence_analysis && (
        <section>
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-stone-800 dark:text-stone-300 mb-5 flex items-center gap-2.5">
            <span className="w-1.5 h-5 rounded-full bg-brand-green inline-block shadow-[0_0_12px_rgba(16,185,129,0.3)]" />
            Detailed Article Fact Analysis
          </h2>
          <ArticleHighlight analysis={resultData.sentence_analysis} />
        </section>
      )}
    </motion.div>
  );
}
