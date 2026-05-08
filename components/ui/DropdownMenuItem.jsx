'use client';

/**
 * Dropdown menu item component.
 *
 * Figma frame: "_Input dropdown menu item" (id: 106:4142)
 *
 * States matching Figma layer names:
 *   'default' | 'hover' | 'focus' | 'disabled'
 *
 * Types matching Figma layer names:
 *   'default' | 'iconLeading' | 'avatarLeading' | 'dotLeading'
 *
 * Props:
 *   state         → State=Default|Hover|Focus|Disabled
 *   type          → Type=Default|Icon leading|Avatar leading|Dot leading
 *   supportingText → Supporting text=True/False
 *   label         → item label text
 *   icon          → icon element (for iconLeading type)
 *   avatarSrc     → avatar image src (for avatarLeading type)
 *   dotColor      → dot color class (for dotLeading type)
 *   checked       → whether item is checked/selected
 *   onClick       → click handler
 */

function buildMenuItemClasses(state) {
  const base =
    'flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm cursor-pointer transition-colors select-none';

  if (state === 'disabled')
    return `${base} text-gray-300 cursor-not-allowed`;
  if (state === 'focus')
    return `${base} bg-blue-50 text-slateBlue outline-none ring-2 ring-slateBlue ring-inset`;
  if (state === 'hover')
    return `${base} bg-gray-50 text-gray-900`;
  return `${base} text-gray-700 hover:bg-gray-50`;
}

export function DropdownMenuItem({
  state = 'default',
  type = 'default',
  label = 'Option',
  icon,
  avatarSrc,
  avatarAlt,
  dotColor = 'bg-green-500',
  supportingText,
  checked = false,
  onClick,
}) {
  const disabled = state === 'disabled';
  const itemClass = buildMenuItemClasses(state);

  return (
    <div
      role="option"
      aria-selected={checked}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={disabled ? undefined : onClick}
      onKeyDown={(e) => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) onClick?.();
      }}
      className={itemClass}
    >
      {/* Leading: icon */}
      {type === 'iconLeading' && icon && (
        <span className="shrink-0 text-gray-400">{icon}</span>
      )}

      {/* Leading: avatar */}
      {type === 'avatarLeading' && (
        <img
          src={avatarSrc}
          alt={avatarAlt ?? label}
          className="shrink-0 w-5 h-5 rounded-full object-cover"
        />
      )}

      {/* Leading: status dot */}
      {type === 'dotLeading' && (
        <span className={`shrink-0 w-2 h-2 rounded-full ${dotColor}`} />
      )}

      <span className="flex-1 truncate">{label}</span>

      {supportingText && (
        <span className="shrink-0 text-xs text-gray-400">{supportingText}</span>
      )}

      {/* Checkmark */}
      {checked && (
        <svg
          className="shrink-0 w-4 h-4 text-slateBlue"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 8l3.5 3.5L13 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}

export default DropdownMenuItem;
