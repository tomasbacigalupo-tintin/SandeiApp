import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import { useFormations } from './useFormations';
import api from '@/services/api';

vi.mock('@/services/api', () => ({
  default: { get: vi.fn() },
}));

const mockedApi = api as unknown as { get: ReturnType<typeof vi.fn> };

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

describe('useFormations', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('fetch de formaciones exitoso', async () => {
    mockedApi.get.mockResolvedValueOnce({ data: [{ id: '1', name: '4-4-2' }] });
    const { result } = renderHook(() => useFormations(), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual([{ id: '1', name: '4-4-2' }]);
  });

  it('fetch de formaciones con error', async () => {
    mockedApi.get.mockRejectedValueOnce(new Error('fail'));
    const { result } = renderHook(() => useFormations(), { wrapper });
    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
