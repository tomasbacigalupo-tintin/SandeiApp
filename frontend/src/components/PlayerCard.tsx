import { Player } from "@/types/player";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, useAnimation } from "framer-motion";

interface PlayerCardProps {
  player: Player;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function PlayerCard({ player, onEdit, onDelete }: PlayerCardProps) {
  const controls = useAnimation();

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x < -100 && onDelete) {
      if (confirm("¿Estás seguro de eliminar este jugador?")) {
        onDelete();
        if (navigator.vibrate) navigator.vibrate(50);
      }
    }
    controls.start({ x: 0 });
  };

  return (
    <motion.div drag="x" onDragEnd={handleDragEnd} animate={controls}>
      <Card className="flex flex-col gap-2">
        <CardHeader className="flex items-start justify-between gap-2">
          <CardTitle>{player.name}</CardTitle>
          <div className="flex gap-2">
            {onEdit && (
              <Button variant="outline" size="sm" onClick={onEdit}>
                Editar
              </Button>
            )}
            {onDelete && (
              <Button variant="destructive" size="sm" onClick={onDelete}>
                Eliminar
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="text-sm whitespace-pre-wrap break-all">
          {player.stats ? (
            <pre>{JSON.stringify(player.stats, null, 2)}</pre>
          ) : (
            <p>Sin estadísticas</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
