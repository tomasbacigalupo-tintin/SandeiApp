import {
  usePlayers,
  useCreatePlayer,
  useDeletePlayer,
} from "@/hooks/usePlayers"
import { useState } from "react"

export default function Players() {
  const { data: players, isLoading: loading, error } = usePlayers()
  const createPlayerMutation = useCreatePlayer()
  const deletePlayerMutation = useDeletePlayer()

  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState("")
  const [stats, setStats] = useState("")
  const [isEditMode, setIsEditMode] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [statsError, setStatsError] = useState("")

  const handleDelete = (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este jugador?")) return
    deletePlayerMutation.mutate(id)
  }


  if (loading) return <p className="text-center mt-10">Cargando jugadores...</p>
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Jugadores</h2>

      <button
        onClick={() => setShowModal(true)}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        Crear jugador
      </button>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Nombre</th>
            <th className="p-2 text-left">Stats</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id} className="border-t">
              <td className="p-2">
                {player.name}
                <button
                  onClick={() => {
                    setName(player.name)
                    setStats(JSON.stringify(player.stats, null, 2))
                    setEditId(player.id)
                    setIsEditMode(true)
                    setShowModal(true)
                  }}
                  className="ml-2 text-blue-600 underline text-sm"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(player.id)}
                  className="ml-2 text-red-600 underline text-sm"
                >
                  Eliminar
                </button>
              </td>
              <td className="p-2">{JSON.stringify(player.stats)}</td>
            </tr>
          ))}

        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-lg font-bold mb-4">Nuevo jugador</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault()
                let parsedStats
                try {
                  parsedStats = stats ? JSON.parse(stats) : {}
                  setStatsError("")
                } catch {
                  setStatsError("JSON inválido")
                  return
                }
                try {
                  await createPlayerMutation.mutateAsync({
                    name,
                    stats: parsedStats,
                  })
                  setShowModal(false)
                } catch (err) {
                  alert("Error al crear jugador")
                }
              }}
            >
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nombre"
                  className="border p-2 w-full rounded"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <textarea
                  placeholder='Stats (ej: {"goals": 3})'
                  className="border p-2 w-full rounded"
                  value={stats}
                  onChange={(e) => {
                    setStats(e.target.value)
                    try {
                      JSON.parse(e.target.value)
                      setStatsError("")
                    } catch {
                      setStatsError("JSON inválido")
                    }
                  }}
                  required
                />
                {statsError && (
                  <p className="text-red-500 text-sm mt-1">{statsError}</p>
                )}
                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Guardar
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="text-blue-600 underline"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


