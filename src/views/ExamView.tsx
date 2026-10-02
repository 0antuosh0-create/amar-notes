import React, { useMemo, useState, useEffect } from "react";
import {
  GraduationCap,
  Star,
  PenLine,
  CheckCircle2,
  Circle,
  Target,
  ListChecks,
  Hourglass,
  Calculator,
  Play,
  Pause,
  RotateCcw,
  Eye,
  EyeOff,
  Clock,
  Sparkles,
  Filter,
} from "lucide-react";
import {
  examExampleIds,
  homeworkExampleIds,
  exampleById,
  skills,
  chapters,
} from "../content";
import { ExampleBlock } from "../components/Blocks";
import { fa } from "../components/Math";

const tips = [
  {
    icon: Hourglass,
    title: "مدیریت زمان در آزمون آمار و احتمال",
    text: "در مسائل توزیع‌ها، پیش از هر محاسبه‌ای نوع متغیر (گسسته یا پیوسته) و شرایط مسئله (مثلاً بدون جایگذاری، زمان انتظار، یا نرخ رخدادها) را مشخص کنید تا فرمول اشتباه انتخاب نشود.",
  },
  {
    icon: Calculator,
    title: "تقارن جدول Z و مقادیر منفی",
    text: "به یاد داشته باشید که جدول نرمال معمولاً مقادیر مثبت Z را می‌دهد؛ برای مقادیر منفی از رابطه متقارن Φ(-z) = 1 - Φ(z) استفاده کنید و در مخرج Z همیشه جذر واریانس (σ) قرار دهید نه خود واریانس.",
  },
  {
    icon: Target,
    title: "تفکیک استقلال و ناهمبستگی",
    text: "استقلال دو متغیر نتیجه می‌دهد کوواریانس و ضریب همبستگی صفر است (Cov = 0). اما عکس آن لزوماً برقرار نیست؛ اگر در تستی ضریب همبستگی صفر شد، بدون فرض توزیع توأم نرمال نمی‌توان استقلال را نتیجه گرفت.",
  },
  {
    icon: ListChecks,
    title: "انتخاب بین آماره Z و t در آزمون و بازه اطمینان",
    text: "اگر انحراف معیار جامعه σ معلوم باشد یا اندازه نمونه n ≥ 30 باشد، از توزیع Z نرمال استفاده کنید. اگر جامعه نرمال باشد، حجم نمونه کوچک (n < 30) و σ نامعلوم باشد، الزماً از توزیع t با درجات آزادی n - 1 استفاده کنید.",
  },
];

// Curated set of high-yield probability & statistics problems across all 5 chapters
const CURATED_EXAM_PROBLEMS = [
  { id: "ex-1-1", chapterId: "ch1", type: "exam", title: "پرتاب دو تاس سالم و شرط تاس اول" },
  { id: "ex-1-2", chapterId: "ch1", type: "exam", title: "کنترل کیفیت خطوط تولید و قانون بیز" },
  { id: "ex-2-1", chapterId: "ch2", type: "homework", title: "استخراج توزیع احتمال از روی تابع مولد گشتاور MGF" },
  { id: "ex-3-1", chapterId: "ch3", type: "exam", title: "محاسبه احتمال بازه برای متغیر نرمال نمرات با جدول Z" },
  { id: "ex-4-1", chapterId: "ch4", type: "homework", title: "جدول توزیع توأم گسسته و توزیع‌های حاشیه‌ای" },
  { id: "ex-5-1", chapterId: "ch5", type: "exam", title: "محاسبه بازه اطمینان ۹۵٪ برای طول عمر لامپ" },
];
export const ExamView = React.memo(function ExamView({
  progress,
  toggleItem,
}: {
  progress: Record<string, boolean>;
  toggleItem: (id: string) => void;
}) {
  const done = useMemo(
    () => skills.filter((s) => progress[s.id]).length,
    [progress]
  );
  const pct = Math.round((done / skills.length) * 100);
  const projectedScore = Math.round((done / skills.length) * 20);
  // Filter states
  const [selectedChapter, setSelectedChapter] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");

  // Practice mode timer
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let interval: number | undefined;
    if (timerRunning) {
      interval = window.setInterval(() => {
        setTimerSeconds((s) => s + 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [timerRunning]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${fa(String(m).padStart(2, "0"))}:${fa(String(s).padStart(2, "0"))}`;
  };

  const toggleTimer = () => setTimerRunning((r) => !r);
  const resetTimer = () => {
    setTimerRunning(false);
    setTimerSeconds(0);
  };

  // Filtered problems list
  const filteredProblems = useMemo(() => {
    return CURATED_EXAM_PROBLEMS.filter((p) => {
      if (selectedChapter !== "all" && p.chapterId !== selectedChapter) return false;
      if (selectedType === "exam" && p.type !== "exam") return false;
      if (selectedType === "homework" && p.type !== "homework") return false;
      return true;
    });
  }, [selectedChapter, selectedType]);

  return (
    <div className="mx-auto max-w-[920px] px-4 pb-28 pt-8 md:px-6">
      {/* header */}
      <div className="fade-up mb-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-[11.5px] font-bold text-violet-600 dark:text-violet-300">
            <GraduationCap size={13} />
            برنامه مطالعه هدفمند برای میان‌ترم و پایان‌ترم
          </p>

          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-xl border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 text-xs font-black text-violet-800 dark:text-violet-200 shadow-2xs">
              <Sparkles size={13} className="text-violet-500" />
              <span>نمره پیش‌بینی آزمون: {fa(projectedScore)} از ۲۰</span>
            </span>

            {/* practice timer widget */}
            <div className="no-print flex items-center gap-2.5 rounded-xl border border-line-soft bg-card px-3 py-1.5 shadow-2xs">
              <Clock size={15} className={timerRunning ? "animate-pulse text-accent" : "text-soft"} />
              <span className="font-sans tabular-nums text-[13.5px] font-black text-ink tracking-wider">
                {formatTimer(timerSeconds)}
              </span>
              <div className="flex items-center gap-1 border-s border-line-soft ps-2">
                <button
                  onClick={toggleTimer}
                  className="cursor-pointer rounded-lg border border-line-soft bg-card2/70 p-1 text-ink transition-all hover:bg-card hover:border-accent active:scale-90"
                  title={timerRunning ? "توقف تایمر" : "شروع تایمر آزمون"}
                >
                  {timerRunning ? <Pause size={13} /> : <Play size={13} />}
                </button>
                <button
                  onClick={resetTimer}
                  className="cursor-pointer rounded-lg border border-line-soft bg-card2/70 p-1 text-faint transition-all hover:text-ink active:scale-90"
                  title="ریست تایمر"
                >
                  <RotateCcw size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <h1 className="mt-3 text-2xl font-black text-ink md:text-[2rem]">
          مرکز جامع آمادگی آزمون
        </h1>
        <p className="mt-2.5 max-w-2xl text-[14px] sm:text-[14.5px] leading-8 text-soft font-medium">
          اینجا سوالات مهم و پرتکرار امتحانی، تمرین‌های کلاسی و ۱۰ تا مهارت کلیدی آزمون رو مرتب برات آماده کردیم. می‌تونی با زمان‌سنج بالا زمانت رو محک بزنی و مهارت‌هات رو دونه‌دونه تیک بزنی تا نمره تخمینیت حساب بشه.
        </p>
      </div>

      {/* mastery celebration banner if 100% */}
      {pct === 100 && (
        <div className="fade-up mb-8 flex items-center gap-3.5 rounded-2xl border-2 border-emerald-500/50 bg-emerald-500/15 p-4 text-ink shadow-xs">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/60 bg-emerald-500 text-white shadow-xs">
            <Sparkles size={20} />
          </span>
          <div>
            <p className="text-sm font-black inline-flex items-center gap-1.5">
              <span>تبریک! تمام مهارت‌های کلیدی آزمون تکمیل شد</span>
              <Sparkles size={16} className="text-emerald-500" />
            </p>
            <p className="text-xs font-bold text-soft">
              شما هر ۱۰ مهارت آزمون نیم‌ترم دوم را با موفقیت مرور کردید. اکنون روی حل سرعتی مسائل زیر تمرکز کنید.
            </p>
          </div>
        </div>
      )}

      {/* tips */}
      <div className="mb-10 grid gap-3.5 sm:grid-cols-2">
        {tips.map((t, i) => {
          const Icon = t.icon;
          return (
            <div
              key={i}
              className="group rounded-2xl border-2 border-line-soft bg-card px-5 py-4 shadow-2xs transition-all duration-200 hover:border-gold/60 hover:shadow-xs hover:translate-y-[-1px]"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-gold/30 bg-gold/15 text-gold shadow-2xs">
                  <Icon size={15} />
                </span>
                <p className="text-[13.5px] font-black text-ink">{t.title}</p>
              </div>
              <p className="text-[12.5px] leading-7 font-medium text-soft">{t.text}</p>
            </div>
          );
        })}
      </div>

      {/* skills checklist */}
      <div id="exam-skills" className="scroll-mt-header mb-12 overflow-hidden rounded-2xl border-2 border-line bg-card shadow-xs">
        <div className="flex flex-wrap items-center gap-3 border-b-2 border-line bg-card2/80 px-5 py-3.5">
          <ListChecks size={18} className="text-ink" />
          <h2 className="text-[15px] font-black text-ink">چک‌لیست مهارت‌های ده‌گانه آزمون</h2>
          <span className="ms-auto inline-flex items-center gap-1.5 rounded-lg border border-line-soft bg-card px-2.5 py-1 text-xs font-black text-ink shadow-2xs">
            <span className="tabular-nums text-accent">{fa(done)}</span>
            <span className="text-faint text-[11px]">از</span>
            <span className="tabular-nums text-soft">{fa(skills.length)}</span>
            <span className="text-faint">•</span>
            <span className="tabular-nums text-ink">{fa(pct)}٪</span>
          </span>
        </div>
        <div className="h-2 border-b border-line bg-card2">
          <div
            className="h-full bg-gradient-to-l from-teal-500 to-emerald-400 transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
        <ul className="divide-y divide-line/70">
          {skills.map((sk) => {
            const checked = !!progress[sk.id];
            return (
              <li key={sk.id}>
                <button
                  onClick={() => toggleItem(sk.id)}
                  className="flex w-full cursor-pointer items-center gap-3 px-5 py-3 text-start transition-colors hover:bg-card2/40"
                >
                  {checked ? (
                    <CheckCircle2 size={18} className="shrink-0 text-emerald-500" />
                  ) : (
                    <Circle size={17} className="shrink-0 text-faint/60" />
                  )}
                  <span
                    className={`text-[13.5px] leading-6 ${
                      checked ? "text-faint line-through" : "text-ink font-medium"
                    }`}
                  >
                    {sk.text}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Filter bar for questions */}
      <div className="mb-6 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-xl font-black text-ink">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-300">
              <Star size={17} className="fill-amber-500 text-amber-500" />
            </span>
            مسائل منتخب آزمون ({fa(filteredProblems.length)} سؤال)
          </h2>
        </div>

        {/* pills filter */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {/* Category filter */}
          <div className="flex items-center gap-1 rounded-xl border border-line-soft bg-card p-1 text-xs shadow-2xs">
            {[
              { id: "all", label: "همه مسائل" },
              { id: "exam", label: "سؤالات امتحانی" },
              { id: "homework", label: "تمرین‌های منزل" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedType(t.id)}
                className={`cursor-pointer rounded-lg px-2.5 py-1 font-black transition-all ${
                  selectedType === t.id
                    ? "border border-line bg-accent text-white shadow-2xs dark:text-[#08130f]"
                    : "border border-transparent text-soft hover:text-ink"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Chapter filter */}
          <div className="flex flex-wrap items-center gap-1 rounded-xl border border-line-soft bg-card p-1 text-xs shadow-2xs">
            <button
              onClick={() => setSelectedChapter("all")}
              className={`cursor-pointer rounded-lg px-2.5 py-1 font-black transition-all ${
                selectedChapter === "all"
                  ? "border border-line bg-card2 text-ink shadow-2xs"
                  : "border border-transparent text-faint hover:text-soft"
              }`}
            >
              همه فصل‌ها
            </button>
            {chapters.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedChapter(c.id)}
                className={`cursor-pointer rounded-lg px-2.5 py-1 font-black transition-all ${
                  selectedChapter === c.id
                    ? "border border-line bg-card2 text-ink shadow-2xs"
                    : "border border-transparent text-faint hover:text-soft"
                }`}
              >
                فصل {fa(c.num)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Questions list */}
      <div className="space-y-6">
        {filteredProblems.map((p) => {
          const ex = exampleById(p.id);
          if (!ex) return null;
          const ch = chapters.find((c) => c.id === p.chapterId);
          return (
            <div key={p.id} id={`exam-${p.id}`} className="scroll-mt-header">
              <div className="mb-2 flex items-center gap-2 px-1 text-xs font-bold text-faint">
                <span>فصل {fa(ch?.num ?? "")}: {ch?.short}</span>
                <span>•</span>
                <span>{p.title}</span>
              </div>
              <ExampleBlock example={ex} defaultOpen />
            </div>
          );
        })}
        {filteredProblems.length === 0 && (
          <div className="rounded-2xl border border-line bg-card p-12 text-center text-sm text-faint">
            سؤالی در این دسته‌بندی یافت نشد. فیلترها را تغییر دهید.
          </div>
        )}
      </div>
    </div>
  );
});
