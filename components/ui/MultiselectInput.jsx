'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';

/**
 * Multiselect input component.
 *
 * Figma frame: "Multiselect" (id: 979:10831)
 *
 * States matching Figma layer names (corrected):
 *   'default'  → Property 2=Default   (Figma had "Deafult" — corrected)
 *   'hover'    → Property 2=Hover
 *   'focused'  → Property 2=Focus     (Figma had "Focous" — corrected)
 *
 * Types matching Figma layer names:
 *   'inputDropdown' → Property 1=Input dropdown
 *   'search'        → Property 1=Search
 *
 * Sub-states matching Figma Property 3:
 *   'default'    → Property 3=Default
 *   'addedTags'  → Property 3=added tags
 *   'filled'     → Property 3=Filled
 *   'newValue'   → Property 3=New value
 *
 * Props:
 *   options       → array of { value, label, disabled? }
 *   values        → controlled selected values array
 *   onChange      → called with updated values array
 *   placeholder   → placeholder text
 *   searchable    → show search input inside dropdown (type=search)
 *   label         → floating label text
 *   hintText      → hint / supporting text below input
 *   id, name      → html attributes
 */

function buildTriggerClasses(isOpen, hasValues) {
  const base =
    'flex flex-wrap items-center gap-1.5 w-full min-h-[42px] rounded-lg border px-3 py-2 bg-white cursor-pointer transition-all';

  if (isOpen)
    return `${base} border-slateBlue ring-2 ring-blue-100`;
  if (hasValues)
    return `${base} border-gray-400`;
  return `${base} border-gray-300 hover:border-gray-400`;
}

export function MultiselectTag({ label, onRemove, disabled }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium ${
        disabled
          ? 'bg-gray-100 text-gray-400'
          : 'bg-blue-50 text-slateBlue'
      }`}
    >
      {label}
      {!disabled && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onRemove?.(); }}
          className="ml-0.5 hover:text-slateBlue/70 transition-colors"
          aria-label={`Remove ${label}`}
        >
          <X size={10} />
        </button>
      )}
    </span>
  );
}

export function MultiselectInput({
  options = [],
  values = [],
  onChange,
  placeholder = 'Select options…',
  searchable = false,
  label,
  hintText,
  id,
  name,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef(null);
  const searchRef = useRef(null);

  const hasValues = values.length > 0;
  const triggerClass = buildTriggerClasses(isOpen, hasValues);

  const filteredOptions = searchQuery
    ? options.filter((o) =>
        o.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  useEffect(() => {
    if (isOpen && searchable) {
      searchRef.current?.focus();
    }
  }, [isOpen, searchable]);

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

  function toggleOption(optionValue) {
    const next = values.includes(optionValue)
      ? values.filter((v) => v !== optionValue)
      : [...values, optionValue];
    onChange?.(next);
  }

  function removeTag(optionValue) {
    onChange?.(values.filter((v) => v !== optionValue));
  }

  function handleTriggerKeyDown(e) {
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
      toggleOption(filteredOptions[focusedIndex].value);
    }
  }

  const selectedOptions = options.filter((o) => values.includes(o.value));

  return (
    <div ref={containerRef} className="relative flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div
        id={id}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-multiselectable="true"
        tabIndex={0}
        onClick={() => setIsOpen((o) => !o)}
        onKeyDown={handleTriggerKeyDown}
        className={triggerClass}
      >
        {/* Selected tags */}
        {selectedOptions.map((option) => (
          <MultiselectTag
            key={option.value}
            label={option.label}
            onRemove={() => removeTag(option.value)}
          />
        ))}

        {/* Search or placeholder */}
        {searchable && isOpen ? (
          <input
            ref={searchRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            placeholder={hasValues ? '' : placeholder}
            className="flex-1 min-w-[120px] text-sm outline-none placeholder-gray-400 bg-transparent"
          />
        ) : !hasValues ? (
          <span className="flex items-center gap-1.5 text-sm text-gray-400">
            {searchable && <Search size={14} className="shrink-0" />}
            {placeholder}
          </span>
        ) : null}

        <ChevronDown
          size={14}
          className={`shrink-0 ml-auto text-gray-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden animate-slide-down">
          {!searchable && (
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

          <ul role="listbox" aria-multiselectable="true" className="max-h-48 overflow-y-auto py-1">
            {filteredOptions.length === 0 ? (
              <li className="px-3 py-2 text-sm text-gray-400">No options found</li>
            ) : (
              filteredOptions.map((option, index) => {
                const isSelected = values.includes(option.value);
                return (
                  <li
                    key={option.value}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={option.disabled}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!option.disabled) toggleOption(option.value);
                    }}
                    className={`flex items-center gap-2 px-3 py-2 text-sm cursor-pointer transition-colors ${
                      index === focusedIndex ? 'bg-blue-50 text-slateBlue' :
                      option.disabled ? 'text-gray-300 cursor-not-allowed' :
                      'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {/* Checkbox */}
                    <span
                      className={`shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-slateBlue border-slateBlue'
                          : option.disabled
                          ? 'border-gray-200'
                          : 'border-gray-300'
                      }`}
                    >
                      {isSelected && (
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
                    <span className="truncate">{option.label}</span>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}

      {hintText && <p className="text-xs text-gray-500">{hintText}</p>}
    </div>
  );
}

export default MultiselectInput;
