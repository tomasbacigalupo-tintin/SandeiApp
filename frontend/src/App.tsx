import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "@/pages/Login"
import Dashboard from "@/pages/Dashboard"
import Register from "@/pages/Register"
import PrivateRoute from "@/components/PrivateRoute"
import Players from "@/pages/Players"
import { Toaster } from "sonner"
import { Navigate } from "react-router-dom"
import BottomNav from "@/components/BottomNav"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/players"
            element={
              <PrivateRoute>
                <Players />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        <BottomNav />
      </BrowserRouter>
      <Toaster />
    </>
  )
}

export default App



