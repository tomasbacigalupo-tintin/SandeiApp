import { NavLink } from 'react-router-dom'
import { FaHome, FaUserFriends, FaUser, FaChessBoard, FaChartBar } from 'react-icons/fa'

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2 text-sm md:hidden">
      <NavLink
        to="/dashboard"
        className="flex flex-col items-center"
        end
        aria-label="Inicio"
      >
        <FaHome className="mb-1" aria-hidden="true" />
        Inicio
      </NavLink>
      <NavLink to="/players" className="flex flex-col items-center" aria-label="Jugadores">
        <FaUserFriends className="mb-1" aria-hidden="true" />
        Jugadores
      </NavLink>
      <NavLink to="/tactics" className="flex flex-col items-center" aria-label="Tácticas">
        <FaChessBoard className="mb-1" aria-hidden="true" />
        T\u00e1cticas
      </NavLink>
      <NavLink to="/stats" className="flex flex-col items-center" aria-label="Estadísticas">
        <FaChartBar className="mb-1" aria-hidden="true" />
        Stats
      </NavLink>
      <NavLink to="/profile" className="flex flex-col items-center" aria-label="Perfil">
        <FaUser className="mb-1" aria-hidden="true" />
        Perfil
      </NavLink>
    </nav>
  )
}
