"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Network, Library, Search, Radio, Home } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const links = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/", label: "New Analysis", icon: Search },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/graph", label: "Knowledge Graph", icon: Network },
  { href: "/sources", label: "Evidence & Sources", icon: Library },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { theme } = useTheme();

  return (
    <div className="w-64 h-screen glass-panel border-r border-black/5 dark:border-white/[0.05] flex flex-col pt-8 pb-5 px-4 sticky top-0 shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10 px-2 group cursor-default select-none">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 via-rose-600 to-red-700 flex items-center justify-center shadow-[0_0_20px_rgba(225,29,72,0.45)] group-hover:shadow-[0_0_28px_rgba(225,29,72,0.65)] transition-shadow duration-300">
          <span className="text-white font-black text-lg tracking-tight">V</span>
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight leading-none">
            <span className="text-stone-900 dark:text-stone-100">Veri</span><span className="text-brand-green">Flow</span>
          </h1>
          <p className="text-[10px] text-stone-500 dark:text-stone-500 tracking-widest uppercase mt-0.5">Fact Engine</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-1">
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (pathname.startsWith(href) && href !== "/");
          return (
            <Link
              key={href}
              href={href}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative overflow-hidden ${
                isActive
                  ? "bg-brand-green/10 text-brand-green border border-brand-green/20"
                  : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-black/5 dark:hover:bg-white/[0.04] border border-transparent"
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-2.5 bottom-2.5 w-0.5 rounded-r-full bg-brand-green" />
              )}
              <Icon
                size={17}
                className={`shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                  isActive ? "text-brand-green" : "text-stone-400 group-hover:text-brand-green"
                }`}
              />
              <span className="font-medium text-sm">{label}</span>
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-green pulse-dot" />
              )}
            </Link>
          );
        })}
      </nav>



      {/* Footer */}
      <div className="pt-4 border-t border-black/10 dark:border-white/[0.05] px-2">
        <div className="flex items-center gap-2 mb-1.5">
          <Radio size={11} className="text-emerald-500 pulse-dot" />
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold tracking-widest uppercase">Live Engine Active</span>
        </div>
        <p className="text-[10px] text-stone-500 dark:text-stone-600 tracking-wide">Hackathon Edition · 2025</p>
      </div>
    </div>
  );
}
