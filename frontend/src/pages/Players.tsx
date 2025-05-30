import {
  usePlayers,
  useCreatePlayer,
  useDeletePlayer,
  useUpdatePlayer,
} from "@/hooks/usePlayers"
import { useState } from "react"
import Spinner from "@/components/ui/spinner"
import PlayerWizard from "@/components/PlayerWizard"

export default function Players() {
  const { data: players, isLoading: loading, error } = usePlayers()
  const createPlayerMutation = useCreatePlayer()
  const deletePlayerMutation = useDeletePlayer()
  const updatePlayerMutation = useUpdatePlayer()

  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState("")
  const [stats, setStats] = useState("")
  const [isEditMode, setIsEditMode] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este jugador?")) return
    deletePlayerMutation.mutate(id)
  }


  if (loading)
    return (
      <div className="flex justify-center mt-10">
        <Spinner className="h-8 w-8 text-primary" />
      </div>
    )
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
          <PlayerWizard
            initialName={name}
            initialStats={stats}
            onComplete={async (data) => {
              if (isEditMode && editId) {
                await updatePlayerMutation.mutateAsync({ id: editId, data })
              } else {
                await createPlayerMutation.mutateAsync(data)
              }
              setShowModal(false)
              setIsEditMode(false)
              setName("")
              setStats("")
            }}
            onCancel={() => {
              setShowModal(false)
              setIsEditMode(false)
              setName("")
              setStats("")
            }}
          />
        </div>
      )}
    </div>
  )
}


