"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Terminal, Wifi } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  { name: "Connecting to search network", detail: "DuckDuckGo news nodes — syncing…" },
  { name: "Fetching live news articles", detail: "Scanning trusted sources in real-time" },
  { name: "Running linguistic analysis", detail: "Detecting tone, bias & emotional framing" },
  { name: "Extracting knowledge graph", detail: "Building entity relationship map" },
  { name: "Generating AI verdict", detail: "Cross-referencing claim against evidence" },
];

const TERMINAL_LOGS = [
  "[sys] Booting secure sandbox env…",
  "[net] Encrypted tunnel established :8080",
  "[ai] Heuristic engine online · 12.4 TFLOPs",
  "[search] Scanning live news index…",
  "[nlp] Semantic clusters loaded",
  "[graph] Knowledge triplets extracted",
  "[judge] Verdict compilation in progress▌",
];

// Each step is shown for 0.5 s, then the next step appears.
// The LAST step stays as a live spinner until the API responds.
const STEP_INTERVAL_MS = 2000;
const LOG_INTERVAL_MS  = 800; // one log line every 0.8 s

export default function LoadingSteps() {
  const [step, setStep] = useState(0);
  const [logLines, setLogLines] = useState<string[]>([TERMINAL_LOGS[0]]);

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setStep((prev) => {
        // Advance through ALL steps; stop only at the last one (it stays spinning)
        if (prev < STEPS.length - 1) return prev + 1;
        clearInterval(stepTimer);
        return prev;
      });
    }, STEP_INTERVAL_MS);
    return () => clearInterval(stepTimer);
  }, []);

  useEffect(() => {
    const logTimer = setInterval(() => {
      setLogLines((prev) => {
        const next = TERMINAL_LOGS[prev.length];
        return next ? [...prev, next] : prev;
      });
    }, LOG_INTERVAL_MS);
    return () => clearInterval(logTimer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-xl bg-white/90 dark:bg-zinc-950 border border-black/5 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl"
    >
      {/* Title bar */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-black/5 dark:border-zinc-800 bg-black/5 dark:bg-zinc-900/60">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex items-center gap-2 mx-auto">
          <Terminal className="w-4 h-4 text-brand-green" />
          <span className="text-xs font-bold tracking-widest uppercase text-stone-500 dark:text-zinc-400">VeriFlow · Analysis Engine</span>
        </div>
        <Wifi className="w-4 h-4 text-green-400 pulse-dot ml-auto" />
      </div>

      {/* Steps */}
      <div className="p-5 space-y-3">
        {STEPS.map((s, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0.4 }}
              animate={{ opacity: active || done ? 1 : 0.4 }}
              className={`flex items-start gap-3 p-3.5 rounded-xl transition-all duration-300 ${
                done ? "bg-brand-green/10 border border-brand-green/20" :
                active ? "bg-black/5 dark:bg-zinc-900 border border-brand-green/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]" :
                "border border-transparent"
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {done ? (
                  <CheckCircle2 className="w-5 h-5 text-brand-green" />
                ) : active ? (
                  <Loader2 className="w-5 h-5 text-brand-green animate-spin" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-stone-300 dark:border-zinc-700 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-stone-300 dark:bg-zinc-700" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold tracking-tight ${done ? "text-green-600 dark:text-green-400" : active ? "text-stone-900 dark:text-white" : "text-stone-500 dark:text-zinc-600"}`}>
                  {s.name}
                </p>

              </div>
              {done && <span className="text-[10px] font-black uppercase tracking-wider text-brand-green bg-brand-green/10 px-2 py-0.5 rounded-full shrink-0">Done</span>}
              {active && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  transition={{ duration: STEP_INTERVAL_MS / 1000 - 0.3, ease: "linear" }}
                  className="h-1 bg-gradient-to-r from-brand-green to-green-400 rounded-full self-center shrink-0"
                  style={{ maxWidth: 80 }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Terminal log */}
      <div className="px-5 pb-5">
        <div className="bg-black/5 dark:bg-black/60 border border-black/5 dark:border-zinc-800 rounded-xl p-4 font-mono text-[11px] text-stone-500 dark:text-zinc-500 space-y-1 min-h-[80px]">
          <AnimatePresence>
            {logLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className={i === logLines.length - 1 ? "text-brand-green font-semibold" : ""}
              >
                {line}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
