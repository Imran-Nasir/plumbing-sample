# Design System — Complete Token Reference

This file is the single source of truth for all design tokens used across the product.
It was derived from a full audit of the Add Product Module in Figma (file: `2dSpfjXbR7EnJKNhgYGKrD`, node: `479-142`).

---

## COLOR TOKENS

### Brand Purple (Primary)
| Token | Hex | Usage |
|---|---|---|
| `--brandpurple/500` | `#795cf5` | Primary buttons, active nav items, top bar background, links, focused borders |
| `--brandpurple/50` | `#f1effe` | Secondary button bg, active nav icon circle bg, checkbox checked bg, focus ring bg |
| `--brandpurple/300` | `#aca1fa` | Input focused border color |

### Brand Red (Error / Destructive)
| Token | Hex | Usage |
|---|---|---|
| `--brandred/600` | `#df201e` | Error badge text, destructive border, error input border, error message text |
| `--brandred/700` | `#aa1412` | Destructive label text (dark variant) |
| `--brandred/50` | `#fef1f0` | Error badge background, error input focus ring, destructive field bg |

### Brand Green (Success)
| Token | Hex | Usage |
|---|---|---|
| `--brandgreen/50` | `#e5fff9` | Success badge background, channel icon bg |
| `--brandgreen/700` | `#09786a` | Success badge text |

### Greyscale
| Token | Hex | Usage |
|---|---|---|
| `--greyscale/text/heading` | `#16151c` | All headings, labels, filled input values, active nav text |
| `--greyscale/text/body` | `#24222d` | Body text, product summary values |
| `--greyscale/text/medium-dark` | `#686379` | Placeholder text, helper text, secondary labels, breadcrumb inactive |
| `--greyscale/600` | `#8b8798` | Subtle secondary labels (e.g. Margin label in summary) |
| `--greyscale/800` | `#464253` | Gray badge text |
| `--greyscale/surface/subtle` | `#f6f6f7` | Page background, subtle container bg, inactive nav icon bg |
| `--greyscale/50` | `#f6f6f7` | Same as surface/subtle — interchangeable |
| `--greyscale/border/light-dark` | `#e0dfe4` | Input default border, card borders, outline button border |
| `--greyscale/border/disable` | `#eeedf0` | Nav panel outer border |

### Fixed Colors
| Name | Hex | Usage |
|---|---|---|
| White | `#ffffff` | Card backgrounds, input backgrounds |
| App bar bg | `#795cf5` | Top navigation bar background |
| Page bg | `#f6f6f7` | Main content area background |
| Search bar bg | `#ffffff` | Top nav search bar |
| Search border | `#e5e7eb` | Top nav search bar border |
| Placeholder text | `#495057` | Search bar placeholder text |
| Gray/500 (external) | `#667085` | Some placeholder text in meta fields |

---

## TYPOGRAPHY SCALE

**Font family: Inter — only font used across the entire product.**

| Style Name | Size | Weight | Line Height | Letter Spacing | Usage |
|---|---|---|---|---|---|
| Body-M/Semibold | 16px | 600 | 1.5 (24px) | 0 | Page/module title ("Add Product"), Product Summary title |
| Body-M/Medium | 16px | 500 | 1.5 (24px) | 0 | Sidebar section title ("Basic"), large emphasis text |
| Body-S/Semibold | 14px | 600 | 20px | 0 | Card section title, all button labels, "Save Variant", breadcrumb bold segments |
| Body-S/Medium | 14px | 500 | 1.6 (22.4px) | 0 | Form field labels, nav item text, checkbox label, summary values |
| Body-S/Regular | 14px | 400 | 1.6 (22.4px) | 0 | Card section subtitle/description, OG field descriptions |
| Captions/Medium | 12px | 500 | 18px | 0 | Badge labels, breadcrumb separators, summary field labels |
| Captions/Regular | 12px | 400 | 18px | 0 | Input placeholder, helper text, char counter, error messages |

---

## SPACING SCALE

All spacing values used in this design system:

| Value | Used for |
|---|---|
| 4px | Gap between badge dot and text; small internal gaps |
| 6px | Label → Input gap; Input → Helper text gap; internal icon padding |
| 8px | Nav item horizontal padding; icon circle padding (p-8px); button small gap; badge gap |
| 10px | Main content area horizontal padding (px-10px); column gap between 3 panels |
| 12px | Nav panel vertical padding (py-12px); tooltip inner padding (px-12px py-8px); subtle container padding (p-12px) |
| 14px | Input horizontal padding (px-14px) |
| 15px | Gap between top breadcrumb row and main columns (gap-15px in main content) |
| 16px | **Primary form spacing** — card padding (p-16px), gap between field groups, side-by-side column gap, summary panel padding |
| 20px | Top nav icon spacing (gap-20px) |
| 24px | Column gap in breadcrumb area |
| 40px | — (reserved for component sets) |

---

## SHADOW TOKENS

| Token | Value | Usage |
|---|---|---|
| Shadow/xs | `0px 1px 2px rgba(16,24,40,0.05)` | Input field subtle shadow (resting state) |
| Shadow/sm | `0px 1px 2px #1018280F, 0px 1px 3px #1018281A` | Input focus/active shadow |
| Shadow/lg | `0px 4px 6px -2px #10182808, 0px 12px 16px -4px #10182814` | Tooltip and popover shadow |
| Focus ring | `0px 0px 0px 4px #f1effe` | Input, checkbox, button focused state ring |
| Error ring | `0px 0px 0px 4px #fef1f0` | Input destructive/error focused ring |

---

## BORDER RADIUS

| Value | Used for |
|---|---|
| 4px | Checkbox |
| 6px | Badge |
| 8px | Input fields, buttons, dropdowns, tooltips, subtle containers |
| 12px | Cards, panels, nav sidebar, product summary panel |
| 24px | Variant image thumbnail |
| 100px | Nav item icon circle (fully rounded) |

---

## ICON SYSTEM

Icons are from the **Vuesax Linear** set (16px default size, 20px for nav/prominent use):

| Icon name | Usage |
|---|---|
| `vuesax/linear/arrow-down` | Dropdown indicator (16px) |
| `vuesax/linear/arrow-left` | Back navigation (24px) |
| `vuesax/linear/grid-7` | Variants nav icon |
| `vuesax/linear/data` | Organization nav icon |
| `vuesax/linear/image` | Media nav icon |
| `vuesax/linear/note-text` | Recipe nav icon |
| `vuesax/linear/tag` | Pricing nav icon |
| `vuesax/linear/tick-square` | Confirm/save action button icon |
| `help-circle` | Help tooltip trigger (16px) |
| `trash` | Delete row action (16px) |

All icons inside nav circles are 16px. Icon containers (circle bg) are 32px × 32px with `border-radius: 100px` and `padding: 8px`.

---

## COMPONENT DIMENSIONS QUICK REFERENCE

| Component | Height | Width | Border Radius |
|---|---|---|---|
| Top nav bar | 40px | 100% (1440px) | — |
| Nav panel | auto | ~200px (shrink-0) | 12px |
| Product summary panel | auto | 235px | 12px |
| Form card | auto | flex-1 | 12px |
| Standard input | 30px | 100% | 8px |
| Textarea | 154px min | 100% | 8px |
| Primary button (large) | 36px | variable | 8px |
| Primary button (small) | 30px | variable | 8px |
| Toggle | 20px × 36px | — | — |
| Checkbox | 16px × 16px | — | 4px |
| Nav icon circle | 32px × 32px | — | 100px |
| Badge | 22px height | auto | 6px |
| Tooltip | auto | 112–244px | 8px |
| Variant thumbnail | 132px × 132px | — | 24px |
