import React, { useState, useEffect } from 'react';
import { HERO_SHOWCASE_SLIDES } from '../utils/reelLogic';

interface HeroSectionProps {
  onTryFreeUrlClick: () => void;
}

export const ReelestateLogo: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
  <svg
    viewBox="0 0 256 256"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 128 L 64 128 Z M 256 192 L 256 256 L 192.5 256 L 160 95 L 128 192 L 128 128 L 192 128 Z M 128 64 L 128 128 L 64.5 128 L 32 95 L 0 64 L 0 0 L 64 0 Z M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 128 0 L 192 0 Z"
      fill="#ffffff"
    />
  </svg>
);

export const HeroSection: React.FC<HeroSectionProps> = ({ onTryFreeUrlClick }) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % HERO_SHOWCASE_SLIDES.length);
    }, 5000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Seamless Looping 3D Camera-Pan Showcase (Crossfades every 5s) */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden bg-black grayscale contrast-125 brightness-[0.45]"
        aria-hidden="true"
      >
        {HERO_SHOWCASE_SLIDES.map((slide, index) => {
          const isActive = index === activeSlideIndex;
          return (
            <div
              key={slide.url}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img
                src={slide.url}
                alt={slide.label}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover will-change-transform ${
                  isActive ? 'animate-hero-pan' : 'scale-105'
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Subtle HUD Wireframe Overlay & Live Badge in Corner */}
      <div
        className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
        aria-hidden="true"
      >
        {/* Subtle 3D perspective wireframe lines */}
        <svg
          viewBox="0 0 1440 900"
          className="w-full h-full opacity-20"
          fill="none"
          preserveAspectRatio="none"
        >
          <rect
            x="40"
            y="88"
            width="1360"
            height="772"
            rx="24"
            stroke="white"
            strokeWidth="0.75"
            strokeDasharray="6 6"
          />
          <line x1="720" y1="88" x2="720" y2="116" stroke="white" strokeWidth="0.75" />
          <line x1="720" y1="832" x2="720" y2="860" stroke="white" strokeWidth="0.75" />
          <line x1="40" y1="450" x2="68" y2="450" stroke="white" strokeWidth="0.75" />
          <line x1="1372" y1="450" x2="1400" y2="450" stroke="white" strokeWidth="0.75" />
        </svg>
      </div>

      {/* Live HUD Corner Badge */}
      <div className="pointer-events-none absolute left-6 md:left-10 top-24 md:top-24 z-20 flex items-center gap-3">
        <div className="bg-neutral-900/90 backdrop-blur border border-white/10 rounded-full px-3.5 py-1.5 flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          <span className="text-[11px] text-white/90 tracking-tight">
            ai motion engine: active // 60fps 3d pan
          </span>
          <span className="text-[11px] text-white/40 hidden sm:inline">
            · 0{activeSlideIndex + 1}/0{HERO_SHOWCASE_SLIDES.length}{' '}
            {HERO_SHOWCASE_SLIDES[activeSlideIndex].label}
          </span>
        </div>
      </div>

      {/* Navbar */}
      <div className="absolute z-20 px-6 md:px-10 pt-6 top-0 left-0 right-0">
        <nav className="flex items-center justify-between gap-4" aria-label="primary navigation">
          {/* Left pill */}
          <a
            href="#"
            className="flex items-center gap-2 bg-neutral-900/90 backdrop-blur border border-white/10 rounded-full pl-4 pr-6 py-3 shrink-0"
          >
            <ReelestateLogo className="h-5 w-5" />
            <span className="text-white text-sm font-normal tracking-tight whitespace-nowrap">
              reelestate
            </span>
          </a>

          {/* Center pill */}
          <div className="hidden md:flex items-center gap-1 bg-neutral-900/90 backdrop-blur border border-white/10 rounded-full px-3 py-2">
            <a
              href="#generator"
              className="text-neutral-300 hover:text-white transition-colors text-sm px-5 py-2 rounded-full whitespace-nowrap"
            >
              generator
            </a>
            <a
              href="#pipeline"
              className="text-neutral-300 hover:text-white transition-colors text-sm px-5 py-2 rounded-full whitespace-nowrap"
            >
              pipeline
            </a>
            <a
              href="#calculator"
              className="text-neutral-300 hover:text-white transition-colors text-sm px-5 py-2 rounded-full whitespace-nowrap"
            >
              roi
            </a>
            <a
              href="#pricing"
              className="text-neutral-300 hover:text-white transition-colors text-sm px-5 py-2 rounded-full whitespace-nowrap"
            >
              pricing
            </a>
          </div>

          {/* Right button */}
          <button
            type="button"
            onClick={onTryFreeUrlClick}
            className="bg-white text-black text-sm font-normal rounded-full px-6 py-3 hover:bg-neutral-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            try free url
          </button>
        </nav>
      </div>

      {/* Foreground Content Wrapper */}
      <div className="relative h-full w-full z-10">
        {/* Three giant staggered headline words */}
        <h1 className="hero-title absolute left-4 md:left-10 top-[18%] text-white font-medium text-[14vw] md:text-[13vw] select-none">
          animate
        </h1>
        <h1 className="hero-title absolute right-4 md:right-10 top-[38%] text-white font-medium text-[14vw] md:text-[13vw] select-none">
          your
        </h1>
        <h1 className="hero-title absolute left-[18%] md:left-[28%] top-[58%] text-white font-medium text-[14vw] md:text-[13vw] select-none">
          reels
        </h1>

        {/* Description paragraph */}
        <p className="absolute left-6 md:left-10 top-[46%] max-w-[240px] text-[15px] leading-snug text-white/90">
          paste any property or car listing url to generate 3d reels and auto-book buyers via dm
        </p>

        {/* Stat block — top-right */}
        <div className="absolute right-6 md:right-24 top-[14%]">
          <div className="flex items-center gap-3 justify-end">
            <div className="hidden md:block h-px w-24 bg-white/40 rotate-[20deg]" />
            <span className="text-4xl md:text-5xl font-medium tracking-tight tabular-nums text-white">
              +14k
            </span>
          </div>
          <p className="text-xs md:text-sm text-white/70 mt-1 text-right">
            agents &amp; dealers
          </p>
        </div>

        {/* Bottom gradient overlay */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-black"
          aria-hidden="true"
        />

        {/* Stat block — bottom-left */}
        <div className="absolute left-6 md:left-20 bottom-20 md:bottom-24">
          <div className="flex items-center gap-3">
            <span className="text-4xl md:text-5xl font-medium tracking-tight tabular-nums text-white">
              +420k
            </span>
            <div className="hidden md:block h-px w-24 bg-white/40 rotate-[-20deg]" />
          </div>
          <p className="text-xs md:text-sm text-white/70 mt-1">
            showings booked via dm
          </p>
        </div>

        {/* Stat block — bottom-right */}
        <div className="absolute right-6 md:right-20 bottom-16 md:bottom-20">
          <div className="flex items-center gap-3 justify-end">
            <div className="hidden md:block h-px w-24 bg-white/40 rotate-[-20deg]" />
            <span className="text-4xl md:text-5xl font-medium tracking-tight tabular-nums text-white">
              60sec
            </span>
          </div>
          <p className="text-xs md:text-sm text-white/70 mt-1 text-right">
            listing url to viral reel
          </p>
        </div>
      </div>
    </section>
  );
};
