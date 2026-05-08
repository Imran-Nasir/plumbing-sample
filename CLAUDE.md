# Project: OI Webapp — Claude Code Instructions

This is a Next.js + Tailwind CSS project. Every session must respect the design system documented below.

---

## DESIGN SYSTEM — AUTO-LOAD ON EVERY SESSION

This project has a strict established design system. Before generating any UI, screen, component, or layout, always read these files:

- @.claude/design-examples/DESIGN_SYSTEM.md — color tokens, typography, spacing, shadows, dimensions
- @.claude/design-examples/COMPONENT_PATTERNS.md — every UI component spec with all states
- @.claude/design-examples/LAYOUT_PATTERNS.md — page shells, 3-column grid, card structure
- @.claude/design-examples/SCREENSHOT_GUIDE.md — descriptions of all reference screenshots

For maximum visual accuracy, also read the reference screenshots in `.claude/design-examples/screenshots/`.

---

## DESIGN SKILL

Use the `/design-system` slash command before building any UI:

```
/design-system [describe what you want to build]
```

Example:
```
/design-system Build the Inventory step screen for Add Product
```

---

## STACK

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Components**: Custom — see `components/ui/` for existing components
- **Font**: Inter (only font — no other typefaces)
- **Icons**: Vuesax Linear icon set

---

## HARD RULES — ALWAYS APPLY

### Never invent new design values
- Use only colors documented in `DESIGN_SYSTEM.md`
- Use only spacing values from the spacing scale
- Use only Inter font at documented sizes/weights
- Do not add new border-radius values

### Input fields
- Always `h-30px` height
- Always `border-radius: 8px`
- Always `px-14px py-7px` padding
- Default border: `1px solid #e0dfe4`
- Error border: `1px solid #df201e` + `box-shadow: 0 0 0 4px #fef1f0`
- Focused border: `1px solid #aca1fa` + `box-shadow: 0 0 0 4px #f1effe`

### Spacing
- Gap between form fields: always `16px`
- Gap between label and input: always `6px`
- Card padding: always `16px`
- Column gap (3-panel layout): always `10px`

### Colors
- Primary: `#795cf5` (BrandPurple/500)
- Page bg: `#f6f6f7`
- Cards: `#ffffff`
- Error: `#df201e` (BrandRed/600)

### Typography
- All text: Inter only
- Buttons: Inter Semi Bold 14px
- Labels: Inter Medium 14px
- Placeholder/helper: Inter Regular 12px
- Section titles: Inter Semi Bold 14px

---

## PROJECT STRUCTURE

```
app/              Next.js app router pages
components/
  ui/             Reusable design system components (InputField, Button, Badge, etc.)
  [other]         Page-level components
.claude/
  commands/       Custom slash commands (/design-system, etc.)
  design-examples/ Full design system documentation + screenshots
```

---

## EXISTING UI COMPONENTS

Before building new components, check `components/ui/` for existing implementations:
- `InputField.jsx` — standard text input
- `TextareaInputField.jsx` — textarea with optional toolbar
- `InputDropdown.jsx` — dropdown select input
- `MultiselectInput.jsx` — multi-select tags input
- `DropdownMenu.jsx` / `DropdownMenuItem.jsx` / `DropdownListItem.jsx` — dropdown menus
- `OptionSelection.jsx` — radio-style option cards
- `MediaUpload.jsx` — drag-and-drop file upload zone
- `EditDescriptionInput.jsx` — rich text description editor
