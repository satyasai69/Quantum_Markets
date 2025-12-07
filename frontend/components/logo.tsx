"use client"

import { cn } from "@/lib/utils"

interface LogoProps {
  variant?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
  size?: number
  className?: string
}

export default function Logo({ variant = 5, size = 32, className }: LogoProps) {
  const logos = {
    1: (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 16C8 12 10 10 12 10C14 10 16 12 16 16C16 20 18 22 20 22C22 22 24 20 24 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M20 12L24 16L20 20M24 16H28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
    2: (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="20" width="3" height="8" fill="currentColor" rx="1"/>
        <rect x="11" y="16" width="3" height="12" fill="currentColor" rx="1"/>
        <rect x="16" y="12" width="3" height="16" fill="currentColor" rx="1"/>
        <rect x="21" y="8" width="3" height="20" fill="currentColor" rx="1"/>
        <circle cx="10" cy="10" r="1.5" fill="currentColor" opacity="0.6"/>
        <circle cx="26" cy="14" r="1.5" fill="currentColor" opacity="0.8"/>
        <circle cx="18" cy="6" r="1" fill="currentColor" opacity="0.7"/>
      </svg>
    ),
    3: (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 8C10 6.9 10.9 6 12 6H18C19.1 6 20 6.9 20 8V16C20 17.1 19.1 18 18 18H12C10.9 18 10 17.1 10 16V8Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <circle cx="18" cy="10" r="2" fill="currentColor"/>
        <path d="M22 8V18M22 8L26 14L30 8M30 8V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M6 24L10 20L14 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.6"/>
      </svg>
    ),
    4: (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 24L12 12L18 18L26 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <circle cx="12" cy="12" r="2" fill="currentColor"/>
        <circle cx="18" cy="18" r="2" fill="currentColor"/>
        <circle cx="26" cy="8" r="2" fill="currentColor"/>
        <path d="M12 12L18 18" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" fill="none"/>
      </svg>
    ),
    5: (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 22L14 16L20 10L24 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <circle cx="24" cy="6" r="3" fill="currentColor" opacity="0.2"/>
        <circle cx="24" cy="6" r="1.5" fill="currentColor"/>
      </svg>
    ),
    6: (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 6C11 6 7 10 7 15C7 20 11 24 16 24C21 24 25 20 25 15C25 10 21 6 16 6Z" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M20 12L25 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M6 26L26 26M6 28L26 28" stroke="currentColor" strokeWidth="1" opacity="0.3" strokeLinecap="round"/>
      </svg>
    ),
    7: (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 20C8 20 10 18 12 18C14 18 16 20 18 20C20 20 22 18 24 18C26 18 28 20 28 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M20 12L24 8L28 12M24 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
    8: (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 8L16 16L24 8M8 24L16 16L24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="1" opacity="0.2" fill="none"/>
        <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="1" opacity="0.3" fill="none"/>
      </svg>
    ),
  }

  return (
    <div className={cn("flex items-center justify-center text-foreground", className)}>
      {logos[variant]}
    </div>
  )
}

