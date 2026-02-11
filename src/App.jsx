import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Ayat from "./pages/Ayat.jsx";
import Devotion from "./pages/Devotion.jsx";
import { playFuturisticClick } from "./utils/sfx.js";

export default function App() {
  const location = useLocation();
  const showHud = location.pathname !== "/";
  const hudTitle = (() => {
    switch (location.pathname) {
      case "/dashboard":
        return "Mission";
      case "/ayat":
        return "Ayat Alkitab Harian";
      case "/devotion":
        return "Renungan Harian";
      default:
        return "Dashboard Firman";
    }
  })();

  useEffect(() => {
    const handler = (event) => {
      const target = event.target;
      if (target && target.closest && target.closest("button")) {
        playFuturisticClick();
      }
    };
    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, []);

  return (
    <div className="min-h-screen text-white futuristic-bg">
      <div className="stars-layer" />
      <div className="network-layer" />
      {showHud && (
        <div className="hud-topbar">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-slate-400">
                Verses Generator
              </p>
              <h1 className="text-lg font-semibold text-white">{hudTitle}</h1>
            </div>
          </div>
          <div className="hud-chip">System Online</div>
        </div>
      )}
      <div className="relative z-10">
        <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ayat" element={<Ayat />} />
        <Route path="/devotion" element={<Devotion />} />
          <Route path="/mission" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}
