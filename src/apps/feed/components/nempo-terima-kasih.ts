import { nempoBajidoran } from './nempo-bajidoran';
import { nempoSaduliDj } from './nempo-saduli-dj';

/**
 * NEMPO Feed slide 53 — after-event thank-you for last night's Bajidoran & DJ at Good Story Cafe:
 * text only on the event's stage frame, exported as a transparent PNG (no background photo).
 */
export const NEMPO_TERIMA_KASIH_SLIDE = 53;

/** Prebuilt transparent PNG, captured from the preview at 1080 CSS px × 3. */
export const NTE_EXPORT = { width: 3240, height: 4320 } as const;

export const nempoTerimaKasih = {
  eyebrow: 'Semalam di Good Story Cafe',
  headline: { lead: 'Hatur', accent: 'Nuhun!' },
  ribbon: 'Makasih udah datang!',
  body: 'Terima kasih sudah hadir, goyang, dan enjoy bareng kami tadi malam. Kalian yang bikin malam itu hidup!',
  closing: 'Sampai ketemu di malam seru berikutnya',
  title: nempoBajidoran.title,
  partner: nempoBajidoran.partner,
  date: nempoBajidoran.date,
  venue: nempoBajidoran.venue,
  talent: nempoSaduliDj.talent,
} as const;

/** Pink marquee bulb frame (cqw of the 3:4 artboard: 100 × 133.33). */
export const NTE_FRAME = { inset: 4.5, bulb: 3.4, step: 7 } as const;
export const NTE_ARTBOARD = { width: 100, height: 400 / 3 } as const;

export type NteBulb = { x: number; y: number };

/** Evenly spaced bulbs on all four sides of the frame, corners included, none cut off by the artboard edge. */
export function nteBulbs(): NteBulb[] {
  const { inset, step } = NTE_FRAME;
  const { width, height } = NTE_ARTBOARD;
  const left = inset, right = width - inset, top = inset, bottom = height - inset;
  const line = (x1: number, y1: number, x2: number, y2: number): NteBulb[] => {
    const n = Math.max(1, Math.round(Math.hypot(x2 - x1, y2 - y1) / step));
    return Array.from({ length: n }, (_, i) => ({ x: x1 + ((x2 - x1) * i) / n, y: y1 + ((y2 - y1) * i) / n }));
  };
  return [
    ...line(left, top, right, top),
    ...line(right, top, right, bottom),
    ...line(right, bottom, left, bottom),
    ...line(left, bottom, left, top),
  ];
}

