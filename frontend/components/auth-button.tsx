"use client"

import { usePrivy } from "@privy-io/react-auth"
import { LogOut, User } from "lucide-react"

export default function AuthButton() {
    const { login, logout, authenticated, user } = usePrivy()

    if (authenticated && user) {
        return (
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full border border-border">
                    <User size={14} className="text-muted-foreground" />
                    <span className="text-sm font-medium">
                        {user.wallet?.address ? (
                            <>
                                {user.wallet.address.slice(0, 6)}...{user.wallet.address.slice(-4)}
                            </>
                        ) : (
                            user.email?.address || "User"
                        )}
                    </span>
                </div>
                <button
                    onClick={logout}
                    className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                    title="Logout"
                >
                    <LogOut size={18} />
                </button>
            </div>
        )
    }

    return (
        <button
            onClick={login}
            className="px-4 py-2 bg-muted/50 dark:bg-muted/30 border border-border text-foreground rounded-lg text-sm font-medium hover:bg-muted dark:hover:bg-muted/60 hover:border-border/80 dark:hover:border-border/60 transition-all duration-200"
        >
            Login/SignUp
        </button>
    )
}
