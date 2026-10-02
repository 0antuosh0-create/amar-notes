import type { Block, Section } from "../types";

const r = String.raw;

export const ch4Sections: Section[] = [
  {
    id: "sec-4-1",
    chapterId: "ch4",
    num: "۴.۱",
    title: "متغیرهای تصادفی دو بعدی، توزیع‌های توأم و حاشیه‌ای",
    pages: "۳۶ تا ۴۰",
    session: "جلسه دهم و یازدهم",
    summary: "تابع توزیع احتمال توأم گسسته و پیوسته f(x,y)، توابع توزیع حاشیه‌ای f_X(x) و f_Y(y)، و توزیع تجمعی دو متغیره F(x,y)",
    blocks: [
      {
        kind: "definition",
        label: "تعریف ۴.۱",
        title: "توزیع توأم گسسته و پیوسته (Joint PMF & PDF)",
        body: "احتمال وقوع همزمان دو متغیر تصادفی X و Y با تابع چگالی یا جرم احتمال توأم مشخص می‌شود:",
        math: [
          r`\text{حالت گسسته:} \quad f_{X,Y}(x, y) = P(X = x, Y = y), \quad \sum_x \sum_y f(x, y) = 1`,
          r`\text{حالت پیوسته:} \quad P((X, Y) \in R) = \iint_R f_{X,Y}(x, y) \, dx \, dy, \quad \int_{-\infty}^{+\infty} \int_{-\infty}^{+\infty} f(x, y) \, dx \, dy = 1`,
        ],
      },
      {
        kind: "definition",
        label: "تعریف ۴.۲",
        title: "توابع توزیع حاشیه‌ای (Marginal Distributions)",
        body: "برای به دست آوردن توزیع احتمال تک‌متغیره هر متغیر، روی تمام مقادیر متغیر دیگر جمع یا انتگرال می‌گیریم:",
        math: [
          r`f_X(x) = \begin{cases} \sum_y f_{X,Y}(x, y) & \text{گسسته} \\[6pt] \int_{-\infty}^{+\infty} f_{X,Y}(x, y) \, dy & \text{پیوسته} \end{cases}`,
          r`f_Y(y) = \begin{cases} \sum_x f_{X,Y}(x, y) & \text{گسسته} \\[6pt] \int_{-\infty}^{+\infty} f_{X,Y}(x, y) \, dx & \text{پیوسته} \end{cases}`,
        ],
      },
      {
        kind: "definition",
        label: "تعریف ۴.۳",
        title: "تابع توزیع تجمعی توأم (Joint CDF)",
        body: "احتمال تجمعی اینکه X ≤ x و همزمان Y ≤ y باشد:",
        math: [
          r`F_{X,Y}(x, y) = P(X \le x, Y \le y) = \int_{-\infty}^y \int_{-\infty}^x f(t_1, t_2) \, dt_1 \, dt_2`,
          r`f_{X,Y}(x, y) = \frac{\partial^2 F(x, y)}{\partial x \partial y}`,
        ],
      },
      {
        kind: "example",
        example: {
          id: "ex-4-1",
          label: "مثال ۴.۱",
          title: "جدول توأم گسسته و توابع حاشیه‌ای",
          statementText: "جدول توزیع توأم دو متغیر تصادفی X و Y به صورت زیر است. توابع حاشیه‌ای f_X و f_Y را حساب کنید.",
          statement: [
            r`\begin{array}{c|ccc|c} Y \backslash X & 2 & 3 & 4 & f_Y(y) \\ \hline -1 & 0 & 1/6 & 0 & 1/6 \\ 0 & 1/6 & 0 & 1/3 & 3/6 \\ 1 & 0 & 1/6 & 0 & 1/6 \\ \hline f_X(x) & 1/6 & 2/6 & 2/6 & 1 \end{array}`,
          ],
          steps: [
            {
              title: "گام ۱: محاسبه توزیع حاشیه‌ای f_X(x) با جمع روی ستون‌ها",
              text: "برای هر مقدار ممکن X، ستون مربوطه را جمع می‌زنیم:",
              math: [
                r`f_X(2) = 0 + 1/6 + 0 = 1/6`,
                r`f_X(3) = 1/6 + 0 + 1/6 = 2/6 = 1/3`,
                r`f_X(4) = 0 + 1/3 + 0 = 2/6 = 1/3`,
              ],
            },
            {
              title: "گام ۲: محاسبه توزیع حاشیه‌ای f_Y(y) با جمع روی سطرها",
              text: "برای هر مقدار ممکن Y، سطر مربوطه را جمع می‌زنیم:",
              math: [
                r`f_Y(-1) = 0 + 1/6 + 0 = 1/6`,
                r`f_Y(0) = 1/6 + 0 + 1/3 = 1/2`,
                r`f_Y(1) = 0 + 1/6 + 0 = 1/6`,
              ],
            },
            {
              title: "گام ۳: کنترل مجموع کل احتمالات",
              text: "جمع هر کدام از احتمالات حاشیه‌ای برابر ۱ است:",
              math: [r`\sum_x f_X(x) = 1/6 + 2/6 + 2/6 = 1 \quad \checkmark`],
            },
          ],
          answer: [r`f_X(2)=1/6, f_X(3)=1/3, f_X(4)=1/3`],
        },
      },
    ],
  },
  {
    id: "sec-4-2",
    chapterId: "ch4",
    num: "۴.۲",
    title: "توزیع‌های شرطی، استقلال، کوواریانس و ضریب همبستگی",
    pages: "۴۱ تا ۴۴",
    session: "جلسه دوازدهم",
    summary: "چگالی شرطی f(x|y)، شرط استقلال دو متغیر تصادفی، کوواریانس Cov(X,Y)، و ضریب همبستگی پیرسون ρ",
    blocks: [
      {
        kind: "definition",
        label: "تعریف ۴.۴",
        title: "توزیع‌های شرطی و استقلال دو متغیر",
        body: "توزیع متغیر X به شرط آگاهی از مقدار Y به صورت زیر بیان می‌شود:",
        math: [
          r`f_{X \mid Y}(x \mid y) = \frac{f_{X,Y}(x, y)}{f_Y(y)} \quad (f_Y(y) > 0)`,
          r`X \text{ و } Y \text{ مستقل‌اند } \iff f_{X,Y}(x, y) = f_X(x) \cdot f_Y(y) \quad (\forall x, y)`,
        ],
      },
      {
        kind: "definition",
        label: "تعریف ۴.۵",
        title: "کوواریانس (Covariance)",
        body: "معیار تغییرات هم‌جهت و همبستگی خطی دو متغیر تصادفی:",
        math: [
          r`Cov(X, Y) = E[(X - \mu_X)(Y - \mu_Y)] = E[XY] - E[X]E[Y]`,
          r`X, Y \text{ مستقل} \implies Cov(X, Y) = 0`,
        ],
      },
      {
        kind: "theorem",
        label: "قضیه ۴.۱",
        title: "واریانس مجموع و تفاضل دو متغیر تصادفی",
        body: "در بسط واریانس ترکیب خطی، کوواریانس نقش ضریب همبستگی متقابل را بازی می‌کند:",
        math: [
          r`Var(X \pm Y) = Var(X) + Var(Y) \pm 2 Cov(X, Y)`,
          r`X, Y \text{ مستقل } \implies Var(X \pm Y) = Var(X) + Var(Y)`,
        ],
      },
      {
        kind: "definition",
        label: "تعریف ۴.۶",
        title: "ضریب همبستگی پیرسون (Pearson Correlation Coefficient)",
        body: "شاخص بی‌بعد شدت رابطه خطی میان دو متغیر در بازه استاندارد [-1, 1]:",
        math: [
          r`\rho_{X,Y} = Corr(X, Y) = \frac{Cov(X, Y)}{\sigma_X \sigma_Y} = \frac{Cov(X, Y)}{\sqrt{Var(X) Var(Y)}}`,
          r`-1 \le \rho_{X,Y} \le 1`,
        ],
      },
      {
        kind: "note",
        variant: "tip",
        title: "تفسیر مقادیر ρ",
        text: "اگر ρ = +1 باشد، دو متغیر رابطه خطی مستقیم کامل دارند (Y = aX + b با a > 0). اگر ρ = -1 باشد رابطه خطی معکوس کامل است. اگر ρ = 0 باشد متغیرها ناهمبسته‌اند.",
      },
    ],
  },
];
