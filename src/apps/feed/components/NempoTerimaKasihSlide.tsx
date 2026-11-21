import type { RefObject } from 'react';
import { MapPin } from 'lucide-react';
import gscLogo from '@/assets/good-story-cafe-logo.jpg';
import saduliLogo from '@/assets/saduli-ragap-entertainment-logo-keyed.png';
import { NTE_ARTBOARD, nempoTerimaKasih as T, nteBulbs } from './nempo-terima-kasih';
import './NempoAjakRequestSlide.css';
import './NempoTerimaKasihSlide.css';

/**
 * NEMPO Feed slide 53 (3:4): after-event "Hatur Nuhun!" — text only inside a pink marquee bulb frame,
 * no background, so the PNG is transparent. Text sits in the lower part so the event video stays visible above it. Static so the download matches the preview.
 * `checker={false}` hides the preview checkerboard while the PNG is captured.
 */
const BULBS = nteBulbs();

export function NempoTerimaKasihSlide({ exportRef, checker = true }: { exportRef?: RefObject<HTMLElement | null>; checker?: boolean }) {
  const { eyebrow, headline, ribbon, body, closing, title, partner, date, venue, talent } = T;
  return (
    <section
      ref={exportRef as RefObject<HTMLElement>}
      className={`nar-root nte-root kmt-root${checker ? ' nte-root--checker' : ''}`}
      aria-label={`${headline.lead} ${headline.accent} ${body} ${title} & ${partner}, ${date.weekday} ${date.day} ${date.month} ${date.year} di ${venue.name}.`}
    >
      <span className="nte-frame" aria-hidden="true">
        <span className="nte-tube" />
        {BULBS.map((b, i) => (
          <span key={i} className="nte-bulb" style={{ left: `${b.x}cqw`, top: `${(b.y / NTE_ARTBOARD.height) * 100}%` }} />
        ))}
      </span>

      <header className="kmt-header nar-header nte-header">
        <span className="kmt-brand">
          <span className="kmt-logo"><img src="/nempo-feed/assets/nempo-new.webp" alt="Logo N resmi Nempo" draggable={false} /></span>
          <span className="kmt-name">
            <strong>NEMPO.ID</strong>
            <span><b>×</b> Kala Muda</span>
          </span>
        </span>
        <span className="nar-partners">
          <img className="nar-saduli" src={saduliLogo} alt="Saduli Ragap Entertainment" draggable={false} />
          <span className="nar-gsc"><img src={gscLogo} alt="Logo Good Story Cafe" draggable={false} /></span>
        </span>
      </header>

      <div className="nte-copy">
        <p className="nte-kicker">{eyebrow}</p>
        <h2 className="nte-headline">
          <span data-text={headline.lead}>{headline.lead}</span>
          <span data-text={headline.accent}>{headline.accent}</span>
        </h2>

        <div className="nte-panel">
          <span className="nte-ribbon"><span className="nte-ribbon-edge"><span className="nte-ribbon-fill">{ribbon}</span></span></span>
          <p className="nte-body">{body}</p>
        </div>

        <p className="nte-closing">{closing} <span aria-hidden="true">✦</span></p>

        <p className="nte-date">
          <b>{date.weekday}, {date.day} {date.month} {date.year}</b>
          <span><MapPin aria-hidden="true" />{venue.name}</span>
        </p>
      </div>
    </section>
  );
}
