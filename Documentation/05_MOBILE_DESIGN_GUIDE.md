# Mobile Design & Responsive Guide

## 📱 Mobile-First Approach

Cleero Financial Compass is designed with a mobile-first approach, ensuring excellent experience on all devices.

---

## Breakpoints & Screen Sizes

```
Mobile:       0px - 640px  (SM)
Tablet:       641px - 1024px (MD)
Desktop:      1025px - 1280px (LG)
Large Desktop: 1281px+ (XL)
```

---

## Mobile Navigation Structure

### **Bottom Navigation** (Mobile Only)
```
┌────────────────────────────────────┐
│                                    │
│         PAGE CONTENT               │
│                                    │
│                                    │
│                                    │
│                                    │
├────────────────────────────────────┤
│ 🏠 Home │ 💳 Debts │ 💰 Budget   │
│ 📊 Goals│ ⚙️ Account│              │
└────────────────────────────────────┘
```

### **Mobile Header**
```
┌────────────────────────────────────┐
│ ☰ Menu │ Page Title  │ 🔔 📱 👤  │
└────────────────────────────────────┘

Menu Options:
├─ Dashboard
├─ Debts
├─ Budget & Expenses
├─ Income
├─ Goals
├─ Investments
├─ Reports
├─ AI Advice
├─ Coach
├─ Bill Reminders
├─ Bank Sync
├─ Data Vault
├─ Notifications
├─ Settings
└─ Logout
```

---

## Responsive Layout Patterns

### **Dashboard - Mobile**
```
[Mobile Header]

[KPI Cards - Stacked]
├─ Total Debt
├─ Monthly EMI
├─ Savings
└─ Debt Reduced

[Income vs Expense Chart - Responsive]

[AI Coach Card]

[XP Level Card]

[EMI List]

[Debt Timeline - Horizontal Scroll]

[Recommendations - Stack]

[Bottom Navigation]
```

### **Debts - Mobile**
```
[Mobile Header]

[Summary Stats - Scrollable]

[Filter & Search]

[Debt Cards - Full Width]
├─ Debt Card 1
├─ Debt Card 2
├─ Debt Card 3
└─ ...

[Swipe for more options]

[Bottom Navigation]
```

### **Budget & Expenses - Mobile**
```
[Mobile Header]

[Summary Stats - Horizontal Scroll]

[Tabs - Swipeable]

[Chart - Responsive Height]

[Categories - Collapsible List]

[Recent Transactions - List View]

[Bottom Navigation]
```

---

## Touch & Interaction Optimization

### **Touch Targets**
- Minimum tap size: 44x44 pixels
- Spacing between targets: 8 pixels minimum
- Buttons: 48x48 pixels preferred

### **Swipe Gestures**
- **Swipe Left**: Next item or options menu
- **Swipe Right**: Previous item or back
- **Swipe Up**: Load more content
- **Swipe Down**: Refresh data

### **Long Press**
- Open context menu on cards
- Select multiple items
- Copy information

### **Pull-to-Refresh**
- Available on main content areas
- Refreshes latest data
- Shows loading state

---

## Mobile Form Optimization

### **Input Fields**
- Full width on mobile
- Large font size (16px minimum)
- Clear labels above fields
- Error messages in red
- Success indicators in green

### **Select/Dropdown**
- Native select on mobile
- Easy to tap options
- Large option height (44px+)

### **Date Picker**
- Native date picker on mobile
- Calendar view on tap
- Year/Month/Day selection

### **Currency Input**
- Numeric keyboard displayed
- Currency symbol shown
- Clear formatting

---

## Mobile Cards & Lists

### **Card Properties**
- Full width: 100% - 16px padding
- Margin: 8px bottom
- Corner radius: 12px
- Shadow: Subtle
- Touch feedback: Highlight on tap

### **List Behavior**
- Infinite scroll with pagination
- Pull-to-refresh at top
- Load more button at bottom
- Empty state message when no data

---

## Mobile Modals & Bottom Sheets

### **Bottom Sheet** (Preferred for Mobile)
```
┌────────────────────────────────┐
│ ▬ Handle                       │
├────────────────────────────────┤
│                                │
│ Sheet Content                  │
│ (Scrollable if needed)         │
│                                │
│                                │
│ [Action Button]                │
│                                │
└────────────────────────────────┘
```

### **Modal** (Fullscreen on Mobile)
```
┌────────────────────────────────┐
│ X  Title                [Done] │
├────────────────────────────────┤
│                                │
│ Modal Content                  │
│ (Scrollable)                   │
│                                │
│                                │
├────────────────────────────────┤
│ [Cancel]          [Action]     │
└────────────────────────────────┘
```

---

## Mobile Keyboard Behavior

```
iPhone/Android Keyboard:
┌────────────────────────────────┐
│ [Input Field]                  │
├────────────────────────────────┤
│                                │
│  Content (Pushed Up)           │
│  with scroll available         │
│                                │
│  Additional Fields             │
│                                │
├────────────────────────────────┤
│  [Keyboard with Numbers/Letters]
└────────────────────────────────┘
```

---

## Performance Optimizations for Mobile

### **Image Optimization**
- WebP format with fallback
- Responsive image sizes
- Lazy loading for images
- Compressed for mobile networks

### **Bundle Size**
- Code splitting by page
- Tree-shaking unused code
- Minified CSS/JS
- Critical CSS inlined

### **Network**
- API response caching
- Offline fallback UI
- Progressive loading states
- Optimized API calls

### **Rendering**
- Virtual scrolling for long lists
- Memoized components
- Debounced search
- Throttled resize listeners

---

## Mobile Testing Checklist

- [ ] All text readable (16px minimum)
- [ ] Touch targets are 44x44px minimum
- [ ] Spacing is adequate for thumbs
- [ ] No horizontal scroll on main content
- [ ] Forms are easily fillable
- [ ] Modals are dismissible
- [ ] Navigation is accessible
- [ ] Images load quickly
- [ ] Keyboard doesn't hide inputs
- [ ] Bottom navigation always accessible
- [ ] Pull-to-refresh works
- [ ] Loading states are clear
- [ ] Error messages are visible
- [ ] No layout shifts during load

---

## Android vs iOS Specific

### **iOS Considerations**
- Safe area padding (notch)
- Bottom safe area (home bar)
- Apple-style keyboard
- Haptic feedback support
- Dark mode support

### **Android Considerations**
- System bar styling
- Navigation gestures
- Back button handling
- Material Design compliance
- Android keyboard

---

## Common Mobile Issues & Solutions

### **Issue: Buttons Too Close**
**Solution**: Increase padding, use full-width buttons

### **Issue: Text Too Small**
**Solution**: 16px minimum, use hierarchy with bold

### **Issue: Horizontal Scroll**
**Solution**: Use vertical stacking, responsive design

### **Issue: Keyboard Overlapping**
**Solution**: Adjust form layout, use bottom sheets

### **Issue: Slow Loading**
**Solution**: Lazy load, optimize images, cache data

### **Issue: Battery Drain**
**Solution**: Reduce animations, optimize re-renders

---

## Accessibility on Mobile

### **Touch Friendly**
- Large buttons & links
- Adequate spacing
- Clear visual feedback

### **Text & Contrast**
- High contrast colors
- Readable font sizes
- Clear labels

### **Screen Readers**
- Semantic HTML
- ARIA labels
- Alt text for images
- Proper heading hierarchy

### **Keyboard Navigation**
- Tab order correct
- Focus visible
- Keyboard accessible

---

## Mobile Testing Tools

- Chrome DevTools Mobile View
- Firefox Developer Edition
- Safari Web Inspector (iPad)
- Real device testing
- BrowserStack
- Lighthouse

---

# Component Library Reference

## UI Components Used

### **Layout Components**
- Header: App title, search, user menu
- Sidebar: Navigation menu (desktop)
- BottomNav: Navigation tabs (mobile)
- MobileHeader: Simplified header (mobile)
- Container: Content wrapper

### **Card Components**
- Card: Base card container
- CardContent: Card body
- CardDescription: Subtitle text
- CardHeader: Header section
- CardTitle: Title text

### **Button Components**
- Button: Primary, secondary, outline variants
- IconButton: Icon-only buttons
- FloatingActionButton: Fixed action button

### **Input Components**
- Input: Text input field
- Textarea: Multi-line input
- Select: Dropdown selector
- DatePicker: Date selection
- Checkbox: Boolean selection
- RadioGroup: Single option selection
- Switch: Toggle switch

### **Display Components**
- Badge: Labels & tags
- Avatar: User profile pictures
- Progress: Progress bar
- Separator: Visual divider
- Tooltip: Hover information

### **Dialog Components**
- Dialog/Modal: Fullscreen dialog
- Drawer: Side panel
- AlertDialog: Alert with action
- DropdownMenu: Context menu
- Popover: Floating content

### **Navigation Components**
- Tabs: Horizontal tabs
- NavLink: Navigation links
- Breadcrumb: Path navigation

### **Data Display**
- Table: Tabular data
- List: Item lists
- Accordion: Collapsible sections
- Carousel: Image carousel

### **Chart Components** (Recharts)
- LineChart: Line graph
- BarChart: Bar graph
- PieChart: Pie chart
- AreaChart: Area graph
- ScatterChart: Scatter plot

### **Status Components**
- Toast/Toaster: Notifications
- Spinner: Loading indicator
- Skeleton: Content placeholder
- EmptyState: No data message

---

## Icon Library

**Lucide React Icons** used throughout:
- wallet, trending-down, credit-card, piggy-bank
- plus, edit, delete, download
- calendar, clock, alert-circle, check-circle
- chart-line, bar-chart, pie-chart
- home, settings, notifications
- and 400+ more icons available

---

## Color Palette

### **Primary Colors**
- Primary Blue: #0066FF
- Dark Blue: #003D99
- Light Blue: #E6F0FF

### **Semantic Colors**
- Success Green: #10B981
- Warning Yellow: #F59E0B
- Error Red: #EF4444
- Info Blue: #3B82F6

### **Neutral Colors**
- Dark: #1F2937
- Light: #F3F4F6
- Border: #E5E7EB

### **Backgrounds**
- Light Mode: #FFFFFF
- Dark Mode: #0F172A
- Surface: #F9FAFB

---

## Typography

### **Font Stack**
- Primary: 'Poppins', sans-serif
- Fallback: System fonts

### **Font Sizes**
- H1: 32px / 2rem
- H2: 28px / 1.75rem
- H3: 24px / 1.5rem
- H4: 20px / 1.25rem
- Body: 16px / 1rem
- Small: 14px / 0.875rem
- Tiny: 12px / 0.75rem

### **Font Weights**
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

### **Line Heights**
- Tight: 1.25
- Normal: 1.5
- Relaxed: 1.75

---

## Spacing System

```
Base unit: 4px

Spacing values:
2px (0.5 unit)   - Fine details
4px (1 unit)     - Minimal spacing
8px (2 units)    - Small gaps
12px (3 units)   - Default padding
16px (4 units)   - Standard margin
20px (5 units)   - Large gaps
24px (6 units)   - Section spacing
32px (8 units)   - Major sections
40px (10 units)  - Page sections
```

---

## Border Radius

```
Subtle: 4px
Standard: 8px
Medium: 12px
Large: 16px
Full: 50% (circles)
```

---

## Shadows

```
Subtle:     0 1px 2px rgba(0,0,0,0.05)
Base:       0 1px 3px rgba(0,0,0,0.10)
Medium:     0 4px 6px rgba(0,0,0,0.15)
Large:      0 10px 15px rgba(0,0,0,0.20)
XL:         0 20px 25px rgba(0,0,0,0.25)
```

---

## Animation Durations

```
Fast:     150ms (Hover, focus states)
Standard: 300ms (Page transitions)
Slow:     500ms (Modal opens)
VarSlow:  700ms (Entrance animations)
```

---

## Component Usage Examples

### **Button**
```tsx
<Button variant="default" size="md" onClick={action}>
  Click Me
</Button>

<Button variant="outline" size="sm">
  Secondary
</Button>

<Button variant="destructive" size="lg">
  Delete
</Button>
```

### **Card**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

### **Input**
```tsx
<Input
  type="email"
  placeholder="Enter email"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

### **Dialog**
```tsx
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
    </DialogHeader>
    Content
  </DialogContent>
</Dialog>
```

---
