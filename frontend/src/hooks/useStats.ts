import { useQuery } from '@tanstack/react-query';
import { getStats } from '@/services/stats';
import { StatItem } from '@/types/stats';

export function useStats(range: 'month' | 'season') {
  return useQuery<StatItem[]>({
    queryKey: ['stats', range],
    queryFn: () => getStats(range),
  });
}
