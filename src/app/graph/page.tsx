"use client";

import { useAnalysis } from "@/context/AnalysisContext";
import GraphView from "@/components/GraphView";
import Timeline from "@/components/Timeline";
import { Network, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function GraphPage() {
  const { resultData } = useAnalysis();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  if (!resultData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
        <div className="p-5 rounded-2xl bg-black/5 dark:bg-zinc-900/60 border border-black/5 dark:border-zinc-800 mb-6">
          <Share2 className="w-12 h-12 text-stone-400 dark:text-zinc-600 mx-auto" />
        </div>
        <h2 className="text-2xl font-bold mb-2">No Graph Data</h2>
        <p className="text-stone-500 dark:text-zinc-500 mb-8 max-w-xs">Run a claim analysis first to visualize the knowledge graph.</p>
        <Link href="/" className="group inline-flex items-center gap-2 px-6 py-3 bg-brand-green hover:bg-green-600 text-white rounded-xl font-bold text-sm tracking-wide transition-all duration-200 hover:shadow-[0_4px_20px_rgba(16,185,129,0.4)] hover:-translate-y-0.5">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> New Analysis
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col h-screen overflow-hidden p-6 gap-5"
    >
      {/* Header */}
      <header className="flex items-center gap-4 shrink-0">
        <div className="p-2.5 rounded-xl bg-brand-green/10 border border-brand-green/20">
          <Network className="w-5 h-5 text-brand-green" />
        </div>
        <div>
          <h1 className="text-2xl font-black tracking-tight text-stone-900 dark:text-white">Knowledge Graph</h1>
          <p className="text-xs text-stone-500 dark:text-zinc-500 uppercase tracking-widest mt-0.5">Entity & Relationship Map</p>
        </div>
        <div className="ml-auto flex items-center gap-2 text-xs text-green-600 dark:text-green-400 bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-full font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-green dark:bg-green-400 pulse-dot" /> {resultData.triplets?.length ?? 0} nodes mapped
        </div>
      </header>

      {/* Graph + Timeline */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 relative rounded-2xl overflow-hidden glass-card">
          <GraphView triplets={resultData.triplets} />
        </div>
        <div className="lg:col-span-1 h-full overflow-y-auto">
          <Timeline events={resultData.timeline} />
        </div>
      </div>
    </motion.div>
  );
}
