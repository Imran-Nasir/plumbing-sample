# Design System Reference Skill

You are generating UI for a product that has a strict, established design system. Before writing any UI code, read and internalize all files in `.claude/design-examples/`. Then apply every rule, token, spacing value, and pattern documented there — without deviation.

## How to use this skill

Invoke this command before generating any screen, component, or layout:

```
/design-system [describe what you want to build]
```

Example:
```
/design-system Build the Organization step form for the Add Product module
```

---

## Step 1 — Read the design reference files

Read all of the following files before writing a single line of UI code:

- @.claude/design-examples/DESIGN_SYSTEM.md
- @.claude/design-examples/COMPONENT_PATTERNS.md
- @.claude/design-examples/LAYOUT_PATTERNS.md
- @.claude/design-examples/SCREENSHOT_GUIDE.md

---

## Step 2 — Study the reference screenshots

All reference screenshots live in `.claude/design-examples/screenshots/`. Read each one visually before designing. They represent the exact quality bar to match:

| File | What it shows |
|---|---|
| `01-basic-default.png` | Add Product — Basic screen, default state |
| `02-basic-tooltip.png` | Add Product — Basic screen, nav tooltip hover state |
| `03-basic-validation.png` | Add Product — Basic screen, form validation/error state |
| `04-product-list.png` | Ecommerce — Product list view with data table and stat cards |

---

## Step 3 — Apply these non-negotiable rules

Before outputting any code, verify each rule is satisfied:

### Layout
- [ ] Page uses the 3-column shell: Left Nav Panel + Form Area (flex-1) + Product Summary (235px)
- [ ] Main content area background is `#f6f6f7`, padding `pt-12px pb-16px px-10px`, gap `15px`
- [ ] All form sections are white cards: `border-radius: 12px`, `padding: 16px`, `gap: 16px`
- [ ] Column gap between the three panels is `10px`

### Spacing
- [ ] Gap between input fields: **16px** (flex-col gap on form card)
- [ ] Gap between label and input box: **6px**
- [ ] Gap between input box and helper/error text: **6px**
- [ ] Side-by-side field columns: **16px** horizontal gap
- [ ] Nav item padding: `px-8px py-4px`, icon-to-label gap: `8px`

### Typography — Inter only
- [ ] Section card title: Inter Semi Bold 14px `#16151c`
- [ ] Section card subtitle: Inter Regular 14px `#686379`
- [ ] Field label: Inter Medium 14px `#16151c`
- [ ] Input value (filled): Inter Regular 12px `#16151c`
- [ ] Input placeholder: Inter Regular 12px `#686379`
- [ ] Helper/error text: Inter Regular 12px
- [ ] Badge text: Inter Medium 12px
- [ ] Page/module title: Inter Semi Bold 16px `#16151c`
- [ ] Button label: Inter Semi Bold 14px

### Colors
- [ ] Primary action: `#795cf5` (BrandPurple/500)
- [ ] Secondary action bg: `#f1effe` (BrandPurple/50), text `#795cf5`
- [ ] Page background: `#f6f6f7`
- [ ] Card/panel background: `#ffffff`
- [ ] Input border default: `1px solid #e0dfe4`
- [ ] Input border focused: `1px solid #aca1fa` + `box-shadow: 0 0 0 4px #f1effe`
- [ ] Input border error: `1px solid #df201e` + `box-shadow: 0 0 0 4px #fef1f0`
- [ ] Error text: `#df201e` (BrandRed/600)
- [ ] Success badge: bg `#e5fff9`, text `#09786a`
- [ ] Error badge: bg `#fef1f0`, text `#df201e`
- [ ] Gray badge: bg `#f6f6f7`, text `#464253`

### Input Fields
- [ ] Height: `30px`, border-radius: `8px`
- [ ] Padding: `px-14px py-7px`
- [ ] Dropdown arrow: `vuesax/linear/arrow-down` icon 16px on right

### Buttons
- [ ] Primary large: `h-36px`, `border-radius: 8px`, `px-16px py-10px`
- [ ] Primary small / action: `h-30px`, `border-radius: 8px`, `px-14px py-8px`
- [ ] Ghost "Add More": `h-30px`, bg `#f1effe`, text `#795cf5`, full width

### Validation / Error State
- [ ] Error input: red border `#df201e`, red glow `box-shadow: 0 0 0 4px #fef1f0`
- [ ] Error message below field: Inter Regular 12px `#df201e`, gap 6px from input
- [ ] Required tag: shown inside input on right side, `Inter Regular 12px #686379` uppercase text "REQUIRED"
- [ ] Nav sidebar items for incomplete steps: show small red dot (8px) on right

### Top Nav Bar
- [ ] Height: `40px`, full width, background: `#795cf5`

---

## Step 4 — Output format

Generate complete, production-ready component code following the project's existing stack (Next.js + Tailwind). Map every design token to its Tailwind equivalent or CSS variable. Do not invent new spacing, colors, or type scales — use only what is documented in the design system files.
