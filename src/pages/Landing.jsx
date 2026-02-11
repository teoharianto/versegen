import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import agentImage from "../../asset/landing/agent.png";

export default function Landing() {
  const navigate = useNavigate();
  const [opening, setOpening] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [showClassified, setShowClassified] = useState(false);

  useEffect(() => {
    if (!opening) return;
    setCountdown(3);
    const interval = setInterval(() => {
      setCountdown((value) => {
        if (value === null) return 3;
        if (value <= 1) {
          clearInterval(interval);
          navigate("/dashboard");
          return 0;
        }
        return value - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [opening, navigate]);

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 opacity-60">
        <div className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-neon-purple/30 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-neon-cyan/20 blur-3xl" />
        <div className="absolute top-1/2 left-10 h-48 w-48 rounded-full bg-neon-pink/20 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.15fr_0.85fr] items-center">
          <div className="space-y-6 text-center md:text-left md:-translate-x-6">
            <p className="text-xs tracking-[0.5em] text-slate-400 futuristic-subtitle">
              Protocol Online
            </p>
            <h1 className="text-4xl md:text-6xl font-semibold text-white drop-shadow valorant-accent futuristic-title">
              Welcome, Agent.
            </h1>
            <p className="text-slate-300 max-w-lg mx-auto md:mx-0">
              Sistem taktis aktif untuk mengarahkan fokus pada ayat dan renungan harian.
            </p>
            <button
              type="button"
              disabled={opening}
              onClick={() => setOpening(true)}
              className="px-10 py-4 rounded-full transition disabled:opacity-70 btn-holo valorant-button w-full sm:w-auto"
            >
              Start Mission
            </button>
            <div className="flex items-center justify-center md:justify-start gap-3 text-xs uppercase tracking-[0.4em] text-slate-400">
              <span className="h-px w-10 bg-[#ff4d5c]/60" />
              Active Gate
              <span className="h-px w-10 bg-white/20" />
            </div>
          </div>

          <div className="relative space-y-4 md:translate-x-10">
            <div className="hidden md:block absolute -left-64 top-1/2 -translate-y-1/2 pointer-events-none z-30">
              <img
                src={agentImage}
                alt="Agent"
                className="h-[70vh] max-h-[85vh] w-auto drop-shadow-[0_0_18px_rgba(255,255,255,0.35)]"
              />
            </div>

            <div className="relative z-20 glass hud-panel rounded-2xl px-5 py-4 flex flex-wrap items-center gap-4 opacity-85 md:pl-10">
              <div className="relative h-14 w-14 rounded-full border border-neon-pink/50 overflow-hidden shadow-glow">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-700 to-slate-900" />
                <div className="absolute inset-2 rounded-full border border-white/20" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,77,92,0.45),transparent_60%)]" />
              </div>
              <div className="min-w-[140px]">
                <p className="text-xs text-slate-400 uppercase tracking-[0.3em]">
                  Agent
                </p>
                <p className="text-lg text-white font-semibold futuristic-title">
                  Delya
                </p>
              </div>
              <button
                type="button"
                className="hud-button"
                onClick={() => setShowClassified(true)}
              >
                View Contract
              </button>
              <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.35em] text-slate-400">
                <span className="hud-chip">Rank: Radiant</span>
                <span className="hud-chip">Shift: Night</span>
              </div>
            </div>

            <div className="relative z-20 valorant-panel p-6 md:p-8 space-y-4 animate-floatSlow opacity-85 md:pl-12 md:translate-x-14">
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                Mission Briefing
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold text-white">
                Fokus Harian
              </h2>
              <p className="text-sm text-slate-300">
                Masuki dashboard untuk menjalankan tiga misi utama: ayat, renungan,
                dan saat teduh pribadi.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="rounded-xl border border-white/10 px-3 py-2">
                  Status: Ready
                </div>
                <div className="rounded-xl border border-white/10 px-3 py-2">
                  Sync: Online
                </div>
                <div className="rounded-xl border border-white/10 px-3 py-2">
                  Mode: Tactical
                </div>
                <div className="rounded-xl border border-white/10 px-3 py-2">
                  Gate: Armed
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {opening && (
        <div className="countdown-overlay">
          <div className="text-center">
            <p className="match-found mb-4">Mission Start</p>
            <div className="countdown-number">{countdown}</div>
          </div>
        </div>
      )}

      {showClassified && (
        <div className="classified-overlay" onClick={() => setShowClassified(false)}>
          <div className="classified-panel" onClick={(event) => event.stopPropagation()}>
            <p className="classified-title">CLASSIFIED</p>
            <p className="text-sm text-slate-300 mt-3">
               Access to contract data is restricted.
            </p>
            <button
              type="button"
              className="mt-6 hud-button"
              onClick={() => setShowClassified(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
