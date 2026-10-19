import React, { useState } from 'react';
import { calculateRoiMetrics } from '../utils/reelLogic';

export const RoiCalculatorSection: React.FC = () => {
  const [listingsPerMonth, setListingsPerMonth] = useState<number>(8);
  const [avgCommission, setAvgCommission] = useState<number>(8500);

  const metrics = calculateRoiMetrics(listingsPerMonth, avgCommission);

  return (
    <section id="calculator" className="max-w-5xl mx-auto px-6 py-24 border-t border-white/10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs text-white/70 tracking-tight">04 / revenue projection</span>
            <div className="h-px w-16 bg-white/40 rotate-[20deg]" />
          </div>
          <h2 className="hero-title text-4xl md:text-6xl font-medium text-white">
            commission &amp; roi calculator
          </h2>
        </div>
        <p className="text-sm text-white/70 max-w-xs leading-relaxed">
          model how many editing hours you reclaim and how many extra closings automated dm qualification adds each month.
        </p>
      </div>

      {/* Monochrome Glass Panel */}
      <div className="bg-neutral-900/90 backdrop-blur border border-white/10 rounded-3xl p-8 md:p-12 space-y-12">
        {/* Two Interactive Range Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Slider 1: listings promoted per month */}
          <div className="space-y-4">
            <div className="flex items-baseline justify-between">
              <label htmlFor="listings-slider" className="text-sm text-white/70">
                listings promoted per month
              </label>
              <span className="text-3xl font-medium text-white tabular-nums">
                {metrics.listingsPerMonth}
              </span>
            </div>
            <input
              id="listings-slider"
              type="range"
              min={1}
              max={30}
              step={1}
              value={listingsPerMonth}
              onChange={(e) => setListingsPerMonth(Number(e.target.value))}
              className="mono-slider w-full"
            />
            <div className="flex justify-between text-xs text-white/40 tabular-nums">
              <span>1 listing</span>
              <span>15 listings</span>
              <span>30 listings</span>
            </div>
          </div>

          {/* Slider 2: average commission per closing */}
          <div className="space-y-4">
            <div className="flex items-baseline justify-between">
              <label htmlFor="commission-slider" className="text-sm text-white/70">
                average commission per closing
              </label>
              <span className="text-3xl font-medium text-white tabular-nums">
                ${metrics.avgCommission.toLocaleString()}
              </span>
            </div>
            <input
              id="commission-slider"
              type="range"
              min={2000}
              max={25000}
              step={500}
              value={avgCommission}
              onChange={(e) => setAvgCommission(Number(e.target.value))}
              className="mono-slider w-full"
            />
            <div className="flex justify-between text-xs text-white/40 tabular-nums">
              <span>$2,000</span>
              <span>$13,500</span>
              <span>$25,000</span>
            </div>
          </div>
        </div>

        {/* Dynamic Output Stats with Diagonal Dividers */}
        <div className="pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Stat 1 */}
          <div className="bg-black/60 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between gap-3">
              <span className="text-4xl md:text-5xl font-medium text-white tabular-nums">
                {metrics.editingHoursSaved}h
              </span>
              <div className="h-px w-16 bg-white/40 rotate-[-20deg]" />
            </div>
            <p className="text-xs md:text-sm text-white/70 mt-3">
              editing hours saved / mo
            </p>
          </div>

          {/* Stat 2 */}
          <div className="bg-black/60 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between gap-3">
              <span className="text-4xl md:text-5xl font-medium text-white tabular-nums">
                +{metrics.qualifiedDmLeads}
              </span>
              <div className="h-px w-16 bg-white/40 rotate-[20deg]" />
            </div>
            <p className="text-xs md:text-sm text-white/70 mt-3">
              qualified dm leads / mo
            </p>
          </div>

          {/* Stat 3 */}
          <div className="bg-white text-black rounded-2xl p-6">
            <div className="flex items-center justify-between gap-3">
              <span className="text-3xl lg:text-4xl font-medium tracking-tight tabular-nums">
                +${metrics.projectedExtraCommission.toLocaleString()}
              </span>
              <div className="h-px w-12 shrink-0 bg-black/40 rotate-[-20deg]" />
            </div>
            <p className="text-xs md:text-sm text-black/70 mt-3 font-medium">
              projected extra commission ({metrics.projectedExtraClosings} est. closings/mo)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
