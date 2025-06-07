import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';

interface PlayerPos {
  id: string;
  name: string;
  x: number;
  y: number;
}

const initialPlayers: PlayerPos[] = [
  { id: '1', name: '1', x: 45, y: 80 },
  { id: '2', name: '2', x: 45, y: 60 },
  { id: '3', name: '3', x: 45, y: 40 },
  { id: '4', name: '4', x: 30, y: 20 },
  { id: '5', name: '5', x: 60, y: 20 },
];

export default function TacticsBoard() {
  const [players, setPlayers] = useState(initialPlayers);
  const boardRef = useRef<HTMLDivElement>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);

  const onDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('id', id);
  };

  const onDrop = (e: React.DragEvent) => {
    const id = e.dataTransfer.getData('id');
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPlayers((prev) => prev.map((p) => (p.id === id ? { ...p, x, y } : p)));
  };

  const handleLongPress = (id: string) => {
    setEditing(id);
  };

  const startPress = (id: string) => {
    const timer = setTimeout(() => handleLongPress(id), 500);
    setPressTimer(timer);
  };

  const endPress = () => {
    if (pressTimer) clearTimeout(pressTimer);
  };

  const savePos = (id: string, x: number, y: number) => {
    setPlayers((prev) => prev.map((p) => (p.id === id ? { ...p, x, y } : p)));
    setEditing(null);
  };

  const share = async () => {
    if (!boardRef.current) return;
    const canvas = await html2canvas(boardRef.current);
    const url = canvas.toDataURL();
    window.open(`https://wa.me/?text=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <div className="space-y-2">
      <div
        ref={boardRef}
        className="relative w-full h-96 bg-green-700 rounded"
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
      >
      {players.map((p) => (
        <div
          key={p.id}
          role="button"
          tabIndex={0}
          aria-label={`Mover ${p.name}`}
          draggable
          onDragStart={(e) => onDragStart(e, p.id)}
          onMouseDown={() => startPress(p.id)}
          onMouseUp={endPress}
          onTouchStart={() => startPress(p.id)}
          onTouchEnd={endPress}
          className="absolute text-white font-bold cursor-move select-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
        >
          {p.name}
          {editing === p.id && (
            <div className="absolute left-1/2 top-full mt-1 -translate-x-1/2 bg-white text-black p-2 rounded shadow">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const x = parseFloat(
                    (form.elements.namedItem('x') as HTMLInputElement).value,
                  );
                  const y = parseFloat(
                    (form.elements.namedItem('y') as HTMLInputElement).value,
                  );
                  savePos(p.id, x, y);
                }}
              >
                <div className="flex gap-1">
                  <input
                    name="x"
                    type="number"
                    defaultValue={p.x.toFixed(1)}
                    step="1"
                    className="border px-1 w-16 text-sm"
                    aria-label="X coordinate"
                  />
                  <input
                    name="y"
                    type="number"
                    defaultValue={p.y.toFixed(1)}
                    step="1"
                    className="border px-1 w-16 text-sm"
                    aria-label="Y coordinate"
                  />
                  <button className="bg-blue-700 text-white px-2 rounded text-sm">
                    OK
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      ))}
      </div>
      <button onClick={share} className="bg-blue-700 text-white px-4 py-1 rounded">
        Compartir por WhatsApp
      </button>
    </div>
  );
}
