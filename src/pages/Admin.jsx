import { useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import ReactMarkdown from "react-markdown";
import { upsertDevotion } from "../utils/devotionStore.js";
import Sidebar from "../components/Sidebar.jsx";

function toDateKey(date) {
  return date.toISOString().slice(0, 10);
}

export default function Admin() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState("");

  const dateKey = useMemo(() => toDateKey(selectedDate), [selectedDate]);

  const handleSave = () => {
    if (!title.trim() || !body.trim()) {
      setStatus("Judul dan isi renungan wajib diisi.");
      return;
    }
    upsertDevotion(dateKey, { title: title.trim(), body: body.trim() });
    setStatus(`Renungan untuk ${dateKey} tersimpan.`);
  };

  return (
    <div className="w-full px-10 py-10">
      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <Sidebar />
        <div className="glass hud-panel rounded-3xl p-8 md:p-12 shadow-glow">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="text-sm tracking-[0.3em] text-slate-300 futuristic-subtitle">
                Admin
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-white mt-2 futuristic-title">
                Input Renungan (Markdown)
              </h2>
              <p className="text-slate-400 mt-2">
                Tulis renungan harian dan simpan ke tanggal tertentu.
              </p>
            </div>
            <div className="min-w-[220px]">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => date && setSelectedDate(date)}
                className="w-full px-4 py-3 rounded-xl bg-space-900 text-white border border-neon-pink/30 focus:outline-none"
                calendarStartDay={1}
                dateFormat="yyyy-MM-dd"
              />
            </div>
          </div>

          <div className="mt-8 grid lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Judul renungan"
                className="w-full px-4 py-3 rounded-xl bg-space-900 text-white border border-neon-cyan/30 focus:outline-none"
              />
              <textarea
                value={body}
                onChange={(event) => setBody(event.target.value)}
                placeholder="Tulis renungan dengan markdown..."
                rows={12}
                className="w-full px-4 py-3 rounded-xl bg-space-900 text-white border border-neon-cyan/30 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleSave}
                className="px-6 py-3 rounded-full border border-neon-pink/60 text-white shadow-glow hover:shadow-glowStrong transition btn-holo"
              >
                Simpan Renungan
              </button>
              {status && (
                <p className="text-sm text-neon-cyan">{status}</p>
              )}
            </div>

            <div className="glass hud-panel rounded-2xl p-6 border border-white/10">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-300">
                Preview
              </p>
              <div className="prose prose-invert max-w-none mt-4 text-slate-200">
                <ReactMarkdown>
                  {body || "Mulai menulis markdown untuk melihat preview di sini."}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
