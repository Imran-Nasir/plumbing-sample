'use client';

/**
 * Option selection component.
 *
 * Figma frame: "Option selection" (id: 522:8842)
 *
 * States matching Figma layer names (corrected):
 *   'default' | 'hover' | 'pressed' | 'focused' | 'disabled'
 *
 * Note: Figma had typos — "presssed" → 'pressed', "Focoused" → 'focused',
 *       "disable" → 'disabled'. This component uses the corrected names.
 */

function buildOptionClasses(state) {
  const base =
    'flex items-center gap-3 w-full rounded-xl border px-4 py-3 cursor-pointer transition-all select-none';

  if (state === 'disabled')
    return `${base} border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed`;
  if (state === 'pressed')
    return `${base} border-slateBlue bg-blue-50 scale-95`;
  if (state === 'focused')
    return `${base} border-slateBlue ring-2 ring-blue-100 bg-white`;
  if (state === 'hover')
    return `${base} border-gray-400 bg-gray-50`;
  return `${base} border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50`;
}

export function OptionSelection({
  state = 'default',
  label,
  description,
  icon,
  selected = false,
  onClick,
  value,
  name,
}) {
  const disabled = state === 'disabled';
  const optionClass = buildOptionClasses(state);

  return (
    <div
      role="radio"
      aria-checked={selected}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      data-value={value}
      onClick={disabled ? undefined : onClick}
      onKeyDown={(e) => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) onClick?.();
      }}
      className={optionClass}
    >
      {icon && (
        <span
          className={`shrink-0 ${
            disabled ? 'text-gray-300' : 'text-gray-500'
          }`}
        >
          {icon}
        </span>
      )}

      <div className="flex-1 min-w-0">
        {label && (
          <p
            className={`text-sm font-medium truncate ${
              disabled ? 'text-gray-300' : 'text-gray-900'
            }`}
          >
            {label}
          </p>
        )}
        {description && (
          <p
            className={`text-xs truncate ${
              disabled ? 'text-gray-300' : 'text-gray-500'
            }`}
          >
            {description}
          </p>
        )}
      </div>

      {/* Selection indicator */}
      <span
        className={`shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
          selected && !disabled
            ? 'border-slateBlue'
            : disabled
            ? 'border-gray-200'
            : 'border-gray-300'
        }`}
      >
        {selected && !disabled && (
          <span className="w-2 h-2 rounded-full bg-slateBlue" />
        )}
      </span>
    </div>
  );
}

/**
 * OptionSelectionGroup — wraps multiple OptionSelection items as a radio group.
 */
export function OptionSelectionGroup({
  options = [],
  value,
  onChange,
  name,
}) {
  return (
    <div role="radiogroup" className="flex flex-col gap-2">
      {options.map((option) => (
        <OptionSelection
          key={option.value}
          state={option.disabled ? 'disabled' : 'default'}
          label={option.label}
          description={option.description}
          icon={option.icon}
          selected={value === option.value}
          value={option.value}
          name={name}
          onClick={() => !option.disabled && onChange?.(option.value)}
        />
      ))}
    </div>
  );
}

export default OptionSelection;
