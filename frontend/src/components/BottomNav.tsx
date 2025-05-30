import { NavLink } from 'react-router-dom'
import { FaHome, FaUserFriends, FaUser, FaChessBoard } from 'react-icons/fa'

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2 text-sm">
      <NavLink to="/dashboard" className="flex flex-col items-center" end>
        <FaHome className="mb-1" />
        Inicio
      </NavLink>
      <NavLink to="/players" className="flex flex-col items-center">
        <FaUserFriends className="mb-1" />
        Jugadores
      </NavLink>
      <NavLink to="/tactics" className="flex flex-col items-center">
        <FaChessBoard className="mb-1" />
        T\u00e1cticas
      </NavLink>
      <NavLink to="/profile" className="flex flex-col items-center">
        <FaUser className="mb-1" />
        Perfil
      </NavLink>
    </nav>
  )
}
