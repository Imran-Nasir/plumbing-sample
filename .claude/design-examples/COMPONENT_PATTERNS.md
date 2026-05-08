# Component Patterns — Visual Specs & States

All components documented here are derived from the live Figma audit of the Add Product Module.
Every state, size, and variant is exact — do not deviate.

---

## INPUT FIELD

### Anatomy
```
[Label row]           ← Inter Medium 14px #16151c   (+ optional toggle/badge on right)
[Input box]           ← h-30px, border-radius 8px
[Helper / error text] ← Inter Regular 12px, gap 6px below input
```

### Structure (flex-col, gap-6px)
- **Label row**: flex row, items-center, justify-between
  - Left: label text (`Inter Medium 14px #16151c`)
  - Right (optional): inline Toggle, Badge, or Help icon
- **Input box**: `h-30px`, `border-radius: 8px`, `px-14px py-7px`, `bg white`
  - Left slot (optional): 16px icon (link, upload, etc.) with `gap-8px`
  - Text area: `flex-1`, `Inter Regular 12px`
  - Right slot (optional): dropdown arrow, help icon, stepper arrows
- **Helper text** (optional): `Inter Regular 12px #686379`, `gap-6px` from input bottom
- **Char counter** (optional): `Inter Regular 12px #686379`, format `0/60 characters`
- **Error message**: `Inter Regular 12px #df201e`, `gap-6px` from input bottom

### States
| State | Border | Background | Shadow |
|---|---|---|---|
| Default | `1px solid #e0dfe4` | `#ffffff` | none |
| Hover | `1px solid #e0dfe4` | `#ffffff` | `0px 1px 2px rgba(16,24,40,0.05)` |
| Focused | `1px solid #aca1fa` | `#ffffff` | `0 0 0 4px #f1effe, 0 1px 2px rgba(16,24,40,0.05)` |
| Filled | `1px solid #e0dfe4` | `#ffffff` | `0px 1px 2px rgba(16,24,40,0.05)` |
| Error/Destructive | `1px solid #df201e` | `#ffffff` | `0 0 0 4px #fef1f0` |
| Disabled | `1px solid #e0dfe4` | `#f6f6f7` | none |

### "REQUIRED" tag
- Shown inline on the right inside the input box
- Text: `Inter Regular 12px #686379`, uppercase, content: "REQUIRED"
- Not a separate badge — it's plain text inside the input container aligned right

### Input with Dropdown Arrow
- Right-side: `vuesax/linear/arrow-down` icon, 16px, color `#686379`
- Filled value text: `Inter Regular 12px #16151c` (not placeholder color)

### Input with Help Icon + Tooltip
- Right-side: `help-circle` icon, 16px
- Tooltip: dark (`bg #16151c`), `px-12px py-8px`, `border-radius: 8px`, white `Inter Regular 12px`, downward triangle caret
- Tooltip shadow: `0px 12px 8px rgba(16,24,40,0.08), 0px 4px 3px rgba(16,24,40,0.03)`

### Input with Left Icon
- Left of text: 16px icon (link/upload), color `#686379`, `gap-8px` to text

---

## TEXTAREA

### Default (plain)
- Same border/bg/radius rules as Input
- `min-height: 154px`
- Padding: `px-14px pt-6px pb-9px`
- Placeholder: `Inter Regular 12px #686379`
- No bottom toolbar

### Rich Text Textarea (Description field)
- Same outer box as plain textarea
- Bottom toolbar strip:
  - Background: `#f6f6f7`
  - Height: ~41px
  - Border-top: `1px solid #e0dfe4`
  - Contains: Bold (B), Italic (I), Title (T), Strikethrough (T̶), Underline (U), alignment icons (×5), link icon
  - Icons are 16–20px, color `#686379`
  - Toolbar is part of the textarea container, not outside it

---

## BUTTON

### Primary (Large) — "Save Product", "Save Variant"
```
height: 36px
background: #795cf5
border: 1px solid #795cf5
border-radius: 8px
padding: px-16px py-10px
text: Inter Semi Bold 14px white
```
- Optional right icon: 16px (chevron/arrow), `gap-8px`

### Primary (Small) — "Save Variant", "Add Material"
```
height: 30px
background: #795cf5
border: 1px solid #795cf5
border-radius: 8px
padding: px-14px py-8px
text: Inter Semi Bold 14px white
```
- Optional left icon: 16px tick/check icon, `gap-8px`

### Secondary / Ghost — "Save as Draft", inline ghost buttons
```
height: 36px (large) / 30px (small)
background: #f1effe
border: 1px solid #f1effe
border-radius: 8px
padding: same as primary equivalent
text: Inter Semi Bold 14px #795cf5
```

### Outline — "Cancel"
```
height: 30px
background: #ffffff
border: 1px solid #e0dfe4
border-radius: 8px
padding: px-14px py-8px
text: Inter Semi Bold 14px #16151c
```

### Full-Width Ghost "Add More"
```
height: 30px
background: #f1effe
border: 1px solid #f1effe
border-radius: 8px
padding: px-14px py-8px
width: 100%
text: Inter Semi Bold 14px #795cf5
left icon: 16px plus icon
gap: 8px between icon and text
```

---

## BADGE

### Gray (default / channel)
```
background: #f6f6f7
border-radius: 6px
padding: px-8px py-2px
text: Inter Medium 12px #464253
NO mix-blend-multiply
```

### Success
```
background: #e5fff9
border-radius: 6px
padding: px-8px py-2px
text: Inter Medium 12px #09786a
mix-blend-multiply: yes
```

### Error / Dot
```
background: #fef1f0
border-radius: 6px
padding: pl-6px pr-8px py-2px
left: 8px red dot (filled circle, color #df201e)
gap: 6px between dot and text
text: Inter Medium 12px #df201e
mix-blend-multiply: yes
```

### Multi-value Gray Badge (variant attributes)
```
Same as Gray badge
Contains: Text + 4px separator dot + Text
e.g. "Small · Cotton"
```

---

## TOGGLE

```
width: 36px
height: 20px
border-radius: 10px (fully round)
```
- **On (pressed)**: purple (`#795cf5` thumb track)
- **Off (not pressed)**: gray
- Label appears to left only when `text=true` (not used in this module)
- Used inline with label row for optional feature switches

---

## CHECKBOX

### Unchecked (Default)
```
size: 16px × 16px
border-radius: 4px
background: #ffffff
border: 1px solid #686379
```

### Checked
```
size: 16px × 16px
border-radius: 4px
background: #f1effe
border: 1px solid #795cf5
contains: white checkmark icon centered
```

### Focused (unchecked)
```
background: #ffffff
border: 1px solid #795cf5
box-shadow: 0 0 0 4px #f1effe
```

### Checkbox with Label + Supporting Text
```
flex row, items-start, gap-8px
left: checkbox (pt-2px to align with first line)
right: flex-col
  top: Inter Medium 14px #16151c (label)
  bottom: Inter Regular 14px #686379 (supporting text)
```

---

## RADIO BUTTON (Product Type)

### Option card structure
```
flex row, items-center, gap-12px
border: 1px solid #e0dfe4 (default) / #795cf5 (selected)
border-radius: 8px
background: #ffffff (default) / #f1effe (selected)
padding: 12px 16px
```
- Left: standard radio circle (16px)
- Right: flex-col
  - Top: `Inter Medium 14px #16151c` — option name
  - Bottom: `Inter Regular 12px #686379` — option description

### Radio Group Layout
- 3 cards side-by-side, `gap-16px`, equal width (flex-1 each)

---

## NAV SIDEBAR (AddProductSideBar)

### Container
```
background: #ffffff (gradient fallback to #f1effe)
border: 1px solid #eeedf0
border-radius: 12px
padding: px-10px py-12px
flex-col, gap-12px inside
```

### Nav Item (inactive)
```
flex row, items-center, gap-8px
padding: px-8px py-4px
Icon circle:
  size: 32px × 32px
  background: #f6f6f7
  border-radius: 100px
  padding: 8px
  icon: 16px, color #686379
Label: Inter Medium 14px #16151c
```

### Nav Item (active/selected)
```
Same as inactive but:
Icon circle background: #f1effe
Icon color: #795cf5
Label: Inter Medium 14px #795cf5
```

### Nav Item (has required dot indicator)
```
Same as inactive but:
Right side of label row: 8px dot, filled red (#df201e)
Indicates step has required fields not yet completed
```

### Nav Item (Basic — special treatment)
```
Icon circle: 32px, background matches active/inactive
Label area: flex row, justify-between
  Left: "Basic" — Inter Medium 16px #16151c (slightly larger than other items)
  Right: 8px completion dot
```

---

## PRODUCT SUMMARY PANEL

### Container
```
width: 235px
background: #ffffff
border-radius: 12px
padding: 16px
flex-col, gap-16px
```

### Header
```
Inter Medium 16px #16151c — "Product Summary"
```

### Data rows (gap-8px between rows)
Each row:
```
flex-col, gap-4px
Label: Inter Regular 12px #686379
Value: Inter Medium 14px #24222d
```

### Status row (contains badge)
```
Label: Inter Regular 12px #686379
Badge below label (not inline)
```

### Stock Status row (badge + unit count)
```
flex row, justify-between
Left: Error dot badge
Right: "0 units" Inter Medium 14px #24222d
```

### CTA buttons (gap-8px)
1. "Save Product" — Primary large (36px), full width, right chevron icon
2. "Save as Draft" — Secondary large (36px), full width, text only

---

## CARD / FORM SECTION

### Standard white form card
```
background: #ffffff
border-radius: 12px
padding: 16px
flex-col, gap-16px
```

### Card header (title + subtitle)
```
flex-col, gap-4px, full width
Title: Inter Semi Bold 14px #16151c
Subtitle: Inter Regular 14px #686379
```

### Subtle gray container (toggle wrapper, recipe enable)
```
background: #f6f6f7
border-radius: 8px
padding: 12px
flex row, items-center
```

### Accordion item (Advanced Settings)
```
background: #ffffff
border: 1px solid #e0dfe4
border-radius: 12px
padding: 16px
flex row, items-center, justify-between
Left: Inter Semi Bold 14px #16151c (title)
Right: 16px arrow-down icon
Collapsed by default
```

---

## TOOLTIP

```
background: #16151c
border-radius: 8px
padding: px-12px py-8px
max-width: 244px
text: Inter Regular 12px #ffffff
shadow: 0px 12px 8px rgba(16,24,40,0.08), 0px 4px 3px rgba(16,24,40,0.03)
```
- Caret: downward-pointing triangle at bottom center (6px × 16px)
- Appears above the trigger element
- Trigger: help-circle icon (16px) on right side of input

---

## STAT CARD (Product List view)

```
flex row, items-center, gap-16px
background: #ffffff (or subtle tinted bg per metric type)
border-radius: 12px
padding: 16px
flex-1 (4 cards in a row, equal width)
```
- Left: 40px icon circle with semantic color bg
- Right: flex-col
  - Label: Inter Regular 12px #686379
  - Value: Inter Semi Bold 24px #16151c (large number emphasis)

---

## DATA TABLE (Product List)

### Table container
```
background: #ffffff
border-radius: 12px
overflow: hidden
```

### Table header row
```
background: #f6f6f7
height: 40px
padding: px-16px
text: Inter Medium 12px #686379
border-bottom: 1px solid #e0dfe4
```
- Sort icon (↑↓ bidirectional arrows) after each column label

### Table data row
```
height: 48px
padding: px-16px
border-bottom: 1px solid #e0dfe4
text: Inter Regular 14px #16151c
```
- Row actions on far left: checkbox, eye (view), pencil (edit), image, 3D-box icons
- Quantity column: colored mini badges (W0, S4, PF2) — amber/green/purple tinted pills

### Pagination
```
flex row, justify-between, items-center
Previous / Next buttons: outline style
Page numbers: Inter Medium 14px, active page #795cf5, others #686379
```

---

## UPLOAD ZONE (Media screen)

```
border: 2px dashed #e0dfe4
border-radius: 8px
background: #ffffff
padding: 24px
flex-col, items-center, gap-8px
```
- Top: upload icon (32px, `#795cf5`)
- Text: "Click to upload" (`#795cf5`, underline-style link) + " or drag and drop" (`#686379`)
- Sub-text: `Inter Regular 12px #686379` — "SVG, PNG, JPEG or GIF (max. 800×400px)"

---

## BREADCRUMB

```
flex row, items-center, gap-4px
```
- Current section: `Inter Medium 12px #16151c`
- Separator: small chevron icon (~6px × 12px), color `#686379`
- Inactive segments: `Inter Regular 12px #686379`
- Pattern: "Home / E-Commerce / Campaigns"
- Always positioned top-right of main content area

---

## REPEATABLE ROW (Inventory Allocation, Recipe Materials)

### Row structure
```
flex row, items-end (align bottom), gap-16px, full width
```
- Multiple input fields side-by-side (2–4 per row)
- Far right: trash icon button (`16px`, `#686379`)
- Below last row: full-width "Add More" ghost button

### Row fields pattern
- Location Type (dropdown) + Select Location (dropdown) + Qty (text) + Alert (text) + [trash]
- Or: Category (dropdown) + Raw Material (dropdown) + Quantity (stepper) + [action buttons]
