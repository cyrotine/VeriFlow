"use client";

import { Target, Workflow, Network, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutHomePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 md:p-12 max-w-5xl mx-auto space-y-16 min-h-screen flex flex-col justify-center"
    >
      <header className="flex flex-col items-center text-center space-y-6">
        <div className="inline-flex items-center gap-2.5 bg-brand-green/10 border border-brand-green/20 px-5 py-2 rounded-full">
          <ShieldCheck className="w-4 h-4 text-brand-green" />
          <span className="text-emerald-700 dark:text-emerald-300 font-semibold tracking-widest text-xs uppercase">
            VeriFlow Project
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.1] text-stone-900 dark:text-white drop-shadow-sm">
          The Problem with <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-400 dark:from-brand-red dark:to-rose-300 drop-shadow-md">Fake News</span>.
        </h1>
        
        <p className="text-stone-600 dark:text-stone-400 max-w-2xl text-lg leading-relaxed font-medium">
          Static supervised learning approaches fail due to rapid topic shifts and coordinated misinformation campaigns. News articles are deliberately crafted to bypass known linguistic cues.
        </p>
      </header>

      <section className="grid md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="p-8 rounded-2xl bg-black/5 dark:bg-white/[0.02] border border-black/5 dark:border-white/[0.05] space-y-5 hover:bg-black/10 dark:hover:bg-white/[0.04] transition-colors relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Target className="w-24 h-24 text-brand-green" />
          </div>
          <div className="w-12 h-12 rounded-xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center relative z-10">
            <Target className="w-6 h-6 text-brand-green" />
          </div>
          <h4 className="font-black text-xl text-stone-900 dark:text-stone-200 relative z-10">Adversarial Evasion</h4>
          <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-medium relative z-10">
            Bad actors mix factual information with subtle misinformation. A robust detection system must remain effective under these adversarial attacks and continuous concept drift.
          </p>
        </div>

        {/* Card 2 */}
        <div className="p-8 rounded-2xl bg-black/5 dark:bg-white/[0.02] border border-black/5 dark:border-white/[0.05] space-y-5 hover:bg-black/10 dark:hover:bg-white/[0.04] transition-colors relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Network className="w-24 h-24 text-brand-red" />
          </div>
          <div className="w-12 h-12 rounded-xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center relative z-10">
            <Network className="w-6 h-6 text-brand-red" />
          </div>
          <h4 className="font-black text-xl text-stone-900 dark:text-stone-200 relative z-10">Dynamic Reasoning</h4>
          <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-medium relative z-10">
            The system must reason over cross-article consistency, source credibility, temporal evolution of narratives, and external knowledge graphs rather than relying solely on vocabulary.
          </p>
        </div>

        {/* Card 3 */}
        <div className="p-8 rounded-2xl bg-black/5 dark:bg-white/[0.02] border border-black/5 dark:border-white/[0.05] space-y-5 hover:bg-black/10 dark:hover:bg-white/[0.04] transition-colors relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Workflow className="w-24 h-24 text-brand-green" />
          </div>
          <div className="w-12 h-12 rounded-xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center relative z-10">
            <Workflow className="w-6 h-6 text-brand-green" />
          </div>
          <h4 className="font-black text-xl text-stone-900 dark:text-stone-200 relative z-10">Continuous Adaptation</h4>
          <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-medium relative z-10">
            To survive rapid topic shifts, the solution includes online learning and self-updating mechanisms that incorporate new world knowledge without catastrophic forgetting.
          </p>
        </div>
      </section>
    </motion.div>
  );
}
