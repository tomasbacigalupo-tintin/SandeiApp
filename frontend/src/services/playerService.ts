const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"


export async function createPlayer(data: { name: string; stats: object }) {
  const token = localStorage.getItem("token")
  const res = await fetch(`${API_URL}/players`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    throw new Error("Error al crear el jugador")
  }

  return res.json()
}
export async function deletePlayer(id: number) {
  const token = localStorage.getItem("token")
  const res = await fetch(`${API_URL}/players/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error("Error al eliminar el jugador")
  }
}
export async function updatePlayer(id: number, data: { name: string; stats: object }) {
  const token = localStorage.getItem("token")
  const res = await fetch(`${API_URL}/players/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    throw new Error("Error al actualizar el jugador")
  }

  return res.json()
}
export async function getPlayers() {
  const token = localStorage.getItem("token")
  const res = await fetch(`${API_URL}/players`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error("Error al obtener jugadores")
  }

  return res.json()
}


