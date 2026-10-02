import type { Chapter, CheatGroup, Section, Skill } from "../types";
import { ch1Sections } from "./ch1";
import { ch2Sections } from "./ch2";
import { ch3Sections } from "./ch3";
import { ch4Sections } from "./ch4";
import { ch5Sections } from "./ch5";

export const chapters: Chapter[] = [
  {
    id: "ch1",
    num: "۱",
    title: "مبانی احتمال، احتمال شرطی و قضیه بیز",
    short: "مبانی و بیز",
    pages: "۱ تا ۱۰",
    blurb: "فضای نمونه، پیشامدها، احتمال شرطی، استقلال، افراز، قانون احتمال کل، قضیه بیز و متغیرهای تصادفی",
    hue: "blue",
  },
  {
    id: "ch2",
    num: "۲",
    title: "امید ریاضی، واریانس و توزیع‌های گسسته",
    short: "امید ریاضی و گسسته",
    pages: "۱۱ تا ۲۷",
    blurb: "امید ریاضی، واریانس، گشتاورها، MGF، نامساوی چبیشف، برنولی، دوجمله‌ای، هندسی، فوق‌هندسی و پواسون",
    hue: "amber",
  },
  {
    id: "ch3",
    num: "۳",
    title: "توزیع‌های پیوسته: یکنواخت، نمایی و نرمال",
    short: "توزیع‌های پیوسته",
    pages: "۲۸ تا ۳۵",
    blurb: "توزیع یکنواخت، توزیع نمایی و خاصیت فقدان حافظه، توزیع نرمال، جدول Z و تقریب نرمال به دوجمله‌ای",
    hue: "sky",
  },
  {
    id: "ch4",
    num: "۴",
    title: "متغیرهای تصادفی دو بعدی، کوواریانس و همبستگی",
    short: "توزیع‌های دو بعدی",
    pages: "۳۶ تا ۴۴",
    blurb: "توزیع توأم، توابع حاشیه‌ای، چگالی شرطی، استقلال متغیرها، کوواریانس و ضریب همبستگی پیرسون",
    hue: "violet",
  },
  {
    id: "ch5",
    num: "۵",
    title: "نمونه‌گیری، قضیه حد مرکزی و نظریه برآورد",
    short: "نمونه‌گیری و برآورد",
    pages: "۴۵ تا ۵۰",
    blurb: "میانگین و واریانس نمونه، قضیه حد مرکزی (CLT)، توزیع‌های کای-دو و t، نااریبی و فواصل اطمینان",
    hue: "rose",
  },
];

export const sections: Section[] = [
  ...ch1Sections,
  ...ch2Sections,
  ...ch3Sections,
  ...ch4Sections,
  ...ch5Sections,
];

export const chapterById = (id: string) => chapters.find((c) => c.id === id);

export const sectionsByChapter = (chapterId: string) =>
  sections.filter((s) => s.chapterId === chapterId);

export const allExamples = sections.flatMap((s) =>
  s.blocks
    .filter((b): b is Extract<typeof b, { kind: "example" }> => b.kind === "example")
    .map((b) => b.example)
);

export const exampleById = (id: string) =>
  allExamples.find((e) => e.id === id);

/* ------------------------------------------------------------------ */
/*  Cheat sheet formulas                                               */
/* ------------------------------------------------------------------ */

const r = String.raw;

export const cheatGroups: CheatGroup[] = [
  {
    id: "probability",
    title: "احتمال شرطی، استقلال و قضیه بیز",
    short: "مبانی احتمال",
    icon: "FunctionSquare",
    desc: "روابط پایه احتمال و تقلیل فضای نمونه",
    items: [
      {
        title: "فرمول احتمال شرطی",
        math: r`P(B \mid A) = \frac{P(A \cap B)}{P(A)} \quad (P(A) > 0)`,
      },
      {
        title: "شرط استقلال دو پیشامد",
        math: r`P(A \cap B) = P(A) \cdot P(B) \iff P(B \mid A) = P(B)`,
      },
      {
        title: "قانون احتمال کل",
        math: r`P(B) = \sum_{i=1}^n P(A_i) \cdot P(B \mid A_i)`,
        note: "{Aᵢ} یک افراز برای فضای نمونه است.",
        wide: true,
      },
      {
        title: "قضیه بیز (Bayes' Theorem)",
        math: r`P(A_k \mid B) = \frac{P(A_k) \cdot P(B \mid A_k)}{\sum_{i=1}^n P(A_i) \cdot P(B \mid A_i)}`,
        wide: true,
      },
    ],
  },
  {
    id: "moments",
    title: "امید ریاضی، واریانس و نامساوی‌ها",
    short: "امید و واریانس",
    icon: "Sigma",
    desc: "گشتاورها، پراکندگی و کران‌های احتمال",
    items: [
      {
        title: "امید ریاضی و خاصیت خطی",
        math: r`E[aX + b] = a E[X] + b \qquad E[X] = \sum x f(x) \text{ یا } \int x f(x) dx`,
        wide: true,
      },
      {
        title: "فرمول محاسباتی واریانس",
        math: r`Var(X) = E[X^2] - (E[X])^2 \qquad Var(aX + b) = a^2 Var(X)`,
      },
      {
        title: "تابع مولد گشتاور (MGF)",
        math: r`M_X(t) = E[e^{tX}] \implies E[X^k] = M_X^{(k)}(0)`,
      },
      {
        title: "نامساوی چبیشف",
        math: r`P(|X - \mu| \ge k\sigma) \le \frac{1}{k^2} \iff P(|X - \mu| < k\sigma) \ge 1 - \frac{1}{k^2}`,
        wide: true,
      },
    ],
  },
  {
    id: "discrete-dist",
    title: "توزیع‌های گسسته مهم",
    short: "توزیع‌های گسسته",
    icon: "Grid3x3",
    desc: "برنولی، دوجمله‌ای، هندسی و پواسون",
    items: [
      {
        title: "دوجمله‌ای B(n, p)",
        math: r`f(x) = \binom{n}{x} p^x (1-p)^{n-x}, \quad E[X] = np, \quad Var(X) = np(1-p)`,
        wide: true,
      },
      {
        title: "هندسی G(p)",
        math: r`f(x) = (1-p)^{x-1} p, \quad E[X] = \frac{1}{p}, \quad Var(X) = \frac{1-p}{p^2}`,
      },
      {
        title: "پواسون Poisson(λ)",
        math: r`f(x) = \frac{e^{-\lambda} \lambda^x}{x!}, \quad E[X] = \lambda, \quad Var(X) = \lambda`,
      },
      {
        title: "فوق‌هندسی HG(M, N, k)",
        math: r`f(x) = \frac{\binom{N}{x}\binom{M-N}{k-x}}{\binom{M}{k}}, \quad E[X] = k\frac{N}{M}`,
        wide: true,
      },
    ],
  },
  {
    id: "continuous-dist",
    title: "توزیع‌های پیوسته مهم",
    short: "توزیع‌های پیوسته",
    icon: "Repeat",
    desc: "یکنواخت، نمایی و نرمال",
    items: [
      {
        title: "یکنواخت پیوسته U(a, b)",
        math: r`f(x) = \frac{1}{b - a}, \quad E[X] = \frac{a+b}{2}, \quad Var(X) = \frac{(b-a)^2}{12}`,
      },
      {
        title: "نمایی Exp(λ)",
        math: r`f(x) = \lambda e^{-\lambda x}, \quad E[X] = \frac{1}{\lambda}, \quad Var(X) = \frac{1}{\lambda^2}`,
      },
      {
        title: "خاصیت فقدان حافظه نمایی",
        math: r`P(X > a + b \mid X > a) = P(X > b)`,
      },
      {
        title: "نرمال استاندارد Z",
        math: r`Z = \frac{X - \mu}{\sigma} \sim N(0, 1), \quad \Phi(-z) = 1 - \Phi(z)`,
        wide: true,
      },
    ],
  },
  {
    id: "joint-dist",
    title: "توزیع‌های دو بعدی و همبستگی",
    short: "توزیع‌های توأم",
    icon: "Network",
    desc: "توزیع توأم، حاشیه‌ای، کوواریانس و ضریب همبستگی",
    items: [
      {
        title: "توزیع حاشیه‌ای f_X و f_Y",
        math: r`f_X(x) = \sum_y f(x, y) \text{ یا } \int f(x, y) dy \qquad f_Y(y) = \sum_x f(x, y) \text{ یا } \int f(x, y) dx`,
        wide: true,
      },
      {
        title: "کوواریانس Cov(X, Y)",
        math: r`Cov(X, Y) = E[XY] - E[X]E[Y] \qquad X, Y \text{ مستقل } \implies Cov = 0`,
      },
      {
        title: "واریانس مجموع دو متغیر",
        math: r`Var(X \pm Y) = Var(X) + Var(Y) \pm 2Cov(X, Y)`,
      },
      {
        title: "ضریب همبستگی پیرسون ρ",
        math: r`\rho = \frac{Cov(X, Y)}{\sigma_X \sigma_Y}, \quad -1 \le \rho \le 1`,
      },
    ],
  },
  {
    id: "sampling-estimation",
    title: "نمونه‌گیری، CLT و بازه اطمینان",
    short: "نمونه‌گیری و برآورد",
    icon: "Table2",
    desc: "قضیه حد مرکزی، واریانس نمونه و فواصل اطمینان",
    items: [
      {
        title: "قضیه حد مرکزی (CLT)",
        math: r`\bar{X} \xrightarrow{n \ge 30} N\left(\mu, \frac{\sigma^2}{n}\right) \implies Z = \frac{\bar{X} - \mu}{\sigma / \sqrt{n}} \sim N(0, 1)`,
        wide: true,
      },
      {
        title: "توزیع کای-دو برای واریانس نمونه",
        math: r`\frac{(n-1)S^2}{\sigma^2} \sim \chi^2(n-1), \quad E[S^2] = \sigma^2 \quad (\text{نااریب})`,
      },
      {
        title: "فاصله اطمینان میانگین (σ معلوم)",
        math: r`\mu \in \left[ \bar{X} - z_{1-\alpha/2}\frac{\sigma}{\sqrt{n}} \,,\, \bar{X} + z_{1-\alpha/2}\frac{\sigma}{\sqrt{n}} \right]`,
        wide: true,
      },
      {
        title: "فاصله اطمینان میانگین (σ نامعلوم با توزیع t)",
        math: r`\mu \in \left[ \bar{X} - t_{1-\alpha/2}(n-1)\frac{S}{\sqrt{n}} \,,\, \bar{X} + t_{1-\alpha/2}(n-1)\frac{S}{\sqrt{n}} \right]`,
        wide: true,
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Exam prep skills                                                   */
/* ------------------------------------------------------------------ */

export const skills: Skill[] = [
  { id: "sk-1", text: "تشخیص فضای نمونه، محاسبه احتمال شرطی و اعمال قانون احتمال کل" },
  { id: "sk-2", text: "حل مسائل قضیه بیز و تفکیک پیشامدهای مستقل از ناسازگار" },
  { id: "sk-3", text: "محاسبه امید ریاضی، واریانس و مشتق‌گیری از تابع مولد گشتاور (MGF)" },
  { id: "sk-4", text: "مسلط بودن بر فرمول‌ها و کاربردهای دوجمله‌ای، هندسی و پواسون" },
  { id: "sk-5", text: "تقریب دوجمله‌ای به پواسون و دوجمله‌ای به نرمال با تصحیح پیوستگی" },
  { id: "sk-6", text: "استفاده از خاصیت فقدان حافظه در توزیع‌های نمایی و هندسی" },
  { id: "sk-7", text: "استانداردسازی متغیر نرمال و خواندن مقادیر جدول Z" },
  { id: "sk-8", text: "تشکیل جداول توزیع توأم، استخراج توابع حاشیه‌ای و شرطی" },
  { id: "sk-9", text: "محاسبه کوواریانس، ضریب همبستگی پیرسون و بررسی استقلال" },
  { id: "sk-10", text: "استفاده از قضیه حد مرکزی و تشکیل فواصل اطمینان میانگین با آماره‌های Z و t" },
];

export const examExampleIds = ["ex-1-1", "ex-1-2", "ex-3-1", "ex-5-1"];
export const homeworkExampleIds = ["ex-2-1", "ex-4-1"];
