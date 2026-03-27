"use client";

import { Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function Timeline({ events = [] }: { events: any[] }) {
  if (!events || events.length === 0) return null;

  return (
    <div className="glass-card p-6 flex flex-col h-full relative overflow-hidden">
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-green/5 rounded-full blur-3xl" />

      <div className="flex items-center gap-3 mb-6 z-10">
        <div className="p-1.5 rounded-lg bg-brand-green/10 border border-brand-green/20">
          <Clock className="w-4 h-4 text-brand-green" />
        </div>
        <h2 className="text-base font-bold text-stone-900 dark:text-white tracking-tight">Narrative Timeline</h2>
      </div>

      <div className="relative pl-5 border-l-2 border-black/5 dark:border-zinc-800 space-y-7 flex-1 z-10 py-2">
        {events.map((event, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12, duration: 0.4 }}
            className="relative group"
          >
            {/* Dot */}
            <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full bg-brand-green border-2 border-[var(--card-bg)] dark:border-zinc-950 shadow-[0_0_8px_rgba(16,185,129,0.6)] group-hover:scale-125 transition-transform duration-200" />

            <div className="mb-1">
              <span className="inline-block text-[10px] font-black uppercase tracking-[0.15em] text-green-600 dark:text-brand-green bg-brand-green/10 border border-brand-green/20 px-2 py-0.5 rounded-full">
                {event.time}
              </span>
            </div>
            <p className="text-stone-600 dark:text-zinc-300 text-sm leading-relaxed">{event.text}</p>
          </motion.div>
        ))}

        {/* Live dot at end */}
        <div className="relative">
          <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full bg-green-400 border-2 border-[var(--card-bg)] dark:border-zinc-950 pulse-dot" />
          <span className="text-[10px] font-black uppercase tracking-[0.15em] text-green-400">Live</span>
        </div>
      </div>
    </div>
  );
}
