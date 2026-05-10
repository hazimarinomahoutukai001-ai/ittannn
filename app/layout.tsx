import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "TSC - The Streamer Community",
  description: "4000人以上のストリーマーが所属する国内最大級のクリエイターコミュニティ。",
  icons: {
    icon: "/ittannn/TSCaikon.jpg", // ※ファビコンを別の名前にしている場合はここも合わせてください
  },
  openGraph: {
    title: "TSC - The Streamer Community",
    description: "イベント情報や所属メンバーの活躍をチェック！",
    url: "https://hazimarinomahoutukai001-ai.github.io/ittannn/",
    siteName: "TSC",
    images: [
      {
        url: "https://hazimarinomahoutukai001-ai.github.io/ittannn/Snapshot_841.PNG", // 🌟 ここを「TSCaikon.jpg」に変更しました！
        width: 1200,
        height: 630,
        alt: "TSC公式ロゴ",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TSC - The Streamer Community",
    description: "4000人以上のストリーマーが所属するコミュニティ",
    images: ["https://hazimarinomahoutukai001-ai.github.io/ittannn/Snapshot_841.PNG"], // 🌟 X(Twitter)用も「TSCaikon.jpg」に変更！
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
