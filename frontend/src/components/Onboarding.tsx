import { useState, useEffect, ComponentType } from 'react';
import type { Step, Props as JoyrideProps, CallBackProps } from 'react-joyride';

// Dynamic import of Joyride to avoid SSR issues

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
  const [JoyrideComp, setJoyrideComp] = useState<ComponentType<JoyrideProps> | null>(null);

  useEffect(() => {
    import('react-joyride')
      .then((mod) => {
        setJoyrideComp(() => mod.default);
        setLoaded(true);
      })
      .catch((err) => {
        console.error('Error loading Joyride:', err);
      });

    const done = localStorage.getItem('tourDone');
    if (!done) {
      setRun(true);
    }
  }, []);

  if (!loaded || JoyrideComp === null) return null;

  return (
    <JoyrideComp
      steps={steps}
      run={run}
      continuous
      showSkipButton
      callback={(data: CallBackProps) => {
        if (['finished', 'skipped'].includes(data.status)) {
          localStorage.setItem('tourDone', 'true');
          setRun(false);
        }
      }}
    />
  );
}
      
