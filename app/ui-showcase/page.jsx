'use client';

import { useState } from 'react';
import {
  InputField,
  TextareaInputField,
  InputDropdown,
  DropdownMenu,
  OptionSelection,
  OptionSelectionGroup,
  EditDescriptionInput,
  MediaUpload,
  MultiselectInput,
} from '../../components/ui';

const dropdownOptions = [
  { value: 'option1', label: 'Option one' },
  { value: 'option2', label: 'Option two' },
  { value: 'option3', label: 'Option three', disabled: true },
  { value: 'option4', label: 'Option four' },
];

const radioOptions = [
  { value: 'basic', label: 'Basic plan', description: 'Perfect for small projects' },
  { value: 'pro', label: 'Pro plan', description: 'Best for growing teams' },
  { value: 'enterprise', label: 'Enterprise', description: 'Advanced features', disabled: true },
];

function Section({ title, children }) {
  return (
    <section className="mb-12">
      <h2 className="text-lg font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
        {title}
      </h2>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

function Row({ label, children }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-mono text-gray-400 uppercase tracking-wide">{label}</p>
      <div className="flex flex-wrap gap-6 items-start">{children}</div>
    </div>
  );
}

export default function UiShowcasePage() {
  const [textValue, setTextValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [dropdownValue, setDropdownValue] = useState('');
  const [radioValue, setRadioValue] = useState('basic');
  const [multiValues, setMultiValues] = useState([]);
  const [descValue, setDescValue] = useState('');

  return (
    <main className="min-h-screen bg-offWhite py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-charcoal">
            Input Fields &amp; Drop Downs
          </h1>
          <p className="mt-2 text-gray-500 text-sm">
            Component showcase — Figma: "Input Fields and Drop Downs" (node 225:5585)
          </p>
        </div>

        {/* ── InputField ── */}
        <Section title="InputField">
          <Row label="state: placeholder (all types)">
            <div className="w-72">
              <InputField
                id="if-default"
                type="default"
                state="placeholder"
                label="Default"
                placeholder="Placeholder"
                helpIcon
              />
            </div>
            <div className="w-72">
              <InputField
                id="if-payment"
                type="paymentInput"
                state="placeholder"
                label="Payment input"
                placeholder="1234 5678 9012 3456"
              />
            </div>
            <div className="w-72">
              <InputField
                id="if-leading-dd"
                type="leadingDropdown"
                state="placeholder"
                label="Leading dropdown"
                placeholder="Search…"
                dropdownOptions={['+1']}
              />
            </div>
            <div className="w-72">
              <InputField
                id="if-leading-text"
                type="leadingText"
                state="placeholder"
                label="Leading text"
                placeholder="0.00"
                leadingText="USD"
              />
            </div>
            <div className="w-72">
              <InputField
                id="if-trailing-dd"
                type="trailingDropdown"
                state="placeholder"
                label="Trailing dropdown"
                placeholder="Choose…"
              />
            </div>
          </Row>

          <Row label="state: filled / focused / disabled">
            <div className="w-72">
              <InputField
                id="if-filled"
                type="default"
                state="filled"
                label="Filled"
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                placeholder="Type something…"
              />
            </div>
            <div className="w-72">
              <InputField
                id="if-focused"
                type="default"
                state="focused"
                label="Focused"
                placeholder="Focused state"
                helpIcon
              />
            </div>
            <div className="w-72">
              <InputField
                id="if-disabled"
                type="default"
                state="disabled"
                label="Disabled"
                placeholder="Cannot edit"
              />
            </div>
          </Row>

          <Row label="destructive=true (all states)">
            {['placeholder', 'filled', 'focused'].map((s) => (
              <div key={s} className="w-72">
                <InputField
                  id={`if-dest-${s}`}
                  type="default"
                  state={s}
                  destructive
                  label={`Destructive / ${s}`}
                  placeholder="Invalid value"
                  hintText="This field has an error."
                  helpIcon
                />
              </div>
            ))}
          </Row>

          <Row label="with hint text">
            <div className="w-72">
              <InputField
                id="if-hint"
                type="default"
                state="placeholder"
                label="Email"
                placeholder="you@example.com"
                hintText="We'll never share your email."
                helpIcon
              />
            </div>
            <div className="w-72">
              <InputField
                id="if-hint-icon"
                type="default"
                state="placeholder"
                label="With leading icon"
                leadingIcon
                placeholder="Search…"
                hintText="Enter at least 3 characters."
              />
            </div>
          </Row>
        </Section>

        {/* ── TextareaInputField ── */}
        <Section title="TextareaInputField">
          <Row label="all states">
            {['placeholder', 'default', 'focused', 'disabled'].map((s) => (
              <div key={s} className="w-72">
                <TextareaInputField
                  id={`ta-${s}`}
                  state={s}
                  label={`State: ${s}`}
                  placeholder="Enter text…"
                  hintText={s !== 'disabled' ? 'Supporting text.' : undefined}
                  value={s === 'default' ? 'Some filled text.' : ''}
                />
              </div>
            ))}
          </Row>

          <Row label="destructive">
            {['placeholder', 'default', 'focused'].map((s) => (
              <div key={s} className="w-72">
                <TextareaInputField
                  id={`ta-dest-${s}`}
                  state={s}
                  destructive
                  label={`Destructive / ${s}`}
                  placeholder="Enter text…"
                  hintText="Error message here."
                />
              </div>
            ))}
          </Row>

          <Row label="with character counter">
            <div className="w-72">
              <TextareaInputField
                id="ta-counter"
                state="default"
                label="Description"
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
                placeholder="Write something…"
                maxLength={200}
              />
            </div>
          </Row>
        </Section>

        {/* ── InputDropdown ── */}
        <Section title="InputDropdown">
          <Row label="types: default / iconLeading / search">
            <div className="w-72">
              <InputDropdown
                id="idd-default"
                type="default"
                label="Default dropdown"
                options={dropdownOptions}
                value={dropdownValue}
                onChange={setDropdownValue}
                placeholder="Select an option"
              />
            </div>
            <div className="w-72">
              <InputDropdown
                id="idd-search"
                type="search"
                label="Search dropdown"
                options={dropdownOptions}
                value={dropdownValue}
                onChange={setDropdownValue}
                placeholder="Search options…"
              />
            </div>
          </Row>
        </Section>

        {/* ── DropdownMenu ── */}
        <Section title="DropdownMenu">
          <Row label="plain / with checkboxes">
            <div className="w-64">
              <p className="text-xs text-gray-400 mb-1">Plain menu</p>
              <DropdownMenu items={dropdownOptions} />
            </div>
            <div className="w-64">
              <p className="text-xs text-gray-400 mb-1">Checkbox menu</p>
              <DropdownMenu
                items={dropdownOptions}
                checkbox
                values={multiValues}
                onChange={setMultiValues}
              />
            </div>
          </Row>
        </Section>

        {/* ── OptionSelection ── */}
        <Section title="OptionSelection">
          <Row label="all states (standalone)">
            {['default', 'hover', 'pressed', 'focused', 'disabled'].map((s) => (
              <div key={s} className="w-64">
                <OptionSelection
                  state={s}
                  label={`State: ${s}`}
                  description="Supporting description text"
                  selected={s === 'focused'}
                />
              </div>
            ))}
          </Row>

          <Row label="group (controlled)">
            <div className="w-72">
              <OptionSelectionGroup
                options={radioOptions}
                value={radioValue}
                onChange={setRadioValue}
                name="plan"
              />
            </div>
          </Row>
        </Section>

        {/* ── EditDescriptionInput ── */}
        <Section title="EditDescriptionInput">
          <Row label="all states">
            {['default', 'hover', 'focused'].map((s) => (
              <div key={s} className="w-80">
                <EditDescriptionInput
                  id={`edi-${s}`}
                  state={s}
                  label={`State: ${s}`}
                  value={s === 'default' ? descValue : ''}
                  onChange={s === 'default' ? (e) => setDescValue(e.target.value) : undefined}
                  placeholder="Add a description…"
                  maxLength={300}
                />
              </div>
            ))}
          </Row>
        </Section>

        {/* ── MediaUpload ── */}
        <Section title="MediaUpload">
          <Row label="all states">
            {['default', 'hover', 'focused'].map((s) => (
              <div key={s} className="w-72">
                <p className="text-xs text-gray-400 mb-1">State: {s}</p>
                <MediaUpload
                  id={`mu-${s}`}
                  state={s}
                  onFilesSelected={(files) => console.log('files', files)}
                />
              </div>
            ))}
          </Row>
        </Section>

        {/* ── MultiselectInput ── */}
        <Section title="MultiselectInput">
          <Row label="input dropdown / search types">
            <div className="w-80">
              <MultiselectInput
                id="ms-default"
                label="Multiselect (input dropdown)"
                options={dropdownOptions}
                values={multiValues}
                onChange={setMultiValues}
                placeholder="Select options…"
              />
            </div>
            <div className="w-80">
              <MultiselectInput
                id="ms-search"
                label="Multiselect (search)"
                searchable
                options={dropdownOptions}
                values={multiValues}
                onChange={setMultiValues}
                placeholder="Search and select…"
                hintText="You can select multiple options."
              />
            </div>
          </Row>
        </Section>
      </div>
    </main>
  );
}
