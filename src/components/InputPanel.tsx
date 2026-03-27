"use client";

import { useState, useRef } from "react";
import { Clipboard, Trash2, ArrowRight, FileText, Mic, Camera, StopCircle, Image as ImageIcon } from "lucide-react";

export default function InputPanel({
  onAnalyze,
  isAnalyzing,
}: {
  onAnalyze: (claim: string) => void;
  isAnalyzing: boolean;
}) {
  const [claim, setClaim] = useState("");
  const [focused, setFocused] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  const wordCount = claim.trim() ? claim.trim().split(/\s+/).length : 0;
  const charCount = claim.length;
  const isOverLimit = wordCount > 5000;

  const handleAnalyze = () => {
    if (!claim.trim() || isOverLimit) return;
    onAnalyze(claim);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setClaim(text);
      textRef.current?.focus();
    } catch {
      /* clipboard access denied */
    }
  };

  const handleVoiceToggle = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => setIsRecording(false);
    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsRecording(false);
    };

    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      
      if (finalTranscript) {
        setClaim(prev => prev + (prev.endsWith(' ') || !prev ? '' : ' ') + finalTranscript);
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://railway-deploy-production-04af.up.railway.app/analyze-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "OCR failed");
      }

      const data = await response.json();
      if (data.raw_text) {
        setClaim(data.raw_text);
        onAnalyze(data.raw_text);
      }
    } catch (err: any) {
      alert("Error processing image: " + err.message);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div
      className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
        focused
          ? "shadow-[0_0_0_1px_rgba(16,185,129,0.35),0_0_40px_rgba(16,185,129,0.08)] border border-brand-green/35"
          : "border border-black/5 dark:border-white/[0.06] shadow-2xl"
      } bg-white/70 dark:bg-[rgba(14,14,16,0.7)] backdrop-blur-xl`}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-black/5 dark:border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <FileText className="w-4 h-4 text-brand-green" />
          <span className="text-xs font-bold tracking-widest uppercase text-stone-500 dark:text-stone-400">
            Paste Claim or Article
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded tracking-widest uppercase transition-colors duration-200 ${
            isOverLimit
              ? "bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/20"
              : "bg-black/5 dark:bg-white/[0.04] text-stone-600 dark:text-stone-400 border border-black/5 dark:border-white/[0.05]"
          }`}>
            {wordCount.toLocaleString()} / 5,000 words
          </span>
        </div>
      </div>

      {/* Textarea */}
      <textarea
        ref={textRef}
        className="w-full px-5 py-4 bg-transparent text-stone-900 dark:text-stone-200 resize-none min-h-[260px] focus:outline-none font-sans text-sm leading-7 placeholder:text-stone-400 dark:placeholder:text-stone-600"
        placeholder={`E.g., "Scientists claim a new drug cures cancer in 24 hours..." — paste any news headline or full article text here.`}
        value={claim}
        onChange={(e) => setClaim(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        disabled={isAnalyzing}
      />

      {/* Bottom toolbar */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-black/5 dark:border-white/[0.05]">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePaste}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-black/5 dark:bg-white/[0.04] hover:bg-black/10 dark:hover:bg-white/[0.07] text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 rounded-lg text-xs font-medium transition-all duration-200 border border-black/5 dark:border-white/[0.06]"
          >
            <Clipboard className="w-3.5 h-3.5" /> Paste
          </button>
          
          <button
            onClick={handleVoiceToggle}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border border-black/5 dark:border-white/[0.06] ${
              isRecording 
                ? "bg-red-500/10 text-red-500 border-red-500/20 animate-pulse" 
                : "bg-black/5 dark:bg-white/[0.04] hover:bg-black/10 dark:hover:bg-white/[0.07] text-stone-600 dark:text-stone-400"
            }`}
          >
            {isRecording ? <StopCircle className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
            {isRecording ? "Stop" : "Voice"}
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-black/5 dark:bg-white/[0.04] hover:bg-black/10 dark:hover:bg-white/[0.07] text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 rounded-lg text-xs font-medium transition-all duration-200 border border-black/5 dark:border-white/[0.06]"
          >
            {isUploading ? <div className="w-3.5 h-3.5 border-2 border-brand-green/30 border-t-brand-green rounded-full animate-spin" /> : <Camera className="w-3.5 h-3.5" />}
            Image
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />

          <button
            onClick={() => { setClaim(""); textRef.current?.focus(); }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-black/5 dark:bg-white/[0.04] hover:bg-red-100 dark:hover:bg-red-900/25 text-stone-600 dark:text-stone-400 hover:text-brand-red dark:hover:text-red-400 rounded-lg text-xs font-medium transition-all duration-200 border border-black/5 dark:border-white/[0.06] hover:border-red-500/25"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear
          </button>
        </div>
        <span className="text-[10px] text-zinc-500">{charCount.toLocaleString()} chars</span>
      </div>

      {/* Analyze button */}
      <div className="px-5 pb-5">
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !claim.trim() || isOverLimit}
          className={`w-full group relative flex items-center justify-center gap-2.5 py-4 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-300 overflow-hidden ${
            isAnalyzing || !claim.trim() || isOverLimit
              ? "bg-black/5 dark:bg-white/[0.04] text-stone-400 dark:text-stone-600 cursor-not-allowed border border-black/5 dark:border-white/[0.05]"
              : "bg-gradient-to-r from-brand-green via-brand-red to-brand-green text-white hover:shadow-[0_6px_28px_rgba(16,185,129,0.35)] hover:-translate-y-0.5 border border-brand-green/20 bg-[length:200%_auto] hover:bg-[position:100%_0]"
          }`}
        >
          {/* Shine sweep on hover */}
          {!isAnalyzing && claim.trim() && (
            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-in-out" />
          )}
          <span className="relative z-10 flex items-center gap-2">
            {isAnalyzing ? "Analyzing…" : "Analyze Claim"}
            {!isAnalyzing && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />}
          </span>
        </button>
      </div>
    </div>
  );
}
