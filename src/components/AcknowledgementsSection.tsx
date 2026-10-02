import React from "react";
import { UserCheck, Sparkles, Feather, BookOpen, Award, Quote, Compass, Zap, CheckCircle2 } from "lucide-react";
import { fa } from "./Math";

export const AcknowledgementsSection = React.memo(function AcknowledgementsSection() {
  return (
    <section
      id="acknowledgements"
      className="scroll-mt-header mt-16 sm:mt-24 pt-8 border-t-2 border-line/60"
      aria-label="شناسنامه علمی، نگارش و پدیدآورنده جزوه"
    >
      {/* 1. Header Plaque */}
      <div className="mb-10 text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-xl neo-border-sm bg-gold px-4 py-1.5 text-xs font-black text-black neo-shadow-xs">
          <Award size={15} strokeWidth={2.8} />
          <span>شناسنامه علمی و قدردانی از نگارنده</span>
          <Sparkles size={14} />
        </div>

        <h2 className="text-2xl sm:text-4xl font-black text-ink tracking-tight">
          علی زاهدیان — نویسنده و مدرس جزوه
        </h2>

        <p className="mx-auto max-w-2xl text-sm leading-7 text-soft font-bold">
          این سامانه تعاملی بر پایه ۵۰ صفحه دست‌نویس کامل، دقیق و ارزشمند تدوین‌شده توسط <strong className="text-ink">علی زاهدیان</strong>  توسعه یافته است.
        </p>
      </div>

      {/* 2. Unified Centered Author Feature Showcase Card */}
      <div className="max-w-3xl mx-auto rounded-3xl neo-border bg-card p-6 sm:p-10 neo-shadow-lg relative overflow-hidden">
        {/* Subtle background calligraphy watermark */}
        <div
          className="pointer-events-none absolute -bottom-10 -start-8 select-none text-[180px] font-black text-gold/10"
          aria-hidden="true"
        >
          ع
        </div>

        <div>
          {/* Top Author Profile Row */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-start gap-5 mb-6 border-b-2 border-line pb-6">
            <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl neo-border bg-gold text-black neo-shadow">
              <span className="text-3xl font-black">ع</span>
              <span className="absolute -bottom-1.5 -end-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-card neo-border-sm text-ink shadow-xs">
                <Feather size={14} strokeWidth={2.8} />
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="inline-flex items-center gap-2 rounded-lg neo-border-sm bg-card2 px-3 py-0.5 text-xs font-black text-ink mb-2">
                <UserCheck size={14} strokeWidth={2.8} className="text-accent" />
                <span>نویسنده</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-ink tracking-tight">علی زاهدیان</h3>
              <p className="text-xs sm:text-sm font-bold text-faint mt-1">
                نگارش و سازماندهی کامل جزوه ۵۰ صفحه‌ای آمار و احتمال مهندسی
              </p>
            </div>
          </div>

          {/* Statement with Quote Styling */}
          <div className="relative my-4 rounded-2xl bg-card2 p-5 sm:p-6 neo-border-sm">
            <Quote size={24} className="text-accent mb-2" />
            <p className="text-sm sm:text-[15px] leading-8 text-soft font-bold">
              تشکر و قدردانی ویژه از <strong className="font-black text-ink underline decoration-gold decoration-4">علی زاهدیان</strong> بابت نگارش خط‌به‌خط، دست‌خط بسیار خوانا و تمیز، انتخاب مثال‌های استاندارد دانشگاهی، و پوشش کامل مباحث از احتمالات شرطی تا قضیه بیز، توزیع‌های خاص و آمار استنباطی که مبنای ساخت این سامانه تعاملی قرار گرفت.
            </p>
          </div>
        </div>

        {/* 4-Column Metric Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t-2 border-line">
          <div className="rounded-xl neo-border-sm bg-card p-3 text-center neo-shadow-xs">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/20 text-black dark:text-gold mx-auto">
              <Feather size={16} strokeWidth={2.8} />
            </span>
            <p className="mt-2 font-black text-sm text-ink">{fa(50)} صفحه</p>
            <p className="text-[10px] font-bold text-faint">نگارش کامل</p>
          </div>

          <div className="rounded-xl neo-border-sm bg-card p-3 text-center neo-shadow-xs">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/15 text-accent mx-auto">
              <BookOpen size={16} strokeWidth={2.8} />
            </span>
            <p className="mt-2 font-black text-sm text-ink">{fa(5)} فصل</p>
            <p className="text-[10px] font-bold text-faint">سرفصل جامع</p>
          </div>

          <div className="rounded-xl neo-border-sm bg-card p-3 text-center neo-shadow-xs">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/15 text-purple-600 dark:text-purple-400 mx-auto">
              <Compass size={16} strokeWidth={2.8} />
            </span>
            <p className="mt-2 font-black text-sm text-ink">{fa(8)} توزیع</p>
            <p className="text-[10px] font-bold text-faint">گسسته و پیوسته</p>
          </div>

          <div className="rounded-xl neo-border-sm bg-card p-3 text-center neo-shadow-xs">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 mx-auto">
              <CheckCircle2 size={16} strokeWidth={2.8} />
            </span>
            <p className="mt-2 font-black text-sm text-ink">۱۰۰٪</p>
            <p className="text-[10px] font-bold text-faint">حل تشریحی</p>
          </div>
        </div>
      </div>
    </section>
  );
});
