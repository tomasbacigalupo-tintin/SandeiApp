import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { register } from "@/services/authService"
import Spinner from "@/components/ui/spinner"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!name || !email || !password)
      return setError("Todos los campos son obligatorios")

    try {
      await register(name, email, password)
      navigate("/login")
    } catch {
      setError("No se pudo registrar el usuario")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 space-y-4">
      <h1 className="text-xl font-bold">Registrarse</h1>
      <div className="space-y-1">
        <label htmlFor="name" className="text-sm font-medium">Nombre</label>
        <input
          id="name"
          type="text"
          placeholder="Nombre"
          className="border p-2 w-full rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-label="Nombre"
        />
      </div>
      <div className="space-y-1">
        <label htmlFor="email" className="text-sm font-medium">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          className="border p-2 w-full rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email"
        />
      </div>
      <div className="space-y-1">
        <label htmlFor="password" className="text-sm font-medium">Contraseña</label>
        <input
          id="password"
          type="password"
          placeholder="Contraseña"
          className="border p-2 w-full rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-label="Contraseña"
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        className="bg-green-700 text-white px-4 py-2 rounded w-full flex items-center justify-center"
        disabled={loading}
      >
        {loading && <Spinner className="mr-2 h-5 w-5 text-white" />}
        Crear cuenta
      </button>
    </form>
  )
}
