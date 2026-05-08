# Layout Patterns — Page Shell, Grid, Composition Rules

---

## THE MASTER PAGE SHELL

Every screen in this product shares the exact same outer shell. Never deviate from this structure.

```
┌──────────────────────── TOP NAV BAR ─────────────────────────────────────────────────┐
│  bg: #795cf5  |  height: 40px  |  width: 100% (1440px design base)                  │
│  [Logo 25px] [Menu icon] [Search bar 516px white] [Settings] [Bell] ... [Avatar 25px]│
└──────────────────────────────────────────────────────────────────────────────────────┘
┌─── LEFT APP SIDEBAR ───┬──────────────────── MAIN CONTENT AREA ─────────────────────┐
│   width: 255px         │  bg: #f6f6f7                                                │
│   (global app nav —    │  padding: pt-12px pb-16px px-10px                           │
│   screenshot/image)    │  flex-col, gap-15px                                         │
│                        │                                                              │
│                        │  ┌── BREADCRUMB ROW ────────────────────────────────────┐   │
│                        │  │ flex row, justify-between, items-center              │   │
│                        │  │ Left: "Add Product" (Inter Semi Bold 16px #16151c)   │   │
│                        │  │ Right: "Home / E-Commerce / Campaigns" breadcrumb    │   │
│                        │  └──────────────────────────────────────────────────────┘   │
│                        │                                                              │
│                        │  ┌── THREE-COLUMN LAYOUT ──────────────────────────────┐   │
│                        │  │ flex row, items-start, gap-10px, flex-1              │   │
│                        │  │                                                      │   │
│                        │  │ [LEFT NAV]  [FORM CONTENT]    [PRODUCT SUMMARY]      │   │
│                        │  │  ~200px      flex-1              235px               │   │
│                        │  └──────────────────────────────────────────────────────┘   │
└────────────────────────┴──────────────────────────────────────────────────────────────┘
```

---

## THREE-COLUMN LAYOUT DETAIL

### Column 1: Left Nav Panel
```css
width: auto (shrink-0, content-width ~200px)
background: #ffffff
border: 1px solid #eeedf0
border-radius: 12px
padding: 10px 12px
flex-direction: column
gap: 12px (between nav items)
```

### Column 2: Form Content Area
```css
flex: 1
min-width: 0
flex-direction: column
gap: 16px (between white cards)
align-items: flex-start
```
- Contains one or more white form cards stacked vertically
- Each card is self-contained with its own `p-16px` and `gap-16px`

### Column 3: Product Summary Panel
```css
width: 235px
flex-shrink: 0
background: #ffffff
border-radius: 12px
padding: 16px
flex-direction: column
gap: 16px
align-items: center
```

---

## FORM CARD INTERNAL GRID

### Standard single-column card
```
flex-col, gap-16px, full width

┌─ Card header (title + subtitle) ─────────────┐
│  Title: Inter Semi Bold 14px #16151c          │
│  Subtitle: Inter Regular 14px #686379         │
└───────────────────────────────────────────────┘
┌─ Field 1 ─────────────────────────────────────┐
│  Label                                         │
│  [Input box                               ]    │
│  Helper text (optional)                        │
└───────────────────────────────────────────────┘
← 16px gap →
┌─ Field 2 ─────────────────────────────────────┐
│  ...                                           │
└───────────────────────────────────────────────┘
```

### Two-column field row
```
flex row, gap-16px, full width

┌─ Field A (flex-1) ────┐  ┌─ Field B (flex-1) ────┐
│  Label                │  │  Label                 │
│  [Input           ]   │  │  [Input           ]    │
└───────────────────────┘  └────────────────────────┘
```
Used for: Purchase Price + Selling Price, Location Type + Select Location, etc.

### Fixed-width field in a row
```
flex row, gap-16px, align-items: flex-end

┌─ Field A (320px) ──────┐  ┌─ Field B (flex-1) ────┐
│  Label [Toggle]        │  │  Label                 │
│  [Input           ]    │  │  [Input           ]    │
└────────────────────────┘  └────────────────────────┘
```

### Repeatable row (Inventory Allocation, Recipe)
```
flex row, gap-16px, align-items: flex-end, full width

┌─ Loc Type (flex-1) ┐  ┌─ Location (flex-1) ┐  ┌─ Qty ───┐  ┌─ Alert ─┐  [🗑]
│  Label             │  │  Label             │  │  Label  │  │  Label  │
│  [Dropdown     ▼]  │  │  [Dropdown     ▼]  │  │  [Text] │  │  [Text] │
└────────────────────┘  └────────────────────┘  └─────────┘  └─────────┘
                                                                           ↑ 16px trash icon, color #686379
                                                                           aligned to bottom (pb-9px from bottom of row)
```

---

## SPACING SYSTEM IN PRACTICE

### Within a form card
```
Card padding:           16px all sides
Gap between fields:     16px
Label → input gap:       6px
Input → helper gap:      6px
Two-col horizontal gap: 16px
```

### Between cards (in form content column)
```
Gap: 16px (flex-col gap on the form content wrapper)
```

### Within nav panel
```
Panel padding:         px-10px py-12px
Gap between nav items: 12px
Nav item padding:      px-8px py-4px
Icon → label gap:      8px
```

### Main content area
```
Outer padding:   pt-12px pb-16px px-10px
Section gap:     15px (breadcrumb row → 3-column layout)
Column gap:      10px (between the 3 panels)
```

---

## SECTION/STEP PATTERNS

### Basic
- 1 card
- Fields: Product Name → Product Type (radio) → Description (rich textarea) → Product Tags

### Organization
- 1 card
- Fields: 2-col (Brand + Default Supplier) → 2-col (Category + Online Category) → 2-col (Made In + HS Code) → Design/Pattern

### Inventory
- 3 stacked cards:
  1. Inventory & Availability (SKU, Barcode, UOM, Rack)
  2. Inventory Allocation (toggle container → repeatable row → Add More)
  3. Channel Availability (Ecommerce toggle + POS toggle + Store multiselect)

### Media
- 1 card
- Fields: Upload Image (drag-drop zone) → Product Video (text + link icon)

### Variants
- 1 card
- Empty state: centered icon + centered text + centered ghost button

### Variants Detail Page
- Different header: title + back arrow + Cancel/Save buttons in a white bar
- Then: Product preview card (706px) + Pricing card + Inventory Allocation card + Recipe card

### Ecommerce
- 2 stacked cards:
  1. Ecommerce & SEO (URL Slug, Meta Title, Meta Description, Meta Keywords, Featured checkbox)
  2. Open Graph (OG Title, OG Description, OG Type dropdown, OG Image)

### Advanced Settings
- 1 card
- Content: 2 accordion items (Expiry Settings, Other Settings) — collapsed by default

### Recipe
- 2 stacked cards:
  1. "Have Recipe?" header
  2. "This product has a recipe" checkbox in gray container (+ form when enabled)

---

## VARIANT DETAIL PAGE — DIFFERENT SHELL

The Variant Detail Page uses a modified shell without the standard breadcrumb. Instead:

```
┌─ White header card (full-width, inside form column) ──────────────────────────────┐
│  flex row, items-center, justify-between                                           │
│  Left: [← arrow icon] + "Variant Detail Page" (Inter Semi Bold 14px #16151c)      │
│  Right: [Cancel button (outline 30px)] + [Save Variant button (primary 30px)]     │
└───────────────────────────────────────────────────────────────────────────────────┘
┌─ Product preview card (706px wide, NOT full width) ───────────────────────────────┐
│  flex row, items-center, justify-between                                           │
│  Left: [132×132 thumbnail] + product name + variant count + attribute badge        │
│  Right: "Show Variants" text + chevron-down                                        │
└───────────────────────────────────────────────────────────────────────────────────┘
[Pricing & Taxation card — full width]
[Inventory Allocation card — full width]
[Have Recipe card — full width]
```

---

## EMPTY STATE PATTERN

Used on Variants screen (and any section with no data yet):

```
flex-col, items-center, justify-center, gap-16px
inside white card with standard padding

[centered 32px icon — Vuesax linear, color #795cf5]
[centered text — Inter Regular 14px #686379]
[centered ghost button — h-30px, #f1effe bg, #795cf5 text]
```

---

## PRODUCT LIST PAGE SHELL

Completely different from the Add Product shell:

```
┌──────────────────────── TOP NAV BAR ─────────────────────────┐
│  bg: #795cf5 | height: 40px                                   │
└───────────────────────────────────────────────────────────────┘
┌─── LEFT APP SIDEBAR (Ecommerce) ──────┬─── MAIN LIST AREA ───┐
│  bg: #ffffff                          │  bg: #f6f6f7          │
│  Active section has purple fill bg    │  p-16px               │
│  on left sidebar item                 │                        │
│  Sidebar items: icon + label          │  [Tabs row]           │
│                                       │  [Toolbar row]        │
│                                       │  [Stat cards row]     │
│                                       │  [Data table]         │
│                                       │  [Pagination]         │
└───────────────────────────────────────┴────────────────────────┘
```

### Stat cards row
```
flex row, gap-16px, full width
4 cards equal width (flex-1)
Each: white bg, br-12px, p-16px, flex row
  Left: 40px icon circle (semantic color bg)
  Right: flex-col — label (12px #686379) + value (Semi Bold 24px #16151c)
```

### Toolbar row
```
flex row, justify-between, items-center
Left: [checkbox icon] [table-view icon — active, purple] [compact-view icon] [25 per page dropdown]
Right: [search icon] [filter icon] [+ Add Product button — primary 36px] [more ...]
```

### Table header
```
background: #f6f6f7
height: 40px
padding: px-16px
text: Inter Medium 12px #686379
border-bottom: 1px solid #e0dfe4
columns: [checkbox] Actions | ID ↑↓ | UPC ↑↓ | SKU ↑↓ | Name ↑↓ | Product Type ↑↓ | UOM ↑↓ | Category ↑↓ | Supplier ↑↓ | Quantity ↑↓
```

### Table row
```
height: 48px
padding: px-16px
border-bottom: 1px solid #e0dfe4
text: Inter Regular 14px #16151c
```
- Row action icons: eye, pencil, image, 3D-box (all 16px, color `#686379`)
- Quantity badges: W0 (amber), S4 (green), PF2 (purple) — pill badges `px-6px py-2px br-4px`
