import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "@/services/authService"
import { Link } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!email || !password) return setError("Todos los campos son obligatorios")

    try {
      await login(email, password)
      navigate("/dashboard")
    } catch (err) {
      setError("Credenciales inválidas")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 space-y-4">
      <h1 className="text-xl font-bold">Iniciar sesión</h1>
      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        className="border p-2 w-full rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Ingresar
      </button>

      <p className="text-sm text-center">
        ¿No tenés cuenta?{" "}
        <Link to="/register" className="text-blue-600 underline">
          Registrate acá
        </Link>
      </p>
    </form>
  )
}

export default Login

