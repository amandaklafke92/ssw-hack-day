import { useState } from 'react';
import { getReading, type QuizAnswers, type Reading } from './logic';
import { Landing } from './components/Landing';
import { Quiz } from './components/Quiz';
import { PhotoUpload } from './components/PhotoUpload';
import { Consulting } from './components/Consulting';
import { Reveal } from './components/Reveal';

type Screen = 'landing' | 'quiz' | 'photo' | 'consulting' | 'reveal';

function App() {
  const [screen, setScreen] = useState<Screen>('landing');
  const [reading, setReading] = useState<Reading | null>(null);

  function handleQuizSubmit(answers: QuizAnswers) {
    setReading(getReading(answers));
    setScreen('photo');
  }

  function handleRestart() {
    setReading(null);
    setScreen('landing');
  }

  switch (screen) {
    case 'landing':
      return <Landing onStart={() => setScreen('quiz')} />;
    case 'quiz':
      return <Quiz onSubmit={handleQuizSubmit} />;
    case 'photo':
      return <PhotoUpload onContinue={() => setScreen('consulting')} />;
    case 'consulting':
      return <Consulting onDone={() => setScreen('reveal')} />;
    case 'reveal':
      return reading ? (
        <Reveal reading={reading} onRestart={handleRestart} />
      ) : (
        <Landing onStart={() => setScreen('quiz')} />
      );
  }
}

export default App;
