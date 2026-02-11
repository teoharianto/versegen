import { useMemo, useState, useEffect } from "react";
import Sidebar from "../components/Sidebar.jsx";
import { databases, ensureSession } from "../lib/appwrite.js";
import { Query } from "appwrite";

const DATABASE_ID = "698c29110039cc83cfc9";
const COLLECTION_ID = "verse";

const fallbackVerses = [
  {
    text: "Sebab Aku mengetahui rancangan-rancangan apa yang ada pada-Ku mengenai kamu, demikianlah firman TUHAN, yaitu rancangan damai sejahtera dan bukan rancangan kecelakaan, untuk memberikan kepadamu hari depan yang penuh harapan.",
    ref: "Yeremia 29:11"
  },
  {
    text: "TUHAN adalah gembalaku, takkan kekurangan aku.",
    ref: "Mazmur 23:1"
  },
  {
    text: "Segala perkara dapat kutanggung di dalam Dia yang memberi kekuatan kepadaku.",
    ref: "Filipi 4:13"
  },
  {
    text: "Serahkanlah kuatirmu kepada TUHAN, maka Ia akan memelihara engkau.",
    ref: "Mazmur 55:23"
  },
  {
    text: "Kasih setia TUHAN tak berkesudahan, rahmat-Nya tak habis-habisnya.",
    ref: "Ratapan 3:22"
  }
];

function pickRandom(verses) {
  return verses[Math.floor(Math.random() * verses.length)];
}

export default function Ayat() {
  const [verses, setVerses] = useState(fallbackVerses);
  const [currentVerse, setCurrentVerse] = useState(() => pickRandom(fallbackVerses));
  const [loading, setLoading] = useState(true);
  const info = useMemo(
    () =>
      new Date().toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      }),
    []
  );

  useEffect(() => {
    async function fetchVerses() {
      try {
        await ensureSession();
        const response = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_ID
        );
        if (response.documents.length > 0) {
          const fetchedVerses = response.documents.map(doc => ({
            text: doc.verseContain,
            ref: doc.verse
          }));
          setVerses(fetchedVerses);
          setCurrentVerse(pickRandom(fetchedVerses));
        }
      } catch (error) {
        console.error("Failed to fetch verses:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchVerses();
  }, []);

  return (
    <div className="w-full px-10 py-10">
      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <Sidebar />

        <div className="glass hud-panel rounded-3xl p-8 md:p-12 shadow-glow">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-sm tracking-[0.3em] text-slate-300 futuristic-subtitle">
                Ayat Alkitab Harian
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-white mt-2 futuristic-title">
                Ayat Harian
              </h2>
              <p className="text-slate-400 mt-2">{info}</p>
            </div>
            {/* <button
              className="px-6 py-3 rounded-full border border-neon-pink/60 text-white shadow-glow hover:shadow-glowStrong transition btn-holo"
              onClick={() => setCurrentVerse(pickRandom())}
            >
              Ayat Lainnya
            </button> */}
          </div>
          <div className="mt-10 space-y-5">
            {loading ? (
              <p className="text-slate-400">Memuat ayat...</p>
            ) : (
              <>
                <p className="text-xl md:text-2xl leading-relaxed text-white">
                  "{currentVerse.text}"
                </p>
                <p className="text-neon-cyan font-semibold tracking-widest">
                  {currentVerse.ref}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
