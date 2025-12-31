# Color System Guide

## Overview
This document defines the centralized color system used across the Cleero Financial Compass application. All colors are defined in `/src/lib/colors.ts` to ensure consistency and maintainability.

---

## Core Color Values

### Dark Mode Accent Colors

These are the primary dark colors used in dark mode styling:

| Color Name | RGB Value | Usage | Tailwind Class |
|-----------|-----------|-------|-----------------|
| Primary Dark Blue | `rgb(4, 35, 51)` | Main dark mode card backgrounds | `dark:bg-[rgb(4,35,51)]` |
| Secondary Dark Blue | `rgb(6, 43, 63)` | Alternative dark mode backgrounds | `dark:bg-[rgb(6,43,63)]` |
| Light Gray | `rgb(231, 234, 236)` | Light text/borders in dark mode | `text-[rgb(231,234,236)]` |

**Location in Code:** `/src/lib/colors.ts` - `darkModeAccents` object

---

## Usage Across Pages

### ✅ Marketplace Page (`/src/pages/Marketplace.tsx`)
**Insurance Plans Card:**
- Container: `className="border-purple-200 dark:bg-[rgb(4,35,51)]"`
- Light Mode: Purple border with light purple background
- Dark Mode: Purple border with dark blue background rgb(4, 35, 51)

**Interior Plan Items:**
- Background: `bg-card/50 border-primary/20`
- Works in both light and dark modes

---

### ✅ Data Vault Page (`/src/pages/DataVault.tsx`)

**Financial Documents Card:**
- Container: `className="border-primary/20 dark:bg-[rgb(4,35,51)]"`
- Dark Mode: Dark blue background appears only when dark mode is enabled

**Identity Documents Card:**
- Container: `className="border-purple-200 dark:bg-[rgb(4,35,51)]"`
- Dark Mode: Dark blue background with purple border

**Other Important Documents Card:**
- Container: `className="border-green-200 dark:bg-[rgb(4,35,51)]"`
- Dark Mode: Dark blue background with green border

**Security Settings Card:**
- Container: `className="border-green-200 bg-green-50/30"`
- Light Mode: Green tinted background
- Dark Mode: Default card styling (inherits theme)

---

### ✅ Interview Tracker Page (`/src/pages/InterviewTracker.tsx`)

**Pipeline Kanban Cards (Applied, Interview, Offer, Rejected):**
- Container: `className={`border-${pipeline.color}-200 dark:bg-[rgb(4,35,51)]`}`
- Dynamic borders based on pipeline status color
- Dark Mode: All sections show dark blue background

**Interview Preparation Card:**
- Container: `className="mt-6 border-primary/20 dark:bg-[rgb(4,35,51)]"`
- Dark Mode: Dark blue background with primary border

---

## Color System Architecture

### Semantic Color Maps (in `/src/lib/colors.ts`)

1. **badgeColors** - Status badges and labels
   - high, medium, low priorities
   - success, warning, error, info statuses
   - notification types and milestones

2. **categoryColors** - Expense/Income categories
   - Food, shopping, utilities, transportation, health, education
   - Salary, freelance, rental, investment, bonus, other

3. **goalStatusColors** - Financial goal states
   - Completed, on_track, at_risk, default

4. **debtTypeColors** - Debt classification
   - Home loan, car loan, credit card, personal loan, default

5. **iconColors** - Icon styling
   - Primary, success, error, warning, info, muted

6. **amountColors** - Financial amounts
   - Positive (income), negative (expense), neutral

7. **progressColors** - Progress indicators
   - Over budget, on track, warning

8. **cardBackgrounds** - Card containers
   - Default, success, warning, error, info, muted

9. **borderColors** - Border styling
   - Primary, success, warning, error, muted

10. **darkModeAccents** - Dark mode specific colors
    - darkBlue1: `rgb(4, 35, 51)` - Primary dark background
    - darkBlue2: `rgb(6, 43, 63)` - Secondary dark background
    - lightGray: `rgb(231, 234, 236)` - Light text/borders

---

## Implementation Guidelines

### Pattern for Dark Mode Only Backgrounds

```tsx
// Light mode uses default colors, dark mode uses custom background
<Card className="border-color-class dark:bg-[rgb(4,35,51)]">
  {/* content */}
</Card>
```

**DO:**
- ✅ Use `dark:bg-[rgb(4,35,51)]` class for dark mode backgrounds
- ✅ Keep border colors in light mode separate
- ✅ Maintain visual hierarchy in both modes
- ✅ Use from `badgeColors` for consistent badge styling

**DON'T:**
- ❌ Use inline `style={{ backgroundColor: "rgb(...)" }}` props
- ❌ Hardcode colors directly in JSX
- ❌ Skip the color system for new components
- ❌ Apply dark backgrounds in light mode

---

## Importing & Using Colors

### In Page Components

```tsx
import { badgeColors, darkModeAccents } from "@/lib/colors";

export default function MyPage() {
  return (
    <>
      {/* Using badge colors */}
      <Badge className={badgeColors.success}>Success</Badge>
      
      {/* Using dark mode accents */}
      <Card className={`border-primary/20 ${darkModeAccents.darkBlue1}`}>
        Content
      </Card>
    </>
  );
}
```

### Accessing Dark Mode Colors

For arbitrary RGB values in Tailwind, use square bracket notation:
```tsx
className="dark:bg-[rgb(4,35,51)]"
className="text-[rgb(231,234,236)]"
```

---

## Pages Using Centralized Colors

| Page | Status | Color Categories Used |
|------|--------|----------------------|
| Dashboard | ✅ Complete | badgeColors, categoryColors, progressColors |
| Coach | ✅ Complete | badgeColors, goalStatusColors, amountColors |
| Expenses | ✅ Complete | badgeColors, categoryColors, amountColors |
| Income | ✅ Complete | badgeColors, categoryColors, amountColors |
| Goals | ✅ Complete | goalStatusColors, badgeColors |
| Debts | ✅ Complete | debtTypeColors, amountColors, progressColors |
| Budget & Expenses | ✅ Complete | badgeColors, categoryColors, progressColors |
| Account | ✅ Complete | badgeColors, amountColors |
| AI Advice | ✅ Complete | badgeColors, categoryColors |
| Bank Sync | ✅ Complete | badgeColors |
| Marketplace | ✅ Complete | badgeColors, darkModeAccents |
| Data Vault | ✅ Complete | badgeColors, darkModeAccents |
| Gamification | ✅ Complete | badgeColors |
| Interview Tracker | ✅ Complete | badgeColors, darkModeAccents |
| Notifications | ✅ Complete | badgeColors |

---

## Dark Mode Support

All colors include dark mode variants using CSS variables and Tailwind's `dark:` prefix:

```tsx
// Light mode: bg-card/50 (default)
// Dark mode: dark:bg-[rgb(4,35,51)] (custom dark background)
<Card className="border-primary/20 dark:bg-[rgb(4,35,51)]">
```

The dark mode toggle uses the system's color scheme preference and can be overridden in user settings.

---

## Consistency Checklist

When adding new features or pages:

- [ ] Import `badgeColors` from `/src/lib/colors.ts`
- [ ] Use semantic color maps instead of hardcoded values
- [ ] For dark backgrounds, use `dark:bg-[rgb(4,35,51)]` class syntax
- [ ] Test in both light and dark modes
- [ ] Avoid inline `style` props for colors
- [ ] Maintain 3:1 contrast ratio minimum for accessibility
- [ ] Document any new color additions in this guide

---

## File Location

**Definition File:** `/src/lib/colors.ts` (238 lines)
**This Guide:** `/COLOR_SYSTEM_GUIDE.md`
**Color Reference:** See `darkModeAccents` object in colors.ts

---

## Notes

- All colors are Tailwind-compatible
- Dark mode is CSS-based (no JavaScript logic needed)
- RGB values can be used with square bracket notation in Tailwind: `[rgb(x,y,z)]`
- Helper functions available: `getBadgeColor()`, `getIconColor()`, `getAmountColor()`
- Last Updated: December 31, 2025
