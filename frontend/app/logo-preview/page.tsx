"use client"

import { useState } from "react"
import Logo from "@/components/logo"
import { Sun, Moon } from "lucide-react"
import AppHeader from "@/components/app-header"

export default function LogoPreview() {
  const [isDark, setIsDark] = useState(false)

  const logos = [
    { variant: 1, name: "Quantum Wave with Trending Arrow", description: "Quantum wave pattern with integrated upward trend" },
    { variant: 2, name: "Chart with Quantum Particles", description: "Market chart bars with quantum particle effects" },
    { variant: 3, name: "QM Monogram", description: "Stylized QM letters with market indicator" },
    { variant: 4, name: "Abstract Market Structure", description: "Network structure with quantum nodes" },
    { variant: 5, name: "Minimal Trend Line", description: "Ultra-minimal trending with quantum energy dot" },
    { variant: 6, name: "Geometric Q with Grid", description: "Geometric Q shape with market grid pattern" },
    { variant: 7, name: "Wave with Upward Trend", description: "Quantum wave with clear upward trend" },
    { variant: 8, name: "Minimal Mark with Pulse", description: "Minimal X mark with quantum pulse effect" },
  ]

  return (
    <div className={isDark ? "dark" : ""}>
      <AppHeader title="Logo Preview" userBalance={1000} />
      <div className="min-h-screen bg-background text-foreground p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Quantum Market Logo Designs</h1>
              <p className="text-muted-foreground">8 minimalistic logo variants for your prediction market platform</p>
            </div>
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {logos.map((logo) => (
              <div
                key={logo.variant}
                className="p-6 rounded-lg border border-border bg-card hover:border-foreground/20 transition-all"
              >
                <div className="flex items-center justify-center h-32 mb-4 bg-muted/30 rounded-lg">
                  <Logo variant={logo.variant as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8} size={64} />
                </div>
                <h3 className="font-semibold text-sm mb-1">Variant {logo.variant}</h3>
                <p className="text-xs text-muted-foreground mb-2">{logo.name}</p>
                <p className="text-xs text-muted-foreground/70">{logo.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4">Size Variations</h2>
              <div className="flex items-end gap-8 p-6 rounded-lg border border-border bg-card">
                <div className="text-center">
                  <Logo variant={5} size={16} />
                  <p className="text-xs text-muted-foreground mt-2">16px</p>
                </div>
                <div className="text-center">
                  <Logo variant={5} size={24} />
                  <p className="text-xs text-muted-foreground mt-2">24px</p>
                </div>
                <div className="text-center">
                  <Logo variant={5} size={32} />
                  <p className="text-xs text-muted-foreground mt-2">32px</p>
                </div>
                <div className="text-center">
                  <Logo variant={5} size={48} />
                  <p className="text-xs text-muted-foreground mt-2">48px</p>
                </div>
                <div className="text-center">
                  <Logo variant={5} size={64} />
                  <p className="text-xs text-muted-foreground mt-2">64px</p>
                </div>
                <div className="text-center">
                  <Logo variant={5} size={96} />
                  <p className="text-xs text-muted-foreground mt-2">96px</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Header Preview</h2>
              <div className="p-4 rounded-lg border border-border bg-card">
                <header className="flex items-center justify-between p-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <Logo variant={1} size={28} />
                    <span className="text-base font-semibold">Quantum Market</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-muted" />
                    <div className="w-8 h-8 rounded-full bg-muted" />
                  </div>
                </header>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Color Variations</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg border border-border bg-card text-center">
                  <Logo variant={5} size={48} className="mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Default</p>
                </div>
                <div className="p-4 rounded-lg border border-border bg-card text-center text-primary">
                  <Logo variant={5} size={48} className="mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Primary</p>
                </div>
                <div className="p-4 rounded-lg border border-border bg-card text-center text-blue-500">
                  <Logo variant={5} size={48} className="mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Blue</p>
                </div>
                <div className="p-4 rounded-lg border border-border bg-card text-center text-green-500">
                  <Logo variant={5} size={48} className="mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Green</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

