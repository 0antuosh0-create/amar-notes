import React, { useState, useMemo } from "react";
import {
  BookOpenCheck,
  Search,
  X,
  Printer,
  Sparkles,
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowDown,
  Layers,
  FileText,
  Bookmark,
} from "lucide-react";
import { courseSummaries, type ChapterSummary } from "../content/courseSummary";
import { MB, T, fa } from "../components/Math";
import { CopyButton } from "../components/Blocks";

const hueBorder: Record<string, string> = {
  blue: "border-blue-500/40",
  amber: "border-amber-500/40",
  sky: "border-sky-500/40",
  violet: "border-violet-500/40",
  rose: "border-rose-500/40",
};

const hueBg: Record<string, string> = {
  blue: "bg-blue-500/15 text-blue-800 dark:text-blue-200",
  amber: "bg-amber-500/15 text-amber-800 dark:text-amber-200",
  sky: "bg-sky-500/15 text-sky-800 dark:text-sky-200",
  violet: "bg-violet-500/15 text-violet-800 dark:text-violet-200",
  rose: "bg-rose-500/15 text-rose-800 dark:text-rose-200",
};

const hueActiveTab: Record<string, string> = {
  blue: "neo-border bg-accent text-accent-ink neo-shadow-xs",
  amber: "neo-border bg-gold text-black neo-shadow-xs",
  sky: "neo-border bg-sky-500 text-black neo-shadow-xs",
  violet: "neo-border bg-purple-600 text-white neo-shadow-xs",
  rose: "neo-border bg-rose-500 text-white neo-shadow-xs",
};

export const SummaryView = React.memo(function SummaryView({
  onJumpToNotes,
  initialChapter = "ch1",
  onChapterChange,
}: {
  onJumpToNotes?: (id: string) => void;
  initialChapter?: string;
  onChapterChange?: (chId: string) => void;
}) {
  const [activeChapterId, setActiveChapterId] = useState<string>(initialChapter);
  const [query, setQuery] = useState("");

  // Keep in sync with prop changes (e.g. from sidebar or navigation jump)
  React.useEffect(() => {
    if (initialChapter) {
      setActiveChapterId(initialChapter);
    }
  }, [initialChapter]);

  const currentSummary = useMemo(() => {
    return courseSummaries.find((s) => s.chapterId === activeChapterId) ?? courseSummaries[0];
  }, [activeChapterId]);
  // Filtered summary contents if search is active
  const filteredData = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return currentSummary;

    const match = (s: string) => s.toLowerCase().includes(q);

    return {
      ...currentSummary,
      concepts: currentSummary.concepts.filter(
        (c) => match(c.title) || match(c.desc) || (c.math && c.math.some(match))
      ),
      formulas: currentSummary.formulas.filter(
        (f) => match(f.title) || match(f.math) || (f.note && match(f.note))
      ),
      algorithm: currentSummary.algorithm.filter(
        (a) => match(a.title) || match(a.desc) || (a.math && match(a.math))
      ),
      tips: currentSummary.tips.filter(match),
      mistakes: currentSummary.mistakes.filter(
        (m) => match(m.title) || match(m.wrong) || match(m.correct) || match(m.reason)
      ),
    };
  }, [currentSummary, query]);

  return (
    <div className="mx-auto max-w-[1000px] px-3 pb-28 pt-4 md:px-6 md:pt-8 w-full min-w-0 max-w-full">
      {/* 1. Header Command Hub */}
      <header className="fade-up mb-6">
        <div className="relative overflow-hidden rounded-3xl neo-border bg-card p-5 sm:p-7 md:p-8 neo-shadow">
          {/* Decorative watermark */}
          <div
            className="pointer-events-none absolute -bottom-6 -start-4 select-none text-[120px] font-black text-accent/10"
            aria-hidden="true"
          >
            §
          </div>

          <div className="relative flex flex-wrap items-center justify-between gap-3 mb-3">
            <span className="inline-flex items-center gap-2 rounded-xl neo-border-sm bg-accent text-accent-ink px-3 py-1 text-xs font-black neo-shadow-xs">
              <BookOpenCheck size={14} strokeWidth={2.8} />
              <span>خلاصه و چکیدهٔ سرفصل‌های درسی</span>
            </span>

            <button
              onClick={() => window.print()}
              className="no-print inline-flex cursor-pointer items-center gap-2 rounded-xl neo-btn bg-card2 px-3.5 py-1.5 text-xs font-black text-ink hover:bg-gold hover:text-black"
              title="چاپ یا ذخیره نسخه چاپی خلاصه"
            >
              <Printer size={15} />
              نسخه چاپی / PDF
            </button>
          </div>

          <h1 className="relative text-2xl sm:text-3xl font-black text-ink tracking-tight">
            خلاصه و مرور فشردهٔ فصول امتحانی
          </h1>
          <p className="relative mt-2 max-w-2xl text-[14px] sm:text-[14.5px] leading-7 font-medium text-soft">
            چکیدهٔ سریع و کاربردی مفاهیم اصلی، فرمول‌های طلایی، مراحل حل مسئله، ترفندهای امتحانی و دام‌های نمره‌خراب‌کن هر فصل برای مرور سریع شب امتحان و حل تمرین‌ها.
          </p>

          {/* Search filter inside summary */}
          <div className="relative mt-5 flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[240px] max-w-md">
              <div className="flex items-center gap-2.5 rounded-xl border-2 border-line bg-card px-3.5 py-2 shadow-2xs focus-within:border-accent focus-within:shadow-xs transition-all">
                <Search size={16} className="shrink-0 text-faint" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="جستجو در خلاصه (مفهوم، فرمول، ترفند)..."
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
              <span className="rounded-xl border border-accent/40 bg-accent/15 px-3 py-1.5 text-xs font-black text-ink shadow-2xs">
                نتایج فیلتر فعال
              </span>
            )}
          </div>
        </div>
      </header>

      {/* 2. Interactive Chapter Tabs Switcher */}
      <nav
        aria-label="انتخاب فصل برای مشاهده خلاصه"
        className="no-print sticky top-16 z-30 mb-8 rounded-2xl border-2 border-line bg-card/95 p-1.5 shadow-xs backdrop-blur-md"
      >
        <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-thin">
          {courseSummaries.map((s) => {
            const active = s.chapterId === activeChapterId;
            return (
              <button
                key={s.chapterId}
                onClick={() => {
                  setActiveChapterId(s.chapterId);
                  onChapterChange?.(s.chapterId);
                  setQuery("");
                }}
                className={`flex-1 min-w-[140px] sm:min-w-0 cursor-pointer rounded-xl border-2 px-3 py-2 text-xs font-black transition-all duration-150 flex items-center justify-center gap-2 ${
                  active
                    ? hueActiveTab[s.hue]
                    : "border-transparent bg-transparent text-soft hover:bg-card2 hover:text-ink"
                }`}
              >
                <span className="text-[11px] opacity-75">فصل {fa(s.num)}:</span>
                <span className="truncate">{s.short}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* 3. Selected Chapter Content */}
      <div className="space-y-10 w-full min-w-0 max-w-full">
        {/* Chapter Top Title Banner */}
        <div className="rounded-3xl border-2 border-line bg-card p-5 sm:p-7 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-3">
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-line text-lg font-black shadow-2xs ${hueBg[currentSummary.hue]}`}
              >
                {fa(currentSummary.num)}
              </span>
              <div>
                <h2 className="text-lg sm:text-xl font-black text-ink">
                  {currentSummary.title}
                </h2>
                <p className="text-xs font-bold text-faint">
                  پوشش صفحات {fa(currentSummary.pages)} جزوهٔ درسی
                </p>
              </div>
            </div>

            {onJumpToNotes && (
              <button
                onClick={() => onJumpToNotes(`chapter-${currentSummary.chapterId}`)}
                className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl border border-line bg-card2 px-3 py-1.5 text-xs font-bold text-soft hover:text-ink hover:border-accent active:scale-95 transition-all shadow-2xs"
              >
                <FileText size={13} />
                <span>مشاهده درسنامهٔ کامل ←</span>
              </button>
            )}
          </div>
          <p className="text-[14px] leading-7 text-soft font-medium mt-3 border-t border-line-soft pt-3">
            {currentSummary.overview}
          </p>
        </div>

        {/* Section 1: Key Concepts */}
        {filteredData.concepts.length > 0 && (
          <div className="space-y-3.5">
            <div className="flex items-center gap-2 px-1">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-line bg-card text-accent shadow-2xs">
                <Bookmark size={15} />
              </span>
              <h3 className="text-base sm:text-lg font-black text-ink">
                ۱. مفاهیم و تعاریف کلیدی
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-3.5">
              {filteredData.concepts.map((c, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border-2 border-line-soft bg-card p-4 sm:p-5 shadow-2xs transition-all hover:border-line"
                >
                  <h4 className="text-sm font-black text-ink mb-1.5">
                    <T text={c.title} />
                  </h4>
                  <p className="text-[13.5px] leading-7 text-soft font-medium">
                    <T text={c.desc} />
                  </p>
                  {c.math && (
                    <div className="mt-3 overflow-x-auto py-1 scrollbar-thin">
                      {c.math.map((m, mIdx) => (
                        <MB key={mIdx} tex={m} />
                      ))}
                    </div>
                  )}
                  {c.note && (
                    <div className="mt-2.5 rounded-lg border border-accent/40 bg-accent/[0.07] px-3 py-1.5 text-xs font-bold text-ink">
                      <T text={c.note} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 2: Golden Formulas */}
        {filteredData.formulas.length > 0 && (
          <div className="space-y-3.5">
            <div className="flex items-center gap-2 px-1">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-line bg-card text-amber-500 shadow-2xs">
                <Sparkles size={15} className="fill-amber-400" />
              </span>
              <h3 className="text-base sm:text-lg font-black text-ink">
                ۲. جعبهٔ فرمول‌های طلایی
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {filteredData.formulas.map((f, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border-2 border-line-soft bg-card p-4 shadow-2xs hover:border-accent hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="text-[13px] font-black text-ink">
                      <T text={f.title} />
                    </h4>
                    <CopyButton text={f.math} iconOnly reveal />
                  </div>

                  <div className="overflow-x-auto py-1.5 scrollbar-thin">
                    <MB tex={f.math} />
                  </div>

                  {f.note && (
                    <p className="mt-2 border-t border-line-soft pt-1.5 text-[11px] font-medium leading-5 text-faint">
                      <T text={f.note} />
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 3: Step-by-Step Algorithm */}
        {filteredData.algorithm.length > 0 && (
          <div className="space-y-3.5">
            <div className="flex items-center gap-2 px-1">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-line bg-card text-emerald-500 shadow-2xs">
                <CheckCircle2 size={15} />
              </span>
              <h3 className="text-base sm:text-lg font-black text-ink">
                ۳. الگوریتم و گام‌های حل مسئله
              </h3>
            </div>

            <div className="rounded-2xl border-2 border-line bg-card p-4 sm:p-6 shadow-xs divide-y divide-line-soft">
              {filteredData.algorithm.map((step) => (
                <div key={step.step} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-line bg-accent text-[11px] font-black text-white dark:text-[#08130f]">
                      {fa(step.step)}
                    </span>
                    <h4 className="text-sm font-black text-ink">
                      <T text={step.title} />
                    </h4>
                  </div>
                  <p className="text-[13.5px] leading-7 text-soft font-medium ps-8.5">
                    <T text={step.desc} />
                  </p>
                  {step.math && (
                    <div className="mt-2 ps-8.5 overflow-x-auto scrollbar-thin">
                      <MB tex={step.math} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 4: Exam Pro-Tips */}
        {filteredData.tips.length > 0 && (
          <div className="space-y-3.5">
            <div className="flex items-center gap-2 px-1">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-gold/40 bg-gold/15 text-gold shadow-2xs">
                <Lightbulb size={15} />
              </span>
              <h3 className="text-base sm:text-lg font-black text-ink">
                ۴. ترفندها و نکات کلیدی آزمون
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {filteredData.tips.map((tip, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-amber-500/40 bg-amber-500/[0.08] p-4 shadow-2xs flex items-start gap-3"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-black mt-0.5">
                    ★
                  </span>
                  <p className="text-[13.5px] leading-7 font-medium text-ink">
                    <T text={tip} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 5: Common Mistakes */}
        {filteredData.mistakes.length > 0 && (
          <div className="space-y-3.5">
            <div className="flex items-center gap-2 px-1">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-rose-500/40 bg-rose-500/15 text-rose-600 dark:text-rose-400 shadow-2xs">
                <AlertTriangle size={15} />
              </span>
              <h3 className="text-base sm:text-lg font-black text-ink">
                ۵. دام‌ها و اشتباهات رایج امتحانی
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredData.mistakes.map((m, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border-2 border-line-soft bg-card p-4 sm:p-5 shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <h4 className="text-[13.5px] font-black text-ink mb-3 pb-2 border-b border-line-soft">
                      {m.title}
                    </h4>

                    {/* Wrong */}
                    <div className="rounded-xl border border-rose-500/30 bg-rose-500/[0.07] p-2.5 mb-2.5">
                      <div className="flex items-center gap-1.5 text-xs font-black text-rose-700 dark:text-rose-400 mb-1">
                        <XCircle size={13} />
                        <span>اشتباه متداول:</span>
                      </div>
                      <div className="text-xs font-bold text-ink overflow-x-auto scrollbar-thin">
                        {m.wrong.includes("\\") || m.wrong.includes("^") ? (
                          <MB tex={m.wrong} />
                        ) : (
                          <p>{m.wrong}</p>
                        )}
                      </div>
                    </div>

                    {/* Correct */}
                    <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/[0.07] p-2.5 mb-3">
                      <div className="flex items-center gap-1.5 text-xs font-black text-emerald-700 dark:text-emerald-400 mb-1">
                        <CheckCircle2 size={13} />
                        <span>پاسخ صحیح:</span>
                      </div>
                      <div className="text-xs font-bold text-ink overflow-x-auto scrollbar-thin">
                        {m.correct.includes("\\") || m.correct.includes("^") ? (
                          <MB tex={m.correct} />
                        ) : (
                          <p>{m.correct}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Reason */}
                  <p className="text-[11.5px] leading-5 font-medium text-faint border-t border-line-soft pt-2">
                    <strong className="text-ink">تحلیل خطا: </strong>
                    {m.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
