import { NavLink } from 'react-router-dom'
import { FaHome, FaFutbol, FaUserFriends, FaUser } from 'react-icons/fa'

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2 text-sm">
      <NavLink to="/dashboard" className="flex flex-col items-center" end>
        <FaHome className="mb-1" />
        Inicio
      </NavLink>
      <NavLink to="/matches" className="flex flex-col items-center">
        <FaFutbol className="mb-1" />
        Partidos
      </NavLink>
      <NavLink to="/players" className="flex flex-col items-center">
        <FaUserFriends className="mb-1" />
        Jugadores
      </NavLink>
      <NavLink to="/profile" className="flex flex-col items-center">
        <FaUser className="mb-1" />
        Perfil
      </NavLink>
    </nav>
  )
}
