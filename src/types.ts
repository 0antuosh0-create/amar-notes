export type ExampleTag = "exam" | "homework";

export interface SolutionStep {
  title?: string;
  text?: string;
  math?: string[];
  note?: string;
}

export interface Example {
  id: string;
  label: string;
  title: string;
  statementText?: string;
  statement: string[];
  method?: string;
  steps: SolutionStep[];
  answer: string[];
  tag?: ExampleTag;
  note?: string;
}

export interface Chapter {
  id: string;
  num: string;
  title: string;
  short: string;
  pages: string;
  blurb: string;
  hue: string; // tailwind-ish color token used via classes in components
}

export type Block =
  | { kind: "text"; text: string }
  | { kind: "theorem"; label: string; title?: string; body?: string; math?: string[] }
  | { kind: "definition"; label: string; title: string; body?: string; math?: string[] }
  | { kind: "formula"; label?: string; math: string; note?: string; star?: boolean }
  | { kind: "note"; variant: "tip" | "warn" | "info"; title?: string; text: string; math?: string[] }
  | { kind: "table"; caption?: string; headers: string[]; rows: string[][] }
  | { kind: "example"; example: Example };

export interface Section {
  id: string;
  chapterId: string;
  num: string;
  title: string;
  pages?: string;
  session?: string;
  summary?: string;
  blocks: Block[];
}

export interface CheatItem {
  title: string;
  math: string;
  note?: string;
  /** Spans the full sheet width — for long / multi-part formulas */
  wide?: boolean;
}

export interface CheatGroup {
  id: string;
  title: string;
  /** Compact label for the jump navigation */
  short: string;
  icon: string;
  /** One-line context shown under the group heading */
  desc?: string;
  items: CheatItem[];
}

export interface Skill {
  id: string;
  text: string;
}
