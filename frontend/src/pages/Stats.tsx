import { useState } from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { Button } from '@/components/ui/button';
import { useStats } from '@/hooks/useStats';
import Spinner from '@/components/ui/spinner';
import './Stats.css';
import type { StatItem } from '@/types/stats';

export default function Stats() {
  const [range, setRange] = useState<'month' | 'season'>('month');
  const [selected, setSelected] = useState<string | null>(null);
  const { data, isLoading, error } = useStats(range);

  const stats: StatItem[] = data ?? [];

  if (isLoading) {
    return (
      <div className="flex justify-center mt-10">
        <Spinner className="h-8 w-8 text-primary" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-10">{String(error)}</p>;
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Rendimiento</h2>
      <div className="flex gap-2">
        <Button
          variant={range === 'month' ? 'default' : 'outline'}
          onClick={() => setRange('month')}
        >
          Último mes
        </Button>
        <Button
          variant={range === 'season' ? 'default' : 'outline'}
          onClick={() => setRange('season')}
        >
          Temporada
        </Button>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <BarChart width={300} height={200} data={stats}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
        <RadarChart width={300} height={250} data={stats}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <PolarRadiusAxis />
          <Radar
            name="Estadísticas"
            dataKey="value"
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.6}
          />
        </RadarChart>
        {selected && (
          <LineChart width={300} height={200} data={stats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#ff7300" />
          </LineChart>
        )}
      </div>
      <div className="flex gap-2 flex-wrap">
        {stats.map((s) => (
          <Button
            key={s.name}
            variant={selected === s.name ? 'default' : 'outline'}
            onClick={() => setSelected(s.name)}
          >
            {s.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
