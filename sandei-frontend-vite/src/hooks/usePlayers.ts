import { useEffect, useState } from "react"
import { getPlayers } from "@/services/playerService"

export function usePlayers() {
  const [players, setPlayers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    getPlayers()
      .then(setPlayers)
      .catch(() => setError("No se pudieron cargar los jugadores"))
      .finally(() => setLoading(false))
  }, [])

  return { players, loading, error }
}
