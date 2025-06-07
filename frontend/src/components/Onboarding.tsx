import { useState, useEffect } from 'react';
import type { Step, CallBackProps } from 'react-joyride';

let Joyride: (typeof import('react-joyride'))['default'] | null = null;

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
    import('react-joyride').then((mod) => {
      Joyride = mod.default;
      setLoaded(true);
    });
    const done = localStorage.getItem('tourDone');
    if (!done) setRun(true);
  }, []);

  return (
    loaded && (
      <Joyride
        steps={steps}
        run={run}
        continuous
        showSkipButton
        callback={(data: CallBackProps) => {
          if (data.status === 'finished' || data.status === 'skipped') {
            localStorage.setItem('tourDone', 'true');
          }
        }}
      />
    )
  );
}
