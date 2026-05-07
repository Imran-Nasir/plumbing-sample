'use client';

/**
 * Textarea input field component.
 *
 * Figma frame: "Textarea input field" (id: 86:2603)
 *
 * States matching Figma layer names:
 *   'placeholder' | 'default' | 'focused' | 'disabled'
 *
 * Props matching Figma variant properties:
 *   label       → Label=True/False
 *   hintText    → Hint text=True/False
 *   destructive → Destructive=True/False
 *   state       → State=Placeholder|Default|Focused|Disabled
 */

function buildTextareaWrapperClasses(state, destructive) {
  const base =
    'flex flex-col rounded-lg border bg-white transition-all overflow-hidden';

  if (state === 'disabled')
    return `${base} border-gray-200 bg-gray-50 opacity-50`;
  if (destructive && state === 'focused')
    return `${base} border-red-500 ring-2 ring-red-100`;
  if (destructive)
    return `${base} border-red-400`;
  if (state === 'focused')
    return `${base} border-slateBlue ring-2 ring-blue-100`;
  if (state === 'default')
    return `${base} border-gray-400`;
  return `${base} border-gray-300 hover:border-gray-400`;
}

export function TextareaInputField({
  state = 'placeholder',
  label,
  hintText,
  destructive = false,
  value = '',
  onChange,
  placeholder = 'Enter description…',
  rows = 4,
  name,
  id,
  maxLength,
}) {
  const disabled = state === 'disabled';
  const focused = state === 'focused';
  const wrapperClass = buildTextareaWrapperClasses(state, destructive);
  const labelColor = destructive ? 'text-red-600' : 'text-gray-700';
  const hintColor = destructive ? 'text-red-500' : 'text-gray-500';

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label
          htmlFor={id}
          className={`text-sm font-medium ${labelColor}`}
        >
          {label}
        </label>
      )}

      <div className={wrapperClass}>
        <textarea
          id={id}
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={focused}
          maxLength={maxLength}
          className={`w-full px-3 py-2 text-sm bg-transparent outline-none resize-none placeholder-gray-400 text-gray-900 ${
            disabled ? 'cursor-not-allowed text-gray-400' : ''
          } ${destructive ? 'text-red-700' : ''}`}
          aria-invalid={destructive}
          aria-describedby={hintText ? `${id}-hint` : undefined}
        />

        {maxLength !== undefined && (
          <div className="flex justify-end px-3 pb-2">
            <span className="text-xs text-gray-400">
              {value.length}/{maxLength}
            </span>
          </div>
        )}
      </div>

      {hintText && (
        <p id={`${id}-hint`} className={`text-xs ${hintColor}`}>
          {hintText}
        </p>
      )}
    </div>
  );
}

export default TextareaInputField;
