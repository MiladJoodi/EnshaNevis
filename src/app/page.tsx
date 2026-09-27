"use client";

import { useState } from "react";

const پایه‌ها = [
  "سوم ابتدایی",
  "چهارم ابتدایی",
  "پنجم ابتدایی",
  "ششم ابتدایی",
  "هفتم",
  "هشتم",
  "نهم",
  "دهم",
  "یازدهم",
  "دوازدهم",
];

const طول‌ها = ["کوتاه", "متوسط", "بلند"];
const جنسیت‌ها = ["دختر", "پسر"];

const انواع_انشا = [
  "توصیفی",
  "خاطره",
  "داستانی",
  "نظر شخصی",
  "آزاد",
];

export default function Home() {
  const [موضوع, setموضوع] = useState("");
  const [پایه, setپایه] = useState("پنجم ابتدایی");
  const [طول, setطول] = useState("متوسط");
  const [جنسیت, setجنسیت] = useState("دختر");
  const [نوع, setنوع] = useState("توصیفی");

  const [نتیجه, setنتیجه] = useState("");
  const [درحال_تولید, setدرحال_تولید] = useState(false);
  const [کپی_شد, setکپی_شد] = useState(false);

  async function ساختن_انشا() {
    if (!موضوع.trim()) return;

    setدرحال_تولید(true);
    setنتیجه("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: موضوع,
          grade: پایه,
          length: طول,
          gender: جنسیت,
          type: نوع,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setنتیجه(data.result);
    } catch (error) {
      console.error(error);
      setنتیجه("یه مشکلی پیش اومد. دوباره امتحانش کن.");
    } finally {
      setدرحال_تولید(false);
    }
  }

  async function کپی_کردن() {
    await navigator.clipboard.writeText(نتیجه);
    setکپی_شد(true);

    setTimeout(() => {
      setکپی_شد(false);
    }, 1500);
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen overflow-hidden bg-[#f4f0e8] text-[#24211d]"
    >
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-[#dce8d5] sm:-right-24 sm:-top-24 sm:h-72 sm:w-72" />

        <div className="absolute -bottom-20 -left-32 h-72 w-72 rounded-full bg-[#e9ddd0] sm:-left-32 sm:bottom-0 sm:h-96 sm:w-96" />

        <div className="absolute right-[12%] top-28 hidden h-2 w-2 rounded-full bg-[#a6b79b] sm:block" />

        <div className="absolute left-[15%] top-40 hidden h-3 w-3 rounded-full border border-[#b5a38f] sm:block" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-5 sm:px-8 sm:py-10">
        {/* Header */}
        <header className="flex items-center">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="flex h-10 w-10 rotate-[-4deg] items-center justify-center rounded-[13px] bg-[#24211d] text-lg text-white shadow-[3px_3px_0_#b9c8ae] sm:h-11 sm:w-11 sm:rounded-[14px] sm:text-xl sm:shadow-[4px_4px_0_#b9c8ae]">
              ✎
            </div>

            <div className="text-base font-bold sm:text-lg">
              انشانویس
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="mx-auto mt-12 max-w-3xl text-center sm:mt-20">
          <h1 className="text-[32px] font-bold leading-[1.45] tracking-tight sm:text-6xl sm:leading-[1.35]">
            امروز <span className="text-[#819874]">چی بنویسیم؟</span>
          </h1>

          <p className="mx-auto mt-3 max-w-[280px] text-[13px] leading-6 text-[#81786e] sm:mt-5 sm:max-w-none sm:text-sm">
            موضوع انشا رو بنویس و بقیه انتخاب‌ها رو انجام بده.
          </p>
        </section>

        {/* Form */}
        <section className="mx-auto mt-7 max-w-4xl sm:mt-10">
          <div className="rounded-[24px] border border-[#ddd5c9] bg-[#fffdf9] p-2 shadow-[0_20px_60px_-30px_rgba(70,60,45,0.35)] sm:rounded-[30px] sm:p-3">
            <div className="rounded-[19px] border border-[#eee7dc] bg-[#fffefb] p-4 sm:rounded-[23px] sm:p-7">
              {/* Topic */}
              <div className="mb-3 flex items-center justify-between">
                <label className="text-sm font-bold">
                  موضوع انشا
                </label>

                <span className="text-[11px] text-[#b0a79c]">
                  {موضوع.length}
                </span>
              </div>

              <div className="relative overflow-hidden rounded-2xl bg-[#f8f5ef]">
                <div className="pointer-events-none absolute inset-y-0 right-0 w-[3px] bg-[#a7b99d]" />

                <textarea
                  value={موضوع}
                  onChange={(e) => setموضوع(e.target.value)}
                  placeholder="مثلاً: روزی که برف بارید..."
                  rows={5}
                  className="min-h-[145px] w-full resize-none bg-transparent px-5 py-4 text-[15px] leading-8 text-[#302c27] outline-none placeholder:text-[#aaa095] sm:min-h-0 sm:px-6 sm:py-5 sm:text-base"
                />
              </div>

              {/* Options */}
              <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-7 sm:grid-cols-4">
                <انتخاب
                  عنوان="پایه"
                  مقدار={پایه}
                  تغییر={setپایه}
                  گزینه‌ها={پایه‌ها}
                />

                <انتخاب
                  عنوان="اندازه"
                  مقدار={طول}
                  تغییر={setطول}
                  گزینه‌ها={طول‌ها}
                />

                <انتخاب
                  عنوان="نوع"
                  مقدار={نوع}
                  تغییر={setنوع}
                  گزینه‌ها={انواع_انشا}
                />

                <انتخاب
                  عنوان="جنسیت"
                  مقدار={جنسیت}
                  تغییر={setجنسیت}
                  گزینه‌ها={جنسیت‌ها}
                />
              </div>

              {/* Generate */}
              <button
                onClick={ساختن_انشا}
                disabled={درحال_تولید || !موضوع.trim()}
                className="mt-4 flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-2xl bg-[#24211d] px-5 py-3.5 text-[14px] font-bold text-white transition active:scale-[0.99] hover:bg-[#35312c] disabled:cursor-not-allowed disabled:opacity-35 sm:mt-5 sm:min-h-0 sm:py-4"
              >
                {درحال_تولید ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    داریم می‌نویسیم...
                  </>
                ) : (
                  <>
                    شروع نوشتن
                    <span className="text-[#b9c8ae]">←</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Result */}
        {درحال_تولید ? (
          <section className="mx-auto mt-6 max-w-4xl sm:mt-8">
            <div className="rounded-[24px] border border-[#ddd5c9] bg-[#fffdf9] p-2 shadow-[0_20px_60px_-30px_rgba(70,60,45,0.3)] sm:rounded-[30px] sm:p-3">
              <article className="rounded-[19px] border border-[#eee7dc] bg-[#fffefb] px-5 py-7 sm:rounded-[23px] sm:px-12 sm:py-10">
                <div className="mb-7 flex items-center justify-between border-b border-[#eee7dc] pb-5 sm:mb-8">
                  <div className="h-5 w-32 animate-pulse rounded-lg bg-[#eee9e1] sm:h-6 sm:w-40" />

                  <div className="h-8 w-14 animate-pulse rounded-xl bg-[#f0ebe3] sm:h-9 sm:w-16" />
                </div>

                <div className="space-y-4">
                  <div className="h-3.5 w-full animate-pulse rounded-lg bg-[#eee9e1]" />
                  <div className="h-3.5 w-[92%] animate-pulse rounded-lg bg-[#eee9e1]" />
                  <div className="h-3.5 w-[84%] animate-pulse rounded-lg bg-[#eee9e1]" />
                  <div className="h-3.5 w-[95%] animate-pulse rounded-lg bg-[#eee9e1]" />
                  <div className="h-3.5 w-[73%] animate-pulse rounded-lg bg-[#eee9e1]" />
                  <div className="h-3.5 w-[87%] animate-pulse rounded-lg bg-[#eee9e1]" />
                </div>

                <div className="mt-7 flex items-center justify-center gap-2 text-xs text-[#a69c90]">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#a7b99d]" />
                  داریم انشا رو می‌نویسیم...
                </div>
              </article>
            </div>
          </section>
        ) : (
          نتیجه && (
            <section className="mx-auto mt-6 max-w-4xl sm:mt-8">
              <div className="rounded-[24px] border border-[#ddd5c9] bg-[#fffdf9] p-2 shadow-[0_20px_60px_-30px_rgba(70,60,45,0.3)] sm:rounded-[30px] sm:p-3">
                <article className="relative rounded-[19px] border border-[#eee7dc] bg-[#fffefb] px-5 py-7 sm:rounded-[23px] sm:px-12 sm:py-10">
                  <div className="mb-7 flex items-center justify-between gap-3 border-b border-[#eee7dc] pb-5 sm:mb-8">
                    <h2 className="min-w-0 flex-1 truncate text-lg font-bold sm:text-xl">
                      {موضوع}
                    </h2>

                    <button
                      onClick={کپی_کردن}
                      className="shrink-0 rounded-xl border border-[#ddd5c9] bg-[#faf7f1] px-3.5 py-2 text-xs font-medium transition active:scale-95 hover:bg-[#f2ede5]"
                    >
                      {کپی_شد ? "✓ کپی شد" : "کپی"}
                    </button>
                  </div>

                  <div className="whitespace-pre-wrap text-[15px] leading-[2.25] text-[#49433c] sm:text-base sm:leading-[2.3]">
                    {نتیجه}
                  </div>
                </article>
              </div>
            </section>
          )
        )}

        {/* Footer */}
        <footer className="py-8 text-center text-xs text-[#a49b90] sm:py-10">
          انشانویس
        </footer>
      </div>
    </main>
  );
}

function انتخاب({
  عنوان,
  مقدار,
  تغییر,
  گزینه‌ها,
}: {
  عنوان: string;
  مقدار: string;
  تغییر: (مقدار: string) => void;
  گزینه‌ها: string[];
}) {
  return (
    <div className="relative">
      <select
        value={مقدار}
        onChange={(e) => تغییر(e.target.value)}
        className="min-h-[48px] w-full appearance-none rounded-xl border border-[#e5ddd2] bg-[#faf7f1] px-3.5 py-3 text-[13px] font-medium text-[#514a42] outline-none transition hover:border-[#c9bdae] focus:border-[#9bad90] focus:ring-4 focus:ring-[#e1e9dc] sm:min-h-0 sm:px-4 sm:text-sm"
      >
        {گزینه‌ها.map((گزینه) => (
          <option key={گزینه} value={گزینه}>
            {گزینه}
          </option>
        ))}
      </select>

      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[9px] text-[#a69c90] sm:left-4 sm:text-[10px]">
        ▼
      </span>

      <div className="pointer-events-none absolute -top-2 right-2 bg-[#fffdf9] px-1 text-[8px] text-[#a69c90] sm:right-3 sm:text-[9px]">
        {عنوان}
      </div>
    </div>
  );
}