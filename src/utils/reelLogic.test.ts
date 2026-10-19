import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateRoiMetrics,
  parseListingUrl,
  GENERATION_STAGES,
  SAMPLE_LISTINGS,
  HERO_SHOWCASE_SLIDES,
} from './reelLogic.ts';

test('HERO_SHOWCASE_SLIDES contains the 4 high-resolution architectural and luxury car visuals', () => {
  assert.equal(HERO_SHOWCASE_SLIDES.length, 4);
  assert.ok(HERO_SHOWCASE_SLIDES[0].url.includes('photo-1600596542815-ffad4c1539a9'));
  assert.ok(HERO_SHOWCASE_SLIDES[1].url.includes('photo-1600607687939-ce8a6c25118c'));
  assert.ok(HERO_SHOWCASE_SLIDES[2].url.includes('photo-1503376780353-7e6692767b70'));
  assert.ok(HERO_SHOWCASE_SLIDES[3].url.includes('photo-1600585154340-be6161a56a0c'));
});

test('calculateRoiMetrics computes deterministic metrics for default inputs (8 listings, $8,500 commission)', () => {
  const result = calculateRoiMetrics(8, 8500);
  assert.equal(result.listingsPerMonth, 8);
  assert.equal(result.avgCommission, 8500);
  assert.equal(result.editingHoursSaved, 36);
  assert.equal(result.qualifiedDmLeads, 112);
  assert.equal(result.projectedExtraClosings, 3);
  assert.equal(result.projectedExtraCommission, 25500);
});

test('calculateRoiMetrics clamps out-of-range slider inputs safely', () => {
  const low = calculateRoiMetrics(0, 500);
  assert.equal(low.listingsPerMonth, 1);
  assert.equal(low.avgCommission, 2000);

  const high = calculateRoiMetrics(99, 50000);
  assert.equal(high.listingsPerMonth, 30);
  assert.equal(high.avgCommission, 25000);
});

test('parseListingUrl rejects empty or malformed input', () => {
  const empty = parseListingUrl('   ');
  assert.equal(empty.valid, false);
  assert.ok(empty.error);

  const invalid = parseListingUrl('not a url');
  assert.equal(invalid.valid, false);
  assert.ok(invalid.error);
});

test('parseListingUrl detects villa and automotive urls accurately', () => {
  const villa = parseListingUrl(SAMPLE_LISTINGS.villa.url);
  assert.equal(villa.valid, true);
  assert.equal(villa.preset.category, 'real-estate');

  const porsche = parseListingUrl(SAMPLE_LISTINGS.porsche.url);
  assert.equal(porsche.valid, true);
  assert.equal(porsche.preset.category, 'automotive');
});

test('GENERATION_STAGES matches the 4 required pipeline steps in lowercase', () => {
  assert.equal(GENERATION_STAGES.length, 4);
  assert.equal(GENERATION_STAGES[0], '01 / scraping 8 high-res listing photos...');
  assert.equal(GENERATION_STAGES[1], '02 / synthesizing 3d camera pan motion...');
  assert.equal(GENERATION_STAGES[2], '03 / syncing elevenlabs voiceover & captions...');
  assert.equal(
    GENERATION_STAGES[3],
    "04 / arming instagram & whatsapp 'tour' dm webhook..."
  );
});
