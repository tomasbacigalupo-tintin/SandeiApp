import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

const fetchPlayers = async () => {
  const token = localStorage.getItem("token")
  const res = await axios.get(`${API_URL}/players`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.data
}

export const usePlayers = () => {
  return useQuery({
    queryKey: ["players"],
    queryFn: fetchPlayers,
  })
}

export const useCreatePlayer = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (playerData: any) => {
      const token = localStorage.getItem("token")
      const res = await axios.post(`${API_URL}/players`, playerData, {
        headers: { Authorization: `Bearer ${token}` },
      })
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
      const token = localStorage.getItem("token")
      const res = await axios.put(`${API_URL}/players/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
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
      const token = localStorage.getItem("token")
      await axios.delete(`${API_URL}/players/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
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

