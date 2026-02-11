import { useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import ReactMarkdown from "react-markdown";
import { loadDevotions } from "../utils/devotionStore.js";
import Sidebar from "../components/Sidebar.jsx";
import { databases } from "../lib/appwrite.js";

const DATABASE_ID = "698c29110039cc83cfc9";
const COLLECTION_ID = "devotion";

function toDateKey(date) {
  return date.toISOString().slice(0, 10);
}

function getRecentDates(count = 7) {
  const today = new Date();
  return Array.from({ length: count }, (_, index) => {
    const d = new Date(today);
    d.setDate(today.getDate() - index);
    return d;
  });
}

export default function Devotion() {
  const [devotions, setDevotions] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDevotions() {
      try {
        const response = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_ID
        );
        const devotionMap = {};
        response.documents.forEach(doc => {
          // Normalize date format - ensure YYYY-MM-DD format
          const dateKey = doc.date.includes('T') ? doc.date.split('T')[0] : doc.date;
          devotionMap[dateKey] = {
            title: doc.title,
            body: doc.content.replace(/\\n/g, '\n')
          };
        });
        console.log('Loaded devotions:', devotionMap);
        setDevotions(devotionMap);
      } catch (error) {
        console.error("Failed to fetch devotions:", error);
        setDevotions(loadDevotions());
      } finally {
        setLoading(false);
      }
    }
    fetchDevotions();
  }, []);

  const selectedKey = useMemo(() => toDateKey(selectedDate), [selectedDate]);
  const currentDevotion = devotions[selectedKey];

  return (
    <div className="w-full px-10 py-10">
      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <Sidebar />
        <div className="glass hud-panel rounded-3xl p-8 md:p-12 shadow-glow">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="text-sm tracking-[0.3em] text-slate-300 futuristic-subtitle">
                Renungan Harian
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-white mt-2 futuristic-title">
                Pilih Tanggal Renungan
              </h2>
            </div>
            <div className="min-w-[220px]">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => date && setSelectedDate(date)}
                className="w-full px-4 py-3 rounded-xl bg-space-900 text-white border border-neon-cyan/30 focus:outline-none"
                calendarStartDay={1}
                dateFormat="yyyy-MM-dd"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {getRecentDates(8).map((date) => {
              const key = toDateKey(date);
              const isActive = key === selectedKey;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedDate(date)}
                  className={`px-4 py-2 rounded-full text-sm border transition btn-holo ${
                    isActive
                      ? "border-neon-cyan text-white bg-neon-cyan/10"
                      : "border-white/10 text-slate-300 hover:text-white"
                  }`}
                >
                  {date.toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short"
                  })}
                </button>
              );
            })}
          </div>

          <div className="mt-10 space-y-4">
            {loading ? (
              <p className="text-slate-400">Memuat renungan...</p>
            ) : currentDevotion ? (
              <>
                <h3 className="text-2xl font-semibold text-white futuristic-title">
                  {currentDevotion.title}
                </h3>
                <div className="prose prose-invert max-w-none text-slate-200">
                  <ReactMarkdown
                    components={{
                      p: ({node, ...props}) => <p className="mb-4" {...props} />
                    }}
                  >
                    {currentDevotion.body}
                  </ReactMarkdown>
                </div>
              </>
            ) : (
              <div className="rounded-2xl border border-dashed border-white/20 p-6 text-slate-300">
                Renungan untuk tanggal ini belum tersedia. Silakan pilih tanggal lain
                atau tambahkan melalui menu Admin.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
