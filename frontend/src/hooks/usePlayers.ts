import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../services/api"
import { toast } from "sonner"

export interface Player {
  id: string
  name: string
  stats?: any
}

const fetchPlayers = async (): Promise<Player[]> => {
  const res = await api.get("/players")
  return res.data
}

export const usePlayers = () => {
  return useQuery<Player[]>({
    queryKey: ["players"],
    queryFn: fetchPlayers,
  })
}

export const useCreatePlayer = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (playerData: any) => {
      const res = await api.post("/players", playerData)
      return res.data
    },
    onSuccess: () => {
      toast.success("Jugador creado correctamente")
      queryClient.invalidateQueries({ queryKey: ["players"] })
    },
    onError: () => {
      toast.error("Error al crear el jugador")
    },
  })
}

export const useUpdatePlayer = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const res = await api.put(`/players/${id}`, data)
      return res.data
    },
    onSuccess: () => {
      toast.success("Jugador actualizado")
      queryClient.invalidateQueries({ queryKey: ["players"] })
    },
    onError: () => {
      toast.error("Error al actualizar el jugador")
    },
  })
}

export const useDeletePlayer = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/players/${id}`)
    },
    onSuccess: () => {
      toast.success("Jugador eliminado")
      queryClient.invalidateQueries({ queryKey: ["players"] })
    },
    onError: () => {
      toast.error("Error al eliminar el jugador")
    },
  })
}

