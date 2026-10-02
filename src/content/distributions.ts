export interface StatDistributionItem {
  id: string;
  name: string;
  type: "گسسته" | "پیوسته";
  notation: string;
  pmf_pdf: string;
  domain: string;
  mean: string;
  variance: string;
  mgf?: string;
  notes: string;
}

export interface StatCategory {
  id: string;
  title: string;
  desc: string;
  count: number;
}

export const statCategories: StatCategory[] = [
  { id: "all", title: "همه توزیع‌ها", desc: "فهرست جامع توزیع‌های گسسته و پیوسته مهندسی", count: 8 },
  { id: "discrete", title: "توزیع‌های گسسته", desc: "برنولی، دوجمله‌ای، هندسی، پواسون، فوق‌هندسی", count: 5 },
  { id: "continuous", title: "توزیع‌های پیوسته", desc: "یکنواخت، نمایی، نرمال، کای-دو، تی‌استیودنت", count: 3 },
];

export const statDistributions: StatDistributionItem[] = [
  {
    id: "dist-bernoulli",
    name: "توزیع برنولی (Bernoulli)",
    type: "گسسته",
    notation: String.raw`X \sim \text{Bernoulli}(p)`,
    pmf_pdf: String.raw`f(x) = p^x (1-p)^{1-x}`,
    domain: String.raw`x \in \{0, 1\}`,
    mean: String.raw`E[X] = p`,
    variance: String.raw`Var(X) = p(1-p)`,
    mgf: String.raw`M_X(t) = (1-p) + p e^t`,
    notes: "مدل‌سازی تک‌آزمایش تصادفی با دو نتیجه پیروزی یا شکست.",
  },
  {
    id: "dist-binomial",
    name: "توزیع دوجمله‌ای (Binomial)",
    type: "گسسته",
    notation: String.raw`X \sim B(n, p)`,
    pmf_pdf: String.raw`f(x) = \binom{n}{x} p^x (1-p)^{n-x}`,
    domain: String.raw`x \in \{0, 1, 2, \dots, n\}`,
    mean: String.raw`E[X] = np`,
    variance: String.raw`Var(X) = np(1-p)`,
    mgf: String.raw`M_X(t) = (1-p + p e^t)^n`,
    notes: "تعداد دفعات موفقیت در n آزمایش مستقل برنولی.",
  },
  {
    id: "dist-geometric",
    name: "توزیع هندسی (Geometric)",
    type: "گسسته",
    notation: String.raw`X \sim G(p)`,
    pmf_pdf: String.raw`f(x) = (1-p)^{x-1} p`,
    domain: String.raw`x \in \{1, 2, 3, \dots\}`,
    mean: String.raw`E[X] = \frac{1}{p}`,
    variance: String.raw`Var(X) = \frac{1-p}{p^2}`,
    mgf: String.raw`M_X(t) = \frac{p e^t}{1 - (1-p)e^t}`,
    notes: "تعداد آزمایش‌ها تا دستیابی به اولین موفقیت. دارای خاصیت فقدان حافظه.",
  },
  {
    id: "dist-poisson",
    name: "توزیع پواسون (Poisson)",
    type: "گسسته",
    notation: String.raw`X \sim \text{Poisson}(\lambda)`,
    pmf_pdf: String.raw`f(x) = \frac{e^{-\lambda} \lambda^x}{x!}`,
    domain: String.raw`x \in \{0, 1, 2, \dots\}`,
    mean: String.raw`E[X] = \lambda`,
    variance: String.raw`Var(X) = \lambda`,
    mgf: String.raw`M_X(t) = e^{\lambda(e^t - 1)}`,
    notes: "تعداد رویدادها در واحد زمان یا مکان. در این توزیع میانگین و واریانس برابرند.",
  },
  {
    id: "dist-hypergeometric",
    name: "توزیع فوق‌هندسی (Hypergeometric)",
    type: "گسسته",
    notation: String.raw`X \sim HG(M, N, k)`,
    pmf_pdf: String.raw`f(x) = \frac{\binom{N}{x}\binom{M-N}{k-x}}{\binom{M}{k}}`,
    domain: String.raw`\max(0, k-(M-N)) \le x \le \min(k, N)`,
    mean: String.raw`E[X] = k \frac{N}{M}`,
    variance: String.raw`Var(X) = k \frac{N}{M}\left(1-\frac{N}{M}\right)\left(\frac{M-k}{M-1}\right)`,
    notes: "نمونه‌گیری تصادفی بدون جایگذاری از جامعه متناهی.",
  },
  {
    id: "dist-uniform",
    name: "توزیع یکنواخت پیوسته (Uniform)",
    type: "پیوسته",
    notation: String.raw`X \sim U(a, b)`,
    pmf_pdf: String.raw`f(x) = \frac{1}{b - a}, \quad a < x < b`,
    domain: String.raw`x \in (a, b)`,
    mean: String.raw`E[X] = \frac{a + b}{2}`,
    variance: String.raw`Var(X) = \frac{(b - a)^2}{12}`,
    mgf: String.raw`M_X(t) = \frac{e^{bt} - e^{at}}{t(b - a)}`,
    notes: "شانس یکسان برای تمام مقادیر در بازه.",
  },
  {
    id: "dist-exponential",
    name: "توزیع نمایی (Exponential)",
    type: "پیوسته",
    notation: String.raw`X \sim \text{Exp}(\lambda)`,
    pmf_pdf: String.raw`f(x) = \lambda e^{-\lambda x}, \quad x > 0`,
    domain: String.raw`x \in (0, \infty)`,
    mean: String.raw`E[X] = \frac{1}{\lambda}`,
    variance: String.raw`Var(X) = \frac{1}{\lambda^2}`,
    mgf: String.raw`M_X(t) = \frac{\lambda}{\lambda - t} \quad (t < \lambda)`,
    notes: "زمان انتظار تا وقوع اولین رخداد پواسون. تنها توزیع پیوسته با خاصیت فقدان حافظه.",
  },
  {
    id: "dist-normal",
    name: "توزیع نرمال (Normal / Gaussian)",
    type: "پیوسته",
    notation: String.raw`X \sim N(\mu, \sigma^2)`,
    pmf_pdf: String.raw`f(x) = \frac{1}{\sqrt{2\pi}\sigma} e^{-\frac{1}{2}\left(\frac{x-\mu}{\sigma}\right)^2}`,
    domain: String.raw`x \in (-\infty, +\infty)`,
    mean: String.raw`E[X] = \mu`,
    variance: String.raw`Var(X) = \sigma^2`,
    mgf: String.raw`M_X(t) = e^{\mu t + \frac{1}{2}\sigma^2 t^2}`,
    notes: "توزیع زنگوله‌ای متقارن پایه قضیه حد مرکزی در علوم مهندسی.",
  },
];
