'use client';

import { useState } from 'react';
import DropdownListItem from './DropdownListItem';

/**
 * Dropdown menu component.
 *
 * Figma frame: "Dropdown menu" (id: 145:2410)
 *
 * Props:
 *   items       → array of { value, label, icon?, avatarSrc?, dotColor?, disabled? }
 *   icon        → Icon=True/False — show leading icons on items
 *   checkbox    → Checkbox=True/False — items render with checkboxes
 *   shortcut    → Shortcut=True/False — items render shortcut badges
 *   header      → optional header element (e.g. avatar group)
 *   value       → selected value (single select)
 *   values      → selected values (multi select when checkbox=true)
 *   onChange    → called with value for single, array for multi
 *   maxHeight   → max-height css value for scroll, default '240px'
 */

export function DropdownMenu({
  items = [],
  icon = false,
  checkbox = false,
  shortcut = false,
  header,
  value,
  values = [],
  onChange,
  maxHeight = '240px',
}) {
  const [internalValue, setInternalValue] = useState(value ?? null);
  const [internalValues, setInternalValues] = useState(values);

  function handleItemClick(item) {
    if (item.disabled) return;

    if (checkbox) {
      const next = internalValues.includes(item.value)
        ? internalValues.filter((v) => v !== item.value)
        : [...internalValues, item.value];
      setInternalValues(next);
      onChange?.(next);
    } else {
      setInternalValue(item.value);
      onChange?.(item.value);
    }
  }

  function isChecked(item) {
    if (checkbox) return internalValues.includes(item.value);
    return internalValue === item.value;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden w-full">
      {header && (
        <div className="px-3 py-2 border-b border-gray-100">{header}</div>
      )}

      <ul
        role={checkbox ? 'listbox' : 'menu'}
        aria-multiselectable={checkbox}
        style={{ maxHeight }}
        className="overflow-y-auto py-1"
      >
        {items.map((item) => (
          <li key={item.value} role="none">
            <DropdownListItem
              state={item.disabled ? 'disabled' : 'default'}
              icon={icon}
              checkbox={checkbox}
              shortcut={shortcut}
              label={item.label}
              iconEl={item.icon}
              checked={isChecked(item)}
              shortcutKeys={item.shortcut}
              onClick={() => handleItemClick(item)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DropdownMenu;
