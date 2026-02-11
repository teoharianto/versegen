import Sidebar from "../components/Sidebar.jsx";

export default function Mission() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <Sidebar />
        <div className="glass hud-panel rounded-3xl p-8 md:p-12 shadow-glow">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-300">
            Mission
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-white mt-2">
            Daftar Misi Harian
          </h2>
          <p className="text-slate-400 mt-2">
            Selesaikan misi berikut sebagai fokus harian.
          </p>

          <div className="mt-8 grid gap-4">
            <div className="holo-border rounded-2xl p-4">
              <ol className="space-y-3 text-slate-200">
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-neon-cyan shadow-glow" />
                  Baca ayat hari ini
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-neon-pink shadow-glow" />
                  Baca renungan hari ini
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-neon-purple shadow-glow" />
                  Saat teduh pribadi
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
