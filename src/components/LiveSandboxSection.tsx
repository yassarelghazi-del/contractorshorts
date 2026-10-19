import React, { useState, useEffect, useRef } from 'react';
import {
  Check,
  Sparkles,
  Volume2,
  VolumeX,
  Send,
  Calendar,
  FileText,
  ArrowUpRight,
  RotateCcw,
} from 'lucide-react';
import {
  SAMPLE_LISTINGS,
  GENERATION_STAGES,
  parseListingUrl,
  ListingPreset,
} from '../utils/reelLogic';

interface LiveSandboxSectionProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export const LiveSandboxSection: React.FC<LiveSandboxSectionProps> = ({ inputRef }) => {
  const [urlInput, setUrlInput] = useState<string>(SAMPLE_LISTINGS.villa.url);
  const [activePreset, setActivePreset] = useState<ListingPreset>(SAMPLE_LISTINGS.villa);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(3); // Completed initial state so sandbox is rich on load
  const [hasGeneratedOnce, setHasGeneratedOnce] = useState<boolean>(true);
  const [subtitleIndex, setSubtitleIndex] = useState<number>(0);
  const [voiceoverMuted, setVoiceoverMuted] = useState<boolean>(false);
  const [webhookCopied, setWebhookCopied] = useState<boolean>(false);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSubtitleIndex((prev) => (prev + 1) % activePreset.subtitles.length);
    }, 2800);
    return () => window.clearInterval(interval);
  }, [activePreset]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const triggerGenerationSequence = (targetPreset: ListingPreset) => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];

    setValidationError(null);
    setActivePreset(targetPreset);
    setIsGenerating(true);
    setCurrentStageIndex(0);

    GENERATION_STAGES.forEach((_, idx) => {
      if (idx > 0) {
        const t = window.setTimeout(() => {
          setCurrentStageIndex(idx);
        }, idx * 650);
        timersRef.current.push(t);
      }
    });

    const finishTimer = window.setTimeout(() => {
      setIsGenerating(false);
      setHasGeneratedOnce(true);
      setCurrentStageIndex(GENERATION_STAGES.length - 1);
    }, GENERATION_STAGES.length * 650);
    timersRef.current.push(finishTimer);
  };

  const handleSelectSample = (sampleKey: 'villa' | 'porsche') => {
    const sample = SAMPLE_LISTINGS[sampleKey];
    setUrlInput(sample.url);
    triggerGenerationSequence(sample);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseListingUrl(urlInput);
    if (!parsed.valid) {
      setValidationError(parsed.error || 'invalid listing url');
      return;
    }
    triggerGenerationSequence(parsed.preset);
  };

  const handleCopyWebhook = () => {
    setWebhookCopied(true);
    window.setTimeout(() => setWebhookCopied(false), 2000);
  };

  return (
    <section id="generator" className="max-w-5xl mx-auto px-6 py-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs text-white/70 tracking-tight">01 / live sandbox</span>
            <div className="h-px w-16 bg-white/40 rotate-[-20deg]" />
          </div>
          <h2 className="hero-title text-4xl md:text-6xl font-medium text-white">
            url-to-reel studio
          </h2>
        </div>
        <p className="text-sm text-white/70 max-w-xs leading-relaxed">
          drop any active property or dealership inventory link to synthesize a 9:16 3d tour and arm your auto-dm funnel.
        </p>
      </div>

      {/* Floating Pill Bar */}
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-900/90 backdrop-blur border border-white/10 rounded-3xl md:rounded-full p-2 flex flex-col md:flex-row items-center gap-2"
      >
        <label htmlFor="listing-url-input" className="sr-only">
          listing url
        </label>
        <input
          id="listing-url-input"
          ref={inputRef}
          type="text"
          value={urlInput}
          onChange={(e) => {
            setUrlInput(e.target.value);
            if (validationError) setValidationError(null);
          }}
          placeholder="paste zillow, realtor, propertyfinder, or autotrader url..."
          className="bg-transparent text-white placeholder-white/40 px-6 py-3 flex-1 w-full focus:outline-none text-sm"
        />

        <div className="flex flex-wrap md:flex-nowrap items-center gap-2 w-full md:w-auto justify-end px-2 md:px-0">
          <button
            type="button"
            onClick={() => handleSelectSample('villa')}
            className={`rounded-full px-4 py-2 text-xs transition-colors border cursor-pointer whitespace-nowrap ${
              activePreset.id === 'villa'
                ? 'bg-white/20 text-white border-white/40 font-medium'
                : 'bg-black/50 text-white/70 border-white/10 hover:border-white/40 hover:text-white'
            }`}
          >
            sample villa url
          </button>
          <button
            type="button"
            onClick={() => handleSelectSample('porsche')}
            className={`rounded-full px-4 py-2 text-xs transition-colors border cursor-pointer whitespace-nowrap ${
              activePreset.id === 'porsche'
                ? 'bg-white/20 text-white border-white/40 font-medium'
                : 'bg-black/50 text-white/70 border-white/10 hover:border-white/40 hover:text-white'
            }`}
          >
            sample porsche url
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto bg-white text-black rounded-full px-8 py-3.5 text-sm font-medium hover:bg-neutral-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            generate 15s reel
          </button>
        </div>
      </form>

      {validationError && (
        <p role="alert" className="text-xs text-white/90 mt-3 pl-4">
          ! {validationError}
        </p>
      )}

      {/* 4-Stage Live Progress Bar using Monochrome Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
        {GENERATION_STAGES.map((stageLabel, index) => {
          const isCompleted = !isGenerating && hasGeneratedOnce ? true : index < currentStageIndex;
          const isCurrent = isGenerating && index === currentStageIndex;
          return (
            <div
              key={stageLabel}
              className={`rounded-2xl px-4 py-3.5 border backdrop-blur transition-all duration-200 flex items-start justify-between gap-2 ${
                isCurrent
                  ? 'bg-white text-black border-white'
                  : isCompleted
                  ? 'bg-neutral-900/90 text-white border-white/40'
                  : 'bg-neutral-900/90 text-white/40 border-white/10'
              }`}
            >
              <span className="text-xs leading-snug">{stageLabel}</span>
              <span className="shrink-0 mt-0.5">
                {isCompleted ? (
                  <Check className="h-3.5 w-3.5 text-white" />
                ) : isCurrent ? (
                  <Sparkles className="h-3.5 w-3.5 text-black animate-spin" />
                ) : null}
              </span>
            </div>
          );
        })}
      </div>

      {/* Live Synthesized Output Preview Card */}
      <div className="mt-8 bg-neutral-900/90 backdrop-blur border border-white/10 rounded-3xl p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: 9:16 Synthesized Reel Preview */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-[280px] aspect-[9/16] rounded-3xl overflow-hidden border border-white/20 bg-black flex flex-col justify-between p-4">
            {/* Simulated 3D Camera Pan Visual */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={
                  activePreset.category === 'automotive'
                    ? 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=85'
                    : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85'
                }
                alt={activePreset.title}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover grayscale contrast-125 animate-3d-pan transition-opacity duration-300 ${
                  isGenerating ? 'opacity-25' : 'opacity-65'
                }`}
              />
              {/* Architectural / Automotive 3D depth grid overlay */}
              <svg
                viewBox="0 0 280 500"
                className="absolute inset-0 w-full h-full opacity-35 pointer-events-none"
                fill="none"
              >
                <line x1="0" y1="120" x2="280" y2="180" stroke="white" strokeWidth="0.5" strokeDasharray="3 3" />
                <line x1="0" y1="360" x2="280" y2="300" stroke="white" strokeWidth="0.5" strokeDasharray="3 3" />
                <rect x="28" y="90" width="224" height="320" rx="12" stroke="white" strokeWidth="0.5" strokeOpacity="0.4" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />
            </div>

            {/* Top HUD inside 9:16 Reel */}
            <div className="relative z-10 flex items-center justify-between text-[11px] text-white/90">
              <span className="bg-black/70 backdrop-blur border border-white/20 rounded-full px-3 py-1">
                {activePreset.sourceDomain}
              </span>
              <button
                type="button"
                onClick={() => setVoiceoverMuted((m) => !m)}
                aria-label={voiceoverMuted ? 'unmute ai voiceover' : 'mute ai voiceover'}
                className="bg-black/70 backdrop-blur border border-white/20 rounded-full p-2 text-white hover:bg-white hover:text-black transition-colors cursor-pointer"
              >
                {voiceoverMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
              </button>
            </div>

            {/* Center Dynamic Lowercase Subtitles */}
            <div className="relative z-10 my-auto text-center px-2">
              {isGenerating ? (
                <div className="bg-black/80 backdrop-blur border border-white/20 rounded-2xl p-4">
                  <p className="text-xs text-white/90">
                    {GENERATION_STAGES[currentStageIndex]}
                  </p>
                </div>
              ) : (
                <div className="bg-black/75 backdrop-blur border border-white/20 rounded-2xl px-3.5 py-2.5">
                  <p className="text-xs font-medium text-white leading-snug">
                    “{activePreset.subtitles[subtitleIndex]}”
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Listing Overlay */}
            <div className="relative z-10 space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-lg font-medium text-white tabular-nums">
                  {activePreset.price}
                </span>
                <span className="text-[11px] text-white/70">{activePreset.location}</span>
              </div>
              <p className="text-xs text-white/90 truncate">{activePreset.title}</p>
              <div className="bg-white text-black rounded-full px-3 py-1.5 text-[11px] font-medium text-center">
                comment &apos;{activePreset.dmKeyword}&apos; for instant brochure dm
              </div>
            </div>
          </div>
        </div>

        {/* Right: Scraped Specs, Voiceover & Armed Webhook Status */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <p className="text-xs text-white/40">scraped listing payload</p>
              <h3 className="text-2xl font-medium text-white mt-1">{activePreset.title}</h3>
              <p className="text-sm text-white/70 mt-0.5">
                {activePreset.price} · {activePreset.location} · {activePreset.estimatedViews}
              </p>
            </div>
            <button
              type="button"
              onClick={() => triggerGenerationSequence(activePreset)}
              className="flex items-center gap-2 rounded-full border border-white/20 bg-black px-4 py-2 text-xs text-white/90 hover:border-white transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>re-synthesize</span>
            </button>
          </div>

          {/* Scraped Specs Row */}
          <div>
            <p className="text-xs text-white/40 mb-2.5">extracted specs &amp; camera keyframes</p>
            <div className="flex flex-wrap items-center gap-2 text-xs text-white/90">
              {activePreset.specs.map((spec, idx) => (
                <React.Fragment key={spec}>
                  <span>{spec}</span>
                  {idx < activePreset.specs.length - 1 && (
                    <span className="text-white/40" aria-hidden="true">
                      /
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Synced ElevenLabs Voiceover Script */}
          <div className="bg-black/60 border border-white/10 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between text-xs text-white/40">
              <span>elevenlabs neural voiceover script (15.0s)</span>
              <span>{voiceoverMuted ? 'muted' : 'audio synced'}</span>
            </div>
            <p className="text-sm text-white/90 leading-relaxed">
              “{activePreset.voiceoverScript}”
            </p>
          </div>

          {/* Armed GoHighLevel / Instagram / WhatsApp Webhook Box */}
          <div className="bg-black/60 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-white">
                <Send className="h-3.5 w-3.5 text-white/70" />
                <span>
                  ig &amp; whatsapp keyword trigger: <strong>&apos;{activePreset.dmKeyword}&apos;</strong>
                </span>
              </div>
              <p className="text-xs text-white/70 flex items-center gap-2">
                <FileText className="h-3.5 w-3.5 text-white/40" />
                <span>auto-attaches {activePreset.brochureName} + calendar link</span>
              </p>
            </div>

            <button
              type="button"
              onClick={handleCopyWebhook}
              className="bg-white text-black rounded-full px-5 py-2.5 text-xs font-medium hover:bg-neutral-200 transition-colors flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
            >
              {webhookCopied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>webhook armed &amp; copied</span>
                </>
              ) : (
                <>
                  <Calendar className="h-3.5 w-3.5" />
                  <span>copy ghl webhook url</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
