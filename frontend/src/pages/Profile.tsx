import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Profile() {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#000000');
  const [logo, setLogo] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('clubProfile');
    if (stored) {
      const data = JSON.parse(stored);
      setName(data.name || '');
      setColor(data.color || '#000000');
      setLogo(data.logo || null);
    }
  }, []);

  const save = () => {
    localStorage.setItem('clubProfile', JSON.stringify({ name, color, logo }));
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Perfil del Club</h2>
      <div className="space-y-2">
        <label className="block text-sm">Nombre</label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="space-y-2">
        <label className="block text-sm">Color principal</label>
        <Input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
      </div>
      <div className="space-y-2">
        <label className="block text-sm">Logo</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = () => setLogo(reader.result as string);
              reader.readAsDataURL(file);
            }
          }}
        />
        {logo && <img src={logo} alt="logo" className="h-20 w-20 object-contain" />}
      </div>
      <Button onClick={save}>Guardar</Button>
    </div>
  );
}
