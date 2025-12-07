"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Sun, Moon, Search, Bell, ArrowLeft } from "lucide-react"
import Image from "next/image"
import AuthButton from "@/components/auth-button"

interface AppHeaderProps {
  title?: string
  showBackButton?: boolean
  onBackClick?: () => void
  userBalance?: number
}

export default function AppHeader({ title = "Quantum Market", showBackButton = false, onBackClick, userBalance: propUserBalance }: AppHeaderProps) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  // Use prop if provided, otherwise use default mock balance
  // In a real app, this would come from an API or context
  const [userBalance, setUserBalance] = useState<number>(propUserBalance ?? 1000)
  
  useEffect(() => {
    // Update balance if prop changes
    if (propUserBalance !== undefined) {
      setUserBalance(propUserBalance)
    }
  }, [propUserBalance])

  const toggleTheme = () => {
    const currentTheme = resolvedTheme || theme || "light"
    setTheme(currentTheme === "dark" ? "light" : "dark")
  }

  const isDark = resolvedTheme === "dark" || theme === "dark"

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className={`mx-auto px-6 py-3 flex items-center justify-between ${showBackButton ? "max-w-4xl" : "max-w-7xl"}`}>
        <div className="flex items-center gap-3">
          {showBackButton && onBackClick && (
            <button
              onClick={onBackClick}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer">
            <Image 
              src="/logo.jpg" 
              alt="Quantum Market" 
              width={28} 
              height={28} 
              className="rounded object-contain"
              priority
            />
            <span className="text-base font-semibold tracking-tight">{title}</span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {/* Utility Buttons */}
          <div className="flex items-center gap-0.5">
            <button className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground" title="Search">
              <Search size={18} />
            </button>
            <button className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground relative" title="Notifications">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-foreground rounded-full animate-pulse" />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Wallet Balance and Auth Button */}
          <div className="flex items-center gap-2 pl-2">
            {/* Wallet Balance - Always visible */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted/50 border border-border/50">
              <span className="text-xs font-medium text-muted-foreground">Balance</span>
              {propUserBalance !== undefined ? (
                <span className="text-sm font-semibold font-mono text-foreground">{userBalance.toFixed(4)} FLR</span>
              ) : (
                <span className="text-sm font-semibold font-mono text-muted-foreground">...</span>
              )}
            </div>
            <AuthButton />
          </div>
        </div>
      </div>
    </header>
  )
}
