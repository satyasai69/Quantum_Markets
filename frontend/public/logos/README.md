# Quantum Market Logo Designs

This directory contains 8 minimalistic logo designs for the Quantum Market prediction platform. All logos are designed to work seamlessly in both light and dark modes using `currentColor` for automatic theme adaptation.

## Logo Variants

### Logo 1: Quantum Wave with Trending Arrow
**File:** `logo-1-quantum-wave.svg`
- Features a quantum wave pattern with an integrated upward trending arrow
- Represents market dynamics and quantum computing concepts
- **Best for:** Modern, tech-forward branding

### Logo 2: Chart with Quantum Particles
**File:** `logo-2-chart-quantum.svg`
- Combines traditional market chart bars with quantum particle effects
- Balances familiarity with innovation
- **Best for:** Professional, data-focused presentation

### Logo 3: QM Monogram
**File:** `logo-3-qm-monogram.svg`
- Stylized "QM" letters with market indicator
- Classic monogram approach with modern twist
- **Best for:** Brand recognition and versatility

### Logo 4: Abstract Market Structure
**File:** `logo-4-abstract-market.svg`
- Abstract network structure with quantum nodes
- Represents interconnected markets and quantum states
- **Best for:** Conceptual, forward-thinking brand

### Logo 5: Minimal Trend Line
**File:** `logo-5-minimal-trend.svg`
- Ultra-minimal trending line with quantum energy dot
- Clean and simple, maximum impact
- **Best for:** Minimalist design preference

### Logo 6: Geometric Q with Grid
**File:** `logo-6-geometric-q.svg`
- Geometric "Q" shape with market grid pattern
- Strong geometric presence
- **Best for:** Bold, geometric brand identity

### Logo 7: Wave with Upward Trend
**File:** `logo-7-wave-trend.svg`
- Quantum wave combined with clear upward trend
- Optimistic and dynamic
- **Best for:** Growth-focused messaging

### Logo 8: Minimal Mark with Pulse
**File:** `logo-8-minimal-mark.svg`
- Minimal X mark with quantum pulse effect
- Most abstract, highly versatile
- **Best for:** Maximum simplicity

## Usage

### In React Components

```tsx
import Logo from "@/components/logo"

// Default (variant 1, size 32)
<Logo />

// Custom variant and size
<Logo variant={5} size={48} className="mr-2" />
```

### Direct SVG Usage

```tsx
<img src="/logos/logo-1-quantum-wave.svg" alt="Logo" className="text-foreground" />
```

The `text-foreground` class ensures the logo adapts to light/dark themes automatically.

## Design Principles

1. **Minimalism**: Clean, uncluttered designs
2. **Theme Adaptation**: Uses `currentColor` for automatic light/dark mode
3. **Scalability**: SVG format ensures crisp rendering at any size
4. **Context Relevance**: Each design incorporates market/trading and quantum elements
5. **Visibility**: High contrast in both light and dark modes

## Recommended Usage

- **Header/App Bar**: Variants 1, 5, or 7 (32px)
- **Favicon**: Variants 5 or 8 (16-32px)
- **Loading States**: Variants 2 or 4 (48-64px)
- **Marketing Materials**: Variants 3 or 6 (larger sizes)

## Color Adaptation

All logos use `currentColor` which means:
- In **light mode**: Logos appear dark (uses `--foreground` color)
- In **dark mode**: Logos appear light (uses `--foreground` color)
- Automatically adapts to your theme system

## Customization

To customize colors, you can wrap the logo in a div with custom text color:

```tsx
<div className="text-primary">
  <Logo variant={1} />
</div>
```

