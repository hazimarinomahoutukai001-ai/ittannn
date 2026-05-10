import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

// 🌟 ここから下の metadata をまるっとTSC仕様に変更！
export const metadata: Metadata = {
  title: "TSC - The Streamer Community",
  description: "4000人以上のストリーマーが所属する国内最大級のクリエイターコミュニティ。",
  icons: {
    icon: "/ittannn/icon.png", // 設定したファビコン（favicon.icoのままでもOK）
  },
  openGraph: {
    title: "TSC - The Streamer Community",
    description: "イベント情報や所属メンバーの活躍をチェック！",
    url: "https://hazimarinomahoutukai001-ai.github.io/ittannn/",
    siteName: "TSC",
    images: [
      {
        url: "/ittannn/ogp-image.jpg", // 🌟 appフォルダに入れたロゴ画像のパス！
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
    images: ["/ittannn/ogp-image.jpg"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // 🌟 ついでにここを "en" から "ja"（日本語）に変更！
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
