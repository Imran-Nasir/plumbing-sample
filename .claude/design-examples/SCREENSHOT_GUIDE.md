# Screenshot Guide — What Each Reference Image Shows

Place the actual PNG files in `.claude/design-examples/screenshots/`.
The filename in the table below is the expected filename for each image.

---

## 01 — Basic Screen, Default State
**File**: `screenshots/01-basic-default.png`

### What this screenshot demonstrates:
This is the reference for the default, clean state of a form screen.

**Top Nav Bar**
- Full-width purple bar (`#795cf5`), height 40px
- Left: product logo + hamburger icon
- Center: white search bar, rounded, placeholder "Search..."
- Right: settings gear, bell icon, app icons row, user avatar (circle, 25px)

**Left App Sidebar (255px)**
- Global app navigation (screenshot/image area)
- Visible items: Products, **Add Product** (active — purple highlight bg), Add Raw Material, Categories, Brands

**Left Nav Panel (inside main content)**
- White card, subtle border
- 9 items: Basic (active — purple icon bg + purple text), Pricing (red dot), Variants, Ecommerce, Organization, Inventory, Media, Recipe, Advanced Settings
- Basic item has larger text (16px) vs other items (14px)
- Active item (Basic): icon circle bg `#f1effe`, icon `#795cf5`, label `#795cf5`
- Inactive items: icon circle bg `#f6f6f7`, icon muted grey, label `#16151c`
- Pricing item: red dot on right (required incomplete indicator)

**Form Content Area**
- White card, border-radius 12px
- Header: "Basic Information" (Semi Bold 14px) + "Essential product details for quick setup" (Regular 14px grey)
- **Product Name field**: label "Product Name", input with "Add product name" placeholder, "REQUIRED" tag inside input right-aligned
- **Product Type radio group**: 3 cards side-by-side
  - "Finish Good" — selected (purple border + light purple bg), radio filled, "Ready to sell products" subtext
  - "Raw Material" — unselected (grey border), "Production Materials" subtext
  - "Semi Finished Good" — unselected, "In-Progress Products" subtext
- **Description field**: label "Description", large textarea with rich text toolbar at bottom
  - Toolbar shows: B I T T̶ U | align-left align-center align-right justify | link icon
  - Toolbar bg is `#f6f6f7`, icons are muted
- **Product Tags field**: label "Product Tags", input "Add tags (press Enter)"

**Product Summary Panel (right, 235px)**
- "Product Summary" title (Medium 16px)
- Product Name: "Test Product"
- Status: green "Label" badge
- Product Type: "Finish Good"
- Channel Availability: gray "E-commerce" badge
- Margin: "$12"
- Stock Status: red dot "Label" badge + "0 units"
- CTA: "Save Product" button (purple, full width) + "Save as Draft" (light purple, full width)

**Key design signals to replicate:**
- Clean, minimal spacing — 16px between fields, generous white space
- All inputs same height (30px), consistent border treatment
- Radio cards have equal width and clear selected vs unselected contrast
- Rich textarea toolbar feels integrated, not bolted on

---

## 02 — Basic Screen, Nav Tooltip State
**File**: `screenshots/02-basic-tooltip.png`

### What this screenshot demonstrates:
Hover state on the Basic nav item — shows the tooltip/popover behavior.

**Differences from screenshot 01:**
- Nav item "Basic" is NOT highlighted as active (it appears inactive/default)
- A dark tooltip appears above/near the Basic nav item:
  - Dark background `#16151c`
  - White text: "This section contains required fields"
  - Border radius 8px
  - Positioned as a popover floating above the nav item
  - Has pointer/caret at bottom pointing to the nav item

**Key design signals to replicate:**
- Tooltip uses the dark `#16151c` bg (not purple) — this is the system tooltip style
- Text is concise, white, Inter Regular 12px
- Tooltip appears inline/overlay relative to the trigger — not a full modal
- Rest of the UI dims slightly or stays at normal opacity (no backdrop)

---

## 03 — Basic Screen, Validation / Error State
**File**: `screenshots/03-basic-validation.png`

### What this screenshot demonstrates:
Form validation error state triggered after attempting to submit with empty required fields.

**Key differences from screenshot 01:**

**Nav sidebar indicators:**
- "Basic" nav item: icon circle now red/orange (error indicator), no longer purple active
- "Pricing" nav item: also shows red icon circle + red dot — indicating both sections have errors

**Product Name field (error state):**
- Input border: `1px solid #df201e` (red)
- Error glow: `box-shadow: 0 0 0 4px #fef1f0` (light red ring)
- Error message below: "Must fill the required fields" — Inter Regular 12px `#df201e`
- "REQUIRED" tag still visible inside input on right

**Product Type section:**
- Label changed from "Product Type" to "Email" in this screenshot — this may be a design variant showing that field labels update contextually, or it could be a different field entirely in this validation example. The 3 radio cards remain identical in structure.

**Description field:**
- No toolbar visible in this state — plain textarea only
- Placeholder: "Add product description"

**Product Tags field:**
- Helper text below: "2/10 keywords" — Inter Regular 12px `#686379`
- This shows how char/count helpers render

**Key design signals to replicate:**
- Error state is red border + red glow — NOT just a border color change
- Error message sits exactly 6px below the input box (not inside it)
- Nav item icons can change to indicate form-level errors per section
- Helper text and count text use the same small grey caption style

---

## 04 — Ecommerce Product List
**File**: `screenshots/04-product-list.png`

### What this screenshot demonstrates:
The product list/index view — a completely different shell from the Add Product form.

**Top Nav Bar**
- Same purple bar, 40px, full width — identical to Add Product screens

**Left App Sidebar — Ecommerce context**
- Header: "← Ecommerce" back link
- Section label: "Ask Food" (tenant/brand name)
- Items: Online Store, Themes, **Orders** (active — full purple bg on list item, white text), Discounts, Campaigns, Payment Methods, Shipping Companies, Marketing
- Active item style: full-width purple background fill on the sidebar item row (not just the icon)
- This differs from the Add Product sidebar which only highlights the icon circle

**Main Content Area**
- Page title: "All" (tab) with "Dashlets" (tooltip visible) + star icon
- Top-right: "Filters" tooltip + "E-Commerce / Campaigns" breadcrumb

**Toolbar Row**
```
Left: [☐ checkbox] [grid-view icon] [■ table-view icon — active, purple bg rounded] [compact icon] [25 ▼ per page]
Right: [🔍] [⚙ filter] [+ Add Product — purple primary button] [⋮ more]
```
- Active view icon: `#f1effe` bg with `#795cf5` icon (same BrandPurple/50 treatment)
- "Add Product" button: standard primary 36px

**Stat Cards Row (4 cards)**
1. Total Products: icon (hexagon outline) + **1200** (Inter Semi Bold, large)
2. Active Items: icon (checkmark circle, teal bg) + **1800**
3. Low Stock: icon (warning triangle, amber bg) + **23**
4. Total Value: icon (dollar circle, purple bg) + **$236,651** (value in `#795cf5`)

Card structure: white bg, border-radius 12px, flex row, p-16px, icon circle left + data right

**Data Table**
- Header: checkbox | Actions | ID ↑↓ | UPC ↑↓ | SKU ↑↓ | Name ↑↓ | Product Type ↑↓ | UOM ↑↓ | Category ↑↓ | Supplier ↑↓ | Quantity ↑↓
- All rows same data: ID 120, UPC 119, SKU Fin-1119, Name "Finished Pro...", Product Type "Finished Good", UOM "Quantity", Category "Default Cate...", Supplier "Acme Corp"
- Quantity column: **W0** (amber pill) **S4** (green pill) **PF2** (purple pill) **2** — multi-badge pattern
- Row action icons (far left per row): eye, pencil, image-icon, 3D-box icon — all 16px grey

**Pagination**
- "← Previous" button (outline) on left
- "1 2 3 ... 8 9 10" page numbers, "1" active (purple text)
- "Next →" button (outline) on right

**Key design signals to replicate:**
- Stat cards use colored icon circles — color matches the metric's semantic meaning (success=teal, warning=amber, primary=purple)
- Large numeric values in stat cards use a bigger type size (24px+ Semi Bold)
- Table rows are dense but readable — 48px height, light border separator
- Multi-badge quantity display is compact and color-coded
- Toolbar switches (view modes) use the same `#f1effe` active state as other interactive elements

---

## CROSS-SCREENSHOT PATTERNS TO ALWAYS APPLY

From studying all 4 screenshots, these patterns must be consistent in every generated design:

1. **Purple is the only accent color** — no blues, no greens in interactive elements
2. **Consistent card radius** — 12px for all panels and cards, 8px for all inputs and buttons
3. **Text hierarchy is subtle** — differences between heading/body/caption sizes are small (16/14/12px) but must be precise
4. **Error states use red glow, not just border** — always add the 4px red ring shadow
5. **Active states use BrandPurple/50 (`#f1effe`)** — icon circles, tab backgrounds, view toggles
6. **Tooltips are always dark (`#16151c`)** — never light/white tooltips in this design
7. **All inputs are exactly 30px tall** — never taller or shorter
8. **Nav items are consistent** — same icon circle size, same padding, same font across all screens
9. **Product Summary panel is always present** on Add Product screens (right column, 235px)
10. **Data tables use alternating subtle visual weight** — header bg `#f6f6f7`, row bg white, thin border separators
