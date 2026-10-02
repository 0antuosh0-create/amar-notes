import React, { useEffect, useMemo, useState } from "react";
import {
  FunctionSquare,
  Grid3x3,
  Shuffle,
  Repeat,
  Network,
  Table2,
  Sigma,
  Zap,
  Printer,
  Search,
  X,
} from "lucide-react";
import { cheatGroups } from "../content";
import { MB, T, fa } from "../components/Math";
import { CopyButton } from "../components/Blocks";

const icons: Record<string, React.ComponentType<{ size?: number }>> = {
  FunctionSquare,
  Grid3x3,
  Shuffle,
  Repeat,
  Network,
  Table2,
  Sigma,
};
const TOTAL_FORMULAS = cheatGroups.reduce((n, g) => n + g.items.length, 0);

/* ------------------------------------------------------------------ */
/*  One formula entry — a single flat surface, no nested boxes         */
/* ------------------------------------------------------------------ */

const FormulaEntry = React.memo(function FormulaEntry({
  title,
  math,
  note,
}: {
  title: string;
  math: string;
  note?: string;
}) {
  return (
    <div className="group rounded-2xl border-2 border-line bg-card p-4 shadow-2xs transition-all duration-200 hover:border-accent hover:shadow-xs w-full min-w-0 max-w-full overflow-hidden">
      <div className="mb-2 flex items-start justify-between gap-2 w-full min-w-0">
        <p className="text-[13px] font-black leading-6 text-ink truncate">
          <T text={title} />
        </p>
        <CopyButton text={math} iconOnly reveal />
      </div>

      {/* Touch-swipeable formula container — zero clipping on phones */}
      <div className="w-full min-w-0 max-w-full overflow-x-auto overflow-y-hidden py-1.5 scrollbar-thin">
        <MB tex={math} className="py-1" />
      </div>

      {note && (
        <p className="mt-2 border-t border-line-soft pt-2 text-[11.5px] font-medium leading-6 text-soft">
          <T text={note} />
        </p>
      )}
    </div>
  );
});

/* ------------------------------------------------------------------ */
/*  Sheet                                                              */
/* ------------------------------------------------------------------ */

export const CheatSheetView = React.memo(function CheatSheetView() {
  const [active, setActive] = useState(cheatGroups[0].id);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActive(e.target.id.slice(3)); // strip "cs-"
            break;
          }
        }
      },
      { rootMargin: "-110px 0px -70% 0px", threshold: 0 }
    );

    cheatGroups.forEach((g) => {
      const el = document.getElementById(`cs-${g.id}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const jump = (id: string) => {
    document.getElementById(`cs-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return cheatGroups;
    return cheatGroups
      .map((g) => {
        const items = g.items.filter(
          (it) =>
            it.title.toLowerCase().includes(q) ||
            (it.note && it.note.toLowerCase().includes(q)) ||
            it.math.toLowerCase().includes(q)
        );
        return { ...g, items };
      })
      .filter((g) => g.items.length > 0);
  }, [query]);

  const matchCount = useMemo(
    () => filteredGroups.reduce((acc, g) => acc + g.items.length, 0),
    [filteredGroups]
  );

  return (
    <div className="mx-auto max-w-[1100px] px-4 pb-24 md:px-6">
      {/* ---------- Hero Command Hub (Image #1 upgrade) ---------- */}
      <header className="fade-up pt-6 mb-6">
        <div className="relative overflow-hidden rounded-3xl neo-border bg-card p-6 md:p-8 neo-shadow">
          {/* Background decorative watermark */}
          <div className="pointer-events-none absolute -bottom-6 -start-4 select-none text-[130px] font-black text-accent/10" aria-hidden>
            ∑
          </div>

          <div className="relative flex flex-wrap items-center justify-between gap-3 mb-3">
            <span className="inline-flex items-center gap-2 rounded-xl neo-border-sm bg-gold text-black px-3.5 py-1 text-xs font-black neo-shadow-xs">
              <Zap size={14} className="fill-black text-black" />
              مرجع فرمول‌های امتحانی
            </span>
            <button
              onClick={() => window.print()}
              className="no-print inline-flex cursor-pointer items-center gap-2 rounded-xl neo-btn bg-card2 px-3.5 py-1.5 text-xs font-black text-ink hover:bg-gold hover:text-black"
              title="چاپ یا ذخیره نسخه چاپی PDF"
            >
              <Printer size={15} />
              نسخه چاپی / PDF
            </button>
          </div>

          <h1 className="relative text-2xl font-black text-ink md:text-3xl tracking-tight">
            فرمول‌نامهٔ جامع آمار و احتمال مهندسی
          </h1>
          <p className="relative mt-2 max-w-2xl text-[14px] sm:text-[14.5px] leading-7 font-medium text-soft">
            تمامی فرمول‌های طلایی ۵ فصل جزوه: از احتمال شرطی و بیز تا امید ریاضی، MGF، توزیع‌های گسسته و پیوسته، کوواریانس و فواصل اطمینان. با کلیک روی آیکون کپی، کد استاندارد LaTeX هر رابطه کپی می‌شود.
          </p>

          {/* Seamlessly embedded search bar */}
          <div className="relative mt-5 flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[240px] max-w-md">
              <div className="flex items-center gap-2.5 rounded-xl border-2 border-line bg-card px-3.5 py-2 shadow-[2px_2px_0px_var(--line)] focus-within:border-accent focus-within:shadow-[3px_3px_0px_var(--accent)] transition-all">
                <Search size={16} className="shrink-0 text-ink/75" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="فیلتر سریع فرمول‌ها (مثلاً: بیز، پواسون، نرمال، کوواریانس)..."
                  className="w-full bg-transparent text-xs font-bold text-ink outline-none placeholder:text-faint"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="cursor-pointer text-faint hover:text-ink"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>
            </div>
            {query && (
              <span className="rounded-xl border-2 border-line bg-accent/15 px-3 py-1.5 text-xs font-black text-ink shadow-[1.5px_1.5px_0px_var(--line)]">
                {fa(matchCount)} رابطه پیدا شد
              </span>
            )}
          </div>
        </div>
      </header>

      {/* ---------- Docked Navigation Rail (Image #1 upgrade) ---------- */}
      <nav
        aria-label="پرش بین گروه‌های فرمول"
        className="no-print sticky top-16 z-30 mb-8 rounded-2xl border-2 border-line bg-card/95 p-1.5 shadow-[3px_3px_0px_var(--line)] dark:shadow-[3px_3px_0px_#000] backdrop-blur-md"
      >
        <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-thin">
          {cheatGroups.map((g, i) => {
            const on = active === g.id;
            return (
              <button
                key={g.id}
                onClick={() => jump(g.id)}
                aria-current={on ? "true" : undefined}
                className={[
                  "shrink-0 cursor-pointer rounded-xl border-2 px-3 py-1.5 text-xs font-black transition-all",
                  on
                    ? "border-line bg-accent text-white shadow-[1.5px_1.5px_0px_var(--line)] dark:text-[#08130f]"
                    : "border-transparent bg-transparent text-soft hover:border-line-soft hover:bg-card2/70 hover:text-ink",
                ].join(" ")}
              >
                <span className="tabular-nums opacity-60 ms-0.5">{fa(i + 1)}.</span> {g.short}
              </button>
            );
          })}
        </div>
      </nav>
      {/* ---------- groups ---------- */}
      <div className="mt-8 space-y-10 w-full min-w-0 max-w-full">
        {filteredGroups.map((g, i) => {
          const Icon = icons[g.icon] ?? Sigma;
          return (
            <section key={g.id} id={`cs-${g.id}`} className="scroll-mt-[7.5rem] w-full min-w-0 max-w-full">
              {/* Group Header Card (replaces harsh horizontal black rule) */}
              <div className="mb-3.5 flex items-center gap-3 rounded-2xl border-2 border-line bg-card2/80 p-3.5 sm:p-4 shadow-2xs w-full min-w-0">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-1.5 border-line bg-card text-accent shadow-2xs">
                  <Icon size={19} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-[11px] font-black tabular-nums text-faint bg-card px-1.5 py-0.5 rounded-md border border-line-soft">
                      {fa(String(i + 1).padStart(2, "0"))}
                    </span>
                    <h2 className="text-[15px] sm:text-base font-black text-ink">{g.title}</h2>
                    <span className="ms-auto rounded-lg border border-line-soft bg-card px-2 py-0.5 text-[10.5px] font-black text-soft shadow-2xs">
                      {fa(g.items.length)} رابطه
                    </span>
                  </div>
                  {g.desc && (
                    <p className="mt-0.5 text-[12px] font-medium text-faint truncate">{g.desc}</p>
                  )}
                </div>
              </div>

              {/* Responsive Formula Grid (Image #1 & #2 containment fix) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full min-w-0 max-w-full">
                {g.items.map((it, j) => (
                  <div
                    key={j}
                    className={`w-full min-w-0 max-w-full ${it.wide ? "sm:col-span-2" : ""}`}
                  >
                    <FormulaEntry title={it.title} math={it.math} note={it.note} />
                  </div>
                ))}
              </div>
            </section>
          );
        })}
        {filteredGroups.length === 0 && (
          <div className="rounded-2xl border-2 border-line bg-card p-12 text-center text-sm font-bold text-faint">
            فرمول یا عبارتی مطابق با «{query}» پیدا نشد.
          </div>
        )}
      </div>
    </div>
  );
});
