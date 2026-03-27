"use client";

import { useState } from "react";
import { FileText, Info } from "lucide-react";
import { motion } from "framer-motion";

const LABEL_CONFIG: Record<string, { bg: string; text: string; dot: string; border: string }> = {
  VERIFIED: { bg: "bg-green-500/15", text: "text-green-300", dot: "bg-green-500", border: "border-green-500/25" },
  TRUE:     { bg: "bg-green-500/15", text: "text-green-300", dot: "bg-green-500", border: "border-green-500/25" },
  UNCERTAIN: { bg: "bg-yellow-500/15", text: "text-yellow-300", dot: "bg-yellow-500", border: "border-yellow-500/25" },
  MISLEADING:{ bg: "bg-yellow-500/15", text: "text-yellow-300", dot: "bg-yellow-500", border: "border-yellow-500/25" },
  FALSE: { bg: "bg-red-500/15", text: "text-red-600 dark:text-red-300", dot: "bg-red-500", border: "border-red-500/25" },
  FAKE:  { bg: "bg-red-500/15", text: "text-red-600 dark:text-red-300", dot: "bg-red-500", border: "border-red-500/25" },
};
const DEFAULT_LABEL = { bg: "bg-black/5 dark:bg-zinc-800/60", text: "text-stone-600 dark:text-zinc-300", dot: "bg-stone-400 dark:bg-zinc-500", border: "border-black/5 dark:border-zinc-700" };

export default function ArticleHighlight({ analysis = [] }: { analysis: any[] }) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  if (!analysis || analysis.length === 0) return null;

  const verified = analysis.filter((a) => a.label?.toUpperCase() === "VERIFIED" || a.label?.toUpperCase() === "TRUE").length;
  const uncertain = analysis.filter((a) => a.label?.toUpperCase() === "UNCERTAIN" || a.label?.toUpperCase() === "MISLEADING").length;
  const wrong = analysis.length - verified - uncertain;

  return (
    <div className="glass-card p-7 relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-5 border-b border-black/5 dark:border-zinc-800/60 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-brand-green/10 border border-brand-green/20">
            <FileText className="w-5 h-5 text-brand-green" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-stone-900 dark:text-white tracking-tight">Sentence-by-Sentence Analysis</h2>
            <p className="text-xs text-stone-500 dark:text-zinc-500 mt-0.5">Hover any sentence to see its verdict detail</p>
          </div>
        </div>
        {/* Summary pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />{verified} Verified
          </span>
          <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />{uncertain} Uncertain
          </span>
          <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />{wrong} False
          </span>
        </div>
      </div>

      {/* Sentence stream */}
      <div className="leading-8 text-base flex flex-wrap gap-x-1.5 gap-y-2 font-medium">
        {analysis.map((item, i) => {
          const cfg = LABEL_CONFIG[item.label?.toUpperCase()] ?? DEFAULT_LABEL;
          return (
            <span
              key={i}
              onMouseEnter={() => setActiveIdx(i)}
              onMouseLeave={() => setActiveIdx(null)}
              className={`group relative px-2 py-0.5 rounded-lg cursor-help border transition-all duration-200 ${cfg.bg} ${cfg.text} ${cfg.border} ${
                activeIdx === i ? "scale-[1.02] shadow-lg" : ""
              }`}
            >
              {item.sentence}

              {/* Tooltip */}
              {activeIdx === i && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 p-4 bg-white dark:bg-zinc-900 border border-black/10 dark:border-zinc-700/80 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-2xl z-50 pointer-events-none"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                    <span className={`text-xs font-black tracking-widest uppercase ${cfg.text}`}>
                      {item.label} — {item.confidence}%
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-zinc-300 leading-relaxed">{item.reason}</p>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white dark:border-t-zinc-900 drop-shadow-sm" />
                </motion.div>
              )}
            </span>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-black/5 dark:border-zinc-800/50 flex items-center gap-2 text-stone-500 dark:text-zinc-500">
        <Info className="w-3.5 h-3.5 shrink-0" />
        <p className="text-[11px]">Colour coding: <span className="text-green-600 dark:text-green-400 font-semibold">Green = Verified</span>, <span className="text-yellow-600 dark:text-yellow-400 font-semibold">Yellow = Uncertain</span>, <span className="text-red-600 dark:text-red-400 font-semibold">Red = False</span></p>
      </div>
    </div>
  );
}
