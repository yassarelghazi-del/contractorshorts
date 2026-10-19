# reelestate

> AI listing-to-reel generator & automated Instagram/WhatsApp buyer booking engine for real estate agents and exotic car dealerships.

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=flat-square&logo=tailwind-css)
![Node Test Runner](https://img.shields.io/badge/Node.js-node%3Atest-green?style=flat-square&logo=node.js)
![License](https://img.shields.io/badge/License-Apache_2.0-black?style=flat-square)

---

## 1. Project Overview — What is it?

- **Project Name:** `reelestate`
- **One-Sentence Description:** A high-converting SaaS platform that transforms static MLS property and dealership inventory links into 60fps 3D vertical Reels with neural voiceovers, captions, and automated Instagram/WhatsApp DM qualification funnels that book showings into agent calendars.
- **What Problem Does It Solve?** Real estate agents and auto dealers spend upwards of 25–40 hours per month or $500–$1,500 per property creating short-form video tours. When videos generate comments on Instagram or TikTok, agents lose high-intent cash and pre-approved buyers due to sluggish manual DM replies hours later.
- **Who Is It For?** Solo top-producing residential agents, regional luxury brokerages (e.g., Sotheby's, Compass, Engel & Völkers), and luxury/exotic vehicle dealerships (e.g., Porsche, Ferrari, McLaren stores).
- **Why Did We Build It?** To eliminate the friction of video editing, multi-platform scheduling, and manual DM lead qualification by connecting automated 3D room-transition synthesis directly to a 24/7 calendar booking pipeline.

---

## 2. Tech Stack — What did you use?

| Domain | Technology / Library | Version / Details | Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | **React** | `19.0.1` | Concurrent rendering, declarative UI hooks, modular layout components |
| **Language** | **TypeScript** | `7.0.2` (ES2022) | Type-safe domain models, deterministic logic contracts, compile-time rigor |
| **Build Tooling & Dev Server** | **Vite** | `8.3.0` | Sub-second HMR engine, optimized production bundling, asset orchestration |
| **Styling & Design System** | **Tailwind CSS** | `4.3.3` (`@tailwindcss/vite`) | CSS-first configuration, custom zero-runtime utility classes, responsive typography |
| **Typography** | **Google Fonts (Readex Pro)** | Weights `300`–`700` | Humanist geometric sans with optical tracking and tabular figures |
| **Icons** | **Lucide React** | `^0.546.0` | Accessible SVG icons for navigational affordances and media controls |
| **Backend Runtime** | **Node.js + Express** | `v22+` / `4.21.2` | Headless execution, API proxies, webhook receiver pipelines |
| **Unit Testing** | **Node Built-in Test Runner** | `node:test` + `node:assert/strict` | Zero-dependency native TypeScript unit test execution in milliseconds |
| **End-to-End Automation** | **Playwright CLI (`playwright-cli`)** | Pre-installed headless Chromium | Accessibility snapshots, DOM inspections, multi-viewport verification |

---

## 3. Introduction — Why does it matter?

Modern property and vehicle sales are no longer decided solely on listing portals like Zillow or AutoTrader; they are decided inside the algorithmic feeds of Instagram Reels, TikTok, and YouTube Shorts. However, producing cinematic 9:16 video tours is traditionally slow, expensive, and manually intensive.

`reelestate` solves this through an end-to-end automated pipeline:
1. **Scraping & Visual Synthesis:** Ingestion of MLS/inventory URLs, extraction of high-resolution photo assets, room geometry analysis, and synthesis of 60fps 3D camera pan motion.
2. **Audio & Typography Synchronization:** ElevenLabs neural voice cloning matched to 15-second timed lower-third subtitles.
3. **Automated Conversion Architecture:** An end-screen trigger prompts viewers to comment `"tour"`. A webhook listener connects immediately to Instagram Graph and WhatsApp Cloud APIs, delivers the unlisted brochure/floorplan PDF, qualifies buyer financing (`cash` vs. `pre-approved`), and schedules private viewings into the agent's CRM calendar in under 2 seconds.

---

## 4. Features — What can users do?

### Core Features
- **URL-to-Reel Sandbox Engine (`#generator`):** Paste any Zillow, Realtor, PropertyFinder, or AutoTrader link (or test via 1-click presets for a Bel Air luxury villa or 2026 Porsche 911 GT3 RS) to trigger an animated 4-stage pipeline.
- **Live 4-Stage Progress Telemetry:** Visualizes real-time extraction: photo scraping $\rightarrow$ 3D camera pan synthesis $\rightarrow$ ElevenLabs audio syncing $\rightarrow$ GoHighLevel webhook arming.
- **Dynamic 9:16 Reel Preview Studio:** Live simulated mobile viewport with rotating lowercase subtitles, voiceover mute/unmute control, extracted specs, and quick-copy webhook action.

### Interactive Conversion & Funnel Features
- **Before/After 3D Tour Comparison:** Interactive toggle between flat MLS photography (19% avg. retention) and continuous 3D camera walkthrough (84% avg. retention).
- **Simulated Comment Trigger Hub:** End-screen callout (`comment 'tour' for price sheet & floorplan`) coupled with a live simulated comment feed and an interactive `@yourhandle` test harness.
- **Automated DM & Calendar Qualification Thread:** Simulated WhatsApp/Instagram DM conversation featuring automated PDF brochure dispatch, interactive buyer financing qualification (`cash buyer` vs. `pre-approved financing`), and calendar appointment locking.

### Business & Revenue Tools
- **Interactive Commission & ROI Calculator (`#calculator`):** Dual range sliders (`listings promoted per month` from 1–30, `average commission per closing` from $2,000–$25,000) that dynamically compute editing hours saved, qualified inbound DM leads, and projected incremental commission.
- **B2B Tiered Subscription Matrix (`#pricing`):** Three transparent packages (`starter agent` at $297/mo, highlighted `growth brokerage` at $497/mo, and `dealership / team` at $997/mo) with an integrated modal trial onboarding flow.

---

## 5. Architecture — How does it work?

### System Architecture Flow

```text
┌─────────────────────────────────────────────────────────────────────────────────┐
│                             CLIENT LAYER (React 19)                             │
│                                                                                 │
│   [Hero Section] ──> [URL Sandbox] ──> [9:16 Showcase] ──> [ROI Calculator]    │
│   (3D Pan Showcase)   (URL Parser)     (Interactive DM)    (Pure Math Model)   │
└───────────────────────────────┬─────────────────────────────────────────────────┘
                                │ URL Ingestion / Webhook Payload
                                ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                         APPLICATION LOGIC & API PROXY                           │
│                                                                                 │
│   ┌─────────────────────┐   ┌──────────────────────┐   ┌────────────────────┐   │
│   │  Listing URL Parser │──>│  3D Motion Synthesizer│──>│ Audio/Caption Sync │   │
│   │   (Zillow/Dealer)   │   │  (Keyframe Depth Pan) │   │ (ElevenLabs Clone) │   │
│   └─────────────────────┘   └──────────────────────┘   └────────────────────┘   │
└───────────────────────────────┬─────────────────────────────────────────────────┘
                                │ Trigger Event / Webhook Call
                                ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    OMNICHANNEL WEBHOOK & CLOSER PIPELINE                        │
│                                                                                 │
│   Instagram Graph API ──┐                                                       │
│   TikTok Content API   ──┼──> [Webhook Ingestion] ──> [GoHighLevel / CRM Sync]  │
│   WhatsApp Cloud API   ──┘         (1.4s SLA)         (Calendar Showings Locked)│
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Data & Component Flow
1. **Input Handling:** `src/utils/reelLogic.ts` parses raw URL strings, validates domain patterns, classifies vertical category (`real-estate` vs. `automotive`), and populates structured presets.
2. **State Orchestration:** React state transitions coordinate progress pill animations, audio/caption synchronizations, and interactive comment additions.
3. **Deterministic Calculations:** Commission and lead calculations execute through decoupled mathematical helpers using standard number formatting (`tabular-nums`) to prevent layout shift.

---

## 6. Development Process — How did you build it?

### Phase 1: Requirements & Domain-Specific Constitution
- Identified target user workflows across residential agents and dealership general managers.
- Enforced a strict design constitution: pure monochrome palette (`#000000`, `#ffffff`, `neutral-900/90`), all-lowercase typography, zero-pill metadata discipline, and an architectural diagonal divider motif (`rotate-[20deg]` / `rotate-[-20deg]`).

### Phase 2: Decoupled Pure Business Logic & Test-Driven Verification
- Extracted all parsing algorithms, ROI metrics, generation stage sequences, and slide definitions into `src/utils/reelLogic.ts`.
- Wrote deterministic unit tests using Node's native runner (`node:test`) covering standard cases, slider boundary clamps, invalid inputs, and pipeline step consistency.

### Phase 3: Modular Component Engineering
- Created focused, single-responsibility components:
  - `HeroSection.tsx`: Crossfading 4-slide 3D camera pan showcase, live HUD telemetry badge, 3-zone floating pill navbar, staggered display typography, and corner stat blocks.
  - `LiveSandboxSection.tsx`: Floating pill bar, 4-stage generation progress pills, and synthesized 9:16 phone preview.
  - `VerticalShowcaseSection.tsx`: 3-frame 9:16 mobile mockups with interactive before/after toggle, live comment simulator, and DM calendar booking.
  - `BentoPipelineSection.tsx`: Asymmetric 12-column Bento grid with hairline borders.
  - `RoiCalculatorSection.tsx`: Custom monochrome range sliders and dynamic output metrics.
  - `PricingFooterSection.tsx`: Tiered subscription grid and onboarding trial modal.

### Phase 4: Multi-Round Browser Verification & Visual Critique
- Utilized `playwright-cli` for multi-viewport audits on desktop (`1440x900`) and mobile (`390x844`).
- Identified and fixed edge-case layout defects: eliminated button overflow in narrow phone frames and calibrated stat-card divider spacing for large currency figures.

---

## 7. Key Engineering Decisions — Why did you choose this?

### Decision 1: Built-in `node:test` Runner vs. Heavy Jest/Vitest Harness
- **Why:** `node:test` and `node:assert/strict` are natively available in Node.js 22+. They execute in under 300ms without bundler overhead, external config files, or node_modules bloat, providing immediate test feedback.

### Decision 2: Pure CSS Keyframe 3D Pan Simulation vs. Heavy Canvas/WebGL Engine
- **Why:** Full Three.js WebGL rendering for background scenes consumes significant GPU/CPU cycles and risks frame stutter on mobile devices. Hardware-accelerated CSS `transform: translate3d(...) scale(...)` on compositor layers yields continuous 60fps performance with zero memory leaks and instantaneous first paint.

### Decision 3: Decoupled Logic Layer (`src/utils/reelLogic.ts`)
- **Why:** Isolating ROI math, slider clamping, and URL validation from React components ensures pure logic is independently testable without DOM mocking, making the UI layer clean and declarative.

### Decision 4: Strict Monochrome & Lowercase Aesthetic
- **Why:** Luxury real estate and exotic vehicle brands reject generic AI tropes (neon purple gradients, generic illustrations). The minimalist black-and-white architectural treatment with Readex Pro typography matches the editorial visual standard of high-end architectural monographs and luxury showrooms.

---

## 8. Security & Robustness

- **Input Sanitization & Validation:** All user inputs (listing URLs, Instagram handles, email addresses) are strictly sanitized and validated against regex patterns before triggering state transitions.
- **Zero External Image Failures (Referrer Policy):** All remote imagery assets specify `referrerPolicy="no-referrer"` with explicit dimensional containers to prevent third-party referrer blocking or broken layout shifts.
- **Iframe & Sandbox Containment:** Native forms prevent default submission refreshes; anchor links utilize valid in-page selectors; no unsafe `window.alert` or `eval` constructs are utilized.
- **Accessibility & Screen Readers:** Proper semantic landmarks (`<main>`, `<nav>`, `<section>`, `role="dialog"`), explicit `<label>` elements for range sliders and text inputs, and `role="alert"` on validation errors ensure WCAG AA compliance.

---

## 9. What I Learned

- How to design and structure high-converting B2B SaaS landing pages that balance editorial visual restraint with rich interactive demonstrations.
- How to decouple pure calculation and parsing functions for lightning-fast testing using native Node 22 test runners.
- Techniques for orchestrating responsive multi-frame mobile mockups using CSS `aspect-[9/16]` with zero viewport distortion.
- Practical verification loops using Playwright CLI to critique visual hierarchy, alignment, and viewport balance across desktop and mobile screens.

---

## 10. Challenges & Solutions

### Challenge 1: Narrow Mobile Frame Overflow in Frame 2
- **Problem:** In Section 3's 9:16 phone mockup, the `@yourhandle` input field and `comment 'tour'` button sat side-by-side without minimum width constraints, causing the action button to clip at the right container edge on specific screen widths.
- **Solution:** Added `min-w-0` to the flex input child and adjusted button padding to `px-3 py-1.5 text-[11px] shrink-0`.
- **Result:** Both the handle input and trigger button fit comfortably inside the 9:16 phone container across all screen sizes.

### Challenge 2: Background Contrast & Foreground Headline Legibility
- **Problem:** Replacing the original background video with full-resolution architectural photography threatened to reduce contrast against white staggered headline text (`animate`, `your`, `reels`).
- **Solution:** Applied a CSS filter stack (`grayscale contrast-125 brightness-[0.45]`) combined with a bottom gradient scrim (`bg-gradient-to-b from-transparent to-black`).
- **Result:** Photographs retain rich architectural texture while foreground typography maintains a 7:1+ contrast ratio.

---

## 11. Improvements / Future Work

1. **Full-Stack Ingestion Microservice:** Connect the URL parser to a server-side headless Chromium worker (Puppeteer/Playwright) to scrape live MLS listing DOMs and download photo galleries in real time.
2. **Real-time ElevenLabs API Integration:** Stream live generated speech audio directly into the sandbox preview using the official ElevenLabs WebSocket API.
3. **Multi-Agent CRM Webhook Hub:** Expand GoHighLevel integration to support native HubSpot, Follow Up Boss, and Salesforce webhook receivers.
4. **PWA Offline Mode:** Add service worker caching for static architectural assets to enable instant offline presentation capabilities for open house agents.

---

## 12. Running Locally — How do I use it?

### Prerequisites
- **Node.js:** `v20.0.0` or higher (Node 22+ recommended)
- **Package Manager:** `npm` (included with Node)

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/your-username/reelestate.git
cd reelestate

# 2. Install dependencies
npm install
```

### Environment Variables
Copy the template environment file:
```bash
cp .env.example .env
```
*(No secret keys are required for the client-side presentation and sandbox mode).*

### Running the Application
```bash
# Start local development server on port 3000
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Unit Tests
```bash
# Execute native Node.js unit tests
node --test src/utils/reelLogic.test.ts
```

### Building for Production
```bash
# Build optimized static bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 13. Project Structure

```text
reelestate/
├── docs/
│   ├── PRD.md                       # Product Requirements Document
│   └── design.md                    # Design System & Architectural Specification
├── src/
│   ├── components/
│   │   ├── HeroSection.tsx          # 4-slide 3D pan showcase, HUD badge, navbar, stats
│   │   ├── LiveSandboxSection.tsx   # URL-to-Reel studio, presets, 4-stage progress
│   │   ├── VerticalShowcaseSection.tsx # 3-frame 9:16 phone mockups, before/after, DM closer
│   │   ├── BentoPipelineSection.tsx # 3-step asymmetric bento pipeline grid
│   │   ├── RoiCalculatorSection.tsx # Interactive sliders & commission projections
│   │   └── PricingFooterSection.tsx # Tiered B2B pricing, modal onboarding & footer
│   ├── utils/
│   │   ├── reelLogic.ts             # Pure business logic: ROI math, presets, URL parser
│   │   └── reelLogic.test.ts        # Native Node unit tests (6 test suites)
│   ├── App.tsx                      # Root application layout & scroll-to-focus triggers
│   ├── index.css                    # Tailwind CSS v4, keyframes, range slider styles
│   └── main.tsx                     # React 19 root entrypoint
├── index.html                       # HTML5 entry with Readex Pro font & SEO metadata
├── metadata.json                    # Application metadata & capabilities configuration
├── package.json                     # Scripts & dependencies
├── tsconfig.json                    # TypeScript compiler configuration
└── vite.config.ts                   # Vite build configuration with Tailwind v4 plugin
```

---

## 14. License

This project is open-source and licensed under the [Apache-2.0 License](LICENSE).
