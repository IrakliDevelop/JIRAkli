# Jirakli Style Guide

This document outlines the visual design system and styling conventions for Jirakli.

## Design Philosophy

**Dense & Productive**: Jirakli follows a dense, information-rich design inspired by professional project management tools. The interface prioritizes showing more content with compact layouts while maintaining readability.

## Technology Stack

- **Tailwind CSS v4**: Utility-first CSS framework for rapid styling
- **Angular Material v21**: Material Design 3 components
- **CSS Custom Properties**: Theme variables for consistent theming

## Color Palette

### Primary - Teal

Our primary color conveys freshness, clarity, and productivity.

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary-50` | `#f0fdfa` | Hover backgrounds |
| `--color-primary-100` | `#ccfbf1` | Light backgrounds |
| `--color-primary-200` | `#99f6e4` | Borders, dividers |
| `--color-primary-400` | `#2dd4bf` | Dark mode primary |
| `--color-primary-500` | `#14b8a6` | Secondary actions |
| `--color-primary-600` | `#0d9488` | **Primary actions** |
| `--color-primary-700` | `#0f766e` | Hover states |
| `--color-primary-800` | `#115e59` | Active states |

### Secondary - Slate

Used for text, backgrounds, and neutral UI elements.

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-secondary-50` | `#f8fafc` | Light mode backgrounds |
| `--color-secondary-100` | `#f1f5f9` | Card backgrounds |
| `--color-secondary-200` | `#e2e8f0` | Borders |
| `--color-secondary-400` | `#94a3b8` | Muted text |
| `--color-secondary-600` | `#475569` | Secondary text |
| `--color-secondary-800` | `#1e293b` | Dark mode surfaces |
| `--color-secondary-900` | `#0f172a` | Dark mode backgrounds |

### Semantic Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Success | `#16a34a` | Positive actions, done states |
| Warning | `#f59e0b` | Warnings, in-progress states |
| Error | `#dc2626` | Errors, critical states |
| Info | `#0ea5e9` | Information, todo states |

## Dark Mode

Dark mode is supported via the `data-theme="dark"` attribute on `<html>`.

### Theme-Aware Variables

```css
/* Usage in components */
.card {
  background-color: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}
```

Key semantic variables that auto-switch:

| Variable | Light | Dark |
|----------|-------|------|
| `--color-bg` | `#ffffff` | `#0f172a` |
| `--color-surface` | `#ffffff` | `#1e293b` |
| `--color-text` | `#0f172a` | `#f1f5f9` |
| `--color-text-secondary` | `#475569` | `#cbd5e1` |
| `--color-border` | `#e2e8f0` | `#334155` |

### Implementing Dark Mode

Use the `ThemeService` to toggle themes:

```typescript
import { ThemeService } from './core';

export class MyComponent {
  private theme = inject(ThemeService);
  
  toggleTheme() {
    this.theme.toggleTheme();
  }
}
```

## Typography

### Font Family

```css
--font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
--font-mono: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Monaco, Consolas, monospace;
```

### Scale

| Size | Value | Usage |
|------|-------|-------|
| `--text-xs` | `0.75rem` | Labels, badges |
| `--text-sm` | `0.875rem` | Secondary text, table cells |
| `--text-base` | `1rem` | Body text |
| `--text-lg` | `1.125rem` | Subtitles |
| `--text-xl` | `1.25rem` | Section headers |
| `--text-2xl` | `1.5rem` | Page titles |
| `--text-3xl` | `1.875rem` | Large headings |

### Tailwind Classes

```html
<!-- Headings -->
<h1 class="text-2xl font-bold text-slate-900 dark:text-slate-100">Page Title</h1>
<h2 class="text-lg font-semibold text-slate-800 dark:text-slate-200">Section</h2>

<!-- Body -->
<p class="text-base text-slate-700 dark:text-slate-300">Body text</p>
<p class="text-sm text-slate-600 dark:text-slate-400">Secondary text</p>
```

## Spacing

Use Tailwind's spacing scale consistently:

| Scale | Value | Usage |
|-------|-------|-------|
| `1` | `0.25rem` | Tight gaps |
| `2` | `0.5rem` | Icon spacing |
| `3` | `0.75rem` | Inline elements |
| `4` | `1rem` | Default padding |
| `6` | `1.5rem` | Card padding |
| `8` | `2rem` | Section spacing |

### Container Pattern

```html
<div class="max-w-7xl mx-auto p-4 md:p-6">
  <!-- Content -->
</div>
```

## Components

### Buttons

Use Angular Material buttons with Tailwind for custom styling:

```html
<!-- Primary action -->
<button mat-flat-button color="primary">
  <mat-icon>add</mat-icon>
  Create Project
</button>

<!-- Secondary action -->
<button mat-button>Cancel</button>

<!-- Destructive action -->
<button mat-stroked-button color="warn">
  <mat-icon>delete</mat-icon>
  Delete
</button>
```

### Cards

```html
<mat-card>
  <mat-card-header>
    <mat-card-title>Title</mat-card-title>
    <mat-card-subtitle>Subtitle</mat-card-subtitle>
  </mat-card-header>
  <mat-card-content>
    <!-- Content -->
  </mat-card-content>
  <mat-card-actions align="end">
    <button mat-button>Action</button>
  </mat-card-actions>
</mat-card>
```

### Form Fields

```html
<mat-form-field appearance="outline">
  <mat-label>Email</mat-label>
  <input matInput type="email" />
  <mat-icon matSuffix>email</mat-icon>
  <mat-error>Please enter a valid email</mat-error>
</mat-form-field>
```

### Status & Priority Badges

```html
<!-- Status -->
<span class="status-todo px-2 py-1 rounded text-xs font-medium">
  Todo
</span>

<!-- Priority -->
<span class="priority-high px-2 py-1 rounded text-xs font-medium">
  High
</span>
```

Available classes:
- Status: `status-backlog`, `status-todo`, `status-in_progress`, `status-review`, `status-done`
- Priority: `priority-low`, `priority-medium`, `priority-high`, `priority-critical`

## Layout Patterns

### Page Layout

```html
<div class="max-w-7xl mx-auto p-4 md:p-6">
  <!-- Page header -->
  <header class="flex justify-between items-center mb-6">
    <h1 class="text-2xl font-bold">Page Title</h1>
    <button mat-flat-button color="primary">Action</button>
  </header>
  
  <!-- Content -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <!-- Items -->
  </div>
</div>
```

### Two-Column Layout (Detail Pages)

```html
<div class="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
  <!-- Main content -->
  <mat-card>
    <!-- ... -->
  </mat-card>
  
  <!-- Sidebar -->
  <mat-card class="h-fit">
    <!-- ... -->
  </mat-card>
</div>
```

## Loading States

```html
<!-- Full page spinner -->
<div class="flex justify-center items-center py-16">
  <mat-spinner diameter="40"></mat-spinner>
</div>

<!-- Inline spinner -->
<mat-spinner diameter="20" class="inline-block"></mat-spinner>
```

## Empty States

```html
<mat-card class="text-center py-12">
  <mat-card-content>
    <mat-icon class="text-6xl text-slate-300 dark:text-slate-600 mb-4">
      folder_open
    </mat-icon>
    <p class="text-slate-600 dark:text-slate-400 mb-6">
      No items yet.
    </p>
    <button mat-flat-button color="primary">
      Create Item
    </button>
  </mat-card-content>
</mat-card>
```

## Error States

```html
<!-- Inline error message -->
<div class="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-4 py-3 rounded-md text-sm">
  {{ errorMessage }}
</div>

<!-- Error card -->
<mat-card class="bg-red-50 dark:bg-red-900/20">
  <mat-card-content class="text-red-700 dark:text-red-400 text-center py-8">
    {{ error }}
  </mat-card-content>
</mat-card>
```

## Responsive Design

### Breakpoints (Tailwind defaults)

| Prefix | Min Width |
|--------|-----------|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |

### Common Patterns

```html
<!-- Responsive grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

<!-- Responsive padding -->
<div class="p-4 md:p-6">

<!-- Hide on mobile -->
<span class="hidden md:inline">Full text</span>
<span class="md:hidden">Short</span>
```

## Accessibility

- Always use `mat-label` for form fields
- Include `mat-error` for validation messages
- Use `matTooltip` for icon-only buttons
- Maintain sufficient color contrast (4.5:1 for text)
- Support keyboard navigation with `:focus-visible` styles

```html
<button mat-icon-button matTooltip="Toggle theme">
  <mat-icon>dark_mode</mat-icon>
</button>
```
