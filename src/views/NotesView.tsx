import React, { useEffect, useRef } from "react";
import { CheckCircle2, Circle, CalendarDays, FileText, ArrowDown, Heart, BookOpenCheck } from "lucide-react";
import { chapters, sectionsByChapter, chapters as allChapters } from "../content";
import type { Section } from "../types";
import { BlockRenderer } from "../components/Blocks";
import { T, fa } from "../components/Math";
import { AcknowledgementsSection } from "../components/AcknowledgementsSection";

const hueChip: Record<string, string> = {
  blue: "bg-blue-500/15 text-blue-700 dark:text-blue-300",
  amber: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  sky: "bg-sky-500/15 text-sky-700 dark:text-sky-300",
  violet: "bg-violet-500/15 text-violet-700 dark:text-violet-300",
  rose: "bg-rose-500/15 text-rose-700 dark:text-rose-300",
};
const hueRing: Record<string, string> = {
  blue: "border-blue-500/40",
  amber: "border-amber-500/40",
  sky: "border-sky-500/40",
  violet: "border-violet-500/40",
  rose: "border-rose-500/40",
};
const hueDot: Record<string, string> = {
  blue: "bg-blue-600",
  amber: "bg-amber-500",
  sky: "bg-sky-500",
  violet: "bg-violet-500",
  rose: "bg-rose-500",
};
const hueText: Record<string, string> = {
  blue: "text-blue-700 dark:text-blue-300",
  amber: "text-amber-700 dark:text-amber-300",
  sky: "text-sky-700 dark:text-sky-300",
  violet: "text-violet-700 dark:text-violet-300",
  rose: "text-rose-700 dark:text-rose-300",
};

/* ---------------- hero ---------------- */

const Hero = React.memo(function Hero({ onJump }: { onJump: (id: string) => void }) {
  return (
    <div className="relative mb-8 sm:mb-12 overflow-hidden rounded-3xl neo-border bg-card p-5 sm:p-8 md:p-10 neo-shadow-lg">
      {/* Ambient top highlight line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-accent" />
      <div className="pointer-events-none absolute inset-0 select-none overflow-hidden" aria-hidden>
        <div className="floaty absolute -top-4 start-[5%] text-[110px] font-black text-accent/10">
          <span style={{ fontFamily: "KaTeX_Main, serif" }}>P</span>
        </div>
        <div
          className="floaty absolute bottom-2 end-[6%] text-[130px] font-black text-gold/10"
          style={{ animationDelay: "-2.5s" }}
        >
          <span style={{ fontFamily: "KaTeX_Main, serif" }}>Σ</span>
        </div>
        <div
          className="floaty absolute bottom-[18%] start-[12%] hidden text-4xl text-faint/15 md:block"
          style={{ animationDelay: "-1.5s" }}
        >
          <span style={{ fontFamily: "KaTeX_Main, serif" }}>{"E[X]"}</span>
        </div>
      </div>

      <div className="relative">
        <div className="mb-4 inline-flex items-center gap-2 rounded-xl neo-border-sm bg-gold px-3.5 py-1 text-xs font-black text-black neo-shadow-xs">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-black opacity-40"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-black"></span>
          </span>
          <span>بازنویسی تمیز و خط‌به‌خط ۵۰ صفحه جزوهٔ آمار • گام‌به‌گام برای شب امتحان</span>
        </div>
        <h1 className="max-w-2xl text-2xl font-black leading-[1.35] text-ink sm:text-3xl md:text-[2.6rem] tracking-tight">
          جزوه جامع آمار و احتمال مهندسی
          <span className="mt-2 block text-accent">
            ۵۰ صفحه کامل دست‌نویس 
          </span>
        </h1>
        <p className="mt-4 max-w-2xl text-[14.5px] sm:text-[15px] leading-8 text-soft font-medium">
          تمام مباحث آمار و احتمال دانشگاهی از مفاهیم اولیه تا آمار استنباطی: احتمال شرطی، قضیه بیز، متغیرهای تصادفی، توزیع‌های گسسته و پیوسته مهندسی، متغیرهای دو بعدی، کوواریانس و ضریب همبستگی، قضیه حد مرکزی و فواصل اطمینان میانگین.
        </p>
        {/* Interactive jump pills */}
        <div className="mt-6 flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => onJump(sections[0].id)}
            className="cursor-pointer inline-flex items-center gap-2 rounded-xl neo-btn bg-accent px-4 py-2 text-xs font-black text-accent-ink"
          >
            <ArrowDown size={15} strokeWidth={2.8} />
            شروع مطالعه
          </button>
          {allChapters.map((c) => (
            <button
              key={c.id}
              onClick={() => onJump(`chapter-${c.id}`)}
              className="cursor-pointer rounded-xl neo-btn px-3 py-1.5 text-xs font-black bg-card inline-flex items-center gap-1.5 text-ink"
            >
              <span className={`h-2.5 w-2.5 rounded-full ${hueDot[c.hue]}`} />
              <span>فصل {fa(c.num)}: {c.short}</span>
            </button>
          ))}
        </div>

        {/* Neobrutalist tactile stats cards (Image #2 upgraded) */}
        <div className="mt-8 grid max-w-lg grid-cols-3 gap-3">
          {[
            { v: fa(50), l: "صفحه جزوه کامل", tag: "پوشش خط‌به‌خط", tagBg: "bg-blue-500/20 text-blue-900 dark:text-blue-200" },
            { v: fa(8), l: "توزیع آماری پایه", tag: "گسسته و پیوسته", tagBg: "bg-amber-500/20 text-amber-900 dark:text-amber-200" },
            { v: fa(allChapters.length), l: "فصل درسی جامع", tag: "صفر تا صد مباحث", tagBg: "bg-purple-500/20 text-purple-900 dark:text-purple-200" },
          ].map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center rounded-2xl neo-border bg-card p-3 sm:p-4 text-center neo-shadow-xs hover:neo-shadow transition-all"
            >
              <span className={`rounded-md neo-border-sm px-2 py-0.5 text-[9.5px] font-black ${s.tagBg}`}>
                {s.tag}
              </span>
              <p className="mt-1.5 text-2xl md:text-3xl font-black text-ink tracking-tight">{s.v}</p>
              <p className="mt-1 text-[11.5px] font-extrabold text-soft">{s.l}</p>
            </div>
          ))}
        </div>

        {/* Acknowledgments Card (آیناز & معین) */}
        {/* Acknowledgments Card */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl neo-border bg-card2 p-4 sm:p-5 neo-shadow-xs">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl neo-border-sm bg-gold text-black">
              <Heart size={20} className="fill-black text-black" />
            </span>
            <div>
              <p className="text-xs font-black text-ink"> نویسنده جزوه

</p>
              <p className="text-xs font-medium text-soft leading-5 mt-0.5 max-w-xl">
                تدوین و تالیف علمی دست‌نویس توسط <strong className="font-black text-ink underline decoration-gold decoration-2">علی زاهدیان</strong> {" "}
                <button
                  type="button"
                  onClick={() => onJump("acknowledgements")}
                  className="cursor-pointer inline-flex items-center text-[11px] font-black text-accent hover:underline ms-1"
                >
                  مشاهده شناسنامه و معرفی نویسنده ←
                </button>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 ms-auto">
            <span className="flex items-center gap-1.5 rounded-lg neo-border-sm bg-card px-3.5 py-1.5 text-xs font-black text-ink neo-shadow-xs">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] text-black font-black">ع</span>
               نویسنده: علی زاهدیان

            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

/* ---------------- section ---------------- */

const SectionView = React.memo(function SectionView({
  section,
  studied,
  onToggle,
}: {
  section: Section;
  studied: boolean;
  onToggle: () => void;
}) {
  return (
    <section id={section.id} className="scroll-mt-header">
      <div className="fade-up">
        <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="rounded-lg border-2 border-line bg-accent px-2.5 py-1 text-xs font-black text-white shadow-[1.5px_1.5px_0px_var(--line)] dark:text-[#08130f]">
            {section.num}
          </span>
          <h3 className="text-lg font-black text-ink md:text-xl tracking-tight">
            <T text={section.title} />
          </h3>
          <button
            onClick={onToggle}
            title={studied ? "علامت‌گذاری به عنوان مرورنشده" : "علامت‌گذاری به عنوان مرورشده"}
            className={`no-print ms-auto inline-flex cursor-pointer items-center gap-1.5 rounded-xl neo-border-sm px-3 py-1.5 text-xs font-black transition-all ${
              studied
                ? "bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 neo-shadow-xs"
                : "bg-card text-soft neo-shadow-xs hover:bg-card2"
            }`}
          >
            {studied ? <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400" /> : <Circle size={13} />}
            {studied ? "مرور شد" : "مرور نشده"}
          </button>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-2 text-[11px]">
          {section.session && (
            <span className="inline-flex items-center gap-1 rounded-full bg-violet-500/10 px-2.5 py-1 font-bold text-violet-600 dark:text-violet-300">
              <CalendarDays size={11} />
              {section.session}
            </span>
          )}
          {section.pages && (
            <span className="inline-flex items-center gap-1 rounded-full bg-card2 px-2.5 py-1 font-bold text-soft">
              <FileText size={11} />
              {section.pages}
            </span>
          )}
        </div>

        {section.summary && (
          <div className="mb-5 rounded-2xl border-s-4 border-accent/60 bg-accent/[0.05] px-5 py-3.5">
            <p className="text-[14.5px] leading-8 text-ink/85">
              <T text={section.summary} />
            </p>
          </div>
        )}

        <div className="space-y-4">
          {section.blocks.map((b, i) => (
            <BlockRenderer key={i} block={b} />
          ))}
        </div>
      </div>
    </section>
  );
});

/* ---------------- main ---------------- */

export const NotesView = React.memo(function NotesView({
  onJump,
  setActiveId,
  progress,
  toggleSection,
}: {
  onJump: (id: string) => void;
  setActiveId: (id: string) => void;
  progress: Record<string, boolean>;
  toggleSection: (id: string) => void;
}) {
  const lastActiveRef = useRef<string>("");

  useEffect(() => {
    let ticking = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          for (const e of entries) {
            if (e.isIntersecting && e.target.id && e.target.id !== lastActiveRef.current) {
              lastActiveRef.current = e.target.id;
              setActiveId(e.target.id);
              break;
            }
          }
          ticking = false;
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0.05 }
    );

    document.querySelectorAll("section[id]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [setActiveId]);

  return (
    <div className="mx-auto max-w-[860px] px-3 pb-28 pt-4 md:px-6 md:pt-6">
      <Hero onJump={onJump} />

      {chapters.map((c, cIdx) => {
        const secs = sectionsByChapter(c.id);
        return (
          <div key={c.id} id={`chapter-${c.id}`} className="scroll-mt-header">
            {/* chapter divider with clear generous breathing room */}
            <div className={`mb-8 sm:mb-10 ${cIdx === 0 ? "mt-6 sm:mt-8" : "mt-24 sm:mt-32 pt-8 sm:pt-10 border-t-2 border-dashed border-line/40"}`}>
              <div className="rounded-3xl neo-border bg-card p-5 sm:p-7 md:p-8 neo-shadow">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-line text-lg font-black shadow-[2px_2px_0px_var(--line)] ${hueChip[c.hue]}`}
                  >
                    {fa(c.num)}
                  </span>
                  <div className="min-w-0">
                    <h2 className="text-base font-black text-ink md:text-lg">{c.title}</h2>
                    <p className="mt-0.5 text-xs font-medium text-faint">{c.blurb}</p>
                  </div>
                  <span className="ms-auto rounded-lg border-1.5 border-line bg-card2 px-3 py-1 text-[11px] font-black text-ink shadow-[1px_1px_0px_var(--line)]">
                    صفحات {fa(c.pages)}
                  </span>
                </div>
                <div className="mt-3.5 flex flex-wrap gap-1.5">
                  {secs.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => onJump(s.id)}
                      className="cursor-pointer rounded-lg border border-line bg-card px-2.5 py-1 text-[11px] font-black text-ink shadow-2xs transition-all duration-150 hover:bg-card2 hover:border-accent hover:translate-y-[-0.5px] active:scale-95"
                    >
                      {s.num}{" "}
                      <T text={s.title.length > 34 ? s.title.slice(0, 34) + "…" : s.title} />
                    </button>
                  ))}
                  <button
                    onClick={() => onJump(`summary-${c.id}`)}
                    className="cursor-pointer rounded-lg border border-accent/40 bg-accent/10 px-3 py-1 text-[11px] font-black text-accent shadow-2xs transition-all duration-150 hover:bg-accent hover:text-white dark:hover:text-[#08130f] hover:translate-y-[-0.5px] active:scale-95 inline-flex items-center gap-1.5"
                  >
                    <BookOpenCheck size={13} />
                    <span>مرور خلاصه و نکات کلیدی فصل {fa(c.num)} ←</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="space-y-12">
              {secs.map((s) => (
                <SectionView
                  key={s.id}
                  section={s}
                  studied={!!progress[s.id]}
                  onToggle={() => toggleSection(s.id)}
                />
              ))}
            </div>
          </div>
        );
      })}

      {/* Dedicated Special Thanks & Acknowledgements Section */}
      <AcknowledgementsSection />
    </div>
  );
});
