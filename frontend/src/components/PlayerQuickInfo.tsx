import React, { memo, useCallback, useRef, useState, type KeyboardEvent } from 'react';
import { Player } from '@/types/player';
import { ExportPlayerPDF } from './exports/ExportButtons';

interface PlayerQuickInfoProps {
  player: Player;
}

const TABS = [
  { key: 'stats', label: 'Estadísticas' },
  { key: 'history', label: 'Historial' },
  { key: 'notes', label: 'Notas' },
] as const;
type TabKey = (typeof TABS)[number]['key'];

const PlayerQuickInfo = ({ player }: PlayerQuickInfoProps) => {
  const [activeTab, setActiveTab] = useState<TabKey>('stats');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusTab = useCallback((index: number) => {
    const button = tabRefs.current[index];
    button?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
      let newIndex: number | null = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        newIndex = (index + 1) % TABS.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        newIndex = (index - 1 + TABS.length) % TABS.length;
      }
      if (newIndex !== null) {
        setActiveTab(TABS[newIndex].key);
        focusTab(newIndex);
      }
    },
    [focusTab],
  );

  const handleTabClick = useCallback((key: TabKey) => {
    setActiveTab(key);
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow w-80">
      <h3 className="text-lg font-bold mb-2">{player.name}</h3>
      <div role="tablist" aria-label={`Información de ${player.name}`} className="flex gap-2 mb-2">
        {TABS.map((t, idx) => {
          const selected = activeTab === t.key;
          return (
            <button
              key={t.key}
              ref={(el) => (tabRefs.current[idx] = el)}
              id={`player-${player.id}-tab-${t.key}`}
              role="tab"
              aria-selected={selected}
              aria-controls={`player-${player.id}-tabpanel-${t.key}`}
              tabIndex={selected ? 0 : -1}
              className={`px-2 py-1 rounded ${
                selected ? 'bg-blue-700 text-white' : 'bg-gray-200'
              }`}
              onClick={() => handleTabClick(t.key)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      {TABS.map((t) => {
        if (activeTab !== t.key) return null;
        return (
          <div
            key={t.key}
            id={`player-${player.id}-tabpanel-${t.key}`}
            role="tabpanel"
            aria-labelledby={`player-${player.id}-tab-${t.key}`}
          >
            {t.key === 'stats' ? (
              <pre className="whitespace-pre-wrap break-all text-sm">
                {player.stats ? JSON.stringify(player.stats, null, 2) : 'Sin estadísticas'}
              </pre>
            ) : (
              <p className="text-sm text-gray-600">
                {t.key === 'history' ? 'Historial no disponible.' : 'Notas no disponibles.'}
              </p>
            )}
          </div>
        );
      })}
      <div className="mt-4 text-right">
        <ExportPlayerPDF player={player} />
      </div>
    </div>
  );
};

export default memo(PlayerQuickInfo);

