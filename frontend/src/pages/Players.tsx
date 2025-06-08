import { useState, useCallback } from 'react';
import {
  usePlayers,
  useCreatePlayer,
  useDeletePlayer,
  useUpdatePlayer,
} from '@/hooks/usePlayers';
import type { Player } from '@/types/player';
import { Skeleton } from '@/components/ui/skeleton';
import PlayerWizard, { type PlayerWizardData } from '@/components/PlayerWizard';
import PlayerCard from '@/components/PlayerCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export default function Players() {
  const {
    data: players = [],
    isLoading,
    error,
  } = usePlayers();

  const createPlayer = useCreatePlayer();
  const deletePlayer = useDeletePlayer();
  const updatePlayer = useUpdatePlayer();
  const { toast } = useToast();

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [stats, setStats] = useState({
    gamesPlayed: 0,
    goals: 0,
    assists: 0,
    yellowCards: 0,
    redCards: 0,
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const openModalForCreate = () => {
    setName('');
    setStats({
      gamesPlayed: 0,
      goals: 0,
      assists: 0,
      yellowCards: 0,
      redCards: 0,
    });
    setIsEditMode(false);
    setEditId(null);
    setShowModal(true);
  };

  const openModalForEdit = (player: Player) => {
    setName(player.name);
    setStats(player.stats ?? {
      gamesPlayed: 0,
      goals: 0,
      assists: 0,
      yellowCards: 0,
      redCards: 0,
    });
    setIsEditMode(true);
    setEditId(player.id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEditMode(false);
    setEditId(null);
    setName('');
    setStats({
      gamesPlayed: 0,
      goals: 0,
      assists: 0,
      yellowCards: 0,
      redCards: 0,
    });
  };

  const handleDelete = useCallback(
    async (id: string) => {
      if (!window.confirm('¿Estás seguro de eliminar este jugador?')) return;
      try {
        await deletePlayer.mutateAsync(id);
        toast({ title: 'Jugador eliminado', variant: 'success' });
      } catch (e) {
        toast({
          title: 'Error al eliminar jugador',
          description: (e as Error).message,
          variant: 'destructive',
        });
      }
    },
    [deletePlayer, toast]
  );

  const handleComplete = async (data: PlayerWizardData) => {
    try {
      if (isEditMode && editId) {
        await updatePlayer.mutateAsync({ id: editId, data });
        toast({ title: 'Jugador actualizado', variant: 'success' });
      } else {
        await createPlayer.mutateAsync(data);
        toast({ title: 'Jugador creado', variant: 'success' });
      }
    } catch (e) {
      toast({
        title: 'Error al guardar jugador',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      closeModal();
    }
  };

  if (isLoading) {
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
  }

  if (error) {
    return (
      <p className="text-red-500 text-center mt-10">
        {(error as Error).message}
      </p>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Jugadores</h2>
      <Button onClick={openModalForCreate} className="w-fit">
        Crear jugador
      </Button>

      {players.length === 0 ? (
        <div className="text-center py-10 space-y-2">
          <p className="text-gray-500">Aún no hay jugadores.</p>
          <Button onClick={openModalForCreate}>Añadir jugador</Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {players.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              onEdit={() => openModalForEdit(player)}
              onDelete={() => handleDelete(player.id)}
            />
          ))}
        </div>
      )}

      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <PlayerWizard
            initialName={name}
            initialStats={stats}
            onComplete={handleComplete}
            onCancel={closeModal}
          />
        </div>
      )}
    </div>
  );
}


