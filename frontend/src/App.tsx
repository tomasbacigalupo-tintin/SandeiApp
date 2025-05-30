import { BrowserRouter, Routes, Route } from "react-router-dom"
import { lazy, Suspense } from "react"
import PrivateRoute from "@/components/PrivateRoute"
import BottomNav from "@/components/BottomNav"
import { useAuth } from "@/context/AuthContext"
import Spinner from "@/components/ui/spinner"
import { Toaster } from "sonner"

const Login = lazy(() => import("@/pages/Login"))
const Register = lazy(() => import("@/pages/Register"))
const Dashboard = lazy(() => import("@/pages/Dashboard"))
const Players = lazy(() => import("@/pages/Players"))
const Tactics = lazy(() => import("@/pages/Tactics"))
const Profile = lazy(() => import("@/pages/Profile"))
const Stats = lazy(() => import("@/pages/Stats"))
const NotFound = lazy(() => import("@/pages/NotFound"))

function App() {
  const { isAuthenticated } = useAuth()
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <Suspense fallback={<Spinner className="mx-auto mt-4 h-6 w-6 text-primary" />}> 
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <Suspense fallback={<Spinner className="mx-auto mt-4 h-6 w-6 text-primary" />}> 
                <Register />
              </Suspense>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Suspense fallback={<Spinner className="mx-auto mt-4 h-6 w-6 text-primary" />}> 
                  <Dashboard />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route
            path="/players"
            element={
              <PrivateRoute>
                <Suspense fallback={<Spinner className="mx-auto mt-4 h-6 w-6 text-primary" />}> 
                  <Players />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route
            path="/tactics"
            element={
              <PrivateRoute>
                <Suspense fallback={<Spinner className="mx-auto mt-4 h-6 w-6 text-primary" />}> 
                  <Tactics />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route
            path="/stats"
            element={
              <PrivateRoute>
                <Suspense fallback={<Spinner className="mx-auto mt-4 h-6 w-6 text-primary" />}> 
                  <Stats />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Suspense fallback={<Spinner className="mx-auto mt-4 h-6 w-6 text-primary" />}> 
                  <Profile />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<Spinner className="mx-auto mt-4 h-6 w-6 text-primary" />}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
        {isAuthenticated && <BottomNav />}
      </BrowserRouter>
      <Toaster />
    </>
  )
}

export default App



