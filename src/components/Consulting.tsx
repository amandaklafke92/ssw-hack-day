import { useEffect, useState } from 'react';

const REAPER_LINES = [
  'Consulting the ledger of the damned...',
  'Reading the bones. They say "hold on."',
  'Knock knock. Who\'s there? Not you, much longer.',
  'Cross-referencing your bad decisions...',
  'The void is thinking. The void is slow.',
];

type ConsultingProps = {
  onDone: () => void;
  minDelayMs?: number;
};

export function Consulting({ onDone, minDelayMs = 2000 }: ConsultingProps) {
  const [line] = useState(() => REAPER_LINES[Math.floor(Math.random() * REAPER_LINES.length)]);

  useEffect(() => {
    const timer = setTimeout(onDone, minDelayMs);
    return () => clearTimeout(timer);
  }, [onDone, minDelayMs]);

  return (
    <div className="screen">
      <div className="consulting-icon">☠</div>
      <h2 className="quiz-title">Consulting the Oracle&hellip;</h2>
      <p className="consulting-line">{line}</p>
    </div>
  );
}
