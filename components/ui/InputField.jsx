'use client';

import { useState } from 'react';
import { AlertCircle, HelpCircle, ChevronDown, CreditCard } from 'lucide-react';

/**
 * Input field types matching Figma layer names:
 *   'default'           → Type=Default
 *   'inputField'        → Type=Input field
 *   'paymentInput'      → Type=Payment input
 *   'leadingDropdown'   → Type=Leading dropdown
 *   'leadingText'       → Type=Leading text
 *   'trailingDropdown'  → Type=Trailing dropdown
 *
 * Input field states matching Figma layer names:
 *   'placeholder' | 'filled' | 'focused' | 'disabled'
 */

function buildInputClasses(state, destructive) {
  const base =
    'w-full bg-white text-sm text-gray-900 outline-none placeholder-gray-400 transition-colors';

  if (state === 'disabled') return `${base} cursor-not-allowed text-gray-400`;
  if (destructive && state === 'focused')
    return `${base} text-red-700`;
  if (destructive) return `${base} text-red-700`;
  return base;
}

function buildWrapperClasses(state, destructive) {
  const base =
    'flex items-center gap-2 rounded-lg border px-3 py-2 bg-white transition-all';

  if (state === 'disabled')
    return `${base} border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed`;
  if (destructive && state === 'focused')
    return `${base} border-red-500 ring-2 ring-red-100`;
  if (destructive)
    return `${base} border-red-400`;
  if (state === 'focused')
    return `${base} border-slateBlue ring-2 ring-blue-100`;
  if (state === 'filled')
    return `${base} border-gray-400`;
  return `${base} border-gray-300 hover:border-gray-400`;
}

export function InputFieldLeadingIcon({ destructive, disabled }) {
  const color = destructive ? 'text-red-400' : disabled ? 'text-gray-300' : 'text-gray-400';
  return (
    <span className={`shrink-0 ${color}`}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </span>
  );
}

export function InputFieldHelpIcon({ destructive }) {
  const color = destructive ? 'text-red-400' : 'text-gray-400';
  return <HelpCircle size={14} className={`shrink-0 ${color}`} />;
}

export function InputFieldDestructiveIcon() {
  return <AlertCircle size={14} className="shrink-0 text-red-500" />;
}

export function InputField({
  type = 'default',
  state = 'placeholder',
  leadingIcon = false,
  label,
  hintText,
  helpIcon = false,
  destructive = false,
  leadingText,
  dropdownOptions = [],
  value = '',
  onChange,
  placeholder = 'Placeholder',
  name,
  id,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(value);

  const disabled = state === 'disabled';
  const focused = state === 'focused';
  const wrapperClass = buildWrapperClasses(state, destructive);
  const inputClass = buildInputClasses(state, destructive);
  const labelColor = destructive ? 'text-red-600' : 'text-gray-700';
  const hintColor = destructive ? 'text-red-500' : 'text-gray-500';

  function handleChange(e) {
    setInternalValue(e.target.value);
    onChange?.(e);
  }

  const displayValue = onChange !== undefined ? value : internalValue;

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
        {/* Leading icon */}
        {leadingIcon && type === 'default' && (
          <InputFieldLeadingIcon destructive={destructive} disabled={disabled} />
        )}

        {/* Payment input leading icon */}
        {type === 'paymentInput' && (
          <CreditCard size={16} className={disabled ? 'text-gray-300' : destructive ? 'text-red-400' : 'text-gray-400'} />
        )}

        {/* Leading text prefix */}
        {type === 'leadingText' && leadingText && (
          <span className={`shrink-0 text-sm font-medium ${disabled ? 'text-gray-300' : 'text-gray-500'}`}>
            {leadingText}
          </span>
        )}

        {/* Leading dropdown selector */}
        {type === 'leadingDropdown' && (
          <button
            type="button"
            disabled={disabled}
            onClick={() => !disabled && setDropdownOpen((o) => !o)}
            className={`flex items-center gap-1 shrink-0 text-sm font-medium border-r pr-2 mr-1 ${
              disabled ? 'text-gray-300 border-gray-200' : 'text-gray-600 border-gray-300'
            }`}
          >
            {dropdownOptions[0] ?? 'Select'}
            <ChevronDown size={12} />
          </button>
        )}

        <input
          id={id}
          name={name}
          type={type === 'paymentInput' ? 'text' : 'text'}
          value={displayValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={focused}
          className={inputClass}
          aria-invalid={destructive}
          aria-describedby={hintText ? `${id}-hint` : undefined}
        />

        {/* Help icon */}
        {helpIcon && !destructive && (
          <InputFieldHelpIcon destructive={false} />
        )}

        {/* Destructive indicator icon */}
        {destructive && <InputFieldDestructiveIcon />}

        {/* Trailing dropdown chevron */}
        {type === 'trailingDropdown' && (
          <button
            type="button"
            disabled={disabled}
            onClick={() => !disabled && setDropdownOpen((o) => !o)}
            className={`shrink-0 ${disabled ? 'text-gray-300' : 'text-gray-500'}`}
          >
            <ChevronDown size={14} />
          </button>
        )}
      </div>

      {/* Hint / supporting text */}
      {hintText && (
        <p id={`${id}-hint`} className={`text-xs ${hintColor}`}>
          {hintText}
        </p>
      )}
    </div>
  );
}

export default InputField;
