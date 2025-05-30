import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../services/api"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Spinner from "@/components/ui/spinner"

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      {...props}
      className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  )
}

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await api.post("/auth/login", { email, password })

      localStorage.setItem("token", res.data.token)
      toast.success("Inicio de sesión exitoso")
      navigate("/dashboard")
    } catch {
      toast.error("Credenciales inválidas o error del servidor")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Iniciar sesión</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email"
                required
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="password" className="text-sm font-medium">
                Contraseña
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Contraseña"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full flex items-center justify-center"
              disabled={loading}
            >
              {loading && <Spinner className="mr-2 h-5 w-5 text-white" />}
              {loading ? "Ingresando..." : "Ingresar"}
            </Button>
          </form>
          <p className="text-sm text-center mt-4">
            ¿No tenés cuenta?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Registrate acá
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
