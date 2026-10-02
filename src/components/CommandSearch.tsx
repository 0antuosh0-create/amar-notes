import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FileText, Hash, Table2, CornerDownLeft } from "lucide-react";
import { sections, cheatGroups, chapterById } from "../content";
import { statDistributions } from "../content/distributions";
import { T, fa } from "./Math";

interface Result {
  id: string;
  kind: "section" | "example" | "formula";
  title: string;
  sub: string;
  sectionId: string;
  normalizedText: string;
}

function norm(s: string) {
  return s
    .replace(/[يى]/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/\u200c/g, " ")
    .toLowerCase();
}

// Pre-computed normalized index for blazing fast sub-millisecond search
const PRE_INDEX: Result[] = [
  ...sections.map((s) => {
    const title = `${s.num} — ${s.title}`;
    const sub = `${chapterById(s.chapterId)?.short ?? ""} • ${s.pages ?? ""}`;
    return {
      id: s.id,
      kind: "section" as const,
      title,
      sub,
      sectionId: s.id,
      normalizedText: norm(`${title} ${sub} ${s.summary ?? ""}`),
    };
  }),
  ...sections.flatMap((s) =>
    s.blocks
      .filter((b): b is Extract<typeof b, { kind: "example" }> => b.kind === "example")
      .map((b) => {
        const ex = b.example;
        const title = `${ex.label} — ${ex.title}`;
        const sub = `${chapterById(s.chapterId)?.short ?? ""} • ${s.title}`;
        return {
          id: `ex-${ex.id}`,
          kind: "example" as const,
          title,
          sub,
          sectionId: s.id,
          normalizedText: norm(`${title} ${sub} ${ex.statementText ?? ""}`),
        };
      })
  ),
  ...cheatGroups.map((g) => {
    const title = `فرمول‌نامه: ${g.title}`;
    const sub = `مرجع سریع (${g.items.length} فرمول)`;
    return {
      id: `cs-${g.id}`,
      kind: "formula" as const,
      title,
      sub,
      sectionId: `cs-${g.id}`,
      normalizedText: norm(`${title} ${sub} ${g.items.map((it) => it.title).join(" ")}`),
    };
  }),
  {
    id: "acknowledgements",
    kind: "section" as const,
    title: "شناسنامه و معرفی نویسنده: علی زاهدیان",
    sub: "مدرس و پدیدآورنده جزوه ۵۰ صفحه‌ای آمار",
    sectionId: "acknowledgements",
    normalizedText: norm("قدردانی تشکر ویژه نویسنده علی زاهدیان مدرس پدیدآورندگان همیاران جزوه دست نویس نگارش"),
  },
  {
    id: "integrals",
    kind: "section" as const,
    title: "اطلس جامع توزیع‌های آماری",
    sub: "فرمول‌نامه و مشخصات توزیع‌های گسسته و پیوسته",
    sectionId: "integrals",
    normalizedText: norm("توزیع توزیع های آماری اطلس برنولی دو جمله ای هندسی پواسون یکنواخت نمایی نرمال کای دو"),
  },
  ...statDistributions.map((dist) => {
    const title = `توزیع: ${dist.name}`;
    const sub = `توزیع ${dist.type} • ${dist.notation}`;
    return {
      id: `dist-${dist.id}`,
      kind: "formula" as const,
      title,
      sub,
      sectionId: "integrals",
      normalizedText: norm(`${title} ${sub} ${dist.notes} ${dist.pmf_pdf} ${dist.mean} ${dist.variance}`),
    };
  }),
];

export const CommandSearch = React.memo(function CommandSearch({
  open,
  onClose,
  onJump,
}: {
  open: boolean;
  onClose: () => void;
  onJump: (sectionId: string) => void;
}) {
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const results = useMemo(() => {
    const nq = norm(q.trim());
    if (!nq) return PRE_INDEX.slice(0, 8);
    return PRE_INDEX.filter((r) => r.normalizedText.includes(nq)).slice(0, 10);
  }, [q]);

  useEffect(() => {
    if (open) {
      setQ("");
      setIdx(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => setIdx(0), [q]);

  useEffect(() => {
    const activeEl = listRef.current?.children[idx] as HTMLElement | undefined;
    activeEl?.scrollIntoView({ block: "nearest" });
  }, [idx]);

  const pick = (r: Result) => {
    if (r.kind === "example") {
      onJump(r.id);
    } else {
      onJump(r.sectionId);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="no-print fixed inset-0 z-50 flex items-start justify-center bg-black/45 px-4 pt-[10vh] backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="w-full max-w-xl overflow-hidden rounded-2xl border-2 border-line bg-card shadow-[6px_6px_0px_var(--line)] dark:shadow-[6px_6px_0px_#000]"
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
          >
            {/* Search Input Bar (Neobrutalist keycap + enclosed search box) */}
            <div className="border-b-2 border-line bg-card2/30 p-3">
              <div className="flex items-center gap-2.5 rounded-xl border-2 border-line bg-card px-3.5 py-2.5 shadow-[2px_2px_0px_var(--line)] focus-within:border-accent focus-within:shadow-[3px_3px_0px_var(--accent)] transition-all">
                <Search size={18} className="shrink-0 text-ink/75" />
                <input
                  ref={inputRef}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setIdx((i) => Math.min(i + 1, results.length - 1));
                    } else if (e.key === "ArrowUp") {
                      e.preventDefault();
                      setIdx((i) => Math.max(i - 1, 0));
                    } else if (e.key === "Enter" && results[idx]) {
                      pick(results[idx]);
                    } else if (e.key === "Escape") {
                      onClose();
                    }
                  }}
                  placeholder="جستجو در بخش‌ها، مثال‌ها و فرمول‌ها…"
                  className="w-full bg-transparent text-[14.5px] font-bold text-ink outline-none placeholder:text-faint"
                />
                {q && (
                  <button
                    onClick={() => setQuery ? setQ("") : setQ("")}
                    className="cursor-pointer text-faint hover:text-ink"
                  >
                    <X size={15} />
                  </button>
                )}
                <kbd className="shrink-0 rounded-lg border-2 border-line bg-card2 px-2 py-0.5 font-mono text-[11px] font-black text-ink shadow-[1px_1px_0px_var(--line)]">
                  ESC
                </kbd>
              </div>
            </div>

            {/* Results list */}
            <ul ref={listRef} className="max-h-[50vh] overflow-y-auto p-2.5 space-y-1">
              {results.map((r, i) => {
                const Icon =
                  r.kind === "section" ? FileText : r.kind === "example" ? Hash : Table2;
                const active = i === idx;
                return (
                  <li key={r.id}>
                    <button
                      onMouseEnter={() => setIdx(i)}
                      onClick={() => pick(r)}
                      className={`flex w-full cursor-pointer items-center gap-3 rounded-xl border-2 px-3 py-2.5 text-start transition-all ${
                        active
                          ? "border-line bg-accent/[0.14] text-ink shadow-[2.5px_2.5px_0px_var(--line)] translate-x-[-1px] translate-y-[-1px]"
                          : "border-transparent text-soft hover:border-line-soft hover:bg-card2/50"
                      }`}
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-1.5 ${
                          active
                            ? "border-line bg-accent text-white shadow-[1px_1px_0px_var(--line)] dark:text-[#08130f]"
                            : "border-line-soft bg-card2 text-soft"
                        }`}
                      >
                        <Icon size={14} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13.5px] font-extrabold text-ink">
                          <T text={r.title} />
                        </span>
                        <span className="block truncate text-[11px] font-medium text-faint">{r.sub}</span>
                      </span>
                      {active && (
                        <CornerDownLeft size={15} className="shrink-0 text-ink" />
                      )}
                    </button>
                  </li>
                );
              })}
              {results.length === 0 && (
                <li className="px-3 py-10 text-center text-sm font-bold text-faint">
                  نتیجه‌ای برای «{q}» پیدا نشد
                </li>
              )}
            </ul>

            {/* Footer */}
            <div className="flex items-center justify-between border-t-2 border-line bg-card2/40 px-4 py-2.5 text-[11px] font-bold text-faint">
              <span>بخش‌ها: {fa(sections.length)} • مثال‌ها و فرمول‌ها قابل جستجو</span>
              <span>↑↓ حرکت • Enter انتخاب</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
