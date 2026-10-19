export interface HeroSlide {
  url: string;
  label: string;
}

export const HERO_SHOWCASE_SLIDES: HeroSlide[] = [
  {
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85',
    label: 'modern luxury villa',
  },
  {
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85',
    label: 'minimalist penthouse interior',
  },
  {
    url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=85',
    label: 'porsche 911 dark studio',
  },
  {
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
    label: 'twilight glass house',
  },
];

export interface ListingPreset {
  id: 'villa' | 'porsche' | 'custom';
  category: 'real-estate' | 'automotive';
  url: string;
  sourceDomain: string;
  title: string;
  price: string;
  location: string;
  specs: string[];
  subtitles: string[];
  dmKeyword: string;
  voiceoverScript: string;
  brochureName: string;
  estimatedViews: string;
}

export const SAMPLE_LISTINGS: Record<'villa' | 'porsche', ListingPreset> = {
  villa: {
    id: 'villa',
    category: 'real-estate',
    url: 'https://www.zillow.com/homedetails/924-bel-air-rd-los-angeles-ca-90077/20524418_zpid/',
    sourceDomain: 'zillow.com',
    title: '924 bel air glass pavilion',
    price: '$14,850,000',
    location: 'bel air, los angeles',
    specs: ['6 bed', '8 bath', '9,400 sqft', 'zero-edge pool'],
    subtitles: [
      'step inside $14.8m of cantilevered glass above bel air...',
      '18-foot travertine walls slide open to a 75-foot infinity edge...',
      'private wellness wing + subterranean 6-car gallery...',
      "comment 'tour' for pocket floorplan & private showing slot",
    ],
    dmKeyword: 'tour',
    voiceoverScript:
      "step inside fourteen point eight million dollars of cantilevered glass in bel air. comment 'tour' below and i'll dm you the full floorplan and private calendar link immediately.",
    brochureName: '924_bel_air_floorplan_brochure.pdf',
    estimatedViews: '48.2k est. local reach',
  },
  porsche: {
    id: 'porsche',
    category: 'automotive',
    url: 'https://www.autotrader.com/cars-for-sale/vehicledetails.xhtml?listingId=911gt3rs-weissach-2026',
    sourceDomain: 'autotrader.com',
    title: '2026 porsche 911 gt3 rs weissach',
    price: '$318,900',
    location: 'miami design district showroom',
    specs: ['4.0l flat-6', '518 hp', '1,120 mi', 'weissach carbon pack'],
    subtitles: [
      'exposed carbon weave on this 2026 gt3 rs weissach...',
      '9,000 rpm naturally aspirated flat-six with pdk track calibration...',
      'magnesium forged wheels + ceramic composite brakes...',
      "comment 'tour' for build sheet pdf & showroom test drive",
    ],
    dmKeyword: 'tour',
    voiceoverScript:
      "delivery-mile twenty twenty-six gt3 rs weissach just landed in miami. comment 'tour' right now to get the window sticker pdf and lock a showroom viewing slot.",
    brochureName: 'gt3rs_weissach_build_sheet.pdf',
    estimatedViews: '64.9k est. enthusiast reach',
  },
};

export const GENERATION_STAGES = [
  '01 / scraping 8 high-res listing photos...',
  '02 / synthesizing 3d camera pan motion...',
  '03 / syncing elevenlabs voiceover & captions...',
  "04 / arming instagram & whatsapp 'tour' dm webhook...",
] as const;

export interface ParsedListingResult {
  valid: boolean;
  error?: string;
  preset: ListingPreset;
}

export function parseListingUrl(rawInput: string): ParsedListingResult {
  const trimmed = rawInput.trim().toLowerCase();
  if (!trimmed) {
    return {
      valid: false,
      error: 'please paste a listing url or choose a sample preset above.',
      preset: SAMPLE_LISTINGS.villa,
    };
  }

  // Check if it looks like a URL or domain
  const urlPattern = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/.*)?$/i;
  if (!urlPattern.test(trimmed)) {
    return {
      valid: false,
      error: 'enter a valid listing url (zillow, realtor, propertyfinder, autotrader).',
      preset: SAMPLE_LISTINGS.villa,
    };
  }

  if (
    trimmed.includes('autotrader') ||
    trimmed.includes('porsche') ||
    trimmed.includes('cars') ||
    trimmed.includes('gt3') ||
    trimmed.includes('ferrari') ||
    trimmed.includes('dealer')
  ) {
    return {
      valid: true,
      preset: {
        ...SAMPLE_LISTINGS.porsche,
        url: trimmed.startsWith('http') ? trimmed : `https://${trimmed}`,
      },
    };
  }

  if (trimmed === SAMPLE_LISTINGS.villa.url) {
    return {
      valid: true,
      preset: SAMPLE_LISTINGS.villa,
    };
  }

  // Extract domain and slug for custom real estate URL
  const withoutProtocol = trimmed.replace(/^https?:\/\//, '');
  const parts = withoutProtocol.split('/');
  const domain = parts[0].replace(/^www\./, '');
  const slug = parts.slice(1).join(' ').replace(/[-_]/g, ' ').trim();

  return {
    valid: true,
    preset: {
      ...SAMPLE_LISTINGS.villa,
      id: 'custom',
      url: trimmed.startsWith('http') ? trimmed : `https://${trimmed}`,
      sourceDomain: domain || 'propertyfinder.ae',
      title: slug ? slug.slice(0, 34) : 'architectural penthouse residence',
    },
  };
}

export interface RoiMetrics {
  listingsPerMonth: number;
  avgCommission: number;
  editingHoursSaved: number;
  qualifiedDmLeads: number;
  projectedExtraClosings: number;
  projectedExtraCommission: number;
}

export function calculateRoiMetrics(
  listingsPerMonthInput: number,
  avgCommissionInput: number
): RoiMetrics {
  const listingsPerMonth = Math.min(30, Math.max(1, Math.round(listingsPerMonthInput)));
  const avgCommission = Math.min(25000, Math.max(2000, Math.round(avgCommissionInput)));

  // Each listing generates 8 reels/variations saving 4.5 hrs of manual editing + DM follow-up
  const editingHoursSaved = Math.round(listingsPerMonth * 4.5);

  // Average 14 qualified DM inquiries (cash/pre-approved) per promoted listing reel
  const qualifiedDmLeads = listingsPerMonth * 14;

  // Conservative conversion of qualified DM showings into extra closings
  const projectedExtraClosings = Math.max(1, Math.round(listingsPerMonth * 0.35));
  const projectedExtraCommission = projectedExtraClosings * avgCommission;

  return {
    listingsPerMonth,
    avgCommission,
    editingHoursSaved,
    qualifiedDmLeads,
    projectedExtraClosings,
    projectedExtraCommission,
  };
}
