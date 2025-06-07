import React, { memo, useCallback, useMemo } from 'react';
import { Player } from '@/types/player';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, useAnimation } from 'framer-motion';

interface PlayerCardProps {
  player: Player;
  onEdit?: () => void;
  onDelete?: () => void;
}

function PlayerCard({ player, onEdit, onDelete }: PlayerCardProps) {
  const controls = useAnimation();

  const handleDelete = useCallback(() => {
    if (confirm(`¿Estás seguro de eliminar a ${player.name}?`)) {
      onDelete?.();
      if (navigator.vibrate) navigator.vibrate(50);
    }
  }, [onDelete, player.name]);

  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { x: number } }) => {
      if (info.offset.x < -100 && onDelete) {
        handleDelete();
      }
      controls.start({ x: 0 });
    },
    [controls, handleDelete, onDelete]
  );

  const statsContent = useMemo(
    () =>
      player.stats ? (
        <pre aria-label={`Estadísticas de ${player.name}`} className="whitespace-pre-wrap break-all">
          {JSON.stringify(player.stats, null, 2)}
        </pre>
      ) : (
        <p>Sin estadísticas</p>
      ),
    [player.stats, player.name]
  );

  return (
    <motion.div
      role="group"
      aria-label={`Ficha del jugador ${player.name}`}
      drag="x"
      dragConstraints={{ left: -100, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={controls}
      tabIndex={0}
      onKeyDown={(e) => {
        if ((e.key === 'Delete' || e.key === 'Backspace') && onDelete) {
          handleDelete();
        }
      }}
    >
      <Card className="flex flex-col gap-2">
        <CardHeader className="flex items-start justify-between gap-2">
          <CardTitle>{player.name}</CardTitle>
          <div className="flex gap-2">
            {onEdit && (
              <Button variant="outline" size="sm" onClick={onEdit} aria-label={`Editar ${player.name}`}>
                Editar
              </Button>
            )}
            {onDelete && (
              <Button variant="destructive" size="sm" onClick={handleDelete} aria-label={`Eliminar ${player.name}`}>
                Eliminar
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="text-sm">{statsContent}</CardContent>
      </Card>
    </motion.div>
  );
}

export default memo(PlayerCard);

