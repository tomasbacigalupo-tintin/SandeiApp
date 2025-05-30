import {
  usePlayers,
  useCreatePlayer,
  useDeletePlayer,
  useUpdatePlayer,
} from "@/hooks/usePlayers"
import { useState } from "react"
import Spinner from "@/components/ui/spinner"
import PlayerWizard from "@/components/PlayerWizard"
import PlayerCard from "@/components/PlayerCard"
import { Button } from "@/components/ui/button"

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
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Jugadores</h2>

      <Button onClick={() => setShowModal(true)} className="w-fit">
        Crear jugador
      </Button>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {players.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            onEdit={() => {
              setName(player.name)
              setStats(JSON.stringify(player.stats, null, 2))
              setEditId(player.id)
              setIsEditMode(true)
              setShowModal(true)
            }}
            onDelete={() => handleDelete(player.id)}
          />
        ))}
      </div>

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


