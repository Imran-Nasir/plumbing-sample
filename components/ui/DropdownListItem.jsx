'use client';

/**
 * Dropdown list item component.
 *
 * Figma frame: "_Dropdown list item" (id: 145:2264)
 *
 * States matching Figma layer names:
 *   'default' | 'hover' | 'focus' | 'disabled' | 'clicked'
 *
 * Props:
 *   state     → State=Default|Hover|Focus|Disabled|Clicked
 *   icon      → Icon=True/False — show leading icon
 *   checkbox  → Checkbox=True/False — show checkbox instead of icon
 *   shortcut  → Shortcut=True/False — show keyboard shortcut badge
 *   label     → item text
 *   iconEl    → icon element when icon=true
 *   checked   → checked state for checkbox variant
 *   shortcutKeys → shortcut text e.g. "⌘K"
 *   onClick   → click handler
 */

function buildListItemClasses(state) {
  const base =
    'flex items-center gap-2 w-full px-2 py-1.5 rounded text-sm cursor-pointer transition-colors select-none';

  if (state === 'disabled')
    return `${base} text-gray-300 cursor-not-allowed`;
  if (state === 'focus' || state === 'clicked')
    return `${base} bg-blue-50 text-slateBlue`;
  if (state === 'hover')
    return `${base} bg-gray-50 text-gray-900`;
  return `${base} text-gray-700`;
}

export function DropdownListItem({
  state = 'default',
  icon = false,
  checkbox = false,
  shortcut = false,
  label = 'Option',
  iconEl,
  checked = false,
  shortcutKeys,
  onClick,
}) {
  const disabled = state === 'disabled';
  const itemClass = buildListItemClasses(state);

  function handleClick() {
    if (!disabled) onClick?.();
  }

  function handleKeyDown(e) {
    if (!disabled && (e.key === 'Enter' || e.key === ' ')) handleClick();
  }

  return (
    <div
      role={checkbox ? 'option' : 'menuitem'}
      aria-selected={checkbox ? checked : undefined}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={itemClass}
    >
      {/* Checkbox */}
      {checkbox && (
        <span
          className={`shrink-0 w-4 h-4 rounded border flex items-center justify-center transition-colors ${
            checked
              ? 'bg-slateBlue border-slateBlue'
              : disabled
              ? 'border-gray-200 bg-gray-100'
              : 'border-gray-300 bg-white'
          }`}
        >
          {checked && (
            <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none">
              <path
                d="M2 5l2.5 2.5L8 3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
      )}

      {/* Leading icon */}
      {icon && !checkbox && (
        <span className="shrink-0 text-gray-400">{iconEl}</span>
      )}

      <span className="flex-1 truncate">{label}</span>

      {/* Shortcut badge */}
      {shortcut && shortcutKeys && (
        <kbd className="shrink-0 px-1.5 py-0.5 text-xs text-gray-400 bg-gray-100 rounded border border-gray-200 font-mono">
          {shortcutKeys}
        </kbd>
      )}
    </div>
  );
}

export default DropdownListItem;
