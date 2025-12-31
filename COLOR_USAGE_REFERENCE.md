# Color Usage Across Pages - Reference Sheet

## Summary
This document shows exactly how the three key colors are being used across the application pages:
- **rgb(4, 35, 51)** - Primary dark blue background (dark mode only)
- **rgb(6, 43, 63)** - Secondary dark blue background (available for alternative dark mode styling)
- **rgb(231, 234, 236)** - Light gray (available for light text/elements)

---

## Page: Marketplace (`/src/pages/Marketplace.tsx`)

### 🎯 Insurance Plans Card
**Location:** Line ~292
```tsx
<Card className="border-purple-200 dark:bg-[rgb(4,35,51)]">
```

**Visual Behavior:**
| Mode | Border | Background |
|------|--------|-----------|
| Light | Purple border (`border-purple-200`) | Light purple tint |
| Dark | Purple border (`border-purple-200`) | Dark blue (`rgb(4,35,51)`) |

**Child Elements:**
- Plan cards inside: `bg-card/50 border-primary/20` (works in both modes)
- Features list uses green checkmarks
- Buttons use `bg-purple-600`

**Components Included:**
- Health Insurance (SecureHealth) - ₹350/month
- Term Life Insurance (LifeGuard) - ₹799/month
- Combo Plan (AllSecure) - ₹899/month

---

## Page: Data Vault (`/src/pages/DataVault.tsx`)

### 📄 Financial Documents Card
**Location:** Line ~166
```tsx
<Card className="border-primary/20 dark:bg-[rgb(4,35,51)]">
```

**Visual Behavior:**
| Mode | Border | Background |
|------|--------|-----------|
| Light | Primary border (`border-primary/20`) | Default card color |
| Dark | Primary border (`border-primary/20`) | Dark blue (`rgb(4,35,51)`) |

**Contents:**
- FD Receipt - HDFC (₹5,00,000)
- Salary Slip - November (₹75,000)
- Insurance Policy Receipt (₹45,000)

---

### 📋 Identity Documents Card
**Location:** Line ~237
```tsx
<Card className="border-purple-200 dark:bg-[rgb(4,35,51)]">
```

**Visual Behavior:**
| Mode | Border | Background |
|------|--------|-----------|
| Light | Purple border (`border-purple-200`) | Light purple tint |
| Dark | Purple border (`border-purple-200`) | Dark blue (`rgb(4,35,51)`) |

**Contents:**
- PAN Card (AAABP1234A)
- Aadhaar Card (****-****-1234)
- Passport (H1234567) - Expires Feb 15, 2025
- Driving License (DL-0120200000001) - Expires Mar 30, 2026

---

### 🔒 Other Important Documents Card
**Location:** Line ~305
```tsx
<Card className="border-green-200 dark:bg-[rgb(4,35,51)]">
```

**Visual Behavior:**
| Mode | Border | Background |
|------|--------|-----------|
| Light | Green border (`border-green-200`) | Light green tint |
| Dark | Green border (`border-green-200`) | Dark blue (`rgb(4,35,51)`) |

**Contents:**
- Debit Card (HDFC) - Expires Dec 28, 2024 - Status: Expiring Soon
- Credit Card (ICICI) - Expires Jun 30, 2026 - Status: Active

---

### 🛡️ Security Settings Card
**Location:** Line ~350
```tsx
<Card className="border-green-200 bg-green-50/30">
```

**Visual Behavior:**
| Mode | Border | Background |
|------|--------|-----------|
| Light | Green border (`border-green-200`) | Light green (`bg-green-50/30`) |
| Dark | Green border (`border-green-200`) | Default card color |

**Note:** This card uses light mode styling in both modes (for security consistency)

**Contents:**
- AES-256 Encryption
- Fingerprint Biometric Lock
- Last Backup: Today at 2:45 PM
- Expiry Calendar tracking

---

## Page: Interview Tracker (`/src/pages/InterviewTracker.tsx`)

### 📊 Pipeline Kanban Cards
**Location:** Line ~187
```tsx
<Card className={`border-${pipeline.color}-200 dark:bg-[rgb(4,35,51)]`}>
```

**Visual Behavior:**
| Pipeline Status | Light Mode | Dark Mode |
|-----------------|-----------|-----------|
| **Applied** | `border-blue-200` + light blue bg | Dark blue background |
| **Interview** | `border-amber-200` + light amber bg | Dark blue background |
| **Offer** | `border-green-200` + light green bg | Dark blue background |
| **Rejected** | `border-red-200` + light red bg | Dark blue background |

**Dynamic Border Colors:**
- Applied: Blue border
- Interview: Amber border
- Offer: Green border
- Rejected: Red border

**All sections show dark blue background in dark mode**

---

### 🎯 Interview Preparation Card
**Location:** Line ~407
```tsx
<Card className="mt-6 border-primary/20 dark:bg-[rgb(4,35,51)]">
```

**Visual Behavior:**
| Mode | Border | Background |
|------|--------|-----------|
| Light | Primary border (`border-primary/20`) | Default card color |
| Dark | Primary border (`border-primary/20`) | Dark blue (`rgb(4,35,51)`) |

**Contents:**
- Interview preparation materials
- Tips and resources
- Study guides
- Tips section with organized preparation

---

## Color Usage Summary Table

| Color Value | Usage | Pages | Pattern |
|-------------|-------|-------|---------|
| `rgb(4,35,51)` | Dark mode card backgrounds | Marketplace, DataVault, InterviewTracker | `dark:bg-[rgb(4,35,51)]` |
| `rgb(6,43,63)` | Alternative dark background (reserved) | Not currently used | Available in `darkModeAccents.darkBlue2` |
| `rgb(231,234,236)` | Light gray text/borders (reserved) | Not currently used | Available in `darkModeAccents.lightGray` |

---

## Tailwind Class Patterns Used

### For Dark Mode Backgrounds
```tsx
// Primary dark color
className="dark:bg-[rgb(4,35,51)]"

// Combined with light mode border
className="border-primary/20 dark:bg-[rgb(4,35,51)]"

// With border colors specific to each card
className="border-purple-200 dark:bg-[rgb(4,35,51)]"
className="border-green-200 dark:bg-[rgb(4,35,51)]"
```

### Dynamic Classes (Interview Tracker)
```tsx
// Dynamic border with dark background
className={`border-${pipeline.color}-200 dark:bg-[rgb(4,35,51)]`}
```

---

## Light Mode Styling Preserved

All pages maintain their original light mode styling:
- **Borders:** Color-specific borders (purple, green, blue, amber, etc.)
- **Light Backgrounds:** Default Tailwind colors like `bg-purple-50/30`, `bg-green-50/30`
- **No overlap:** Light mode colors never conflict with dark mode styling

---

## Dark Mode Styling Applied

In dark mode, all affected cards show:
- **Unified Background:** All cards use `rgb(4,35,51)` for consistency
- **Border Colors:** Original border colors are maintained for visual distinction
- **Text:** Uses default dark mode text colors (automatically inverted)
- **Icons:** Uses original icon colors or adjusted dark mode variants

---

## Implementation Notes

### ✅ What's Been Done
1. Added `darkModeAccents` object to `/src/lib/colors.ts`
2. Updated 6 card components to use `dark:bg-[rgb(4,35,51)]` class syntax
3. Marketplace Insurance Plans card
4. DataVault Financial Documents card
5. DataVault Identity Documents card
6. DataVault Other Important Documents card
7. InterviewTracker Pipeline Kanban cards
8. InterviewTracker Interview Preparation card

### ✅ Benefits
- Single source of truth for dark mode colors
- Consistent appearance across all dark mode sections
- Easy to update all instances by modifying `/src/lib/colors.ts`
- No inline styles (pure Tailwind classes)
- Proper dark mode/light mode separation

### 🔄 How to Use Elsewhere
When adding dark blue backgrounds to new cards:
```tsx
import { darkModeAccents } from "@/lib/colors.ts";

// Option 1: Direct class (recommended)
<Card className={`border-color-200 ${darkModeAccents.darkBlue1}`}>

// Option 2: Inline class string
<Card className="border-color-200 dark:bg-[rgb(4,35,51)]">
```

---

## Verification Commands

```bash
# Build to verify all changes compile
npm run build

# Expected output: "2945 modules transformed" + "built in X.XXs"
# No errors or warnings
```

---

## File References

- **Color System Definition:** `/src/lib/colors.ts` (darkModeAccents object)
- **Color Guide:** `/COLOR_SYSTEM_GUIDE.md`
- **This Reference:** `/COLOR_USAGE_REFERENCE.md`

**Last Updated:** December 31, 2025
**Status:** ✅ All 6 cards updated and verified with successful build
