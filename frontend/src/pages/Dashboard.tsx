import { logout } from "@/services/authService"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate("/login")
  }

  return (
    <motion.div
      className="p-6 space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-2xl font-bold">Bienvenido al Dashboard</h1>
      <p>Estás autenticado correctamente.</p>
      <Button variant="destructive" onClick={handleLogout}>
        Cerrar sesión
      </Button>
    </motion.div>
  )
}
