import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import { usePlayers } from './usePlayers';
import api from '@/services/api';

vi.mock('@/services/api');

const mockedApi = vi.mocked(api);

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

describe('usePlayers', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('fetch de jugadores exitoso', async () => {
    mockedApi.get.mockResolvedValueOnce({ data: [{ id: '1', name: 'John' }] });
    const { result } = renderHook(() => usePlayers(), { wrapper });
    await waitFor(() => expect(mockedApi.get).toHaveBeenCalled());
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual([{ id: '1', name: 'John' }]);
  });

  it('fetch de jugadores con error', async () => {
    mockedApi.get.mockRejectedValueOnce(new Error('fail'));
    const { result } = renderHook(() => usePlayers(), { wrapper });
    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
