import React, { useState } from 'react';
import { Layers, MessageCircle, FileText, CalendarCheck, Send } from 'lucide-react';

interface SimulatedComment {
  id: string;
  handle: string;
  text: string;
  status: string;
}

const INITIAL_COMMENTS: SimulatedComment[] = [
  {
    id: 'c1',
    handle: '@marcus.beverlyhills',
    text: 'tour',
    status: 'sent floorplan pdf + booking link in 1.2s',
  },
  {
    id: 'c2',
    handle: '@elena_capital',
    text: 'tour please! is seller open to 14 day close?',
    status: 'sent floorplan pdf + qualified cash buyer',
  },
  {
    id: 'c3',
    handle: '@devon.motorsport',
    text: 'tour',
    status: 'sent spec sheet + locked tue 4:00 pm',
  },
];

export const VerticalShowcaseSection: React.FC = () => {
  // Frame 1 state: before/after toggle between flat photo & 3d camera walkthrough
  const [frame1Mode, setFrame1Mode] = useState<'3d' | 'flat'>('3d');

  // Frame 2 state: live simulated comments popping up
  const [comments, setComments] = useState<SimulatedComment[]>(INITIAL_COMMENTS);
  const [customHandle, setCustomHandle] = useState<string>('');

  // Frame 3 state: buyer financing qualification selection
  const [buyerQualification, setBuyerQualification] = useState<'cash' | 'pre-approved'>('cash');
  const [selectedSlot, setSelectedSlot] = useState<string>('tuesday, 4:00 pm');

  const handleSimulateComment = () => {
    const cleanHandle = customHandle.trim()
      ? customHandle.trim().startsWith('@')
        ? customHandle.trim().toLowerCase()
        : `@${customHandle.trim().toLowerCase()}`
      : `@buyer_${Math.floor(100 + Math.random() * 899)}`;

    const nextComment: SimulatedComment = {
      id: `c-${Date.now()}`,
      handle: cleanHandle,
      text: 'tour',
      status: 'instant dm dispatched · brochure + calendar link',
    };
    setComments((prev) => [nextComment, ...prev.slice(0, 3)]);
    setCustomHandle('');
  };

  return (
    <section className="max-w-5xl mx-auto px-6 py-24 border-t border-white/10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs text-white/70 tracking-tight">02 / 9:16 vertical funnel</span>
            <div className="h-px w-16 bg-white/40 rotate-[20deg]" />
          </div>
          <h2 className="hero-title text-4xl md:text-6xl font-medium text-white">
            from flat listing to booked showing
          </h2>
        </div>
        <p className="text-sm text-white/70 max-w-xs leading-relaxed">
          every generated reel pairs neural 3d camera motion with an automated instagram &amp; whatsapp comment-to-calendar closer.
        </p>
      </div>

      {/* 3-Column Grid of Vertical 9:16 Phone Frames */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* FRAME 1: 01 / static to 3d tour */}
        <div className="bg-neutral-900/90 backdrop-blur border border-white/10 rounded-3xl p-4 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs text-white/90 font-medium">01 / static to 3d tour</span>
            <Layers className="h-4 w-4 text-white/40" />
          </div>

          <div className="relative aspect-[9/16] w-full rounded-2xl overflow-hidden bg-black border border-white/10 flex flex-col justify-between p-4">
            {/* Toggle between flat static illustration and 3D moving camera tour */}
            <div className="absolute inset-0 overflow-hidden">
              {frame1Mode === '3d' ? (
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85"
                  alt="3d luxury penthouse camera walkthrough"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale contrast-125 brightness-75 animate-3d-pan"
                />
              ) : (
                <div className="w-full h-full bg-neutral-950 flex flex-col items-center justify-center p-6">
                  {/* Flat architectural still wireframe */}
                  <svg viewBox="0 0 240 320" className="w-full h-48 stroke-white/30" fill="none">
                    <rect x="20" y="40" width="200" height="140" strokeWidth="1.5" />
                    <line x1="20" y1="130" x2="220" y2="130" strokeWidth="1" />
                    <rect x="50" y="70" width="60" height="60" strokeWidth="1" />
                    <rect x="130" y="70" width="60" height="60" strokeWidth="1" />
                    <line x1="0" y1="220" x2="240" y2="220" strokeWidth="1" strokeDasharray="4 4" />
                  </svg>
                  <span className="text-xs text-white/40 mt-2">
                    raw flat mls jpeg (0% motion retention)
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60" />
            </div>

            {/* Before / After Segmented Pill Toggle */}
            <div className="relative z-10 flex items-center bg-neutral-900/90 backdrop-blur border border-white/10 rounded-full p-1">
              <button
                type="button"
                onClick={() => setFrame1Mode('flat')}
                className={`flex-1 py-1.5 text-xs rounded-full transition-colors cursor-pointer ${
                  frame1Mode === 'flat' ? 'bg-white text-black font-medium' : 'text-white/70 hover:text-white'
                }`}
              >
                before: flat photo
              </button>
              <button
                type="button"
                onClick={() => setFrame1Mode('3d')}
                className={`flex-1 py-1.5 text-xs rounded-full transition-colors cursor-pointer ${
                  frame1Mode === '3d' ? 'bg-white text-black font-medium' : 'text-white/70 hover:text-white'
                }`}
              >
                after: 3d tour
              </button>
            </div>

            {/* Dynamic Lowercase Subtitles */}
            <div className="relative z-10 space-y-3">
              <div className="bg-black/80 backdrop-blur border border-white/15 rounded-2xl p-3">
                <p className="text-[11px] text-white/40 mb-1">
                  {frame1Mode === '3d' ? 'synthesized 60fps depth pan' : 'static listing upload'}
                </p>
                <p className="text-xs text-white leading-snug">
                  {frame1Mode === '3d'
                    ? '“double-height glass atrium glides straight onto the cantilevered pool deck...”'
                    : '“photo_04_living_room_raw.jpg — static upload”'}
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-white/70 px-1">
                <span>depth map: active</span>
                <span>retention: {frame1Mode === '3d' ? '84% avg' : '19% avg'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* FRAME 2: 02 / comment trigger */}
        <div className="bg-neutral-900/90 backdrop-blur border border-white/10 rounded-3xl p-4 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs text-white/90 font-medium">02 / comment trigger</span>
            <MessageCircle className="h-4 w-4 text-white/40" />
          </div>

          <div className="relative aspect-[9/16] w-full rounded-2xl overflow-hidden bg-black border border-white/10 flex flex-col justify-between p-4">
            {/* Video Ending Overlay */}
            <div className="bg-neutral-900/90 backdrop-blur border border-white/20 rounded-2xl p-3.5 text-center">
              <p className="text-[11px] text-white/40 mb-1">reel end-screen hook</p>
              <p className="text-sm font-medium text-white leading-snug">
                comment &apos;tour&apos; for price sheet &amp; floorplan
              </p>
            </div>

            {/* Live Simulated Comments Feed */}
            <div className="my-3 flex-1 overflow-y-auto space-y-2 pr-0.5">
              {comments.map((item) => (
                <div
                  key={item.id}
                  className="bg-neutral-900/90 border border-white/10 rounded-2xl p-3 space-y-1"
                >
                  <div className="flex items-center justify-between gap-2 text-[11px]">
                    <span className="text-white font-medium truncate">{item.handle}</span>
                    <span className="text-white/40 text-[10px] shrink-0">auto-replied</span>
                  </div>
                  <p className="text-xs text-white/90">“{item.text}”</p>
                  <p className="text-[10px] text-white/60 pt-0.5">{item.status}</p>
                </div>
              ))}
            </div>

            {/* Interactive Trigger Input */}
            <div className="pt-2 border-t border-white/10">
              <div className="flex items-center gap-1.5">
                <label htmlFor="simulate-comment-handle" className="sr-only">
                  instagram handle
                </label>
                <input
                  id="simulate-comment-handle"
                  type="text"
                  value={customHandle}
                  onChange={(e) => setCustomHandle(e.target.value)}
                  placeholder="@yourhandle"
                  className="bg-neutral-900 text-white placeholder-white/40 text-[11px] rounded-full px-3 py-1.5 flex-1 min-w-0 border border-white/10 focus:outline-none focus:border-white/40"
                />
                <button
                  type="button"
                  onClick={handleSimulateComment}
                  className="bg-white text-black text-[11px] font-medium rounded-full px-3 py-1.5 hover:bg-neutral-200 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  comment &apos;tour&apos;
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FRAME 3: 03 / instant ghl booking */}
        <div className="bg-neutral-900/90 backdrop-blur border border-white/10 rounded-3xl p-4 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs text-white/90 font-medium">03 / instant ghl booking</span>
            <CalendarCheck className="h-4 w-4 text-white/40" />
          </div>

          <div className="relative aspect-[9/16] w-full rounded-2xl overflow-hidden bg-black border border-white/10 flex flex-col justify-between p-4">
            {/* DM Thread Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <div>
                <p className="text-xs font-medium text-white">whatsapp &amp; ig auto-closer</p>
                <p className="text-[11px] text-white/40">gohighlevel webhook active</p>
              </div>
              <span className="text-[11px] text-white/70 border border-white/20 rounded-full px-2.5 py-0.5">
                24/7 bot
              </span>
            </div>

            {/* Animated DM Thread Messages */}
            <div className="my-2 flex-1 space-y-2.5 overflow-y-auto text-xs">
              {/* Bot Attachment */}
              <div className="bg-neutral-900 border border-white/10 rounded-2xl rounded-tl-sm p-3 space-y-1.5">
                <div className="flex items-center gap-2 text-white">
                  <FileText className="h-4 w-4 text-white/70 shrink-0" />
                  <span className="font-medium truncate">924_bel_air_brochure.pdf</span>
                </div>
                <p className="text-white/70 text-[11px]">
                  here is the full price sheet &amp; pocket floorplan. are you looking as cash or pre-approved financing?
                </p>
              </div>

              {/* Interactive Buyer Qualification Pill Selector */}
              <div className="flex items-center justify-end gap-1.5">
                <button
                  type="button"
                  onClick={() => setBuyerQualification('cash')}
                  className={`rounded-full px-3 py-1.5 text-[11px] border transition-colors cursor-pointer ${
                    buyerQualification === 'cash'
                      ? 'bg-white text-black border-white font-medium'
                      : 'bg-neutral-900 text-white/70 border-white/10'
                  }`}
                >
                  cash buyer
                </button>
                <button
                  type="button"
                  onClick={() => setBuyerQualification('pre-approved')}
                  className={`rounded-full px-3 py-1.5 text-[11px] border transition-colors cursor-pointer ${
                    buyerQualification === 'pre-approved'
                      ? 'bg-white text-black border-white font-medium'
                      : 'bg-neutral-900 text-white/70 border-white/10'
                  }`}
                >
                  pre-approved financing
                </button>
              </div>

              {/* Bot Qualification Response */}
              <div className="bg-neutral-900 border border-white/10 rounded-2xl rounded-tl-sm p-3 space-y-2">
                <p className="text-white/90 text-[11px]">
                  noted ({buyerQualification}). i have two private showing windows open—tap to lock your calendar invite:
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  {(['tuesday, 4:00 pm', 'thursday, 11:30 am'] as const).map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`rounded-xl py-1.5 px-2 text-[10px] border transition-colors cursor-pointer ${
                        selectedSlot === slot
                          ? 'bg-white text-black border-white font-medium'
                          : 'bg-black text-white/70 border-white/15 hover:border-white/40'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Locked Calendar Confirmation Banner */}
            <div className="bg-white text-black rounded-2xl p-3 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-black/60">showing locked in ghl calendar</p>
                <p className="text-xs font-medium">{selectedSlot}</p>
              </div>
              <Send className="h-4 w-4 text-black" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
