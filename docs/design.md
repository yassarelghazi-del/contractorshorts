# Design System & Architectural Specification — reelestate

## 1. Aesthetic Direction & Core Philosophy

`reelestate` employs an **architectural monochrome luxury** visual language tailored for high-ticket real estate brokerages and exotic automotive dealerships. Every surface, typographic scale, and micro-interaction adheres to three non-negotiable rules:

1. **Strict Lowercase Typography (`text-transform: lowercase`):** Every headline, navigation link, stat counter, button label, and simulated DM message is rendered strictly in lowercase to project calm, editorial confidence.
2. **Pure Monochrome Palette:** Exclusively pure black (`#000000`), pure white (`#ffffff`), translucent obsidian glass (`bg-neutral-900/90 backdrop-blur`), and calibrated white opacity stops (`white/10`, `white/20`, `white/40`, `white/70`, `white/90`). Zero purple, indigo, or neon gradients.
3. **Architectural Diagonal Motif:** A recurring hairline diagonal divider (`h-px w-16` or `w-24 bg-white/40 rotate-[20deg]` / `rotate-[-20deg]`) connects section kickers, hero stat callouts, ROI output cards, and pricing tiers into a single cohesive visual system.

---

## 2. Typography System

- **Primary Font Family:** `'Readex Pro', system-ui, -apple-system, sans-serif` (loaded via Google Fonts in weights `300`, `400`, `500`, `600`, `700`).
- **Numeric Discipline:** All stat counters, prices, slider readouts, and timestamps use `tabular-nums` (`font-variant-numeric: tabular-nums`) so numbers never jitter during slider interaction or live stage updates.

| Token / Class | Size & Responsive Scale | Line Height & Tracking | Usage |
| :--- | :--- | :--- | :--- |
| **Hero Display (`.hero-title` `<h1>`)** | `text-[14vw] md:text-[13vw]` (`font-medium`) | `line-height: 0.95`, `letter-spacing: -0.04em` | Staggered 3-word Hero statement (`animate` / `your` / `reels`) |
| **Section Heading (`.hero-title` `<h2>`)** | `text-4xl md:text-6xl` (`font-medium`) | `line-height: 0.95`, `letter-spacing: -0.04em` | Primary section titles (`url-to-reel studio`, `3-step bento pipeline`, etc.) |
| **Stat / Metric Readout** | `text-4xl md:text-5xl` (`font-medium tabular-nums`) | `tracking-tight` | Hero corner stats (`+14k`, `+420k`, `60sec`), ROI outputs, pricing figures |
| **Card Title (`<h3>`)** | `text-2xl md:text-3xl` (`font-medium`) | `leading-snug` | Bento pipeline cards, scraped listing title, modal headings |
| **Body Copy** | `text-sm` (`14px`) to `text-[15px]` | `leading-snug` to `leading-relaxed` | Hero description, section lead-ins, voiceover scripts |
| **Micro / HUD Labels** | `text-[11px]` to `text-xs` (`12px`) | `tracking-tight` | Section index kickers (`01 / live sandbox`), HUD badge, DM metadata |

---

## 3. Color & Surface Tokens

| Token Purpose | Tailwind / CSS Specification | Visual Role |
| :--- | :--- | :--- |
| **Primary Canvas** | `bg-black` (`#000000`) | Root background across `html`, `body`, `#root`, and nested inset wells |
| **Elevated Glass Surface** | `bg-neutral-900/90 backdrop-blur` | Navbar pills, floating sandbox bar, 9:16 phone frames, Bento cards, ROI panel, Pricing cards |
| **Inset Surface Well** | `bg-black/60` | Nested spec cards, voiceover script box, ROI output cards |
| **Default Hairline Border** | `border border-white/10` | Standard structural boundary for cards and pills |
| **Active / Highlight Border** | `border-2 border-white` or `border-white/40` | Highlighted middle pricing tier (`growth brokerage`) and completed progress pills |
| **Primary Action Surface** | `bg-white text-black hover:bg-neutral-200` | Primary CTAs (`try free url`, `generate 15s reel`, `select growth brokerage`, ROI commission highlight card) |
| **Text Hierarchy** | `text-white`, `text-white/90`, `text-white/70`, `text-white/40` | Primary headings (`100%`), body copy (`90%`), secondary labels (`70%`), muted metadata/placeholders (`40%`) |

---

## 4. Layout & Section Architecture

### 4.1 Hero Section (`src/components/HeroSection.tsx`)
- **Viewport Container:** `relative h-screen w-full overflow-hidden bg-black`
- **Background Showcase Layer:**
  - Cycles through 4 high-resolution architectural and luxury car visuals every `5000ms` with a `1000ms` opacity crossfade (`transition-opacity duration-1000 ease-in-out`).
  - Applies `grayscale contrast-125 brightness-[0.45]` to maintain high-contrast monochrome legibility behind white foreground typography.
  - Active slide runs `.animate-hero-pan` (`scale(1)` $\rightarrow$ `scale(1.12)` with `translate3d(-1.5%, -1%, 0)` over `5.5s`).
- **HUD Wireframe & Live Corner Badge:**
  - SVG perspective frame (`strokeDasharray="6 6"`, `opacity-20`) with crosshair tick marks.
  - Top-left HUD pill (`left-6 md:left-10 top-24`) displaying `ai motion engine: active // 60fps 3d pan` and the active slide counter.
- **Spatial Stagger of Foreground Elements:**
  - `animate`: `left-4 md:left-10 top-[18%]`
  - `your`: `right-4 md:right-10 top-[38%]`
  - `reels`: `left-[18%] md:left-[28%] top-[58%]`
  - Description block: `left-6 md:left-10 top-[46%] max-w-[240px]`
  - Top-right stat (`+14k`): `right-6 md:right-24 top-[14%]` with `rotate-[20deg]` divider
  - Bottom-left stat (`+420k`): `left-6 md:left-20 bottom-20 md:bottom-24` with `rotate-[-20deg]` divider
  - Bottom-right stat (`60sec`): `right-6 md:right-20 bottom-16 md:bottom-20` with `rotate-[-20deg]` divider

### 4.2 Below-the-Fold Container Grid
All below-the-fold sections share a unified `max-w-5xl mx-auto px-6 py-24` container with `border-t border-white/10` hairline section dividers:
1. **Live Sandbox (`#generator`):** Single-row desktop floating pill bar (`rounded-3xl md:rounded-full p-2`), 4-column progress pill strip (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3`), and a 12-column preview studio (`lg:col-span-5` 9:16 phone frame + `lg:col-span-7` scraped listing payload).
2. **Vertical 9:16 Showcase:** 3-column equal-height grid (`grid-cols-1 md:grid-cols-3 gap-6`), each housing an `aspect-[9/16]` interactive phone viewport (`rounded-2xl bg-black border border-white/10`).
3. **Bento Pipeline (`#pipeline`):** 12-column asymmetric Bento grid (`md:col-span-7` Step 01 + `md:col-span-5` Step 02 on row 1; full-width `md:col-span-12` Step 03 on row 2).
4. **Commission & ROI Calculator (`#calculator`):** Glass container (`rounded-3xl p-8 md:p-12`) with a 2-column custom monochrome range slider row (`input[type='range'].mono-slider`) above a 3-column metric readout strip.
5. **B2B Pricing (`#pricing`) & Footer:** 3-column card grid (`items-stretch`) where the center card (`growth brokerage`) uses `border-2 border-white` and an inverted white CTA button for unmistakable visual hierarchy.

---

## 5. Motion & Interaction Specifications

- **Hero 3D Camera Pan (`@keyframes heroSlidePanZoom`):**
  ```css
  @keyframes heroSlidePanZoom {
    0% {
      transform: scale(1) translate3d(0%, 0%, 0);
    }
    100% {
      transform: scale(1.12) translate3d(-1.5%, -1%, 0);
    }
  }
  ```
- **9:16 Preview Depth Pan (`@keyframes subtlePan3D`):** Continuous `10s ease-in-out infinite` loop oscillating between `scale(1)` and `scale(1.12) translate3d(-1.8%, -1.2%, 0)`.
- **Micro-Interaction Latency:** Button hover states, segmented toggles, and range slider thumb scaling (`transform: scale(1.12)`) settle within `150ms–200ms` using `cubic-bezier(0.16, 1, 0.3, 1)`.
