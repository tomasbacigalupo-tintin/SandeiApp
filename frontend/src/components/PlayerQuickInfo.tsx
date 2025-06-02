import { Player } from '@/types/player';
import { useState } from 'react';

interface PlayerQuickInfoProps {
  player: Player;
}

export default function PlayerQuickInfo({ player }: PlayerQuickInfoProps) {
  const [tab, setTab] = useState<'stats' | 'history' | 'notes'>('stats');

  return (
    <div className="bg-white p-4 rounded shadow w-80">
      <h3 className="text-lg font-bold mb-2">{player.name}</h3>
      <div className="flex gap-2 mb-2">
        <button
          className={`px-2 py-1 rounded ${tab === 'stats' ? 'bg-blue-700 text-white' : 'bg-gray-200'}`}
          onClick={() => setTab('stats')}
        >
          Estadísticas
        </button>
        <button
          className={`px-2 py-1 rounded ${tab === 'history' ? 'bg-blue-700 text-white' : 'bg-gray-200'}`}
          onClick={() => setTab('history')}
        >
          Historial
        </button>
        <button
          className={`px-2 py-1 rounded ${tab === 'notes' ? 'bg-blue-700 text-white' : 'bg-gray-200'}`}
          onClick={() => setTab('notes')}
        >
          Notas
        </button>
      </div>
      {tab === 'stats' && (
        <pre className="whitespace-pre-wrap break-all text-sm">
          {player.stats
            ? JSON.stringify(player.stats, null, 2)
            : 'Sin estadísticas'}
        </pre>
      )}
      {tab === 'history' && (
        <p className="text-sm text-gray-600">Historial no disponible.</p>
      )}
      {tab === 'notes' && (
        <p className="text-sm text-gray-600">Notas no disponibles.</p>
      )}
    </div>
  );
}
