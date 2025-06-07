import {
  usePlayers,
  useCreatePlayer,
  useDeletePlayer,
  useUpdatePlayer,
} from '@/hooks/usePlayers';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import PlayerWizard, { type PlayerWizardData } from '@/components/PlayerWizard';
import PlayerCard from '@/components/PlayerCard';
import { Button } from '@/components/ui/button';

export default function Players() {
  const {
    data: players = [],
    isLoading: loading,
    error,
  } = usePlayers();
  const createPlayerMutation = useCreatePlayer();
  const deletePlayerMutation = useDeletePlayer();
  const updatePlayerMutation = useUpdatePlayer();

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [stats, setStats] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este jugador?')) return;
    deletePlayerMutation.mutate(id);
  };

  if (loading)
    return (
      <div className="p-6 space-y-4">
        <h2 className="text-xl font-bold">Jugadores</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-28 w-full" />
          ))}
        </div>
      </div>
    );
  if (error)
    return (
      <p className="text-red-500 text-center mt-10">{String(error)}</p>
    );

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Jugadores</h2>

      <Button onClick={() => setShowModal(true)} className="w-fit">
        Crear jugador
      </Button>

      {players.length === 0 ? (
        <div className="text-center py-10 space-y-2">
          <p className="text-gray-500">Aún no hay jugadores.</p>
          <Button onClick={() => setShowModal(true)}>Añadir jugador</Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {players.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              onEdit={() => {
                setName(player.name);
                setStats(JSON.stringify(player.stats, null, 2));
                setEditId(player.id);
                setIsEditMode(true);
                setShowModal(true);
              }}
              onDelete={() => handleDelete(player.id)}
            />
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <PlayerWizard
            initialName={name}
            initialStats={stats}
            onComplete={async (data: PlayerWizardData) => {
              if (isEditMode && editId) {
                await updatePlayerMutation.mutateAsync({ id: editId, data });
              } else {
                await createPlayerMutation.mutateAsync(data);
              }
              setShowModal(false);
              setIsEditMode(false);
              setName('');
              setStats('');
            }}
            onCancel={() => {
              setShowModal(false);
              setIsEditMode(false);
              setName('');
              setStats('');
            }}
          />
        </div>
      )}
    </div>
  );
}
