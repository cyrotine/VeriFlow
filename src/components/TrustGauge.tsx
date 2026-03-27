"use client";

import { AlertTriangle, CheckCircle, HelpCircle, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const VERDICT_CONFIG: Record<string, {
  label: string;
  color: string;
  border: string;
  glow: string;
  bg: string;
  bar: string;
  Icon: React.ElementType;
}> = {
  VERIFIED: {
    label: "VERIFIED",
    color: "text-green-400",
    border: "border-green-500/30",
    glow: "shadow-[0_0_40px_rgba(34,197,94,0.15)]",
    bg: "bg-green-500/8",
    bar: "from-green-400 to-green-500",
    Icon: CheckCircle,
  },
  TRUE: {
    label: "VERIFIED",
    color: "text-green-400",
    border: "border-green-500/30",
    glow: "shadow-[0_0_40px_rgba(34,197,94,0.15)]",
    bg: "bg-green-500/8",
    bar: "from-green-400 to-green-500",
    Icon: CheckCircle,
  },
  MISLEADING: {
    label: "MISLEADING",
    color: "text-blue-500",
    border: "border-blue-500/30",
    glow: "shadow-[0_0_40px_rgba(59,130,246,0.15)]",
    bg: "bg-blue-500/8",
    bar: "from-blue-400 to-blue-500",
    Icon: AlertTriangle,
  },
  FALSE: {
    label: "FALSE",
    color: "text-red-400",
    border: "border-red-500/30",
    glow: "shadow-[0_0_40px_rgba(239,68,68,0.15)]",
    bg: "bg-red-500/8",
    bar: "from-red-400 to-red-500",
    Icon: AlertTriangle,
  },
  FAKE: {
    label: "FAKE",
    color: "text-red-400",
    border: "border-red-500/30",
    glow: "shadow-[0_0_40px_rgba(239,68,68,0.15)]",
    bg: "bg-red-500/8",
    bar: "from-red-400 to-red-500",
    Icon: AlertTriangle,
  },
};

const DEFAULT_CFG = {
  label: "UNCERTAIN",
  color: "text-yellow-400",
  border: "border-yellow-500/30",
  glow: "shadow-[0_0_40px_rgba(234,179,8,0.12)]",
  bg: "bg-yellow-500/8",
  bar: "from-yellow-400 to-yellow-500",
  Icon: HelpCircle,
};

export default function TrustGauge({
  verdict = "Unknown",
  confidence = 0,
}: {
  verdict: string;
  confidence: number;
}) {
  const cfg = VERDICT_CONFIG[verdict?.toUpperCase()] ?? DEFAULT_CFG;
  const { label, color, border, glow, bg, bar, Icon } = cfg;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative overflow-hidden p-8 rounded-2xl border ${border} ${glow} bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl`}
    >
      {/* Background glow blob */}
      <div className={`absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl opacity-15 bg-gradient-to-br ${bar}`} />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Left: Verdict */}
        <div className="flex items-center gap-5">
          <div className={`p-4 rounded-2xl ${bg} border ${border}`}>
            <Icon className={`w-10 h-10 ${color}`} />
          </div>
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-stone-500 dark:text-zinc-500 mb-1">Final Verdict</p>
            <h2 className={`text-5xl font-black tracking-tight ${color} leading-none`}>{label}</h2>
          </div>
        </div>

        {/* Right: Confidence */}
        <div className="w-full md:w-72">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-zinc-500 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" /> Confidence Score
            </span>
            <span className={`text-2xl font-black ${color}`}>{confidence}%</span>
          </div>
          {/* Bar track */}
          <div className="h-2.5 bg-black/5 dark:bg-zinc-900 rounded-full overflow-hidden border border-black/5 dark:border-zinc-800">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${confidence}%` }}
              transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
              className={`h-full rounded-full bg-gradient-to-r ${bar} shadow-sm`}
            />
          </div>
          {/* Markers */}
          <div className="flex justify-between mt-1 text-[10px] text-stone-500 dark:text-zinc-600 font-medium">
            <span>0%</span><span>25%</span><span>50%</span><span>75%</span><span>100%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
