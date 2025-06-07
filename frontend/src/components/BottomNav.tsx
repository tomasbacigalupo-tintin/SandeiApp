import { NavLink } from 'react-router-dom';
import { memo } from 'react';
import {
  FaHome,
  FaUserFriends,
  FaUser,
  FaChessBoard,
  FaChartBar,
} from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';

function BottomNav() {
  return (
    <nav
      aria-label="Menú de navegación"
      className="fixed bottom-0 left-0 right-0 border-t border-border bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-md flex justify-around py-2 text-sm md:hidden"
    >
      <NavLink
        to="/dashboard"
        className="flex flex-col items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
        end
        aria-label="Inicio"
      >
        <FaHome className="mb-1" aria-hidden="true" />
        Inicio
      </NavLink>
      <NavLink
        to="/players"
        className="flex flex-col items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
        aria-label="Jugadores"
      >
        <FaUserFriends className="mb-1" aria-hidden="true" />
        Jugadores
      </NavLink>
      <NavLink
        to="/tactics"
        className="flex flex-col items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
        aria-label="Tácticas"
      >
        <FaChessBoard className="mb-1" aria-hidden="true" />
        T\u00e1cticas
      </NavLink>
      <NavLink
        to="/stats"
        className="flex flex-col items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
        aria-label="Estadísticas"
      >
        <FaChartBar className="mb-1" aria-hidden="true" />
        Stats
      </NavLink>
      <NavLink
        to="/profile"
        className="flex flex-col items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
        aria-label="Perfil"
      >
        <FaUser className="mb-1" aria-hidden="true" />
        Perfil
      </NavLink>
      <ThemeToggle />
    </nav>
  );
}

export default memo(BottomNav);
