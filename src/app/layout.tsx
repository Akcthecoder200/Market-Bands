import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LT Trade - Bollinger Bands Chart",
  description: "Professional Bollinger Bands indicator overlay on candlestick charts using KLineCharts",
  icons: {
    icon: '/assets/logo_trade.svg',
    shortcut: '/assets/logo_trade.svg',
    apple: '/assets/logo_trade.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
