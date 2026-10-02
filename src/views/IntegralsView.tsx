import React, { useState, useMemo } from "react";
import {
  Calculator,
  Search,
  X,
  Printer,
  Sparkles,
  TrendingUp,
  Waves,
  Activity,
  Layers,
  HelpCircle,
  Copy,
  BookOpen,
} from "lucide-react";
import {
  statCategories,
  statDistributions,
  type StatCategory,
  type StatDistributionItem,
} from "../content/distributions";
import { MB, M, T, fa } from "../components/Math";
import { CopyButton } from "../components/Blocks";

export const IntegralsView = React.memo(function IntegralsView({
  selectedCategory: propCategory = "all",
  onCategoryChange,
}: {
  selectedCategory?: string;
  onCategoryChange?: (cat: string) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>(propCategory);
  const [query, setQuery] = useState("");

  const handleCategorySelect = (id: string) => {
    setSelectedCategory(id);
    onCategoryChange?.(id);
  };

  const filteredDistributions = useMemo(() => {
    return statDistributions.filter((dist) => {
      const matchCat =
        selectedCategory === "all" ||
        (selectedCategory === "discrete" && dist.type === "گسسته") ||
        (selectedCategory === "continuous" && dist.type === "پیوسته");

      const matchQuery =
        !query.trim() ||
        dist.name.toLowerCase().includes(query.toLowerCase()) ||
        dist.notes.toLowerCase().includes(query.toLowerCase());

      return matchCat && matchQuery;
    });
  }, [selectedCategory, query]);

  return (
    <div className="mx-auto max-w-[1300px] px-4 py-8 md:px-6">
      {/* Neo-Brutalist Billboard Banner */}
      <div className="mb-8 rounded-3xl neo-border bg-card p-6 md:p-8 neo-shadow-lg">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between border-b-2 border-line pb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-xl neo-border-sm bg-gold px-3.5 py-1 text-xs font-black text-black neo-shadow-xs">
              <Calculator size={15} strokeWidth={2.8} />
              <span>اطلس مهندسی توزیع‌های آماری</span>
            </div>
            <h1 className="mt-3 text-2xl font-black text-ink md:text-4xl tracking-tight">
              توزیع‌های احتمال گسسته و پیوسته مهندسی
            </h1>
            <p className="mt-2 text-sm md:text-base font-bold text-soft leading-relaxed max-w-3xl">
              مرجع مشخصات، تابع جرم و چگالی احتمال ($f(x)$)، امید ریاضی ($E[X]$)، واریانس ($Var(X)$) و تابع مولد گشتاور (MGF) برگرفته از متن جزوه.
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="flex cursor-pointer items-center justify-center gap-2.5 rounded-2xl neo-btn bg-card2 px-5 py-3 text-xs font-black text-ink self-start md:self-auto hover:bg-gold hover:text-black transition-colors"
          >
            <Printer size={16} strokeWidth={2.5} />
            <span>چاپ و ذخیره PDF</span>
          </button>
        </div>

        {/* Filter categories tabs (Punchy Brutalist badges) */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="text-xs font-black text-faint">فیلتر نوع:</span>
          {statCategories.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-xs font-black transition-all ${
                  active
                    ? "neo-border bg-accent text-accent-ink neo-shadow-xs scale-[1.03]"
                    : "neo-border-sm bg-card2 text-soft hover:bg-card hover:text-ink"
                }`}
              >
                <span>{cat.title}</span>
                <span
                  className={`rounded-md px-1.5 py-0.5 text-[10px] font-black ${
                    active ? "bg-black text-white dark:bg-white dark:text-black" : "bg-paper text-faint"
                  }`}
                >
                  {fa(cat.count)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search input with bold neo-brutalist styling */}
        <div className="relative mt-5">
          <Search size={18} strokeWidth={2.8} className="absolute start-4 top-1/2 -translate-y-1/2 text-faint" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجو در نام یا کاربرد توزیع (مثلاً برنولی، پواسون، نرمال، فقدان حافظه)…"
            className="w-full rounded-2xl neo-border bg-paper py-3 pe-12 ps-12 text-xs sm:text-sm font-black text-ink placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-accent"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute end-4 top-1/2 -translate-y-1/2 rounded-lg neo-border-sm bg-card2 p-1 text-faint hover:text-ink"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Distribution Cards Grid (Architectural Cards with Strong Shadow) */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {filteredDistributions.map((dist, idx) => (
          <div
            key={dist.id}
            className="flex flex-col justify-between rounded-3xl neo-card p-6 neo-shadow hover:neo-shadow-lg transition-all"
          >
            <div>
              {/* Card top row */}
              <div className="flex items-center justify-between border-b-2 border-line pb-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg neo-border-sm bg-card2 text-xs font-black text-ink">
                    {fa(idx + 1)}
                  </span>
                  <div>
                    <h2 className="text-base sm:text-lg font-black text-ink">{dist.name}</h2>
                    <span
                      className={`inline-block mt-0.5 rounded-md px-2 py-0.5 text-[10px] font-black neo-border-sm ${
                        dist.type === "گسسته"
                          ? "bg-amber-400 text-black"
                          : "bg-sky-400 text-black"
                      }`}
                    >
                      توزیع {dist.type}
                    </span>
                  </div>
                </div>
                <CopyButton text={dist.pmf_pdf} title="کپی فرمول چگالی / جرم احتمال" />
              </div>

              {/* Notation Block */}
              <div className="mt-4 rounded-xl neo-border-sm bg-card2/80 px-3.5 py-2">
                <span className="text-[11px] font-black text-faint block">نماد استاندارد آماری:</span>
                <div className="mt-1">
                  <MB tex={dist.notation} />
                </div>
              </div>

              {/* PMF/PDF formula block */}
              <div className="mt-3.5 rounded-2xl neo-border bg-card p-4 neo-shadow-xs">
                <span className="text-xs font-black text-ink block border-b border-line-soft pb-1.5">
                  {dist.type === "گسسته" ? "تابع جرم احتمال (PMF):" : "تابع چگالی احتمال (PDF):"}
                </span>
                <div className="my-2 overflow-x-auto py-1">
                  <MB tex={dist.pmf_pdf} />
                </div>
                <div className="mt-2 pt-2 border-t border-line-soft/80 flex items-center justify-between text-xs">
                  <span className="font-black text-faint">دامنه متغیر:</span>
                  <div className="font-mono">
                    <M tex={dist.domain} />
                  </div>
                </div>
              </div>

              {/* Moments (Mean & Variance) */}
              <div className="mt-3.5 grid grid-cols-2 gap-3">
                <div className="rounded-xl neo-border-sm bg-card2 p-3 text-center">
                  <span className="block text-[11px] font-black text-faint">امید ریاضی (E[X])</span>
                  <div className="mt-1 font-bold">
                    <M tex={dist.mean} />
                  </div>
                </div>
                <div className="rounded-xl neo-border-sm bg-card2 p-3 text-center">
                  <span className="block text-[11px] font-black text-faint">واریانس (Var(X))</span>
                  <div className="mt-1 font-bold">
                    <M tex={dist.variance} />
                  </div>
                </div>
              </div>

              {/* MGF if available */}
              {dist.mgf && (
                <div className="mt-3.5 rounded-xl neo-border-sm bg-card2/40 px-3.5 py-2 text-center">
                  <span className="text-[10.5px] font-black text-faint block">تابع مولد گشتاور (MGF):</span>
                  <div className="mt-1 overflow-x-auto">
                    <M tex={dist.mgf} />
                  </div>
                </div>
              )}
            </div>

            {/* Note & characteristics */}
            <div className="mt-5 border-t-2 border-line pt-3.5 text-xs font-bold leading-relaxed text-soft">
              <span className="text-accent font-black">ویژگی و کاربرد: </span>
              {dist.notes}
            </div>
          </div>
        ))}
      </div>

      {filteredDistributions.length === 0 && (
        <div className="mt-8 rounded-3xl neo-border bg-card p-12 text-center neo-shadow">
          <HelpCircle size={44} className="mx-auto text-faint" />
          <p className="mt-3 text-base font-black text-ink">توزیعی با مشخصات جستجو یافت نشد</p>
          <p className="mt-1 text-xs font-bold text-soft">عبارت دیگری را امتحان کنید یا فیلتر را به «همه توزیع‌ها» تغییر دهید.</p>
        </div>
      )}
    </div>
  );
});
