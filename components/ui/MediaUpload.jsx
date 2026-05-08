'use client';

import { useRef } from 'react';
import { Upload } from 'lucide-react';

/**
 * Media upload component.
 *
 * Figma frame: "Media upload" (id: 783:9467)
 *
 * States matching Figma layer names (corrected):
 *   'default' | 'hover' | 'focused'
 *
 * Note: Figma had "Property 1=Focoused" — corrected to 'focused'.
 */

function buildDropzoneClasses(state, isDragActive) {
  const base =
    'flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-8 cursor-pointer transition-all';

  if (state === 'focused' || isDragActive)
    return `${base} border-slateBlue bg-blue-50`;
  if (state === 'hover')
    return `${base} border-gray-400 bg-gray-50`;
  return `${base} border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50`;
}

export function MediaUpload({
  state = 'default',
  accept = 'image/*',
  multiple = false,
  onFilesSelected,
  label = 'Upload media',
  supportingText = 'PNG, JPG, GIF up to 10MB',
  id,
}) {
  const inputRef = useRef(null);
  const dropzoneClass = buildDropzoneClasses(state, false);

  function handleClick() {
    inputRef.current?.click();
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }

  function handleChange(e) {
    const files = Array.from(e.target.files ?? []);
    if (files.length) onFilesSelected?.(files);
    e.target.value = '';
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length) onFilesSelected?.(files);
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={label}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={dropzoneClass}
    >
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        className="sr-only"
      />

      <div
        className={`flex items-center justify-center w-10 h-10 rounded-lg ${
          state === 'focused' ? 'bg-blue-100 text-slateBlue' : 'bg-gray-100 text-gray-400'
        }`}
      >
        <Upload size={20} />
      </div>

      <div className="text-center">
        <p className="text-sm font-medium text-gray-700">
          <span className="text-slateBlue underline-offset-2 hover:underline">
            Click to upload
          </span>{' '}
          or drag and drop
        </p>
        {supportingText && (
          <p className="mt-1 text-xs text-gray-400">{supportingText}</p>
        )}
      </div>
    </div>
  );
}

export default MediaUpload;
