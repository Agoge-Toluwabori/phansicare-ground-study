"use client";

import { FormEvent, useState, type CSSProperties } from "react";

type Scene = {
  id: string;
  label: string;
  kicker: string;
  headline: string;
  copy: string;
  before: string;
  after: string;
  focal: string;
};

const scenes: Scene[] = [
  {
    id: "home",
    label: "Private home",
    kicker: "Residential",
    headline: "Give every planting bed a deliberate finish.",
    copy: "Brown decorative mulch settles naturally into the landscape, framing planting without competing with the architecture.",
    before: "/images/home-before.jpg",
    after: "/images/home-after.jpg",
    focal: "64% 62%",
  },
  {
    id: "estate",
    label: "Estate entrance",
    kicker: "Residential estate",
    headline: "Make arrival part of the experience.",
    copy: "A defined ground treatment makes shared landscaping feel considered before a visitor reaches the gate.",
    before: "/images/estate-before.jpg",
    after: "/images/estate-after.jpg",
    focal: "70% 70%",
  },
  {
    id: "hotel",
    label: "Hotel",
    kicker: "Hospitality",
    headline: "The guest experience begins outside.",
    copy: "Dark mulch adds crisp contrast around arrival planting and helps the forecourt read as one composed environment.",
    before: "/images/hotel-before.jpg",
    after: "/images/hotel-after.jpg",
    focal: "40% 74%",
  },
  {
    id: "commercial",
    label: "Commercial",
    kicker: "Workplace",
    headline: "Make the landscape match the building.",
    copy: "A clean black finish turns exposed soil into a strong architectural layer across corporate frontages.",
    before: "/images/commercial-before.jpg",
    after: "/images/commercial-after.jpg",
    focal: "46% 76%",
  },
  {
    id: "public",
    label: "Public space",
    kicker: "Campus & civic",
    headline: "Bring consistency to larger landscapes.",
    copy: "Mulch creates a uniform visual language across medians, walkways and high-visibility shared beds.",
    before: "/images/public-before.jpg",
    after: "/images/public-after.jpg",
    focal: "58% 70%",
  },
];

const colours = [
  {
    id: "brown",
    name: "Earth brown",
    traits: "Natural · grounded · timeless",
    copy: "A quiet finish for homes, hospitality gardens and mature planting.",
    swatch: "#6b4a2c",
    image: "/images/home-after.jpg",
    focal: "68% 76%",
  },
  {
    id: "red",
    name: "Oxide red",
    traits: "Warm · bold · expressive",
    copy: "A high-impact colour for entrance beds and landscapes designed to announce arrival.",
    swatch: "#7e2a18",
    image: "/images/estate-after.jpg",
    focal: "74% 76%",
  },
  {
    id: "black",
    name: "Carbon black",
    traits: "Modern · crisp · architectural",
    copy: "A strong contrast for contemporary façades and sharply defined planting.",
    swatch: "#23201d",
    image: "/images/commercial-after.jpg",
    focal: "50% 80%",
  },
];

const benefits = [
  ["01", "A more finished landscape", "Turns exposed soil into a deliberate visual layer."],
  ["02", "Moisture support", "May help reduce surface moisture loss when applied correctly."],
  ["03", "Fewer visible weeds", "Can suppress some weed emergence as part of routine maintenance."],
  ["04", "A consistent ground plane", "Creates continuity across beds, borders and tree surrounds."],
];

const faqs = [
  ["What is decorative wood mulch?", "A prepared wood-based material applied to the soil surface around plants, trees and landscaped beds. This concept explores colour-treated finishes for the Nigerian market."],
  ["Is it already available in Nigeria?", "This is an early market-validation project. Product specifications, availability and rollout details are still being developed."],
  ["Are these completed installations?", "No. The landscapes shown here are concept visualisations created to demonstrate the intended ground treatment."],
  ["Which colour should I choose?", "Brown tends to feel natural, black creates contemporary contrast, and red makes a warmer statement. The best choice depends on architecture, planting and maintenance conditions."],
];

function BeforeAfter({ scene, value, onChange, compact = false }: { scene: Scene; value: number; onChange: (value: number) => void; compact?: boolean }) {
  const style = { "--split": `${value}%`, "--focal": scene.focal } as CSSProperties;

  return (
    <div className={`compare ${compact ? "compare--compact" : ""}`} style={style}>
      <img src={scene.before} alt={`${scene.label} before decorative mulch`} draggable={false} loading={compact ? "lazy" : "eager"} decoding="async" />
      <div className="compare__after">
        <img src={scene.after} alt={`${scene.label} with decorative mulch`} draggable={false} loading={compact ? "lazy" : "eager"} decoding="async" />
      </div>
      <span className="compare__tag compare__tag--before">Before</span>
      <span className="compare__tag compare__tag--after">After</span>
      <div className="compare__line" aria-hidden="true"><span>‹ ›</span></div>
      <input
        className="compare__range"
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-label={`Compare ${scene.label} before and after`}
      />
    </div>
  );
}

function Mark() {
  return <span className="mark" aria-hidden="true"><i /><i /><i /></span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroSplit, setHeroSplit] = useState(0);
  const [activeScene, setActiveScene] = useState(scenes[0]);
  const [sceneSplit, setSceneSplit] = useState(50);
  const [activeColour, setActiveColour] = useState(colours[0]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="PhansiCare Ground Study home">
          <Mark /><span>PhansiCare</span><small>Ground study</small>
        </a>
        <nav id="mobile-navigation" className={menuOpen ? "nav nav--open" : "nav"} aria-label="Primary navigation">
          <a href="#transformations" onClick={() => setMenuOpen(false)}>Transformations</a>
          <a href="#compare" onClick={() => setMenuOpen(false)}>Compare</a>
          <a href="#colours" onClick={() => setMenuOpen(false)}>Colours</a>
          <a href="#product" onClick={() => setMenuOpen(false)}>Why mulch</a>
          <a href="#visualise" className="nav__cta" onClick={() => setMenuOpen(false)}>Visualise my space</a>
        </nav>
        <button className="menu-button" type="button" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-controls="mobile-navigation">
          {menuOpen ? "Close" : "Menu"}
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero__visual">
          <BeforeAfter scene={scenes[0]} value={heroSplit} onChange={setHeroSplit} />
          <div className="hero__veil" />
        </div>
        <div className="hero__content shell">
          <p className="eyebrow eyebrow--light">A new landscaping experience for Nigeria</p>
          <h1>Transform the ground.<br /><span>Transform the space.</span></h1>
          <p className="hero__intro">Decorative coloured wood mulch designed to bring depth, contrast and a refined finish to outdoor environments.</p>
          <div className="actions">
            <a className="button button--light" href="#visualise">Visualise my space</a>
            <button className="button button--ghost" type="button" onClick={() => setHeroSplit(heroSplit > 50 ? 0 : 100)}>
              {heroSplit > 50 ? "Reveal before" : "Reveal transformation"}
            </button>
          </div>
          <p className="hero__note">Red. Black. Brown.<br />Designed for landscapes that deserve more.</p>
        </div>
        <div className="hero__foot"><span>Drag the image to transform</span><span>Concept visualisation</span></div>
      </section>

      <section className="section section--paper" id="transformations">
        <div className="shell">
          <div className="section-head">
            <div><p className="eyebrow">01 — Transformations</p><h2>Same property.<br />Different ground treatment.</h2></div>
            <p>Nothing else in these scenes changes—not the architecture, not the planting. Only what covers the ground.</p>
          </div>
          <div className="story-grid">
            {scenes.slice(1, 4).map((scene) => (
              <article className="story-card" key={scene.id}>
                <img src={scene.after} alt={`${scene.label} concept with decorative mulch`} style={{ objectPosition: scene.focal }} loading="lazy" decoding="async" />
                <div className="story-card__content">
                  <p className="eyebrow">{scene.kicker}</p>
                  <h3>{scene.headline}</h3>
                  <p>{scene.copy}</p>
                  <button type="button" onClick={() => { setActiveScene(scene); setSceneSplit(50); document.querySelector("#compare")?.scrollIntoView({ behavior: "smooth" }); }}>Compare this scene <span>↗</span></button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--ink" id="compare">
        <div className="shell">
          <div className="section-head section-head--light">
            <div><p className="eyebrow eyebrow--light">02 — See the difference</p><h2>Sometimes the difference<br />is on the ground.</h2></div>
            <p>Drag across the image or use the arrow keys. Every scene pairs the same property before and after.</p>
          </div>
          <div className="scene-tabs" role="tablist" aria-label="Choose a comparison scene">
            {scenes.map((scene) => (
              <button key={scene.id} type="button" role="tab" aria-selected={activeScene.id === scene.id} onClick={() => { setActiveScene(scene); setSceneSplit(50); }}>{scene.label}</button>
            ))}
          </div>
          <BeforeAfter scene={activeScene} value={sceneSplit} onChange={setSceneSplit} compact />
          <div className="compare-caption"><p><strong>{activeScene.kicker}</strong>{activeScene.copy}</p><a href="#visualise">See what your property could become →</a></div>
        </div>
      </section>

      <section className="section section--paper" id="product">
        <div className="shell product-grid">
          <div className="product-copy">
            <p className="eyebrow">03 — What it is</p>
            <h2>More than a finishing touch.</h2>
            <p className="lede">Decorative wood mulch is specially prepared wood material used around trees, planting beds and landscaped environments.</p>
            <p>It creates a clear ground plane and may support routine landscape care when product specification, application depth and site conditions are appropriate.</p>
          </div>
          <div className="benefits">
            {benefits.map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}
            <p className="disclaimer">Outcomes depend on application, site conditions and maintenance. Benefits shown are indicative, not guaranteed.</p>
          </div>
        </div>
      </section>

      <section className="section section--clay" id="colours">
        <div className="shell colour-grid">
          <div>
            <p className="eyebrow eyebrow--light">04 — Colour explorer</p>
            <h2>Three colours.<br /><span>Three personalities.</span></h2>
            <div className="colour-list" role="tablist" aria-label="Explore mulch colours">
              {colours.map((colour) => (
                <button key={colour.id} role="tab" aria-selected={activeColour.id === colour.id} onClick={() => setActiveColour(colour)}>
                  <i style={{ backgroundColor: colour.swatch }} /><span><strong>{colour.name}</strong><small>{colour.traits}</small></span><b>{activeColour.id === colour.id ? "●" : "○"}</b>
                </button>
              ))}
            </div>
            <p className="colour-copy">{activeColour.copy}</p>
          </div>
          <figure className="colour-visual">
            <img src={activeColour.image} alt={`${activeColour.name} decorative mulch concept`} style={{ objectPosition: activeColour.focal }} loading="lazy" decoding="async" />
            <figcaption>Concept visualisation · colour shown in an indicative setting</figcaption>
          </figure>
        </div>
      </section>

      <section className="section section--sand">
        <div className="shell environment-grid">
          <div className="environment-image"><img src="/images/public-after.jpg" alt="Public walkway with decorative brown mulch" loading="lazy" decoding="async" /></div>
          <div className="environment-copy">
            <p className="eyebrow">05 — Where it works</p>
            <h2>One material.<br />Many environments.</h2>
            <p>From a private driveway to a hotel forecourt, the same idea applies: the ground should feel as considered as everything built above it.</p>
            <ul><li>Private residences</li><li>Residential estates</li><li>Hotels and hospitality</li><li>Commercial frontages</li><li>Campuses and public spaces</li></ul>
          </div>
        </div>
      </section>

      <section className="section section--visualise" id="visualise">
        <div className="section--visualise__backdrop" />
        <div className="shell visualise-grid">
          <div>
            <p className="eyebrow eyebrow--light">06 — Visualise my space</p>
            <h2>See your own property differently.</h2>
            <p>Tell us about the outdoor area you are considering. Selected early-access properties may receive a concept showing how decorative mulch could work within their space.</p>
            <div className="mini-steps"><span>01 Share the property</span><span>02 Choose your interest</span><span>03 Join early access</span></div>
          </div>
          <form className="interest-form" onSubmit={handleSubmit}>
            {submitted ? (
              <div className="form-success" role="status"><span>Request prepared</span><h3>Your space is on the concept list.</h3><p>This prototype has captured the interaction only. Data delivery will be connected during the next product phase.</p><button type="button" onClick={() => setSubmitted(false)}>Submit another property</button></div>
            ) : (
              <>
                <div className="form-top"><span>Early-access request</span><small>Prototype capture · no data is sent yet</small></div>
                <div className="field-row"><label>Property or project name<input name="project" placeholder="e.g. Ikoyi residence" required /></label><label>City<input name="city" placeholder="Lagos" required /></label></div>
                <label>Environment<select name="environment" defaultValue=""><option value="" disabled>Select an environment</option><option>Private home</option><option>Residential estate</option><option>Hotel or hospitality</option><option>Commercial property</option><option>Public space</option></select></label>
                <label>Your name<input name="name" autoComplete="name" required /></label>
                <label>Email address<input name="email" type="email" autoComplete="email" required /></label>
                <label className="upload">Property photo<input name="photo" type="file" accept="image/jpeg,image/png" /><span>Choose a clear daylight JPG or PNG</span></label>
                <button className="button button--light form-submit" type="submit">Prepare my request</button>
              </>
            )}
          </form>
        </div>
      </section>

      <section className="section section--paper" id="faq">
        <div className="shell faq-grid">
          <div><p className="eyebrow">07 — Questions</p><h2>Before you ask.</h2></div>
          <div className="faq-list">
            {faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <img src="/images/public-after.jpg" alt="Landscaped public walkway with decorative mulch" loading="lazy" decoding="async" />
        <div className="final-cta__veil" />
        <div className="shell final-cta__content"><p className="eyebrow eyebrow--light">Early access · Nigeria</p><h2>Your next landscape<br />could start here.</h2><a className="button button--light" href="#visualise">Visualise my space</a><p>For homeowners, businesses, developers and landscaping professionals.</p></div>
      </section>

      <footer>
        <a className="wordmark wordmark--dark" href="#top"><Mark /><span>PhansiCare</span><small>Ground study</small></a>
        <p>Currently validating early market interest in Nigeria. All landscapes shown are concept visualisations.</p>
        <span>Concept build · 2026</span>
      </footer>
    </main>
  );
}
