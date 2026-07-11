import { ScytheDivider } from '../icons';

type LandingProps = {
  onStart: () => void;
};

export function Landing({ onStart }: LandingProps) {
  return (
    <div className="screen">
      <ScytheDivider className="ornament" />
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
  );
}
