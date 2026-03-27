"use client";

import { ExternalLink, Shield, Signal } from "lucide-react";
import { motion } from "framer-motion";

export default function EvidenceCards({ evidence = [] }: { evidence: any[] }) {
  if (!evidence || evidence.length === 0) return null;

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/5 dark:border-zinc-800/50">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-brand-green/10 border border-brand-green/20">
            <Shield className="w-5 h-5 text-brand-green" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-stone-900 dark:text-white tracking-tight">Verified Sources</h2>
            <p className="text-xs text-stone-500 dark:text-zinc-500 mt-0.5">Cross-referenced with live web data</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-black/5 dark:bg-zinc-800/60 border border-black/5 dark:border-zinc-700/50 px-3 py-1.5 rounded-full">
          <Signal className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
          <span className="text-xs font-bold text-stone-600 dark:text-zinc-300">{evidence.length} sources</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {evidence.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="group relative bg-black/5 dark:bg-zinc-900/50 hover:bg-black/10 dark:hover:bg-zinc-800/60 border border-black/5 dark:border-zinc-800/60 hover:border-brand-green/35 p-5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(16,185,129,0.1)] flex flex-col gap-3 cursor-default"
          >
            {/* Source name row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 dark:bg-green-400 pulse-dot" />
                <span className="font-bold text-stone-900 dark:text-zinc-100 text-sm">{item.source}</span>
              </div>
              <span className="text-[10px] font-black tracking-widest uppercase text-green-700 dark:text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full">
                Trusted
              </span>
            </div>

            {/* Quote */}
            <p className="text-stone-600 dark:text-zinc-400 text-sm italic leading-relaxed line-clamp-3 border-l-2 border-stone-300 dark:border-zinc-700 pl-3">
              "{item.quote}"
            </p>

            {/* Link */}
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-brand-green hover:text-green-600 dark:hover:text-green-400 font-semibold tracking-wide transition-colors mt-auto link-underline w-fit"
            >
              View Full Source <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
