import { NavLink } from "react-router-dom";

const items = [
  { label: "Mission", to: "/dashboard" },
  { label: "Ayat Alkitab", to: "/ayat" },
  { label: "Renungan Harian", to: "/devotion" }
];

export default function Sidebar() {
  return (
    <aside className="side-menu rounded-2xl p-4 h-fit">
      <p className="text-xs tracking-[0.4em] text-slate-400 px-3 pb-3 futuristic-subtitle">
        Navigation
      </p>
      <div className="space-y-1">
        {items.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              `side-menu-item futuristic-subtitle ${isActive ? "active" : ""}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
      <div className="mt-5 border-t border-white/10 pt-4">
        <NavLink
          to="/"
          className="side-menu-item futuristic-subtitle"
        >
          Back to Landing
        </NavLink>
      </div>
    </aside>
  );
}
