'use client';

import { useAppStore } from '@/stores/app-store';
import { Sun, Moon } from 'lucide-react';
import { useEffect } from 'react';

const COLORS = {
  'Backgrounds': [
    { name: 'bg-primary', light: '#ffffff', dark: '#1a1a2e' },
    { name: 'bg-surface', light: '#f8f9fa', dark: '#16213e' },
    { name: 'bg-elevated', light: '#ffffff', dark: '#1f2940' },
    { name: 'bg-dark', light: '#202124', dark: '#0f0f1a' },
  ],
  'Text': [
    { name: 'text-primary', light: '#202124', dark: '#e2e8f0' },
    { name: 'text-secondary', light: '#5f6368', dark: '#94a3b8' },
    { name: 'text-tertiary', light: '#80868b', dark: '#64748b' },
    { name: 'text-disabled', light: '#bdc1c6', dark: '#475569' },
  ],
  'Accent': [
    { name: 'accent-blue', light: '#4285f4', dark: '#60a5fa' },
    { name: 'accent-blue-dark', light: '#1967d2', dark: '#93c5fd' },
    { name: 'accent-green', light: '#34a853', dark: '#4ade80' },
    { name: 'accent-yellow', light: '#fbbc04', dark: '#fbbf24' },
    { name: 'accent-red', light: '#ea4335', dark: '#f87171' },
  ],
  'State': [
    { name: 'state-success', light: '#34a853', dark: '#4ade80' },
    { name: 'state-warning', light: '#fbbc04', dark: '#fbbf24' },
    { name: 'state-error', light: '#ea4335', dark: '#f87171' },
    { name: 'state-info', light: '#4285f4', dark: '#60a5fa' },
  ],
  'Borders': [
    { name: 'border-subtle', light: '#f1f3f4', dark: '#1e293b' },
    { name: 'border-default', light: '#e8eaed', dark: '#334155' },
    { name: 'border-strong', light: '#bdc1c6', dark: '#475569' },
    { name: 'border-focus', light: '#4285f4', dark: '#60a5fa' },
  ],
};

const RADII = [
  { name: 'sm', value: '4px' },
  { name: 'md', value: '8px' },
  { name: 'lg', value: '12px' },
  { name: 'xl', value: '16px' },
  { name: '2xl', value: '24px' },
  { name: 'full', value: '9999px' },
];

export function DesignSystemPage() {
  const { theme, setTheme } = useAppStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10 overflow-auto h-full">
      {/* Header + Theme Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Design System</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            Antigravity Google &mdash; NEXUS Console Tokens
          </p>
        </div>
        <div className="flex items-center gap-2 p-1 rounded-full bg-[var(--color-bg-surface)] border border-[var(--color-border-default)]">
          <button
            onClick={() => setTheme('light')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              theme === 'light'
                ? 'bg-[var(--color-accent-blue)] text-white shadow-sm'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            <Sun size={14} />
            Light
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              theme === 'dark'
                ? 'bg-[var(--color-accent-blue)] text-white shadow-sm'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            <Moon size={14} />
            Dark
          </button>
        </div>
      </div>

      {/* Colors */}
      {Object.entries(COLORS).map(([group, colors]) => (
        <section key={group}>
          <h2 className="text-lg font-semibold mb-4">{group}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {colors.map((color) => {
              const value = theme === 'dark' ? color.dark : color.light;
              return (
                <div key={color.name} className="space-y-2">
                  <div
                    className="h-16 rounded-lg border border-[var(--color-border-default)] shadow-sm"
                    style={{ backgroundColor: value }}
                  />
                  <div>
                    <p className="text-xs font-medium">{color.name}</p>
                    <p className="text-[11px] text-[var(--color-text-tertiary)] font-mono">{value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {/* Typography */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Typography</h2>
        <div className="space-y-4 p-6 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-surface)]">
          <div className="space-y-3">
            <div className="flex items-baseline gap-4">
              <span className="text-[11px] text-[var(--color-text-tertiary)] w-20 flex-shrink-0 font-mono">sans</span>
              <span className="text-2xl font-bold" style={{ fontFamily: 'var(--font-sans)' }}>Google Sans — The quick brown fox</span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-[11px] text-[var(--color-text-tertiary)] w-20 flex-shrink-0 font-mono">mono</span>
              <span className="text-lg" style={{ fontFamily: 'var(--font-mono)' }}>Google Sans Mono — const x = 42;</span>
            </div>
          </div>
          <div className="border-t border-[var(--color-border-default)] pt-4 space-y-2">
            <p className="text-2xl font-bold">Heading 1 — 2xl bold</p>
            <p className="text-lg font-semibold">Heading 2 — lg semibold</p>
            <p className="text-sm">Body — sm regular</p>
            <p className="text-xs text-[var(--color-text-secondary)]">Caption — xs secondary</p>
            <p className="text-[11px] text-[var(--color-text-tertiary)]">Micro — 11px tertiary</p>
          </div>
        </div>
      </section>

      {/* Border Radius */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Border Radius</h2>
        <div className="flex flex-wrap gap-6 items-end">
          {RADII.map((r) => (
            <div key={r.name} className="flex flex-col items-center gap-2">
              <div
                className="w-16 h-16 bg-[var(--color-accent-blue)] opacity-80"
                style={{ borderRadius: r.value }}
              />
              <div className="text-center">
                <p className="text-xs font-medium">{r.name}</p>
                <p className="text-[11px] text-[var(--color-text-tertiary)] font-mono">{r.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shadows */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Shadows</h2>
        <div className="flex flex-wrap gap-6">
          {['sm', 'md', 'lg', 'xl'].map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <div
                className="w-24 h-24 rounded-xl bg-[var(--color-bg-elevated)]"
                style={{ boxShadow: `var(--shadow-${s})` }}
              />
              <p className="text-xs font-medium">shadow-{s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Components Preview */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Components Preview</h2>
        <div className="space-y-6 p-6 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-surface)]">
          {/* Buttons */}
          <div>
            <p className="text-xs font-medium text-[var(--color-text-tertiary)] mb-3 uppercase tracking-wider">Buttons</p>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 rounded-lg bg-[var(--color-accent-blue)] text-white text-sm font-medium hover:opacity-90 transition-opacity">
                Primary
              </button>
              <button className="px-4 py-2 rounded-lg border border-[var(--color-border-default)] text-sm font-medium hover:bg-[var(--color-bg-surface)] transition-colors">
                Secondary
              </button>
              <button className="px-4 py-2 rounded-lg bg-[var(--color-state-success)] text-white text-sm font-medium hover:opacity-90 transition-opacity">
                Success
              </button>
              <button className="px-4 py-2 rounded-lg bg-[var(--color-state-error)] text-white text-sm font-medium hover:opacity-90 transition-opacity">
                Danger
              </button>
              <button className="px-4 py-2 rounded-lg bg-[var(--color-state-warning)] text-sm font-medium hover:opacity-90 transition-opacity">
                Warning
              </button>
            </div>
          </div>

          {/* Badges */}
          <div>
            <p className="text-xs font-medium text-[var(--color-text-tertiary)] mb-3 uppercase tracking-wider">Badges</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--color-state-info-bg)] text-[var(--color-state-info)]">Info</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--color-state-success-bg)] text-[var(--color-state-success)]">Success</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--color-state-warning-bg)] text-[var(--color-state-warning)]">Warning</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--color-state-error-bg)] text-[var(--color-state-error)]">Error</span>
            </div>
          </div>

          {/* Input */}
          <div>
            <p className="text-xs font-medium text-[var(--color-text-tertiary)] mb-3 uppercase tracking-wider">Input</p>
            <input
              type="text"
              placeholder="Type something..."
              className="w-full max-w-sm px-3 py-2 text-sm rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-disabled)] focus:border-[var(--color-border-focus)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-blue-light)]"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
