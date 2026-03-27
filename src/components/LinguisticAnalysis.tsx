"use client";

import { Activity, AlertTriangle, MessageSquareWarning } from "lucide-react";
import { motion } from "framer-motion";

export default function LinguisticAnalysis({ data }: { data: any }) {
  if (!data) return null;

  const metrics = [
    { label: "Emotion", value: data.emotion_score, color: "bg-rose-500", text: "text-rose-400" },
    { label: "Manipulation", value: data.manipulation_score, color: "bg-purple-500", text: "text-purple-400" },
    { label: "Bias", value: data.bias_score, color: "bg-blue-500", text: "text-blue-400" },
  ];

  return (
    <div className="glass-card p-7 relative overflow-hidden mt-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-5 border-b border-white/[0.06]">
        <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
          <Activity className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-stone-100 tracking-tight">Linguistic Fingerprint</h2>
          <p className="text-xs text-stone-500 mt-0.5">Gemini semantic & structural analysis</p>
        </div>
        
        <div className="ml-auto px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-400">Tone:</span>
          <span className="text-xs font-black text-indigo-300">{data.tone}</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {metrics.map((m, i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-stone-400">
              <span>{m.label}</span>
              <span className={m.text}>{Math.round(m.value * 100)}%</span>
            </div>
            <div className="h-1.5 w-full bg-stone-900 rounded-full overflow-hidden border border-white/[0.05]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${m.value * 100}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className={`h-full rounded-full ${m.color}`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Key Flags */}
      {data.key_flags && data.key_flags.length > 0 && (
        <div className="bg-stone-900/40 border border-stone-800 rounded-xl p-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-3 flex items-center gap-2">
            <MessageSquareWarning className="w-3.5 h-3.5 text-amber-500" /> Key Linguistic Flags
          </h3>
          <ul className="space-y-2">
            {data.key_flags.map((flag: string, i: number) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                className="flex items-start gap-2 text-sm text-stone-300"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500/70 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{flag}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
