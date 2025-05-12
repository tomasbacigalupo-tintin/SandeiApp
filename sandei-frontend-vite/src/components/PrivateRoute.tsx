import { Navigate } from "react-router-dom"
import { isAuthenticated } from "@/services/authService"

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />
}
