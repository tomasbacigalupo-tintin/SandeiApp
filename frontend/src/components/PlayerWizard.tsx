import { useState } from 'react';
import Spinner from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';

export interface PlayerWizardData {
  name: string;
  stats: Record<string, number>;
}

function parseStats(json: string): Record<string, number> {
  try {
    const obj = JSON.parse(json) as unknown;
    if (typeof obj !== 'object' || obj === null) return {};
    return Object.entries(obj).reduce<Record<string, number>>((acc, [k, v]) => {
      if (typeof v === 'number') acc[k] = v;
      return acc;
    }, {});
  } catch {
    return {};
  }
}

export default function PlayerWizard({
  initialName = '',
  initialStats = '',
  onComplete,
  onCancel,
}: {
  initialName?: string;
  initialStats?: string;
  onComplete: (data: PlayerWizardData) => Promise<void> | void;
  onCancel: () => void;
}) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState(initialName);
  const [stats, setStats] = useState(initialStats);
  const [statsError, setStatsError] = useState('');
  const [saving, setSaving] = useState(false);
  const totalSteps = 3;

  const next = () => {
    if (step === 1 && !name) return;
    if (step === 2) {
      try {
        JSON.parse(stats || '{}');
        setStatsError('');
      } catch {
        setStatsError('JSON inválido');
        return;
      }
    }
    setStep((s) => Math.min(s + 1, totalSteps));
  };

  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const finish = async () => {
    try {
      setSaving(true);
      const parsed = stats ? parseStats(stats) : {};
      await onComplete({ name, stats: parsed });
    } finally {
      setSaving(false);
    }
  };

  const progress = ((step - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="bg-white p-6 rounded w-96">
      <div className="h-2 bg-gray-200 rounded mb-4">
        <div
          className="h-full bg-blue-700 rounded"
          style={{ width: `${progress}%` }}
        />
      </div>
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Nombre del jugador</h2>
          <label htmlFor="player-name" className="sr-only">
            Nombre
          </label>
          <input
            id="player-name"
            type="text"
            className="border p-2 w-full rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre"
            aria-label="Nombre"
          />
        </div>
      )}
      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Estadísticas</h2>
          <label htmlFor="player-stats" className="sr-only">
            Estadísticas
          </label>
          <textarea
            id="player-stats"
            className="border p-2 w-full rounded"
            placeholder='Stats (ej: {"goals": 3})'
            value={stats}
            onChange={(e) => {
              setStats(e.target.value);
              try {
                JSON.parse(e.target.value);
                setStatsError('');
              } catch {
                setStatsError('JSON inválido');
              }
            }}
            aria-label="Estadísticas"
          />
          {statsError && <p className="text-red-500 text-sm">{statsError}</p>}
        </div>
      )}
      {step === 3 && (
        <div className="space-y-2">
          <h2 className="text-lg font-bold">Confirmar datos</h2>
          <p className="break-all">
            <strong>Nombre:</strong> {name}
          </p>
          <pre className="bg-gray-100 p-2 rounded overflow-auto text-sm">
            {stats || '{}'}
          </pre>
        </div>
      )}
      <div className="flex justify-between mt-4">
        {step > 1 ? (
          <button onClick={prev} className="text-blue-600 underline">
            Atrás
          </button>
        ) : (
          <span />
        )}
        {step < totalSteps && (
          <Button variant="default" onClick={next}>
            Siguiente
          </Button>
        )}
        {step === totalSteps && (
          <Button
            variant="success"
            onClick={finish}
            disabled={saving}
            className="flex items-center"
          >
            {saving && <Spinner className="h-4 w-4 mr-2 text-white" />}
            Guardar
          </Button>
        )}
        <Button
          variant="link"
          onClick={onCancel}
          className="ml-2 text-destructive"
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
}
