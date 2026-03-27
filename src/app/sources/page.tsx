"use client";

import { useAnalysis } from "@/context/AnalysisContext";
import EvidenceCards from "@/components/EvidenceCards";
import { BookOpen, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function SourcesPage() {
  const { resultData } = useAnalysis();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  if (!resultData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
        <div className="p-5 rounded-2xl bg-black/5 dark:bg-zinc-900/60 border border-black/5 dark:border-zinc-800 mb-6">
          <ExternalLink className="w-12 h-12 text-stone-400 dark:text-zinc-600 mx-auto" />
        </div>
        <h2 className="text-2xl font-bold mb-2">No Sources Found</h2>
        <p className="text-stone-500 dark:text-zinc-500 mb-8 max-w-xs">Analyze a claim first to see the scraped sources and evidence.</p>
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
      {/* Header */}
      <header className="flex items-center gap-4 pb-6 border-b border-black/5 dark:border-white/[0.06]">
        <div className="p-2.5 rounded-xl bg-brand-green/10 border border-brand-green/15">
          <BookOpen className="w-6 h-6 text-brand-green" />
        </div>
        <div>
          <h1 className="text-2xl font-black tracking-tight text-stone-900 dark:text-stone-100">Evidence Library</h1>
          <p className="text-xs text-stone-500 dark:text-stone-600 mt-0.5 uppercase tracking-widest">Live-Scraped Source Documents</p>
        </div>
        <div className="ml-auto flex items-center gap-2 text-xs text-green-600 dark:text-green-400 bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-full font-semibold">
          {resultData.evidence?.length ?? 0} sources analyzed
        </div>
      </header>

      {/* Context blurb */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-black/5 dark:bg-white/[0.03] border border-black/5 dark:border-white/[0.05]">
        <div className="w-0.5 min-h-[40px] self-stretch rounded-full bg-brand-green/50 shrink-0" />
        <p className="text-stone-600 dark:text-stone-500 text-sm leading-relaxed">
          The following sources were scraped in real-time by our search agent and cross-referenced to evaluate the authenticity of this claim. Each source has been indexed from trusted news outlets.
        </p>
      </div>

      <EvidenceCards evidence={resultData.evidence} />
    </motion.div>
  );
}
