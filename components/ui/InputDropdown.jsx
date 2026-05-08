'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import DropdownMenuItem from './DropdownMenuItem';

/**
 * Input dropdown component.
 *
 * Figma frames:
 *   "_Input dropdown base" (id: 104:1241)
 *   "Input dropdown"       (id: 105:1685)
 *
 * States matching Figma layer names:
 *   'default' | 'placeholder' | 'openFocused'
 *
 * Types matching Figma layer names:
 *   'default' | 'iconLeading' | 'avatarLeading' | 'dotLeading' | 'search'
 *
 * Props:
 *   state         → State=Default|Placeholder|Open/focused
 *   type          → Type=Default|Icon leading|Avatar leading|Dot leading|Search
 *   label         → Label=True/False — show floating label
 *   supportingText → Supporting text=True/False
 *   options       → array of { value, label, icon?, avatarSrc?, dotColor? }
 *   value         → currently selected value
 *   onChange      → called with selected option value
 *   placeholder   → placeholder text
 *   id, name      → html attributes
 */

function buildTriggerClasses(state) {
  const base =
    'flex items-center gap-2 w-full rounded-lg border px-3 py-2 bg-white text-sm cursor-pointer transition-all select-none';

  if (state === 'openFocused')
    return `${base} border-slateBlue ring-2 ring-blue-100`;
  if (state === 'default')
    return `${base} border-gray-400`;
  return `${base} border-gray-300 hover:border-gray-400`;
}

export function InputDropdown({
  state = 'placeholder',
  type = 'default',
  label,
  supportingText,
  options = [],
  value,
  onChange,
  placeholder = 'Select option',
  id,
  name,
}) {
  const [isOpen, setIsOpen] = useState(state === 'openFocused');
  const [searchQuery, setSearchQuery] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef(null);
  const searchRef = useRef(null);

  const selectedOption = options.find((o) => o.value === value);
  const displayState = isOpen ? 'openFocused' : value ? 'default' : 'placeholder';
  const triggerClass = buildTriggerClasses(displayState);

  const filteredOptions =
    type === 'search' && searchQuery
      ? options.filter((o) =>
          o.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : options;

  useEffect(() => {
    if (isOpen && type === 'search') {
      searchRef.current?.focus();
    }
  }, [isOpen, type]);

  useEffect(() => {
    function handleOutsideClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  function handleToggle() {
    setIsOpen((open) => !open);
    setFocusedIndex(-1);
  }

  function handleSelect(option) {
    onChange?.(option.value);
    setIsOpen(false);
    setSearchQuery('');
  }

  function handleKeyDown(e) {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }
    if (e.key === 'Escape') { setIsOpen(false); return; }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex((i) => Math.min(i + 1, filteredOptions.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex((i) => Math.max(i - 1, 0));
    }
    if (e.key === 'Enter' && focusedIndex >= 0) {
      handleSelect(filteredOptions[focusedIndex]);
    }
  }

  function renderLeadingSlot(option) {
    if (type === 'iconLeading' && option?.icon)
      return <span className="shrink-0 text-gray-400">{option.icon}</span>;
    if (type === 'avatarLeading' && option?.avatarSrc)
      return (
        <img
          src={option.avatarSrc}
          alt={option.label}
          className="shrink-0 w-5 h-5 rounded-full object-cover"
        />
      );
    if (type === 'dotLeading')
      return (
        <span
          className={`shrink-0 w-2 h-2 rounded-full ${
            option?.dotColor ?? 'bg-green-500'
          }`}
        />
      );
    return null;
  }

  return (
    <div ref={containerRef} className="relative flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <button
        type="button"
        id={id}
        name={name}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className={triggerClass}
      >
        {selectedOption ? (
          <>
            {renderLeadingSlot(selectedOption)}
            <span className="flex-1 text-left text-gray-900 truncate">
              {selectedOption.label}
            </span>
          </>
        ) : (
          <>
            {type === 'search' && (
              <Search size={14} className="shrink-0 text-gray-400" />
            )}
            <span className="flex-1 text-left text-gray-400 truncate">
              {placeholder}
            </span>
          </>
        )}
        <ChevronDown
          size={14}
          className={`shrink-0 text-gray-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden animate-slide-down">
          {type === 'search' && (
            <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100">
              <Search size={14} className="shrink-0 text-gray-400" />
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search…"
                className="flex-1 text-sm outline-none placeholder-gray-400"
              />
            </div>
          )}

          <div role="listbox" className="max-h-48 overflow-y-auto py-1">
            {filteredOptions.length === 0 ? (
              <p className="px-3 py-2 text-sm text-gray-400">No options found</p>
            ) : (
              filteredOptions.map((option, index) => (
                <DropdownMenuItem
                  key={option.value}
                  state={index === focusedIndex ? 'focus' : option.disabled ? 'disabled' : 'default'}
                  type={type === 'search' ? 'default' : type}
                  label={option.label}
                  icon={option.icon}
                  avatarSrc={option.avatarSrc}
                  avatarAlt={option.label}
                  dotColor={option.dotColor}
                  checked={option.value === value}
                  onClick={() => handleSelect(option)}
                />
              ))
            )}
          </div>
        </div>
      )}

      {supportingText && (
        <p className="text-xs text-gray-500">{supportingText}</p>
      )}
    </div>
  );
}

export default InputDropdown;
