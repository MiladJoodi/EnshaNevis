import type { Metadata } from "next";
import { Lalezar } from "next/font/google";
import "./globals.css";

const lalezar = Lalezar({
  subsets: ["arabic"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "انشا ساز هوشمند",
  description: "ساخت انشای طبیعی با هوش مصنوعی",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${lalezar.className} min-h-full`}>
        {children}
      </body>
    </html>
  );
}