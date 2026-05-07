'use client';

/**
 * Edit description input field component.
 *
 * Figma frame: "Edit description input field" (id: 725:10074)
 *
 * States matching Figma layer names:
 *   'default' | 'hover' | 'focused'
 *
 * Note: Figma used "Property 1=default/hover/focused" — this component
 *       maps those directly to the `state` prop with correct casing.
 */

function buildWrapperClasses(state) {
  const base =
    'relative flex flex-col rounded-xl border bg-white transition-all overflow-hidden';

  if (state === 'focused')
    return `${base} border-slateBlue ring-2 ring-blue-100`;
  if (state === 'hover')
    return `${base} border-gray-400 shadow-sm`;
  return `${base} border-gray-200 hover:border-gray-300`;
}

export function EditDescriptionInput({
  state = 'default',
  value = '',
  onChange,
  placeholder = 'Add a description…',
  label,
  maxLength,
  rows = 5,
  id,
  name,
}) {
  const focused = state === 'focused';
  const wrapperClass = buildWrapperClasses(state);

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
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
          autoFocus={focused}
          maxLength={maxLength}
          className="w-full px-4 py-3 text-sm bg-transparent outline-none resize-none placeholder-gray-400 text-gray-900"
        />

        {/* Character counter */}
        {maxLength !== undefined && (
          <div className="flex justify-end items-center px-4 py-2 border-t border-gray-100">
            <span className="text-xs text-gray-400">
              {value.length}/{maxLength}
            </span>
          </div>
        )}

        {/* Toolbar slot */}
        <div className="flex items-center gap-1 px-3 py-2 border-t border-gray-100">
          <button
            type="button"
            className="p-1 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Bold"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 2h5a3 3 0 0 1 0 6H3V2zm0 6h5.5a3 3 0 0 1 0 6H3V8z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="p-1 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Italic"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M5 2h6M3 12h6M8 2l-2 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="p-1 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Link"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M6 8a3 3 0 0 0 4.24 0l1.42-1.42a3 3 0 0 0-4.24-4.24L6 3.76"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M8 6a3 3 0 0 0-4.24 0L2.34 7.42a3 3 0 0 0 4.24 4.24L8 10.24"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditDescriptionInput;
