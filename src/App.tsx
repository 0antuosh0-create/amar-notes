import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, BookOpenText, BookOpenCheck, Table2, GraduationCap, Calculator, Menu } from "lucide-react";
import { TopBar, type View } from "./components/TopBar";
import { Sidebar } from "./components/Sidebar";
import { CommandSearch } from "./components/CommandSearch";
import { NotesView } from "./views/NotesView";
import { CheatSheetView } from "./views/CheatSheetView";
import { SummaryView } from "./views/SummaryView";
import { ExamView } from "./views/ExamView";
import { IntegralsView } from "./views/IntegralsView";
import { sections } from "./content";
import { fa } from "./components/Math";
import { MathBackground } from "./components/MathBackground";

const PROGRESS_KEY = "diffeq-progress-v1";
const THEME_KEY = "diffeq-theme";

function useProgress() {
  const [map, setMap] = useState<Record<string, boolean>>(() => {
    try {
      return JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}");
    } catch {
      return {};
    }
  });
  const toggle = useCallback((id: string) => {
    setMap((m) => {
      const next = { ...m, [id]: !m[id] };
      try {
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);
  return [map, toggle] as const;
}

function useTheme() {
  const [dark, setDark] = useState<boolean>(() => {
    try {
      return localStorage.getItem(THEME_KEY) === "dark";
    } catch {
      return false;
    }
  });
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
    } catch {}
  }, [dark]);
  return [dark, () => setDark((d) => !d)] as const;
}


export default function App() {
  const [view, setView] = useState<View>("notes");
  const [activeId, setActiveId] = useState<string>(sections[0].id);
  const [progress, toggleProgress] = useProgress();
  const [dark, toggleDark] = useTheme();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  // keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      } else if (e.key === "/" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const [summaryChapter, setSummaryChapter] = useState<string>("ch1");
  const [integralCategory, setIntegralCategory] = useState<string>("all");
  const handleSetView = useCallback((v: View) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const jumpTo = useCallback(
    (id: string) => {
      if (id.startsWith("summary-")) {
        setSummaryChapter(id.replace("summary-", ""));
        handleSetView("summary");
        return;
      }
      if (id === "summary") {
        handleSetView("summary");
        return;
      }
      if (id === "integrals" || id.startsWith("int-")) {
        handleSetView("integrals");
        return;
      }
      if (id.startsWith("cs-")) {
        setView("cheatsheet");
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
        return;
      }
      if (id.startsWith("exam-") || id.startsWith("hw-") || id === "exam-skills") {
        setView("exam");
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
        return;
      }
      setView("notes");
      setTimeout(() => {
        if (id.startsWith("ex-")) {
          window.dispatchEvent(new CustomEvent("diffeq:open-example", { detail: id }));
        }
        const el = document.getElementById(id) ?? document.getElementById(`chapter-${id}`);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    },
    []
  );

  const pct = useMemo(
    () => Math.round((sections.filter((s) => progress[s.id]).length / sections.length) * 100),
    [progress]
  );


  return (
    <div className="min-h-screen w-full max-w-full relative">
      <MathBackground />
      <TopBar
        view={view}
        setView={handleSetView}
        dark={dark}
        toggleDark={toggleDark}
        onSearch={() => setPaletteOpen(true)}
        onMenu={() => setNavOpen(true)}
        progressPct={pct}
      />

      <div className="mx-auto flex max-w-[1400px] w-full min-w-0 items-start">
        {/* desktop sidebar */}
        <aside className="no-print sticky top-16 hidden h-[calc(100vh-4rem)] w-[304px] shrink-0 border-e-2 border-line bg-card/85 backdrop-blur-md lg:block self-start overflow-hidden shadow-xs">
          <Sidebar
            activeId={activeId}
            progress={progress}
            onNavigate={jumpTo}
            currentView={view}
            onViewChange={handleSetView}
            onToggleProgress={toggleProgress}
            summaryChapter={summaryChapter}
            onSelectSummaryChapter={setSummaryChapter}
            selectedIntegralCategory={integralCategory}
            onSelectIntegralCategory={setIntegralCategory}
          />
        </aside>
        <main className="min-w-0 flex-1 w-full max-w-full pb-20 md:pb-0 overflow-x-hidden">
          {view === "notes" && (
            <NotesView
              onJump={jumpTo}
              setActiveId={setActiveId}
              progress={progress}
              toggleSection={toggleProgress}
            />
          )}
          {view === "summary" && (
            <SummaryView
              onJumpToNotes={jumpTo}
              initialChapter={summaryChapter}
              onChapterChange={setSummaryChapter}
            />
          )}
          {view === "cheatsheet" && <CheatSheetView />}
          {view === "integrals" && (
            <IntegralsView
              selectedCategory={integralCategory}
              onCategoryChange={setIntegralCategory}
            />
          )}
          {view === "exam" && <ExamView progress={progress} toggleItem={toggleProgress} />}
        </main>
      </div>
      {/* mobile drawer */}
      <AnimatePresence>
        {navOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="no-print fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={() => setNavOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-0 start-0 w-[85vw] max-w-[320px] bg-paper border-s-2 border-line shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              dir="rtl"
            >
              <div className="flex items-center justify-between border-b-2 border-line bg-card2/80 px-4 py-3">
                <span className="text-sm font-black text-ink">فهرست جزوه و فرمول‌ها</span>
                <button
                  onClick={() => setNavOpen(false)}
                  className="cursor-pointer rounded-xl border-2 border-line bg-card p-1.5 text-ink shadow-[1.5px_1.5px_0px_var(--line)] transition-all active:scale-95"
                  aria-label="بستن"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="h-[calc(100%-3.25rem)]">
                <Sidebar
                  activeId={activeId}
                  progress={progress}
                  onNavigate={jumpTo}
                  onClose={() => setNavOpen(false)}
                  currentView={view}
                  onViewChange={handleSetView}
                  onToggleProgress={toggleProgress}
                  summaryChapter={summaryChapter}
                  onSelectSummaryChapter={setSummaryChapter}
                  selectedIntegralCategory={integralCategory}
                  onSelectIntegralCategory={setIntegralCategory}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CommandSearch
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onJump={jumpTo}
      />

      {/* Mobile Bottom Navigation Bar (Thumb ergonomic dock) */}
      <nav
        aria-label="ناوبری سریع موبایل"
        className="no-print fixed bottom-0 inset-x-0 z-40 flex items-center justify-around border-t-2 border-line bg-card/95 px-2 py-2 backdrop-blur-lg md:hidden neo-shadow"
      >
        <button
          onClick={() => handleSetView("notes")}
          className={`flex flex-col items-center gap-1 rounded-xl px-2 py-1 transition-all ${
            view === "notes"
              ? "neo-border-sm bg-accent text-accent-ink font-black neo-shadow-xs"
              : "text-soft hover:text-ink font-bold"
          }`}
        >
          <BookOpenText size={17} />
          <span className="text-[10px]">جزوه</span>
        </button>

        <button
          onClick={() => handleSetView("summary")}
          className={`flex flex-col items-center gap-1 rounded-xl px-2 py-1 transition-all ${
            view === "summary"
              ? "neo-border-sm bg-accent text-accent-ink font-black neo-shadow-xs"
              : "text-soft hover:text-ink font-bold"
          }`}
        >
          <BookOpenCheck size={17} />
          <span className="text-[10px]">خلاصه</span>
        </button>

        <button
          onClick={() => handleSetView("cheatsheet")}
          className={`flex flex-col items-center gap-1 rounded-xl px-2 py-1 transition-all ${
            view === "cheatsheet"
              ? "neo-border-sm bg-accent text-accent-ink font-black neo-shadow-xs"
              : "text-soft hover:text-ink font-bold"
          }`}
        >
          <Table2 size={16} />
          <span className="text-[9.5px]">فرمول‌ها</span>
        </button>

        <button
          onClick={() => handleSetView("integrals")}
          className={`flex flex-col items-center gap-1 rounded-xl px-2 py-1 transition-all ${
            view === "integrals"
              ? "neo-border-sm bg-accent text-accent-ink font-black neo-shadow-xs"
              : "text-soft hover:text-ink font-bold"
          }`}
        >
          <Calculator size={16} />
          <span className="text-[9.5px]">توزیع‌ها</span>
        </button>

        <button
          onClick={() => handleSetView("exam")}
          className={`flex flex-col items-center gap-1 rounded-xl px-2 py-1 transition-all ${
            view === "exam"
              ? "neo-border-sm bg-accent text-accent-ink font-black neo-shadow-xs"
              : "text-soft hover:text-ink font-bold"
          }`}
        >
          <GraduationCap size={16} />
          <span className="text-[9.5px]">آزمون</span>
        </button>

        <button
          onClick={() => setNavOpen(true)}
          className="flex flex-col items-center gap-1 rounded-xl px-2 py-1 text-soft hover:text-ink font-bold transition-all"
        >
          <Menu size={17} />
          <span className="text-[10px]">فهرست</span>
        </button>
      </nav>
    </div>
  );
}
