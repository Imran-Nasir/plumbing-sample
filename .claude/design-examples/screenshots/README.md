# Reference Screenshots

Place your design reference screenshots in this folder using the filenames below.
These images are read by Claude during the `/design-system` skill to visually anchor the quality bar.

## Expected files

| Filename | Description |
|---|---|
| `01-basic-default.png` | Add Product — Basic screen, default/clean state |
| `02-basic-tooltip.png` | Add Product — Basic screen with nav tooltip hover ("This section contains required fields") |
| `03-basic-validation.png` | Add Product — Basic screen in validation/error state (red borders, error messages, helper text) |
| `04-product-list.png` | Ecommerce — Product list view with stat cards, data table, pagination |

## How to add screenshots

1. Export or screenshot each screen from Figma or the live app
2. Name them exactly as listed above
3. Place them in this folder (`.claude/design-examples/screenshots/`)
4. Claude will read them automatically when `/design-system` is invoked

## What Claude uses them for

- **Visual spacing calibration** — measuring gaps, padding density
- **Typography hierarchy** — confirming size/weight relationships look right
- **Color accuracy** — checking that purple, grey, and red shades are correct
- **Component states** — input default, focus, error, filled states
- **Overall density and polish** — ensuring generated UI matches the quality bar

## Additional screenshots

You can add more screenshots beyond the 4 listed above. Name them descriptively:

```
05-organization-screen.png
06-inventory-screen.png
07-variants-empty.png
08-variant-detail.png
09-ecommerce-seo.png
10-advanced-settings.png
```

Then update `SCREENSHOT_GUIDE.md` with a description of each new file.
