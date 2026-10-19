# Product Requirements Document (PRD) — reelestate

## 1. Product Overview

- **Product Name:** `reelestate`
- **Category:** Vertical B2B SaaS — AI Video Generation & Social DM Lead-to-Calendar Automation
- **Target Verticals:** Luxury & Residential Real Estate Agents, Real Estate Brokerages, and Exotic/Luxury Car Dealerships
- **Core Value Proposition:** Paste any active property listing URL (Zillow, Realtor.com, PropertyFinder) or vehicle inventory URL (AutoTrader, Dealership DMS) to automatically synthesize a 60fps 9:16 3D camera-pan Reel with ElevenLabs voiceover & captions, and arm a 24/7 Instagram/WhatsApp DM webhook that qualifies buyers and locks showings directly into the agent's GoHighLevel calendar.

---

## 2. Problem Statement

1. **Static Listing Fatigue:** 85%+ of real estate and dealership inventory sits as flat 2D JPEG galleries on MLS or AutoTrader while buyer attention has shifted almost entirely to short-form vertical video (Instagram Reels, TikTok, YouTube Shorts).
2. **High Video Production Friction:** Hiring videographers, drone pilots, and editors costs $350–$1,200 per listing and takes 5–7 days of turnaround time, making it impossible to promote every listing at scale.
3. **Unmonetized Comment & DM Traffic:** Even when an agent or dealership posts a viral Reel, commenters asking for price sheets or availability wait hours for a manual reply—causing high-intent cash and pre-approved buyers to go cold.

---

## 3. Target Personas

| Persona | Role & Inventory Volume | Primary Pain Point | Key Success Metric |
| :--- | :--- | :--- | :--- |
| **Solo Producing Agent** | 4–10 active listings/month | Spends 15–35 hours/month editing videos and manually replying to Instagram DMs. | Hours saved per month & booked private showings. |
| **Growth Brokerage Team** | 15–30 active listings/month | Needs consistent brand voice across agents, instant missed-call/DM response, and dead-lead reactivation. | Qualified DM leads per month & extra commission closed. |
| **Exotic & Luxury Auto Dealership** | 30–200+ showroom vehicles | High inventory turnover requires automated RSS feed-to-Reel publishing and test-drive qualification. | Automated showroom appointments booked via WhatsApp & IG DM. |

---

## 4. Functional Requirements & Feature Specifications

### 4.1 Section 1 — Full-Viewport Hero Experience
- **Looping 3D Camera-Pan Showcase:** Full-screen background cycling every 5 seconds across 4 curated architectural and automotive visuals (`modern luxury villa`, `minimalist penthouse interior`, `porsche 911 dark studio`, `twilight glass house`) with continuous CSS keyframe pan-and-zoom (`scale(1.0)` to `scale(1.12)` + subtle X/Y translation).
- **Live Telemetry HUD Overlay:** Subtle perspective wireframe overlay and live corner indicator displaying `ai motion engine: active // 60fps 3d pan` alongside the active slide index and label.
- **3-Zone Pill Navigation Bar:**
  - Left brand pill with custom geometric SVG mark + `reelestate` wordmark.
  - Center navigation pill with smooth-scroll anchor links (`#generator`, `#pipeline`, `#calculator`, `#pricing`).
  - Right primary CTA pill (`try free url`) that smooth-scrolls to the URL-to-Reel sandbox and focuses the input.
- **Social Proof Stat Anchors:**
  - `+14k` — `agents & dealers`
  - `+420k` — `showings booked via dm`
  - `60sec` — `listing url to viral reel`

### 4.2 Section 2 — Interactive "URL-to-Reel" Live Sandbox (`#generator`)
- **URL Input & Validation (`parseListingUrl`):**
  - Accepts any property or vehicle listing URL (Zillow, Realtor, PropertyFinder, AutoTrader, or custom brokerage domains).
  - Rejects empty strings or malformed non-URL inputs with an inline accessible alert message.
  - Detects automotive vs. real estate URLs automatically to load domain-accurate specs, pricing, voiceover script, and brochure attachment payloads.
- **Quick-Fill Presets:**
  - `sample villa url` (`924 bel air glass pavilion` — `$14,850,000`)
  - `sample porsche url` (`2026 porsche 911 gt3 rs weissach` — `$318,900`)
- **4-Stage Synthesis Progress Pipeline (`GENERATION_STAGES`):**
  1. `01 / scraping 8 high-res listing photos...`
  2. `02 / synthesizing 3d camera pan motion...`
  3. `03 / syncing elevenlabs voiceover & captions...`
  4. `04 / arming instagram & whatsapp 'tour' dm webhook...`
- **Synthesized 9:16 Preview & Payload Inspector:**
  - Displays a live 9:16 vertical phone preview with rotating lowercase subtitles, audio mute/unmute toggle, extracted property/vehicle specs, synced 15.0s ElevenLabs script, and one-click GoHighLevel webhook URL copy action.

### 4.3 Section 3 — 9:16 Vertical Reel & Auto-DM Showcase
- **Frame 1 (`01 / static to 3d tour`):** Interactive `before: flat photo` / `after: 3d tour` toggle comparing a static MLS upload (`19% avg` retention) against a synthesized 60fps 3D depth-pan tour (`84% avg` retention) with dynamic lowercase captions.
- **Frame 2 (`02 / comment trigger`):** Displays the Reel end-screen hook (`comment 'tour' for price sheet & floorplan`), a live feed of buyer comments with instant auto-reply status, and an interactive `@yourhandle` input allowing visitors to simulate dropping a `'tour'` comment in real time.
- **Frame 3 (`03 / instant ghl booking`):** Interactive WhatsApp/Instagram DM thread where the bot dispatches the PDF brochure (`924_bel_air_brochure.pdf`), qualifies the buyer via interactive `cash buyer` vs. `pre-approved financing` buttons, and locks a showing time (`tuesday, 4:00 pm` or `thursday, 11:30 am`) into the agent's GoHighLevel calendar.

### 4.4 Section 4 — 3-Step Bento Pipeline (`#pipeline`)
- **Step 01 (`url scraper + 3d motion engine`):** Pulls photos & specs automatically from Zillow/AutoTrader and renders smooth 60fps drone-style room transitions with ElevenLabs cloned voiceover.
- **Step 02 (`omnichannel auto-scheduler`):** Publishes directly to Instagram Reels, TikTok Property Tok, and YouTube Shorts at peak local buyer hours.
- **Step 03 (`24/7 dm & whatsapp calendar closer`):** GoHighLevel webhook automation with `1.4s` average DM response speed, `100%` pre-approval check, and `24/7` direct calendar sync.

### 4.5 Section 5 — Interactive Commission & ROI Calculator (`#calculator`)
- **Interactive Sliders:**
  - `listings promoted per month`: Range `1` to `30` (default `8`).
  - `average commission per closing`: Range `$2,000` to `$25,000` (default `$8,500`, step `$500`).
- **Deterministic Calculation Formulas (`calculateRoiMetrics`):**
  - `editingHoursSaved = Math.round(listingsPerMonth * 4.5)`
  - `qualifiedDmLeads = listingsPerMonth * 14`
  - `projectedExtraClosings = Math.max(1, Math.round(listingsPerMonth * 0.35))`
  - `projectedExtraCommission = projectedExtraClosings * avgCommission`

### 4.6 Section 6 — B2B Subscription Pricing (`#pricing`) & Onboarding Flow
- **Three B2B Tiers:**
  - `starter agent` (`$297/mo`): 8 AI listing reels/mo, auto voiceover & captions, Instagram & WhatsApp DM auto-responder, calendar sync.
  - `growth brokerage` (`$497/mo` — `most popular`): 25 AI listing reels/mo, custom cloned agent voice, 24/7 AI voice receptionist for missed calls, dead lead reactivation campaigns.
  - `dealership / team` (`$997/mo`): Unlimited sub-accounts, bulk inventory RSS feed-to-reel automation, dedicated webhook setup.
- **Trial Onboarding Modal:** Selecting any plan opens an accessible modal (`role="dialog"`) that validates the user's brokerage/dealership work email and optional first listing URL before provisioning their workspace sandbox.

---

## 5. Non-Functional Requirements

- **Performance:** Zero layout shift (`CLS = 0`), compositor-only CSS animations (`transform`, `opacity`), and immediate DOM availability without scroll-blocking delays.
- **Accessibility:** Semantic HTML5 landmarks (`<nav>`, `<main>`, `<section>`, `<footer role>`), explicit `<label>` associations for all inputs and sliders, `role="alert"` on validation errors, and keyboard-focusable controls.
- **Testing:** Pure business logic decoupled into `src/utils/reelLogic.ts` and verified via Node's native test runner (`node --test src/utils/reelLogic.test.ts`).
