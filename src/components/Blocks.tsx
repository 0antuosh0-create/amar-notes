import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Copy,
  Check,
  Star,
  PenLine,
  Lightbulb,
  AlertTriangle,
  Info,
  CheckCircle2,
  Scale,
  BookMarked,
  Hash,
} from "lucide-react";
import type { Block, Example, SolutionStep } from "../types";
import { M, MB, T, MathLines, fa } from "./Math";

/* ---------------- copy button ---------------- */

export const CopyButton = React.memo(function CopyButton({
  text,
  label,
  iconOnly = false,
  reveal = false,
}: {
  text: string;
  label?: string;
  /** Compact square button, no text label */
  iconOnly?: boolean;
  /** Stay invisible until the surrounding card is hovered / focused (touch always shows) */
  reveal?: boolean;
}) {
  const [done, setDone] = useState(false);
  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
        } catch {
          const ta = document.createElement("textarea");
          ta.value = text;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          document.body.removeChild(ta);
        }
        setDone(true);
        setTimeout(() => setDone(false), 1800);
      }}
      title="کپی فرمول (LaTeX)"
      aria-label="کپی فرمول به صورت LaTeX"
      className={[
        "no-print inline-flex shrink-0 cursor-pointer items-center justify-center rounded-lg border text-[11.5px] font-bold transition-all duration-200",
        "active:scale-90 select-none",
        done
          ? "border-emerald-500 bg-emerald-500/15 text-emerald-700 dark:border-emerald-400 dark:text-emerald-300 font-black shadow-xs scale-[1.03]"
          : "border-line-soft bg-card text-soft hover:border-accent hover:bg-accent/[0.08] hover:text-accent shadow-2xs",
        iconOnly ? "h-7 w-7 p-0" : "gap-1.5 px-2.5 py-1",
        reveal
          ? "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100 [@media(hover:none)]:opacity-100"
          : "",
      ].join(" ")}
    >
      <motion.span
        key={done ? "check" : "copy"}
        initial={{ scale: 0.6, rotate: done ? -15 : 0 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 450, damping: 22 }}
        className="flex items-center justify-center"
      >
        {done ? <Check size={13} strokeWidth={2.5} /> : <Copy size={13} />}
      </motion.span>
      {!iconOnly && <span>{label ?? (done ? "کپی شد" : "کپی")}</span>}
    </button>
  );
});

/* ---------------- theorem / definition ---------------- */

export const TheoremBlock = React.memo(function TheoremBlock({
  block,
}: {
  block: Extract<Block, { kind: "theorem" }>;
}) {
  return (
    <div className="group overflow-hidden rounded-2xl neo-border bg-card neo-shadow-xs hover:neo-shadow transition-all w-full min-w-0 max-w-full">
      <div className="flex items-center gap-2.5 border-b-2 border-line bg-blue-500/10 px-4 py-3 sm:px-5 sm:py-3.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg neo-border-sm bg-accent text-accent-ink neo-shadow-xs">
          <Scale size={15} strokeWidth={2.8} />
        </span>
        <span className="rounded-lg neo-border-sm bg-card px-2.5 py-0.5 text-xs font-black text-ink neo-shadow-xs">
          {block.label}
        </span>
        {block.title && <span className="text-sm font-black text-ink">{block.title}</span>}
      </div>
      <div className="space-y-3 px-4 py-3.5 sm:px-5 sm:py-4">
        {block.body && (
          <p className="text-[15px] leading-8 text-soft font-medium">
            <T text={block.body} />
          </p>
        )}
        {block.math && <MathLines lines={block.math} />}
      </div>
    </div>
  );
});

export const DefinitionBlock = React.memo(function DefinitionBlock({
  block,
}: {
  block: Extract<Block, { kind: "definition" }>;
}) {
  return (
    <div className="group overflow-hidden rounded-2xl neo-border bg-card neo-shadow-xs hover:neo-shadow transition-all w-full min-w-0 max-w-full">
      <div className="flex items-center gap-2.5 border-b-2 border-line bg-amber-500/10 px-4 py-3 sm:px-5 sm:py-3.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg neo-border-sm bg-gold text-black neo-shadow-xs">
          <BookMarked size={15} strokeWidth={2.8} />
        </span>
        <span className="rounded-lg neo-border-sm bg-card px-2.5 py-0.5 text-xs font-black text-ink neo-shadow-xs">
          {block.label}
        </span>
        <span className="text-sm font-black text-ink">
          <T text={block.title} />
        </span>
      </div>
      <div className="space-y-3.5 px-4 py-3.5 sm:px-5 sm:py-4">
        {block.body && (
          <p className="text-[15px] leading-8 text-soft font-medium">
            <T text={block.body} />
          </p>
        )}
        {block.math && <MathLines lines={block.math} />}

        {/* Intuitive discrimination / Hint */}
        {block.hint && (
          <div className="rounded-xl neo-border-sm bg-blue-500/10 p-3 text-xs leading-6 font-bold text-ink">
            <span className="font-black text-accent block mb-1">💡 تمایز و درک مفهومی:</span>
            <T text={block.hint} />
          </div>
        )}

        {/* Micro intuitive Example */}
        {block.example && (
          <div className="rounded-xl neo-border-sm bg-card2/80 p-3 text-xs leading-6 font-bold text-soft border-s-4 border-s-gold">
            <span className="font-black text-ink block mb-0.5">🔍 مثال شهودی و ملموس:</span>
            <T text={block.example} />
          </div>
        )}
      </div>
    </div>
  );
});

/* ---------------- formula ---------------- */

export const FormulaBlock = React.memo(function FormulaBlock({
  block,
}: {
  block: Extract<Block, { kind: "formula" }>;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border-2 border-line-soft hover:border-accent bg-card px-4 py-3.5 sm:px-5 shadow-xs hover:shadow-md transition-all duration-200 w-full min-w-0 max-w-full">
      {block.star && (
        <div className="pointer-events-none absolute inset-y-0 start-0 w-1.5 bg-amber-400" />
      )}
      <div className="flex items-center justify-between gap-2">
        {block.label ? (
          <span className="inline-flex items-center gap-1.5 rounded-md border border-line-soft bg-card2 px-2 py-0.5 text-xs font-black text-ink shadow-2xs">
            {block.star && <Star size={13} className="text-amber-500 fill-amber-400" />}
            <T text={block.label} />
          </span>
        ) : (
          <span />
        )}
        <CopyButton text={block.math} />
      </div>
      <MB tex={block.math} className="py-2" />
      {block.note && (
        <p className="px-1 pt-1 text-center text-xs leading-6 font-bold text-faint">
          <T text={block.note} />
        </p>
      )}
    </div>
  );
});

/* ---------------- note ---------------- */

const noteStyles = {
  tip: {
    icon: Lightbulb,
    wrap: "border-2 border-line bg-blue-500/10",
    iconColor: "text-accent",
    titleColor: "text-ink",
  },
  warn: {
    icon: AlertTriangle,
    wrap: "border-2 border-line bg-gold/15",
    iconColor: "text-gold",
    titleColor: "text-ink",
  },
  info: {
    icon: Info,
    wrap: "border-2 border-line bg-purple-500/10",
    iconColor: "text-purple-600 dark:text-purple-400",
    titleColor: "text-ink",
  },
};

export const NoteBlock = React.memo(function NoteBlock({
  block,
}: {
  block: Extract<Block, { kind: "note" }>;
}) {
  const s = noteStyles[block.variant];
  const Icon = s.icon;
  return (
    <div className={`rounded-2xl border-2 border-line px-4 py-3.5 sm:px-5 sm:py-4 shadow-[3.5px_3.5px_0px_var(--line)] w-full min-w-0 max-w-full ${s.wrap}`}>
      <div className="flex items-start gap-3 w-full min-w-0">
        <Icon size={19} className={`mt-1 shrink-0 ${s.iconColor}`} />
        <div className="space-y-2 min-w-0 flex-1 w-full max-w-full">
          {block.title && (
            <p className={`text-sm font-black ${s.titleColor}`}>{block.title}</p>
          )}
          <p className="text-[15px] leading-8 text-ink font-medium">
            <T text={block.text} />
          </p>
          {block.math && <MathLines lines={block.math} />}
        </div>
      </div>
    </div>
  );
});

/* ---------------- table ---------------- */

/** Renders a table cell: properly identifies Persian text vs bare LaTeX */
const CellT = React.memo(function CellT({ text }: { text: string }) {
  if (/[\u0600-\u06FF]/.test(text) || text.includes("$")) {
    return <T text={text} />;
  }
  return <M tex={text} />;
});

export const TableBlock = React.memo(function TableBlock({
  block,
}: {
  block: Extract<Block, { kind: "table" }>;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border-2 border-line bg-card shadow-[4px_4px_0px_var(--line)] dark:shadow-[4px_4px_0px_#000] w-full min-w-0 max-w-full">
      {block.caption && (
        <div className="flex items-center justify-between border-b-2 border-line bg-card2/80 px-4 py-2.5 sm:px-5 text-sm font-black text-ink">
          <T text={block.caption} />
          <span className="text-[10px] font-bold text-faint sm:hidden">اسکرول افقی ←</span>
        </div>
      )}
      <div className="overflow-x-auto w-full max-w-full scrollbar-thin">
        <table className="w-full min-w-[480px] text-sm">
          <thead>
            <tr className="border-b-2 border-line bg-card2/60">
              {block.headers.map((h, i) => (
                <th key={i} className="px-4 py-3 text-center font-black text-ink">
                  <CellT text={h} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, ri) => (
              <tr key={ri} className="border-b border-line/60 last:border-0 hover:bg-card2/30">
                {row.map((cell, ci) => (
                  <td key={ci} className="px-4 py-3 text-center align-middle font-medium">
                    <CellT text={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

/* ---------------- example ---------------- */

const StepItem = React.memo(function StepItem({
  step,
  index,
}: {
  step: SolutionStep;
  index: number;
}) {
  return (
    <div className="relative rounded-xl neo-border-sm bg-card2/60 px-4 py-3.5">
      <div className="mb-2 flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-lg neo-border-sm bg-accent text-accent-ink text-[11px] font-black">
          {fa(index + 1)}
        </span>
        {step.title && (
          <p className="text-sm font-black text-ink">
            <T text={step.title} />
          </p>
        )}
      </div>
      {step.text && (
        <p className="mb-2 text-[14.5px] leading-7 text-soft font-medium">
          <T text={step.text} />
        </p>
      )}
      {step.math && <MathLines lines={step.math} />}
      {step.note && (
        <div className="mt-3 rounded-lg border border-dashed border-accent/60 bg-accent/[0.07] px-3.5 py-2 text-[13px] leading-7 font-bold text-ink">
          <T text={step.note} />
        </div>
      )}
    </div>
  );
});

export const ExampleBlock = React.memo(function ExampleBlock({
  example,
  defaultOpen = false,
}: {
  example: Example;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (detail === `ex-${example.id}` || detail === example.id) {
        setOpen(true);
      }
    };
    window.addEventListener("diffeq:open-example", handler);
    return () => window.removeEventListener("diffeq:open-example", handler);
  }, [example.id]);

  const mathToCopy =
    example.statement.length > 0
      ? example.statement.join("\n")
      : example.statementText ?? "";

  return (
    <div
      id={`ex-${example.id}`}
      className="scroll-mt-header overflow-hidden rounded-2xl border border-line-soft hover:border-line bg-card shadow-2xs transition-all duration-200"
    >
      {/* header */}
      <div className="flex flex-wrap items-center gap-2.5 border-b border-line-soft bg-card2/50 px-4 py-3 sm:px-5 sm:py-3.5">
        <span className="inline-flex items-center gap-1.5 rounded-lg border border-accent/40 bg-accent/15 text-accent px-2.5 py-1 text-xs font-black dark:text-[#45cbb8]">
          <Hash size={11} />
          {example.label}
        </span>
        <h4 className="text-[14.5px] sm:text-[15px] font-black text-ink">
          <T text={example.title} />
        </h4>
        <span className="ms-auto flex items-center gap-2">
          {example.tag === "exam" && (
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/40 bg-amber-400/15 text-amber-800 dark:text-amber-300 px-2.5 py-0.5 text-[11px] font-black">
              <Star size={11} className="fill-amber-500 text-amber-500" />
              امتحانی
            </span>
          )}
          {example.tag === "homework" && (
            <span className="inline-flex items-center gap-1 rounded-full border border-indigo-500/40 bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 px-2.5 py-0.5 text-[11px] font-black">
              <PenLine size={11} />
              تمرین منزل
            </span>
          )}
          {mathToCopy && <CopyButton text={mathToCopy} iconOnly reveal />}
        </span>
      </div>

      <div className="space-y-3.5 px-4 py-3.5 sm:px-5 sm:py-4">
        {/* statement */}
        <div className="rounded-xl border border-line-soft bg-paper/70 px-4 py-3.5">
          {example.statementText && (
            <p className="mb-1 text-[14.5px] sm:text-[15px] font-bold leading-8 text-ink">
              <T text={example.statementText} />
            </p>
          )}
          {example.statement.length > 0 && <MathLines lines={example.statement} />}
        </div>

        {/* toggle */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="no-print flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-accent/40 bg-accent/[0.08] hover:bg-accent/[0.14] px-4 py-2.5 text-xs sm:text-sm font-black text-accent transition-all duration-150 active:scale-[0.99]"
        >
          <ChevronDown
            size={16}
            className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
          {open ? "بستن حل" : "نمایش حل گام‌به‌گام"}
        </button>

        {example.method && !open && (
          <p className="text-center text-xs font-medium text-faint">
            روش: <T text={example.method} />
          </p>
        )}

        {/* solution */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="overflow-hidden"
            >
              <div className="space-y-3 pt-1">
                {example.method && (
                  <p className="rounded-xl border border-line-soft bg-card2 px-3.5 py-1.5 text-center text-xs font-bold text-soft">
                    روش: <T text={example.method} />
                  </p>
                )}
                {example.steps.map((st, i) => (
                  <StepItem key={i} step={st} index={i} />
                ))}
                {/* answer */}
                <div className="rounded-xl neo-border bg-blue-500/10 px-4 py-3.5 neo-shadow-xs">
                  <div className="mb-1 flex items-center justify-center gap-1.5 text-xs font-black text-ink">
                    <CheckCircle2 size={15} strokeWidth={2.8} className="text-accent" />
                    <span>پاسخ نهایی مسئله</span>
                  </div>
                  {example.answer.map((a, i) => (
                    <MB key={i} tex={a} />
                  ))}
                  {example.note && (
                    <p className="pt-1 text-center text-xs font-medium leading-6 text-soft">
                      <T text={example.note} />
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
});

/* ---------------- dispatcher ---------------- */

export const BlockRenderer = React.memo(function BlockRenderer({ block }: { block: Block }) {
  switch (block.kind) {
    case "text":
      return (
        <p className="text-[15.5px] leading-9 text-ink">
          <T text={block.text} />
        </p>
      );
    case "theorem":
      return <TheoremBlock block={block} />;
    case "definition":
      return <DefinitionBlock block={block} />;
    case "formula":
      return <FormulaBlock block={block} />;
    case "note":
      return <NoteBlock block={block} />;
    case "table":
      return <TableBlock block={block} />;
    case "example":
      return <ExampleBlock example={block.example} />;
    default:
      return null;
  }
});

export { M, MB, T, MathLines, fa };
