import api from "./api"

export async function createPlayer(data: { name: string; stats: object }) {
  const res = await api.post("/players", data)
  return res.data
}
export async function deletePlayer(id: string) {
  await api.delete(`/players/${id}`)
}
export async function updatePlayer(id: string, data: { name: string; stats: object }) {
  const res = await api.put(`/players/${id}`, data)
  return res.data
}
export async function getPlayers() {
  const res = await api.get("/players")
  return res.data
}


