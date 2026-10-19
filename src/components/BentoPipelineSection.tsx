import React from 'react';
import { Cpu, Share2, Bot } from 'lucide-react';

export const BentoPipelineSection: React.FC = () => {
  return (
    <section id="pipeline" className="max-w-5xl mx-auto px-6 py-24 border-t border-white/10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs text-white/70 tracking-tight">03 / automated architecture</span>
            <div className="h-px w-16 bg-white/40 rotate-[-20deg]" />
          </div>
          <h2 className="hero-title text-4xl md:text-6xl font-medium text-white">
            3-step bento pipeline
          </h2>
        </div>
        <p className="text-sm text-white/70 max-w-xs leading-relaxed">
          zero video editors, zero manual social posting, and zero missed buyer dms at 11pm.
        </p>
      </div>

      {/* Staggered Monochrome Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Card 1: Span 7 */}
        <div className="md:col-span-7 bg-neutral-900/90 backdrop-blur border border-white/10 rounded-3xl p-8 flex flex-col justify-between min-h-[300px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/40 tabular-nums">step 01</span>
              <div className="h-px w-16 bg-white/40 rotate-[-20deg]" />
            </div>
            <Cpu className="h-5 w-5 text-white/70" />
          </div>

          <div className="my-8 grid grid-cols-3 gap-3">
            <div className="bg-black/60 border border-white/10 rounded-2xl p-3">
              <p className="text-[11px] text-white/40">input source</p>
              <p className="text-xs text-white mt-1">zillow / autotrader</p>
            </div>
            <div className="bg-black/60 border border-white/10 rounded-2xl p-3">
              <p className="text-[11px] text-white/40">depth synthesis</p>
              <p className="text-xs text-white mt-1">60fps camera path</p>
            </div>
            <div className="bg-black/60 border border-white/10 rounded-2xl p-3">
              <p className="text-[11px] text-white/40">voice &amp; subs</p>
              <p className="text-xs text-white mt-1">elevenlabs clone</p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-medium text-white">
              url scraper + 3d motion engine
            </h3>
            <p className="text-sm text-white/70 mt-2 leading-relaxed">
              pulls photos &amp; specs automatically and renders smooth drone-style room transitions.
            </p>
          </div>
        </div>

        {/* Card 2: Span 5 */}
        <div className="md:col-span-5 bg-neutral-900/90 backdrop-blur border border-white/10 rounded-3xl p-8 flex flex-col justify-between min-h-[300px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/40 tabular-nums">step 02</span>
              <div className="h-px w-16 bg-white/40 rotate-[-20deg]" />
            </div>
            <Share2 className="h-5 w-5 text-white/70" />
          </div>

          <div className="my-8 space-y-2">
            <div className="flex items-center justify-between text-xs bg-black/60 border border-white/10 rounded-full px-4 py-2.5">
              <span className="text-white">instagram reels</span>
              <span className="text-white/40">peak 6:15 pm est</span>
            </div>
            <div className="flex items-center justify-between text-xs bg-black/60 border border-white/10 rounded-full px-4 py-2.5">
              <span className="text-white">tiktok property tok</span>
              <span className="text-white/40">peak 7:30 pm est</span>
            </div>
            <div className="flex items-center justify-between text-xs bg-black/60 border border-white/10 rounded-full px-4 py-2.5">
              <span className="text-white">youtube shorts</span>
              <span className="text-white/40">peak 8:00 pm est</span>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-medium text-white">
              omnichannel auto-scheduler
            </h3>
            <p className="text-sm text-white/70 mt-2 leading-relaxed">
              publishes directly to reels, tiktok, and youtube shorts at peak local buyer hours.
            </p>
          </div>
        </div>

        {/* Card 3: Full-Width Span 12 Staggered Bottom Bento Card */}
        <div className="md:col-span-12 bg-neutral-900/90 backdrop-blur border border-white/10 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-xl space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/40 tabular-nums">step 03</span>
              <div className="h-px w-16 bg-white/40 rotate-[-20deg]" />
              <Bot className="h-4 w-4 text-white/70" />
            </div>
            <h3 className="text-2xl md:text-3xl font-medium text-white">
              24/7 dm &amp; whatsapp calendar closer
            </h3>
            <p className="text-sm text-white/70 leading-relaxed">
              powered by gohighlevel webhook automation; qualifies every commenter and books your calendar while you sleep.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 shrink-0">
            <div className="bg-black/60 border border-white/10 rounded-2xl p-4">
              <p className="text-2xl font-medium text-white tabular-nums">1.4s</p>
              <p className="text-xs text-white/40 mt-1">avg dm response speed</p>
            </div>
            <div className="bg-black/60 border border-white/10 rounded-2xl p-4">
              <p className="text-2xl font-medium text-white tabular-nums">100%</p>
              <p className="text-xs text-white/40 mt-1">pre-approval check</p>
            </div>
            <div className="col-span-2 sm:col-span-1 bg-black/60 border border-white/10 rounded-2xl p-4">
              <p className="text-2xl font-medium text-white tabular-nums">24/7</p>
              <p className="text-xs text-white/40 mt-1">direct calendar sync</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
