import { useQuery } from '@tanstack/react-query';
import type { Match } from '@/types/match';
import { getMatches } from '@/services/matches';

export function useMatches() {
  return useQuery<Match[]>({
    queryKey: ['matches'],
    queryFn: getMatches,
  });
}
