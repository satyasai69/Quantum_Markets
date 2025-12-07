import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
/* Enhanced Colors - Comment out the next line to revert to original colors */
import "./enhanced-colors.css"
import Providers from "./providers"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Quantum Market",
  description:
    "Quantum Market - Prediction market platform with multi-option predictions, live odds, and trading features",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/logo.jpg",
        type: "image/jpeg",
      },
    ],
    apple: "/logo.jpg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Suspense fallback={null}>
            <Providers>
              {children}
              <Toaster />
              <Analytics />
            </Providers>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
