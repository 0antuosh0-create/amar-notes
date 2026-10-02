import { BookOpenText, BookOpenCheck, Table2, GraduationCap, Calculator, Search, Moon, Sun, Menu, Sigma } from "lucide-react";
import { fa } from "./Math";

export type View = "notes" | "summary" | "cheatsheet" | "integrals" | "exam";

const views: { id: View; label: string; icon: typeof BookOpenText }[] = [
  { id: "notes", label: "جزوه کامل", icon: BookOpenText },
  { id: "summary", label: "خلاصه فصول", icon: BookOpenCheck },
  { id: "cheatsheet", label: "فرمول‌نامه", icon: Table2 },
  { id: "integrals", label: "اطلس توزیع‌ها", icon: Calculator },
  { id: "exam", label: "آمادگی آزمون", icon: GraduationCap },
];

export function ProgressRing({ pct }: { pct: number }) {
  return (
    <div
      className="hidden md:flex relative items-center justify-center neo-border-sm bg-card px-2.5 py-1 rounded-xl neo-shadow-xs"
      title={`پیشرفت مرور: ${fa(pct)}٪`}
    >
      <span className="text-[11px] font-black text-ink">{fa(pct)}٪ مرور شده</span>
    </div>
  );
}

export function TopBar({
  view,
  setView,
  dark,
  toggleDark,
  onSearch,
  onMenu,
  progressPct,
}: {
  view: View;
  setView: (v: View) => void;
  dark: boolean;
  toggleDark: () => void;
  onSearch: () => void;
  onMenu: () => void;
  progressPct: number;
}) {
  return (
    <header className="no-print sticky top-0 z-40 border-b-[3px] border-line bg-paper/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-3 px-4 md:px-6">
        {/* Mobile menu button */}
        <button
          onClick={onMenu}
          className="neo-btn cursor-pointer rounded-xl bg-card p-2 text-ink lg:hidden shrink-0"
          aria-label="فهرست و منو"
        >
          <Menu size={18} />
        </button>

        {/* Brand Logo with Neo-Brutalist badge */}
        <button
          onClick={() => setView("notes")}
          className="flex cursor-pointer items-center gap-2 text-start min-w-0 shrink group"
        >
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl neo-border bg-accent text-accent-ink neo-shadow-xs group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
            <Sigma size={20} strokeWidth={3} />
          </div>
          <div className="leading-tight min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-base font-black text-ink tracking-tight truncate">
                آمار و احتمال
              </span>
              <span className="hidden sm:inline-block rounded-md bg-gold px-1.5 py-0.2 text-[9.5px] font-black text-black neo-border-sm">
                ۵۰ ص
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] font-bold text-faint truncate hidden sm:block">
              مرجع دانشگاهی با فرمول‌های دقیق LaTeX
            </p>
          </div>
        </button>

        {/* Desktop View Switcher (Punchy Neo-Brutal Tabs) */}
        <nav className="mx-auto hidden items-center gap-1.5 rounded-2xl neo-border bg-card2 p-1.5 neo-shadow-xs md:flex">
          {views.map((v) => {
            const Icon = v.icon;
            const active = view === v.id;
            return (
              <button
                key={v.id}
                onClick={() => setView(v.id)}
                className={`flex cursor-pointer items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-black transition-all ${
                  active
                    ? "neo-border bg-accent text-accent-ink neo-shadow-xs scale-[1.02]"
                    : "border-2 border-transparent text-soft hover:bg-card hover:text-ink"
                }`}
              >
                <Icon size={15} strokeWidth={active ? 2.8 : 2.2} />
                <span>{v.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Actions (Search, Dark mode toggle, Progress) */}
        <div className="ms-auto flex items-center gap-2.5">
          <button
            onClick={onSearch}
            className="hidden cursor-pointer items-center gap-2.5 rounded-xl neo-btn bg-card px-3.5 py-1.5 text-xs font-black text-ink sm:flex"
          >
            <Search size={15} strokeWidth={2.5} />
            <span>جستجو…</span>
            <kbd className="rounded-md neo-border-sm bg-card2 px-1.5 py-0.5 font-mono text-[9.5px] font-black">
              CTRL K
            </kbd>
          </button>
          <button
            onClick={onSearch}
            className="cursor-pointer rounded-xl neo-btn bg-card p-2 text-ink sm:hidden"
            aria-label="جستجو"
          >
            <Search size={18} />
          </button>

          <ProgressRing pct={progressPct} />

          <button
            onClick={toggleDark}
            className="cursor-pointer rounded-xl neo-btn bg-card p-2 text-ink hover:text-accent"
            aria-label="تغییر تم شب و روز"
          >
            {dark ? <Sun size={19} className="text-gold" /> : <Moon size={19} />}
          </button>
        </div>
      </div>
    </header>
  );
}
