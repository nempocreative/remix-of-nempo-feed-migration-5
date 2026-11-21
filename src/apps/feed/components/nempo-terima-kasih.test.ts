import { describe, expect, it } from 'vitest';
import { weekdayId } from './nempo-bajidoran';
import { NEMPO_TERIMA_KASIH_SLIDE, NTE_ARTBOARD, NTE_EXPORT, NTE_FRAME, nempoTerimaKasih, nteBulbs } from './nempo-terima-kasih';

describe('NEMPO after-event thank-you slide', () => {
  it('is the slide after "Hari Ini" (53)', () => {
    expect(NEMPO_TERIMA_KASIH_SLIDE).toBe(53);
  });
  it('thanks guests for last night: Jumat, 20 November 2026 at Good Story Cafe', () => {
    const { date, venue } = nempoTerimaKasih;
    expect([date.weekday, date.day, date.month, date.year]).toEqual(['Jumat', '20', 'November', '2026']);
    expect(weekdayId(date.iso)).toBe('Jumat');
    expect(venue.name).toBe('Good Story Cafe');
  });
  it('downloads as a 3:4 feed PNG at 3× (3240×4320)', () => {
    expect(NTE_EXPORT).toEqual({ width: 3240, height: 4320 });
    expect(NTE_EXPORT.width / NTE_EXPORT.height).toBe(3 / 4);
  });
  it('frame bulbs sit fully inside the artboard (nothing cut off)', () => {
    const r = NTE_FRAME.bulb / 2;
    for (const b of nteBulbs()) {
      expect(b.x - r).toBeGreaterThanOrEqual(0);
      expect(b.y - r).toBeGreaterThanOrEqual(0);
      expect(b.x + r).toBeLessThanOrEqual(NTE_ARTBOARD.width);
      expect(b.y + r).toBeLessThanOrEqual(NTE_ARTBOARD.height);
    }
  });
  it('frame has a bulb on every corner', () => {
    const bulbs = nteBulbs();
    const { inset } = NTE_FRAME;
    const corners = [[inset, inset], [100 - inset, inset], [100 - inset, NTE_ARTBOARD.height - inset], [inset, NTE_ARTBOARD.height - inset]];
    for (const [x, y] of corners) {
      expect(bulbs.some((b) => Math.abs(b.x - x!) < 0.01 && Math.abs(b.y - y!) < 0.01)).toBe(true);
    }
  });
});
