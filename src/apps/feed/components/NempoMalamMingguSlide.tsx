import type { RefObject } from 'react';
import { BedDouble, CalendarDays, Coffee, Heart, MessageCircle, Music2 } from 'lucide-react';
import bgImage from '@/assets/nempo-feed-slide-50-bg.jpg';
import frameAsset from '@/assets/nempo-feed-52-stage-frame-no-ribbons.webp.asset.json';
import { nempoMalamMinggu as P, type MalamMingguIcon } from './nempo-malam-minggu';
import { STAGE_LAMPS, STAGE_SPOTS, stageLightStyle } from './nempo-stage-lights';
import './NempoAjakRequestSlide.css';
import './NempoMalamMingguSlide.css';

const ICONS: Record<MalamMingguIcon, typeof Coffee> = { coffee: Coffee, heart: Heart, music: Music2, bed: BedDouble };

/** Star positions (cqw) in the night sky inside the frame opening. */
const STARS = [
  { x: 22, y: 22, s: 1.1, d: 0 }, { x: 31, y: 31, s: .7, d: .4 }, { x: 70, y: 19, s: .9, d: .8 },
  { x: 79, y: 33, s: .6, d: 1.2 }, { x: 46, y: 18, s: .6, d: .2 }, { x: 59, y: 29, s: .8, d: 1 },
  { x: 18, y: 41, s: .6, d: .6 }, { x: 84, y: 45, s: .8, d: 1.4 },
];

/**
 * NEMPO Feed slide 54 (3:4): "Malam Minggu, kamu ke mana?" engagement post on the green stage +
 * lighting-truss frame of slides 51–53, with a moon and twinkling stars and four numbered answers.
 */
export function NempoMalamMingguSlide({ exportRef }: { exportRef?: RefObject<HTMLElement | null> }) {
  const { kicker, headline, question, ribbon, options, cta, date } = P;
  return (
    <section
      ref={exportRef as RefObject<HTMLElement>}
      className="nar-root nmm-root kmt-root"
      aria-label={`${headline.lead} ${headline.accent}, ${question} ${options.map((o, i) => `${i + 1}. ${o.label}`).join(', ')}. ${cta.title}.`}
    >
      <img className="nar-bg" src={bgImage} alt="" aria-hidden="true" width={1088} height={1440} draggable={false} />
      <span className="nmm-night" aria-hidden="true" />
      <span className="nar-beams" aria-hidden="true" />
      <span className="nar-glow" aria-hidden="true" />
      <span className="nar-spots" aria-hidden="true">
        {STAGE_SPOTS.map((l, i) => (
          <span key={i} className={`nar-beam nar-beam--${l.tone}`} style={stageLightStyle(l)} />
        ))}
      </span>
      <span className="nmm-sky" aria-hidden="true">
        <span className="nmm-moon-wrap"><span className="nmm-moon" /></span>
        {STARS.map((s, i) => (
          <span key={i} className="nmm-star" style={{ left: `${s.x}cqw`, top: `${s.y}cqw`, width: `${s.s * 2.4}cqw`, height: `${s.s * 2.4}cqw`, animationDelay: `-${s.d}s` }} />
        ))}
      </span>
      <img className="nar-frame" src={frameAsset.url} alt="" aria-hidden="true" width={1152} height={1536} draggable={false} />
      <img className="nar-frame-chase" src={frameAsset.url} alt="" aria-hidden="true" width={1152} height={1536} draggable={false} />
      <span className="nar-lamps" aria-hidden="true">
        {STAGE_LAMPS.map((l, i) => (
          <span key={i} className={`nar-lamp nar-lamp--${l.tone}`} style={stageLightStyle(l)} />
        ))}
      </span>

      <header className="kmt-header nar-header nmm-header">
        <span className="kmt-brand">
          <span className="kmt-logo"><img src="/nempo-feed/assets/nempo-new.webp" alt="Logo N resmi Nempo" draggable={false} /></span>
          <span className="kmt-name">
            <strong>NEMPO.ID</strong>
            <span><b>×</b> Kala Muda</span>
          </span>
        </span>
        <span className="nmm-date"><CalendarDays aria-hidden="true" />{date.weekday}, {date.day} {date.month} {date.year}</span>
      </header>

      <div className="nmm-top">
        <p className="nmm-kicker">{kicker}</p>
        <h2 className="nmm-headline">
          <span data-text={headline.lead}>{headline.lead}</span>
          <span data-text={headline.accent}>{headline.accent}</span>
        </h2>
        <p className="nmm-question">{question}</p>
      </div>

      <div className="nmm-panel">
        <span className="nmm-ribbon"><span className="nmm-ribbon-edge"><span className="nmm-ribbon-fill">{ribbon}</span></span></span>
        <ol className="nmm-options">
          {options.map((o, i) => {
            const Icon = ICONS[o.icon];
            return (
              <li key={o.label} className="nmm-option">
                <span className="nmm-option-no">{i + 1}</span>
                <span className="nmm-option-name">{o.label}</span>
                <Icon className="nmm-option-icon" aria-hidden="true" />
              </li>
            );
          })}
        </ol>
      </div>

      <p className="nmm-cta">
        <span className="nmm-cta-icon"><MessageCircle aria-hidden="true" /></span>
        <span className="nmm-cta-text"><b>{cta.title}</b><small>{cta.note}</small></span>
      </p>
    </section>
  );
}
