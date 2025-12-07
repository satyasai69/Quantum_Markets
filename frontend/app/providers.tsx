"use client"

import { PrivyProvider } from "@privy-io/react-auth"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useEffect, useState, useMemo } from "react"
import { useTheme } from "next-themes"
import { defineChain } from "viem"

// Define Flare Testnet Coston2 chain (where contracts are deployed)
const flareCoston2 = defineChain({
  id: 114,
  name: "Flare Testnet Coston2",
  network: "flare-coston2",
  nativeCurrency: {
    decimals: 18,
    name: "Flare",
    symbol: "FLR",
  },
  rpcUrls: {
    default: {
      http: ["https://coston2-api.flare.network/ext/C/rpc"],
    },
    public: {
      http: ["https://coston2-api.flare.network/ext/C/rpc"],
    },
  },
  blockExplorers: {
    default: {
      name: "Coston2 Explorer",
      url: "https://coston2-explorer.flare.network",
    },
  },
  testnet: true,
})

export default function Providers({ children }: { children: React.ReactNode }) {
    const { theme, resolvedTheme } = useTheme()
    const [privyTheme, setPrivyTheme] = useState<"light" | "dark">("light")
    const [mounted, setMounted] = useState(false)
    
    // Create query client inside component to avoid SSR issues
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                retry: 1,
            },
        },
    }))

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!mounted) return
        
        // Use resolvedTheme if available (handles "system" theme), otherwise use theme
        const currentTheme = resolvedTheme || theme || "light"
        
        // Also check the document/html element for dark class as fallback
        const htmlElement = document.documentElement
        const hasDarkClass = htmlElement.classList.contains("dark")
        
        // Determine the theme: prefer resolvedTheme, then check DOM
        const isDark = currentTheme === "dark" || (currentTheme === "system" && hasDarkClass) || hasDarkClass
        
        setPrivyTheme(isDark ? "dark" : "light")
    }, [theme, resolvedTheme, mounted])

    // Also listen for DOM changes (when dark class is toggled)
    useEffect(() => {
        if (!mounted) return
        
        const observer = new MutationObserver(() => {
            const htmlElement = document.documentElement
            const hasDarkClass = htmlElement.classList.contains("dark")
            setPrivyTheme(hasDarkClass ? "dark" : "light")
        })

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        })

        return () => observer.disconnect()
    }, [mounted])

    // Memoize config to prevent unnecessary re-renders
    const privyConfig = useMemo(() => ({
        appearance: {
            theme: privyTheme,
            accentColor: "#676FFF",
            logo: "https://your-logo-url",
        },
        embeddedWallets: {
            ethereum: {
                createOnLogin: "users-without-wallets" as const,
            },
        },
        loginMethods: ["email", "wallet", "google", "sms"] as const,
    }), [privyTheme])

    // Always wrap with QueryClientProvider, even before mounted
    // This ensures hooks that use useQuery work correctly
    return (
        <QueryClientProvider client={queryClient}>
            {!mounted ? (
                <>{children}</>
            ) : (
                <PrivyProvider
                    appId="cmiucx9ou001tk00btw1n4o47" // Placeholder App ID - User needs to replace this
                    config={privyConfig}
                    supportedChains={[flareCoston2]}
                >
                    {children}
                </PrivyProvider>
            )}
        </QueryClientProvider>
    )
}
