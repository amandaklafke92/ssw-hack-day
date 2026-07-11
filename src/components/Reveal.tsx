import type { Reading } from '../logic';

type RevealProps = {
  reading: Reading;
  onRestart: () => void;
};

export function Reveal({ reading, onRestart }: RevealProps) {
  return (
    <div className="screen">
      <div className="certificate">
        <div className="certificate-seal">☠</div>
        <div className="certificate-eyebrow">Certificate of Doom</div>
        <div className="certificate-date">{reading.deathDate}</div>
        <div className="certificate-cause-label">Cause of Death</div>
        <p className="certificate-cause">{reading.causeOfDeath}</p>
        <div className="certificate-tagline">{reading.tagline}</div>
      </div>

      <p className="reflection-line">
        You have approximately <strong>{reading.daysRemaining.toLocaleString()} days</strong> left.
        What are you doing with them?
      </p>

      <div className="reveal-actions">
        <button className="btn btn-primary" onClick={onRestart}>
          Ask Again
        </button>
      </div>
    </div>
  );
}
