import SiteHeader from "@/components/SiteHeader";
import MagicRings from "@/components/MagicRings";

export default function Home() {
  return (
    <>
      <SiteHeader />

      {/* ---------------------------- HERO ---------------------------- */}
      <section className="hero hero--center">
        <div className="hero__rings" aria-hidden>
          <MagicRings
            color="#6b3a18"
            colorTwo="#b4501c"
            ringCount={7}
            speed={0.95}
            attenuation={8.5}
            lineThickness={2.6}
            baseRadius={0.3}
            radiusStep={0.11}
            scaleRate={0.1}
            opacity={1}
            noiseAmount={0.06}
            ringGap={1.5}
            fadeIn={0.7}
            fadeOut={0.5}
            followMouse={false}
            parallax={0.05}
            clickBurst={false}
          />
        </div>
        <div className="hero__inner">
          <span className="hero__eyebrow">A field guide to the new money stack</span>
          <h1 className="hero__title">
            The companies rebuilding
            <br />
            how money moves.
          </h1>
          <p className="hero__lede">
            Stablecoins are quietly re-plumbing payments — ramps, payment APIs, cross-border
            rails, synthetic dollars, and the neo-banks on top. <strong>Rails</strong> maps who
            does what, grouped by the layer they actually own, because most of them are
            complements, not competitors.
          </p>
        </div>
      </section>
    </>
  );
}
