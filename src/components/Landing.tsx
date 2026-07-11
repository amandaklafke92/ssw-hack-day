import gateImage from '../assets/cemetery-gate.jpg';

type LandingProps = {
  onStart: () => void;
};

export function Landing({ onStart }: LandingProps) {
  return (
    <div className="screen landing-screen">
      <div className="gate-scene">
        <div className="gate-fog gate-fog-a" />
        <div className="gate-fog gate-fog-b" />
        <img src={gateImage} className="gate-leaf-img gate-leaf-left" alt="" aria-hidden="true" />
        <img src={gateImage} className="gate-leaf-img gate-leaf-right" alt="" aria-hidden="true" />
        <div className="gate-smoke-burst" />
        <div className="gate-vignette" />
      </div>

      <div className="landing-content">
        <div className="eyebrow">The Oracle Awaits</div>
        <h1 className="landing-headline">GRIM</h1>
        <p className="landing-sub">
          Answer a few honest questions. The void will answer with one: when, and how, it all ends.
          No refunds. No do-overs. Mostly for laughs.
        </p>
        <button className="btn btn-primary" onClick={onStart}>
          Enter, if you dare
        </button>
      </div>
    </div>
  );
}
