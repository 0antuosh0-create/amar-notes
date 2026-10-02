import type { Block, Section } from "../types";

const r = String.raw;

export const ch2Sections: Section[] = [
  {
    id: "sec-2-1",
    chapterId: "ch2",
    num: "۲.۱",
    title: "امید ریاضی، واریانس و گشتاورها",
    pages: "۱۱ تا ۱۷",
    session: "جلسه چهارم و پنجم",
    summary: "تعریف میانگین و امید ریاضی، واریانس، انحراف معیار، نامساوی‌های مارکوف و چبیشف، تابع مولد گشتاور (MGF)",
    blocks: [
      {
        kind: "definition",
        label: "تعریف ۲.۱",
        title: "امید ریاضی (Expected Value / Mean)",
        body: "امید ریاضی یا میانگین توزیع، مرکز جرم مقادیر ممکن متغیر تصادفی را نشان می‌دهد:",
        math: [
          r`E[X] = \mu = \begin{cases} \sum_x x f(x) & \text{گسسته} \\[6pt] \int_{-\infty}^{+\infty} x f(x) \, dx & \text{پیوسته} \end{cases}`,
        ],
      },
      {
        kind: "theorem",
        label: "قضیه ۲.۱",
        title: "ویژگی‌های امید ریاضی (خاصیت خطی)",
        body: "برای هر دو عدد ثابت a و b و توابع g₁(X) و g₂(X):",
        math: [
          r`E[aX + b] = a E[X] + b`,
          r`E[g_1(X) + g_2(X)] = E[g_1(X)] + E[g_2(X)]`,
        ],
      },
      {
        kind: "definition",
        label: "تعریف ۲.۲",
        title: "واریانس و انحراف معیار (Variance & Standard Deviation)",
        body: "واریانس شاخص استاندارد پراکندگی داده‌ها پیرامون میانگین است:",
        math: [
          r`Var(X) = \sigma^2 = E[(X - \mu)^2] = E[X^2] - (E[X])^2`,
          r`SD(X) = \sigma = \sqrt{Var(X)}`,
          r`Var(aX + b) = a^2 Var(X), \qquad SD(aX + b) = |a| SD(X)`,
        ],
      },
      {
        kind: "theorem",
        label: "قضیه ۲.۲",
        title: "نامساوی مارکوف و چبیشف (Bounds on Tail Probabilities)",
        body: "این نامساوی‌ها بدون اطلاع از نوع دقیق تابع توزیع، کران‌های احتمالی ارائه می‌دهند:",
        math: [
          r`\text{مارکوف } (X \ge 0, a > 0): \quad P(X \ge a) \le \frac{E[X]}{a}`,
          r`\text{چبیشف } (k > 0): \quad P(|X - \mu| \ge k\sigma) \le \frac{1}{k^2} \iff P(|X - \mu| < k\sigma) \ge 1 - \frac{1}{k^2}`,
        ],
      },
      {
        kind: "definition",
        label: "تعریف ۲.۳",
        title: "تابع مولد گشتاور (Moment Generating Function - MGF)",
        body: "تابعی که با مشتق‌گیری متوالی از آن حول مبدأ، تمامی گشتاورهای متغیر تصادفی حاصل می‌شوند:",
        math: [
          r`M_X(t) = E[e^{tX}]`,
          r`E[X^k] = M_X^{(k)}(0) = \left. \frac{d^k M_X(t)}{dt^k} \right|_{t=0}`,
          r`E[X] = M_X'(0), \qquad E[X^2] = M_X''(0) \implies Var(X) = M_X''(0) - [M_X'(0)]^2`,
        ],
      },
      {
        kind: "example",
        example: {
          id: "ex-2-1",
          label: "مثال ۲.۱",
          title: "استخراج توزیع احتمال از تابع مولد گشتاور",
          statementText: "تابع مولد گشتاور یک متغیر تصادفی گسسته به صورت زیر است. الف) توزیع احتمال را بیابید. ب) میانگین و واریانس را محاسبه کنید.",
          statement: [r`M_X(t) = \frac{1}{3}e^t + \frac{4}{15}e^{3t} + \frac{2}{15}e^{4t} + \frac{4}{15}e^{5t}`],
          steps: [
            {
              title: "گام ۱: تطبیق با فرمول تعریف MGF برای متغیر گسسته",
              text: "طبق تعریف M_X(t) = ∑ e^{tx} f(x)، توان‌های t مقادیر x و ضرایب مقادیر f(x) هستند:",
              math: [
                r`P(X=1) = \frac{1}{3} = \frac{5}{15}, \quad P(X=3) = \frac{4}{15}, \quad P(X=4) = \frac{2}{15}, \quad P(X=5) = \frac{4}{15}`,
              ],
            },
            {
              title: "گام ۲: محاسبه میانگین از طریق مشتق یا تعریف",
              text: "مشتق اول در t = 0:",
              math: [
                r`E[X] = M_X'(0) = \frac{1}{3}(1) + \frac{4}{15}(3) + \frac{2}{15}(4) + \frac{4}{15}(5) = \frac{5 + 12 + 8 + 20}{15} = \frac{45}{15} = 3`,
              ],
            },
            {
              title: "گام ۳: محاسبه گشتاور دوم و واریانس",
              text: "مشتق دوم در t = 0:",
              math: [
                r`E[X^2] = M_X''(0) = \frac{1}{3}(1^2) + \frac{4}{15}(3^2) + \frac{2}{15}(4^2) + \frac{4}{15}(5^2) = \frac{5 + 36 + 32 + 100}{15} = \frac{173}{15}`,
                r`Var(X) = \frac{173}{15} - 3^2 = \frac{173 - 135}{15} = \frac{38}{15} \approx 2.53`,
              ],
            },
          ],
          answer: [r`E[X] = 3, \quad Var(X) = \frac{38}{15}`],
        },
      },
    ],
  },
  {
    id: "sec-2-2",
    chapterId: "ch2",
    num: "۲.۲",
    title: "توزیع‌های گسسته: برنولی، دوجمله‌ای و هندسی",
    pages: "۱۸ تا ۲۲",
    session: "جلسه پنجم و ششم",
    summary: "آزمایش برنولی، توزیع دوجمله‌ای B(n,p)، توزیع هندسی G(p) و دوجمله‌ای منفی",
    blocks: [
      {
        kind: "definition",
        label: "تعریف ۲.۴",
        title: "توزیع برنولی و دوجمله‌ای (Bernoulli & Binomial)",
        body: "توزیع دوجمله‌ای بیانگر تعداد موفقیت‌ها (X) در n آزمایش مستقل برنولی با احتمال موفقیت p است:",
        math: [
          r`X \sim B(n, p) \implies f(x) = \binom{n}{x} p^x (1-p)^{n-x}, \quad x = 0, 1, 2, \dots, n`,
          r`E[X] = np, \qquad Var(X) = np(1-p) = npq`,
        ],
      },
      {
        kind: "definition",
        label: "تعریف ۲.۵",
        title: "توزیع هندسی (Geometric Distribution)",
        body: "تعداد آزمایش‌های برنولی تا رسیدن به نخستین موفقیت دارای توزیع هندسی است:",
        math: [
          r`X \sim G(p) \implies f(x) = (1-p)^{x-1} p, \quad x = 1, 2, 3, \dots`,
          r`F(x) = P(X \le x) = 1 - (1-p)^x`,
          r`E[X] = \frac{1}{p}, \qquad Var(X) = \frac{1-p}{p^2}`,
        ],
      },
      {
        kind: "definition",
        label: "تعریف ۲.۶",
        title: "توزیع دوجمله‌ای منفی (Negative Binomial)",
        body: "تعداد کل آزمایش‌های برنولی تا مشاهده k-اُمین پیروزی دارای توزیع دوجمله‌ای منفی است:",
        math: [
          r`f(x) = \binom{x-1}{k-1} p^k (1-p)^{x-k}, \quad x = k, k+1, k+2, \dots`,
          r`E[X] = \frac{k}{p}, \qquad Var(X) = \frac{k(1-p)}{p^2}`,
        ],
      },
    ],
  },
  {
    id: "sec-2-3",
    chapterId: "ch2",
    num: "۲.۳",
    title: "توزیع‌های گسسته: فوق‌هندسی، پواسون و تقریب‌ها",
    pages: "۲۳ تا ۲۷",
    session: "جلسه ششم و هفتم",
    summary: "نمونه‌گیری بدون جایگذاری و توزیع فوق‌هندسی، فرآیند پواسون و تقریب دوجمله‌ای به پواسون",
    blocks: [
      {
        kind: "definition",
        label: "تعریف ۲.۷",
        title: "توزیع فوق‌هندسی (Hypergeometric Distribution)",
        body: "انتخاب تصادفی k عضو بدون جایگذاری از جامعه‌ای به حجم M که N عضو آن دارای ویژگی موفقیت هستند:",
        math: [
          r`f(x) = \frac{\binom{N}{x} \binom{M-N}{k-x}}{\binom{M}{k}}`,
          r`E[X] = k \frac{N}{M}, \qquad Var(X) = k \frac{N}{M} \left(1 - \frac{N}{M}\right)\left(\frac{M-k}{M-1}\right)`,
        ],
      },
      {
        kind: "definition",
        label: "تعریف ۲.۸",
        title: "توزیع پواسون (Poisson Distribution)",
        body: "تعداد رخدادهای یک پدیده در بازه زمانی یا مکانی مشخص با نرخ میانگین وقوع λ > 0:",
        math: [
          r`f(x) = \frac{e^{-\lambda} \lambda^x}{x!}, \quad x = 0, 1, 2, \dots`,
          r`E[X] = \lambda, \qquad Var(X) = \lambda`,
        ],
      },
      {
        kind: "theorem",
        label: "قضیه ۲.۳",
        title: "قضیه حد پواسون (تقریب دوجمله‌ای به پواسون)",
        body: "اگر n بسیار بزرگ و p بسیار کوچک باشد به‌گونه‌ای که حاصلضرب np = λ ثابت بماند:",
        math: [r`\lim_{n \to \infty, p \to 0, np = \lambda} \binom{n}{x} p^x (1-p)^{n-x} = \frac{e^{-\lambda} \lambda^x}{x!}`],
      },
    ],
  },
];
