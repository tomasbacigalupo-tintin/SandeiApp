import { useAuth } from '@/context/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePlayers } from '@/hooks/usePlayers';
import type { Player } from '@/types/player';
import { useMatches } from '@/hooks/useMatches';
import { useMemo, useCallback, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import PlayerQuickInfo from '@/components/PlayerQuickInfo';
import { Button } from '@/components/ui/button';
import Onboarding from '@/components/Onboarding';

export default function Dashboard() {
  const navigate = useNavigate();
  const { data: players, isLoading: playersLoading } = usePlayers();
  const { logout } = useAuth();
  const { data: matches, isLoading: matchesLoading } = useMatches();
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);

  const upcomingMatches = useMemo(() => {
    if (!matches) return [];
    return [...matches]
      .sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      )
      .slice(0, 3);
  }, [matches]);

  const averageScore = useMemo(() => {
    if (!players?.length) return 'N/A';
    const total = players.reduce((sum, p) => sum + (p.score ?? 0), 0);
    return (total / players.length).toFixed(2);
  }, [players]);

  const handleLogout = useCallback(() => {
    logout();
    navigate('/login');
  }, [logout, navigate]);

  const selectedPlayer = useMemo(
    () => players?.find((p) => p.id === selectedPlayerId) ?? null,
    [players, selectedPlayerId]
  );

  return (
    <>
      <motion.div
        className="p-6 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold">Bienvenido al Dashboard</h1>

        <div className="flex gap-4 overflow-x-auto pb-4">
          {/* Próximos Partidos */}
          <div className="min-w-[15rem] bg-white rounded shadow p-4">
            <h2 className="font-bold mb-2">Próximos partidos</h2>
            {matchesLoading ? (
              <Skeleton className="h-4 w-24" />
            ) : upcomingMatches.length ? (
              <ul className="space-y-1">
                {upcomingMatches.map((m) => (
                  <li key={m.id}>
                    {new Date(m.date).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-600">Sin partidos</p>
            )}
          </div>

          {/* Promedio de Rendimiento */}
          <div className="min-w-[15rem] bg-white rounded shadow p-4">
            <h2 className="font-bold mb-2">Promedio de rendimiento</h2>
            {playersLoading ? (
              <Skeleton className="h-8 w-12" />
            ) : (
              <p className="text-2xl font-semibold">{averageScore}</p>
            )}
          </div>
        </div>

        {/* Enlaces Rápidos */}
        <div className="flex gap-4">
          <Link
            to="/tactics"
            className="flex-1 bg-blue-700 text-white text-center py-3 rounded text-lg"
          >
            Crear formación
          </Link>
          <Link
            to="/players"
            className="flex-1 bg-green-700 text-white text-center py-3 rounded text-lg"
          >
            Analizar rendimiento
          </Link>
        </div>

        {/* Lista de Jugadores */}
        <div>
          <h2 className="text-xl font-bold mb-2">Jugadores</h2>
          {playersLoading ? (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="min-w-[10rem] h-10" />
              ))}
            </div>
          ) : (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {players?.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPlayerId(p.id)}
                  className="min-w-[10rem] bg-white rounded shadow p-2 text-left"
                >
                  {p.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Modal de Información Rápida */}
        {selectedPlayer && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded">
              <PlayerQuickInfo player={selectedPlayer} />
              <div className="text-right mt-2">
                <button
                  onClick={() => setSelectedPlayerId(null)}
                  className="text-blue-700 underline"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Logout */}
        <div className="flex justify-end">
          <Button variant="destructive" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </div>
      </motion.div>

      <Onboarding />
    </>
  );
}
