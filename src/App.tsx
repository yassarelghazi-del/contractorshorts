/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef } from 'react';
import { HeroSection } from './components/HeroSection';
import { LiveSandboxSection } from './components/LiveSandboxSection';
import { VerticalShowcaseSection } from './components/VerticalShowcaseSection';
import { BentoPipelineSection } from './components/BentoPipelineSection';
import { RoiCalculatorSection } from './components/RoiCalculatorSection';
import { PricingFooterSection } from './components/PricingFooterSection';

export default function App() {
  const generatorInputRef = useRef<HTMLInputElement | null>(null);

  const scrollToGeneratorAndFocus = () => {
    const el = document.getElementById('generator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    window.setTimeout(() => {
      generatorInputRef.current?.focus();
    }, 450);
  };

  return (
    <main className="min-h-screen bg-black text-white lowercase selection:bg-white selection:text-black">
      <HeroSection onTryFreeUrlClick={scrollToGeneratorAndFocus} />
      <LiveSandboxSection inputRef={generatorInputRef} />
      <VerticalShowcaseSection />
      <BentoPipelineSection />
      <RoiCalculatorSection />
      <PricingFooterSection onStartFreeUrlClick={scrollToGeneratorAndFocus} />
    </main>
  );
}
