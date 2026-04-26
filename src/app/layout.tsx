import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "竹韵千年 | 中国竹文化云端展",
  description: "格物致知，竹见天地——探索中国千年竹子传统文化",
  keywords: ["竹文化", "中国传统文化", "竹子", "墨竹", "竹林七贤", "竹简"],
  authors: [{ name: "竹韵千年策展团队" }],
  openGraph: {
    title: "竹韵千年 | 中国竹文化云端展",
    description: "格物致知，竹见天地——沉浸式探索中国千年竹文化",
    locale: "zh_CN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
