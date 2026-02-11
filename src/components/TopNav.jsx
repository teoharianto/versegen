import { NavLink } from "react-router-dom";

const linkBase =
  "px-4 py-2 rounded-full text-sm uppercase tracking-[0.2em] transition";

export default function TopNav() {
  return (
    <nav className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `${linkBase} ${
            isActive
              ? "bg-neon-purple/30 text-white shadow-glow"
              : "text-slate-300 hover:text-white hover:bg-white/10"
          }`
        }
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/devotion"
        className={({ isActive }) =>
          `${linkBase} ${
            isActive
              ? "bg-neon-cyan/20 text-white shadow-glow"
              : "text-slate-300 hover:text-white hover:bg-white/10"
          }`
        }
      >
        Renungan Harian
      </NavLink>
      <NavLink
        to="/admin"
        className={({ isActive }) =>
          `${linkBase} ${
            isActive
              ? "bg-neon-pink/20 text-white shadow-glow"
              : "text-slate-300 hover:text-white hover:bg-white/10"
          }`
        }
      >
        Admin
      </NavLink>
    </nav>
  );
}
