import { useAuth } from '@/context/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePlayers } from '@/hooks/usePlayers';
import { useMatches } from '@/hooks/useMatches';
import { useMemo, useCallback, useState, useRef, useEffect } from 'react';
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
  const dialogRef = useRef<HTMLDivElement>(null);

  // Preprocesar próximos partidos con fecha formateada
  const upcomingMatches = useMemo(() => {
    if (!matches) return [];
    return matches
      .map(m => ({
        ...m,
        formattedDate: new Date(m.date).toLocaleDateString(),
      }))
      .sort(
        (a, b) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
      )
      .slice(0, 3);
  }, [matches]);

  // Calcular promedio de puntuaciones
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
    () =>
      players?.find(p => p.id === selectedPlayerId) ?? null,
    [players, selectedPlayerId]
  );

  // Manejar foco al abrir/cerrar modal
  useEffect(() => {
    if (selectedPlayer) {
      const prevActive = document.activeElement as HTMLElement;
      dialogRef.current?.focus();
      return () => {
        prevActive?.focus();
      };
    }
  }, [selectedPlayer]);

  // Cerrar modal con Escape
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setSelectedPlayerId(null);
    }
  };

  return (
    <>
      <motion.div
        className="p-6 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <header>
          <h1 className="text-2xl font-bold">Bienvenido al Dashboard</h1>
        </header>

        {/* Estadísticas */}
        <section className="flex gap-4 overflow-x-auto pb-4">
          <article className="min-w-[15rem] bg-white rounded shadow p-4">
            <h2 className="font-bold mb-2">Próximos partidos</h2>
            {matchesLoading ? (
              <Skeleton className="h-4 w-24" />
            ) : upcomingMatches.length ? (
              <ul className="space-y-1">
                {upcomingMatches.map(m => (
                  <li key={m.id}>{m.formattedDate}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-600">Sin partidos</p>
            )}
          </article>

          <article className="min-w-[15rem] bg-white rounded shadow p-4">
            <h2 className="font-bold mb-2">Promedio de rendimiento</h2>
            {playersLoading ? (
              <Skeleton className="h-8 w-12" />
            ) : (
              <p className="text-2xl font-semibold">{averageScore}</p>
            )}
          </article>
        </section>

        {/* Navegación rápida */}
        <nav className="flex gap-4">
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
        </nav>

        {/* Lista de jugadores */}
        <section>
          <h2 className="text-xl font-bold mb-2">Jugadores</h2>
          {playersLoading ? (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="min-w-[10rem] h-10" />
              ))}
            </div>
          ) : (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {players.map(p => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPlayerId(p.id)}
                  className="min-w-[10rem] bg-white rounded shadow p-2 text-left focus:outline-none focus:ring"
                >
                  {p.name}
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Botón de cerrar sesión */}
        <div className="flex justify-end">
          <Button variant="destructive" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </div>
      </motion.div>

      {/* Modal accesible */}
      {selectedPlayer && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="player-info-title"
          tabIndex={-1}
          onKeyDown={handleKeyDown}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <div className="bg-white p-4 rounded shadow" role="document">
            <h3 id="player-info-title" className="sr-only">
              Información rápida de {selectedPlayer.name}
            </h3>
            <PlayerQuickInfo player={selectedPlayer} />
            <button
              onClick={() => setSelectedPlayerId(null)}
              className="mt-2 underline focus:outline-none"
              aria-label={`Cerrar información de ${selectedPlayer.name}`}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      <Onboarding />
    </>
  );
}
