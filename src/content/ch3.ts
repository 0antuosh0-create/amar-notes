import type { Block, Section } from "../types";

const r = String.raw;

export const ch3Sections: Section[] = [
  {
    id: "sec-3-1",
    chapterId: "ch3",
    num: "۳.۱",
    title: "توزیع‌های یکنواخت و نمایی و خاصیت فقدان حافظه",
    pages: "۲۸ تا ۳۰",
    session: "جلسه هشتم",
    summary: "توزیع یکنواخت پیوسته U(a,b)، توزیع نمایی Exp(λ)، ارتباط با پواسون و خاصیت فقدان حافظه (Memoryless)",
    blocks: [
      {
        kind: "definition",
        label: "تعریف ۳.۱",
        title: "توزیع یکنواخت پیوسته (Continuous Uniform)",
        body: "هرگاه چگالی احتمال در تمام طول بازه (a, b) مقداری ثابت باشد:",
        math: [
          r`f(x) = \frac{1}{b - a}, \quad a < x < b`,
          r`E[X] = \frac{a + b}{2}, \qquad Var(X) = \frac{(b - a)^2}{12}`,
        ],
      },
      {
        kind: "definition",
        label: "تعریف ۳.۲",
        title: "توزیع نمایی (Exponential Distribution)",
        body: "مدت زمان انتظار تا وقوع اولین رویداد در فرآیند پواسون با نرخ وقوع λ:",
        math: [
          r`f(x) = \lambda e^{-\lambda x}, \quad x > 0`,
          r`F(x) = 1 - e^{-\lambda x}, \quad x > 0`,
          r`E[X] = \frac{1}{\lambda}, \qquad Var(X) = \frac{1}{\lambda^2}`,
        ],
      },
      {
        kind: "theorem",
        label: "قضیه ۳.۱",
        title: "خاصیت فقدان حافظه (Memoryless Property)",
        body: "تنها توزیع پیوسته که در آن زمان سپری‌شده هیچ تاثیری در توزیع احتمال باقیمانده عمر سیستم ندارد، توزیع نمایی است:",
        math: [r`P(X > a + b \mid X > a) = P(X > b)`],
      },
      {
        kind: "note",
        variant: "tip",
        title: "اثبات جبری فقدان حافظه",
        text: "از رابطه احتمال شرطی داریم:",
        math: [
          r`P(X > a + b \mid X > a) = \frac{P(X > a + b)}{P(X > a)} = \frac{e^{-\lambda(a + b)}}{e^{-\lambda a}} = \frac{e^{-\lambda a} e^{-\lambda b}}{e^{-\lambda a}} = e^{-\lambda b} = P(X > b)`,
        ],
      },
    ],
  },
  {
    id: "sec-3-2",
    chapterId: "ch3",
    num: "۳.۲",
    title: "توزیع نرمال و نرمال استاندارد",
    pages: "۳۱ تا ۳۵",
    session: "جلسه نهم",
    summary: "توزیع نرمال N(μ, σ²)، متغیر نرمال استاندارد Z، کار با جدول Z و تقریب نرمال به دوجمله‌ای با تصحیح پیوستگی",
    blocks: [
      {
        kind: "definition",
        label: "تعریف ۳.۳",
        title: "توزیع نرمال (Normal / Gaussian)",
        body: "مهم‌ترین توزیع پیوسته با منحنی زنگوله‌ای متقارن نسبت به میانگین μ:",
        math: [
          r`f(x) = \frac{1}{\sqrt{2\pi}\sigma} e^{-\frac{1}{2}\left(\frac{x - \mu}{\sigma}\right)^2}, \quad -\infty < x < +\infty`,
          r`E[X] = \mu, \qquad Var(X) = \sigma^2`,
        ],
      },
      {
        kind: "theorem",
        label: "قضیه ۳.۲",
        title: "استانداردسازی و جدول نرمال استاندارد Z",
        body: "هر متغیر نرمال با کسر میانگین و تقسیم بر انحراف معیار به متغیر نرمال استاندارد با میانگین ۰ و واریانس ۱ تبدیل می‌شود:",
        math: [
          r`Z = \frac{X - \mu}{\sigma} \sim N(0, 1)`,
          r`P(a \le X \le b) = \Phi\left(\frac{b - \mu}{\sigma}\right) - \Phi\left(\frac{a - \mu}{\sigma}\right)`,
          r`\Phi(-z) = 1 - \Phi(z), \qquad P(|Z| \le c) = 2\Phi(c) - 1`,
        ],
      },
      {
        kind: "theorem",
        label: "قضیه ۳.۳",
        title: "تقریب نرمال به دوجمله‌ای و تصحیح پیوستگی",
        body: "اگر np ≥ 5 و n(1-p) ≥ 5 باشد، می‌توان متغیر گسسته دوجمله‌ای را با متغیر پیوسته نرمال تقریب زد:",
        math: [
          r`X \sim B(n, p) \approx N(\mu = np, \sigma^2 = npq)`,
          r`P(a \le X \le b) \approx P\left( \frac{a - 0.5 - np}{\sqrt{npq}} \le Z \le \frac{b + 0.5 - np}{\sqrt{npq}} \right)`,
        ],
      },
      {
        kind: "example",
        example: {
          id: "ex-3-1",
          label: "مثال ۳.۱",
          title: "محاسبه احتمال بازه برای متغیر نرمال",
          statementText: "نمرات یک درس دارای توزیع نرمال با میانگین ۱۴ و انحراف معیار ۲ است. احتمال اینکه نمره یک دانشجو بین ۱۲ تا ۱۷ باشد چقدر است؟",
          statement: [r`X \sim N(\mu = 14, \sigma = 2)`],
          steps: [
            {
              title: "گام ۱: استانداردسازی حدود بازه",
              text: "نقاط ۱۲ و ۱۷ را تبدیل به نمرات استاندارد Z می‌کنیم:",
              math: [
                r`z_1 = \frac{12 - 14}{2} = -1.0, \qquad z_2 = \frac{17 - 14}{2} = 1.5`,
              ],
            },
            {
              title: "گام ۲: استفاده از تابع توزیع تجمعی Φ",
              text: "احتمال بازه تفاضل مقادیر تجمعی است:",
              math: [
                r`P(12 \le X \le 17) = P(-1 \le Z \le 1.5) = \Phi(1.5) - \Phi(-1)`,
                r`\Phi(-1) = 1 - \Phi(1)`,
                r`P(12 \le X \le 17) = \Phi(1.5) - (1 - \Phi(1))`,
              ],
            },
            {
              title: "گام ۳: استخراج مقادیر از جدول Z",
              text: "از جدول نرمال استاندارد: Φ(1.5) = 0.9332 و Φ(1) = 0.8413:",
              math: [r`P(12 \le X \le 17) = 0.9332 - (1 - 0.8413) = 0.9332 - 0.1587 = 0.7745`],
            },
          ],
          answer: [r`P(12 \le X \le 17) = 0.7745 \approx 77.45\%`],
        },
      },
    ],
  },
];
