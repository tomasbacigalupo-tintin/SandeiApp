import React, { useRef, useState, type KeyboardEvent } from 'react';
import { Player } from '@/types/player';
import { ExportPlayerPDF } from './exports/ExportButtons';

interface PlayerQuickInfoProps {
  player: Player;
}

function PlayerQuickInfo({ player }: PlayerQuickInfoProps) {
  const tabs = [
    { key: 'stats', label: 'Estadísticas' },
    { key: 'history', label: 'Historial' },
    { key: 'notes', label: 'Notas' },
  ] as const;
  type TabKey = (typeof tabs)[number]['key'];

  const [tab, setTab] = useState<TabKey>('stats');
  const tabRefs = useRef<HTMLButtonElement[]>([]);

  const focusTab = (index: number) => {
    const btn = tabRefs.current[index];
    btn?.focus();
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (index + 1) % tabs.length;
      setTab(tabs[next].key);
      focusTab(next);
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = (index - 1 + tabs.length) % tabs.length;
      setTab(tabs[prev].key);
      focusTab(prev);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow w-80">
      <h3 className="text-lg font-bold mb-2">{player.name}</h3>
      <div role="tablist" className="flex gap-2 mb-2">
        {tabs.map((t, idx) => (
          <button
            key={t.key}
            ref={(el) => {
              if (el) tabRefs.current[idx] = el;
            }}
            role="tab"
            aria-selected={tab === t.key}
            tabIndex={tab === t.key ? 0 : -1}
            className={`px-2 py-1 rounded ${
              tab === t.key ? 'bg-blue-700 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setTab(t.key)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
          >
            {t.label}
          </button>
        ))}
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
      <div className="mt-4 text-right">
        <ExportPlayerPDF player={player} />
      </div>
    </div>
  );
}

export default React.memo(PlayerQuickInfo);
