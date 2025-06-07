import { useState, useEffect, ComponentType } from 'react';
import type { Step, Props as JoyrideProps, CallBackProps } from 'react-joyride';

// Dynamic import of Joyride to avoid SSR issues
let Joyride: ComponentType<JoyrideProps> | null = null;

const steps: Step[] = [
  {
    target: '#add-player',
    content: 'Crea tu primer jugador aquí',
  },
  {
    target: '#add-formation',
    content: 'Diseña la formación táctica',
  },
  {
    target: '#stats-link',
    content: 'Consulta las estadísticas de rendimiento',
  },
];

export default function Onboarding() {
  const [run, setRun] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Import react-joyride only on client
    import('react-joyride')
      .then((mod) => {
        Joyride = mod.default;
        setLoaded(true);
      })
      .catch((err) => {
        console.error('Error loading Joyride:', err);
      });

    // Check if the tour was completed
    const done = localStorage.getItem('tourDone');
    if (!done) {
      setRun(true);
    }
  }, []);

  // While Joyride is loading, render nothing or a placeholder
  if (!loaded || Joyride === null) return null;

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showSkipButton
      callback={(data: CallBackProps) => {
        // Mark tour as done when finished or skipped
        if (['finished', 'skipped'].includes(data.status)) {
          localStorage.setItem('tourDone', 'true');
          setRun(false);
        }
      }}
    />
  );
}
