import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { ReelestateLogo } from './HeroSection';

interface PricingTier {
  name: string;
  price: string;
  badge?: string;
  highlighted?: boolean;
  features: string[];
}

const PRICING_TIERS: PricingTier[] = [
  {
    name: 'starter agent',
    price: '$297',
    features: [
      '8 ai listing reels/mo',
      'auto voiceover & captions',
      'instagram & whatsapp dm auto-responder',
      'calendar sync',
    ],
  },
  {
    name: 'growth brokerage',
    price: '$497',
    badge: 'most popular',
    highlighted: true,
    features: [
      '25 ai listing reels/mo',
      'custom cloned agent voice',
      '24/7 ai voice receptionist for missed calls',
      'dead lead reactivation campaigns',
    ],
  },
  {
    name: 'dealership / team',
    price: '$997',
    features: [
      'unlimited sub-accounts',
      'bulk inventory rss feed-to-reel automation',
      'dedicated webhook setup',
    ],
  },
];

interface PricingFooterSectionProps {
  onStartFreeUrlClick: () => void;
}

export const PricingFooterSection: React.FC<PricingFooterSectionProps> = ({
  onStartFreeUrlClick,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<PricingTier | null>(null);
  const [agentEmail, setAgentEmail] = useState<string>('');
  const [brokerageUrl, setBrokerageUrl] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);
  const [submittedPlan, setSubmittedPlan] = useState<string | null>(null);

  const handlePlanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = agentEmail.trim().toLowerCase();
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setFormError('please enter a valid work email address.');
      return;
    }
    setFormError(null);
    setSubmittedPlan(selectedPlan?.name || 'growth brokerage');
  };

  return (
    <>
      <section id="pricing" className="max-w-5xl mx-auto px-6 py-24 border-t border-white/10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs text-white/70 tracking-tight">05 / b2b plans</span>
              <div className="h-px w-16 bg-white/40 rotate-[-20deg]" />
            </div>
            <h2 className="hero-title text-4xl md:text-6xl font-medium text-white">
              subscription pricing
            </h2>
          </div>
          <p className="text-sm text-white/70 max-w-xs leading-relaxed">
            one extra closing pays for 17+ months of your entire automated reel &amp; dm pipeline.
          </p>
        </div>

        {/* 3 Monochrome Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`bg-neutral-900/90 backdrop-blur rounded-3xl p-8 flex flex-col justify-between ${
                tier.highlighted ? 'border-2 border-white' : 'border border-white/10'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-6">
                  <h3 className="text-lg font-medium text-white">{tier.name}</h3>
                  {tier.badge && (
                    <span className="bg-white text-black text-xs font-medium rounded-full px-3 py-1 whitespace-nowrap">
                      {tier.badge}
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl md:text-5xl font-medium text-white tabular-nums">
                    {tier.price}
                  </span>
                  <span className="text-sm text-white/40">/mo</span>
                </div>

                <div className="h-px w-16 bg-white/40 rotate-[-20deg] mb-8" />

                <ul className="space-y-3.5 mb-8">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-sm text-white/90">
                      <Check className="h-4 w-4 text-white shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedPlan(tier);
                  setSubmittedPlan(null);
                  setFormError(null);
                }}
                className={`w-full rounded-full py-3.5 px-6 text-sm font-medium transition-colors cursor-pointer ${
                  tier.highlighted
                    ? 'bg-white text-black hover:bg-neutral-200'
                    : 'bg-black text-white border border-white/20 hover:border-white'
                }`}
              >
                select {tier.name}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Minimalist Footer */}
      <footer className="border-t border-white/10 bg-black">
        <div className="max-w-5xl mx-auto px-6 py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <ReelestateLogo className="h-5 w-5" />
            <span className="text-white text-sm font-normal tracking-tight">reelestate</span>
            <span className="text-white/40 text-xs">
              · ai listing-to-reel &amp; dm booking engine
            </span>
          </div>

          <button
            type="button"
            onClick={onStartFreeUrlClick}
            className="bg-white text-black text-sm font-medium rounded-full px-7 py-3.5 hover:bg-neutral-200 transition-colors cursor-pointer whitespace-nowrap"
          >
            start with a free listing url
          </button>
        </div>
      </footer>

      {/* Interactive Plan Onboarding Modal */}
      {selectedPlan && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-plan-title"
        >
          <div className="bg-neutral-900 border border-white/20 rounded-3xl max-w-md w-full p-8 relative">
            <button
              type="button"
              onClick={() => setSelectedPlan(null)}
              aria-label="close onboarding dialog"
              className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {submittedPlan ? (
              <div className="space-y-4 py-4">
                <div className="h-10 w-10 rounded-full bg-white text-black flex items-center justify-center">
                  <Check className="h-5 w-5" />
                </div>
                <h3 id="modal-plan-title" className="text-2xl font-medium text-white">
                  workspace provisioned
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  your <strong>{submittedPlan}</strong> sandbox and gohighlevel dm webhook key have been sent to{' '}
                  <span className="text-white">{agentEmail}</span>.
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedPlan(null)}
                  className="w-full bg-white text-black rounded-full py-3 text-sm font-medium hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  back to reelestate
                </button>
              </div>
            ) : (
              <form onSubmit={handlePlanSubmit} className="space-y-5">
                <div>
                  <span className="text-xs text-white/40">activate subscription</span>
                  <h3 id="modal-plan-title" className="text-2xl font-medium text-white mt-1">
                    {selectedPlan.name} — {selectedPlan.price}/mo
                  </h3>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="agent-work-email" className="text-xs text-white/70 block">
                    brokerage or dealership email
                  </label>
                  <input
                    id="agent-work-email"
                    type="email"
                    value={agentEmail}
                    onChange={(e) => setAgentEmail(e.target.value)}
                    placeholder="alex@sothebysrealty.com"
                    className="w-full bg-black border border-white/15 rounded-2xl px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="agent-first-listing" className="text-xs text-white/70 block">
                    first listing url to animate (optional)
                  </label>
                  <input
                    id="agent-first-listing"
                    type="text"
                    value={brokerageUrl}
                    onChange={(e) => setBrokerageUrl(e.target.value)}
                    placeholder="https://zillow.com/homedetails/..."
                    className="w-full bg-black border border-white/15 rounded-2xl px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white"
                  />
                </div>

                {formError && (
                  <p role="alert" className="text-xs text-white/90">
                    ! {formError}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full bg-white text-black rounded-full py-3.5 text-sm font-medium hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  launch {selectedPlan.name} trial
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
