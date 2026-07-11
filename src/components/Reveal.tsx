import type { Reading } from '../logic';

type RevealProps = {
  reading: Reading;
  onRestart: () => void;
};

export function Reveal({ reading, onRestart }: RevealProps) {
  const weeksRemaining = Math.max(1, Math.round(reading.daysRemaining / 7));

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
        You have approximately <strong>{weeksRemaining.toLocaleString()} weeks</strong> left.
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
