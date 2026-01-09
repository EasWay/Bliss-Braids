'use client';

import { useState } from 'react';
import { Check, User, Star, ArrowRight, Menu } from 'lucide-react';
import { clsx } from 'clsx';

// --- THEME DEFINITIONS ---
const THEMES = {
  bold: {
    name: "Option 1: Bold & Energetic",
    colors: {
      bg: "#000000",        // Black
      surface: "#121212",   // Standard Dark Surface
      primary: "#FD3DB5",   // Magenta
      secondary: "#00FFFF", // Electric Cyan
      text: "#FFFFFF",      // White
      muted: "#B0B0B0",     // Light Grey
      border: "#333333"     // Dark Grey Border
    },
    desc: "Neon Noir. High fashion & tech-forward. Signals you are the trendsetter."
  },
  soft: {
    name: "Option 2: Soft & Sophisticated",
    colors: {
      bg: "#6D3B07",        // Mocha
      surface: "#542E06",   // Deep Brown (Darker for depth)
      primary: "#DCA1A1",   // Dusty Rose
      secondary: "#EDE8D0", // Champagne/Beige
      text: "#FFFDD0",      // Cream
      muted: "#E0DCC0",     // Muted Cream
      border: "#8B5E3C"     // Lighter Brown Border
    },
    desc: "Feminine Luxury. Organic, warm, and comforting. Feels like a spa embrace."
  },
  earthy: {
    name: "Option 3: Earthy & Grounded",
    colors: {
      bg: "#2E6F40",        // Forest Green
      surface: "#22522F",   // Darker Forest Green
      primary: "#CE8946",   // Bronze
      secondary: "#E6E6FA", // Lavender
      text: "#CBBD93",      // Sand
      muted: "#A69B76",     // Muted Sand
      border: "#438C57"     // Lighter Green Border
    },
    desc: "Natural / Royal. Treats hair as a crown. Signals growth, wealth, and tranquility."
  }
};

type ThemeKey = keyof typeof THEMES;

export default function ColorPaletteTester() {
  const [activeTheme, setActiveTheme] = useState<ThemeKey>('bold');
  const theme = THEMES[activeTheme];
  const c = theme.colors;

  return (
    <div className="min-h-screen p-4 md:p-8 font-sans transition-colors duration-500" 
         style={{ backgroundColor: '#f0f0f0' }}> 
      
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* --- CONTROLS --- */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-xl border border-slate-200">
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 md:mb-6">🎨 Brand Vibe Simulator</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {(Object.keys(THEMES) as ThemeKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTheme(key)}
                className={clsx(
                  "p-3 md:p-4 rounded-xl text-left border-2 transition-all duration-200 relative overflow-hidden group",
                  activeTheme === key 
                    ? "border-pink-500 ring-2 ring-pink-200 bg-pink-50" 
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={clsx("font-bold text-sm md:text-base", activeTheme === key ? "text-pink-600" : "text-slate-700")}>
                    {THEMES[key].name}
                  </span>
                  {activeTheme === key && <Check className="w-4 h-4 md:w-5 md:h-5 text-pink-500" />}
                </div>
                <div className="flex gap-2 mb-2">
                  <div className="w-5 h-5 rounded-full border border-black/10" style={{ backgroundColor: THEMES[key].colors.bg }} />
                  <div className="w-5 h-5 rounded-full border border-black/10" style={{ backgroundColor: THEMES[key].colors.primary }} />
                  <div className="w-5 h-5 rounded-full border border-black/10" style={{ backgroundColor: THEMES[key].colors.secondary }} />
                </div>
                <p className="text-xs text-slate-500 line-clamp-3 md:line-clamp-none">{THEMES[key].desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* --- PREVIEW WINDOW (Mobile Simulator) --- */}
        <div className="flex justify-center">
            {/* Phone Bezel Container */}
            <div 
            className="w-full max-w-[375px] rounded-[2.5rem] overflow-hidden shadow-2xl transition-colors duration-500 border-[8px] border-slate-900 bg-black relative"
            >
            {/* Notch (Optional Visual) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-slate-900 rounded-b-xl z-20" />

            <div 
                className="h-full w-full overflow-y-auto"
                style={{ backgroundColor: c.bg, minHeight: '700px' }}
            >
                {/* Mock Header */}
                <header className="p-4 pt-8 flex items-center justify-between border-b transition-colors duration-500 relative z-10"
                        style={{ borderColor: c.border }}>
                    <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: c.primary }}>
                        <span className="text-white font-bold">B</span>
                    </div>
                    <span className="font-bold text-lg" style={{ color: c.text }}>Bliss</span>
                    </div>
                    
                    {/* Mobile Menu Icon (Always visible now) */}
                    <button>
                        <Menu className="w-6 h-6" style={{ color: c.text }} />
                    </button>
                </header>

                <main className="p-6 space-y-12 pb-12">
                    
                    {/* 1. Hero Section Vibe */}
                    <div className="text-center space-y-4">
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border"
                            style={{ borderColor: c.secondary, color: c.secondary }}>
                        Private Studio
                    </span>
                    <h1 className="text-4xl font-bold tracking-tighter transition-colors duration-500 leading-tight"
                        style={{ color: c.text }}>
                        Luxury <span style={{ color: c.primary }}>Braiding</span><br/>
                        in Accra.
                    </h1>
                    <p className="text-sm transition-colors duration-500 leading-relaxed"
                        style={{ color: c.muted }}>
                        Experience world-class styling in a private, secure environment. 
                        No waiting, just flawless results.
                    </p>
                    <div className="flex flex-col gap-3 pt-4">
                        <button className="w-full px-6 py-3 rounded-full font-bold text-base flex items-center justify-center gap-2"
                                style={{ backgroundColor: c.text, color: c.bg }}>
                        View Services <ArrowRight className="w-5 h-5" />
                        </button>
                        <button className="w-full px-6 py-3 rounded-full font-bold text-base border"
                                style={{ borderColor: c.border, color: c.text }}>
                        Watch Video
                        </button>
                    </div>
                    </div>

                    {/* 2. Service Card Vibe */}
                    <div className="grid grid-cols-1 gap-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="p-5 rounded-2xl transition-colors duration-500"
                            style={{ backgroundColor: c.surface, border: `1px solid ${c.border}` }}>
                        <div className="w-10 h-10 rounded-full mb-4 flex items-center justify-center"
                            style={{ backgroundColor: `${c.primary}20` }}>
                            <User className="w-5 h-5" style={{ color: c.primary }} />
                        </div>
                        <h3 className="text-lg font-bold mb-2" style={{ color: c.text }}>Knotless Braids</h3>
                        <p className="mb-4 text-xs" style={{ color: c.muted }}>
                            Pain-free, lightweight, and natural looking.
                        </p>
                        <div className="flex items-center justify-between mt-auto">
                            <span className="text-base font-bold" style={{ color: c.secondary }}>GHS 150</span>
                            <button className="text-xs font-medium hover:underline" style={{ color: c.primary }}>
                            Customize →
                            </button>
                        </div>
                        </div>
                    ))}
                    </div>

                    {/* 3. Review / Trust Vibe */}
                    <div className="text-center p-6 rounded-2xl border"
                        style={{ borderColor: c.secondary, backgroundColor: `${c.secondary}10` }}>
                    <div className="flex justify-center gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} className="w-4 h-4 fill-current" style={{ color: c.secondary }} />
                        ))}
                    </div>
                    <p className="text-base font-medium italic mb-3" style={{ color: c.text }}>
                        "The best braiding experience I've had in Ghana. The studio is so chill and she is fast!"
                    </p>
                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: c.muted }}>
                        - Sarah A.
                    </p>
                    </div>

                </main>
            </div>
            </div>
        </div>

      </div>
    </div>
  );
}