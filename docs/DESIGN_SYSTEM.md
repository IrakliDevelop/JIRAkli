# Jirakli Design System

## Overview

This document outlines the design system for Jirakli, a project management application heavily inspired by Atlassian's Jira. The goal is to create a familiar, professional experience that feels native to users already accustomed to Jira while maintaining our own identity.

---

## 🎨 Color Palette

### Primary Colors (Atlassian Blue)
Our primary color is the iconic Atlassian blue, conveying trust and professionalism.

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary-50` | `#E9F2FF` | Hover backgrounds, selection states |
| `--color-primary-100` | `#CCE0FF` | Light backgrounds, info callouts |
| `--color-primary-200` | `#85B8FF` | Borders, decorative elements |
| `--color-primary-400` | `#579DFF` | Secondary buttons, links |
| `--color-primary-500` | `#388BFF` | Interactive elements |
| `--color-primary-600` | `#1D7AFC` | Primary buttons, key actions |
| `--color-primary-700` | `#0C66E4` | Primary brand color |
| `--color-primary-800` | `#0055CC` | Bold text on light backgrounds |
| `--color-primary-900` | `#09326C` | Dark accents |

### Neutral Colors
For backgrounds, text, and borders.

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-neutral-0` | `#FFFFFF` | Card backgrounds |
| `--color-neutral-100` | `#F7F8F9` | Page backgrounds |
| `--color-neutral-200` | `#F1F2F4` | Subtle backgrounds |
| `--color-neutral-300` | `#DCDFE4` | Borders |
| `--color-neutral-400` | `#B3B9C4` | Disabled text |
| `--color-neutral-500` | `#8590A2` | Muted text |
| `--color-neutral-600` | `#626F86` | Secondary text |
| `--color-neutral-700` | `#44546F` | Primary text |
| `--color-neutral-800` | `#2C3E5D` | Headings |
| `--color-neutral-900` | `#1D2125` | Bold text, dark surfaces |
| `--color-neutral-1000` | `#101214` | Darkest surfaces |

### Semantic Colors

| Token | Color | Usage |
|-------|-------|-------|
| `--color-success` | `#216E4E` | Done, success states |
| `--color-success-bold` | `#1F845A` | Success backgrounds |
| `--color-warning` | `#A54800` | In Progress, warnings |
| `--color-warning-bold` | `#B65C02` | Warning backgrounds |
| `--color-danger` | `#AE2A19` | Critical, errors |
| `--color-danger-bold` | `#CA3521` | Danger backgrounds |
| `--color-info` | `#0055CC` | Information, todo |
| `--color-discovery` | `#5E4DB2` | Review, new features |

---

## 📝 Typography

### Font Family
We use the Atlassian system font stack for optimal readability and native feel:

```css
--font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
--font-mono: 'SFMono-Medium', 'SF Mono', 'Segoe UI Mono', 'Roboto Mono', 'Ubuntu Mono', Menlo, Consolas, monospace;
```

### Type Scale

| Token | Size | Weight | Usage |
|-------|------|--------|-------|
| `--text-h900` | 35px | 500 | Page titles (rare) |
| `--text-h800` | 29px | 600 | Section headers |
| `--text-h700` | 24px | 500 | Card titles |
| `--text-h600` | 20px | 500 | Large headings |
| `--text-h500` | 16px | 600 | Component headers |
| `--text-h400` | 14px | 600 | Subheadings |
| `--text-h300` | 12px | 600 | Small headings |
| `--text-body` | 14px | 400 | Body text |
| `--text-small` | 12px | 400 | Secondary text |
| `--text-tiny` | 11px | 400 | Timestamps, metadata |

---

## 🏗️ Layout

### Page Structure

```
┌─────────────────────────────────────────────────────────────┐
│  Navigation Bar (56px height)                               │
├──────────┬──────────────────────────────────────────────────┤
│          │                                                  │
│  Sidebar │        Main Content Area                         │
│  (240px) │        (Flexible)                                │
│          │                                                  │
│          │                                                  │
│          │                                                  │
│          │                                                  │
│          │                                                  │
└──────────┴──────────────────────────────────────────────────┘
```

### Navigation Bar
- Height: 56px
- Background: Linear gradient from `#1D2125` to `#292E33`
- Logo + brand name left-aligned
- User menu and actions right-aligned
- Sticky position

### Sidebar
- Width: 240px (collapsible to 64px on mobile)
- Background: `#F7F8F9`
- Contains: Project navigation, filters, quick actions
- Sections separated by dividers

### Content Area
- Max-width: 1440px for lists/tables
- No max-width for board views
- Padding: 32px on desktop, 16px on mobile
- Background: `#F7F8F9` or `#FFFFFF` depending on context

---

## 🧩 Components

### Buttons

#### Primary Button
```css
background: var(--color-primary-700);
color: white;
border-radius: 3px;
padding: 0 12px;
height: 32px;
font-weight: 500;
transition: background 0.1s ease-in-out;

&:hover {
  background: var(--color-primary-800);
}
```

#### Secondary Button
```css
background: transparent;
color: var(--color-primary-700);
border: none;

&:hover {
  background: var(--color-neutral-200);
}
```

#### Icon Button
- 32x32px
- Rounded corners (3px)
- Subtle hover state

### Cards

```css
background: var(--color-neutral-0);
border-radius: 3px;
box-shadow: 0 1px 1px rgba(9, 30, 66, 0.25), 0 0 1px rgba(9, 30, 66, 0.31);

&:hover {
  box-shadow: 0 4px 8px -2px rgba(9, 30, 66, 0.25), 0 0 1px rgba(9, 30, 66, 0.31);
}
```

### Lozenges (Status Badges)

Status indicators use colored lozenges with subtle backgrounds:

| Status | Background | Text Color |
|--------|------------|------------|
| Backlog | `#DCDFE4` | `#44546F` |
| To Do | `#CCE0FF` | `#0055CC` |
| In Progress | `#FFF7D6` | `#A54800` |
| In Review | `#F3F0FF` | `#5E4DB2` |
| Done | `#DCFFF1` | `#216E4E` |

```css
.lozenge {
  display: inline-flex;
  align-items: center;
  padding: 0 8px;
  height: 20px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  border-radius: 3px;
}
```

### Priority Icons

| Priority | Icon | Color |
|----------|------|-------|
| Critical | ⬆ Double arrow up | `#CA3521` |
| High | ↑ Arrow up | `#E34935` |
| Medium | → Arrow right | `#E2B203` |
| Low | ↓ Arrow down | `#4BCE97` |

---

## 📋 Key Views

### 1. Board View (Kanban)

The primary view for managing tickets in a project.

```
┌──────────────────────────────────────────────────────────────┐
│  Backlog (3)    │  To Do (5)     │  In Progress (2)  │ Done │
├──────────────────────────────────────────────────────────────┤
│ ┌────────────┐  │ ┌────────────┐ │ ┌────────────┐    │      │
│ │ PROJ-123   │  │ │ PROJ-124   │ │ │ PROJ-125   │    │      │
│ │ Title here │  │ │ Title here │ │ │ Title...   │    │      │
│ │ [Priority] │  │ │ [Priority] │ │ │ [Priority] │    │      │
│ │ 👤 Avatar  │  │ │ 👤 Avatar  │ │ │ 👤 Avatar  │    │      │
│ └────────────┘  │ └────────────┘ │ └────────────┘    │      │
│ ┌────────────┐  │ ┌────────────┐ │                   │      │
│ │ PROJ-126   │  │ │ PROJ-127   │ │                   │      │
│ └────────────┘  │ └────────────┘ │                   │      │
└──────────────────────────────────────────────────────────────┘
```

- Columns: Fixed width (280px)
- Column headers: Sticky
- Cards: Draggable between columns
- Quick actions on hover

### 2. Issue Detail Panel

Opens as a slide-in panel from the right (60% width) or full page.

```
┌──────────────────────────────────────────────────────────────┐
│ ← Back to board                           [Watch] [Share] ⋮ │
├──────────────────────────────────────────────────────────────┤
│ PROJ-123                                                     │
│ ══════════════════════════════════════════════════════════  │
│ Issue Title Goes Here                                        │
│                                                              │
│ [Attach] [Link] [Subtask]                                    │
├────────────────────────────────────────┬─────────────────────┤
│                                        │ Status: [To Do ▼]   │
│ Description                            │ Assignee: [User ▼]  │
│ ─────────────                          │ Reporter: User      │
│ Lorem ipsum dolor sit amet...          │ Priority: [High]    │
│                                        │                     │
│                                        │ ─────────────────   │
│ Activity                               │ Dates               │
│ ─────────                              │ Created: Jan 1      │
│ [Comments] [History] [All]             │ Updated: Jan 5      │
│                                        │                     │
└────────────────────────────────────────┴─────────────────────┘
```

### 3. Project List

Cards displayed in a grid layout:

```
┌──────────────────────────────────────────────────────────────┐
│ Your Projects                                    [+ Create]  │
├──────────────────────────────────────────────────────────────┤
│ ┌─────────────────┐  ┌─────────────────┐  ┌────────────────┐│
│ │ 🔷 Project A    │  │ 🔷 Project B    │  │ 🔷 Project C   ││
│ │                 │  │                 │  │                ││
│ │ KEY: PROJ       │  │ KEY: DEMO       │  │ KEY: TEST      ││
│ │ 12 issues       │  │ 5 issues        │  │ 0 issues       ││
│ │ Lead: User      │  │ Lead: User      │  │ Lead: User     ││
│ └─────────────────┘  └─────────────────┘  └────────────────┘│
└──────────────────────────────────────────────────────────────┘
```

---

## 🎭 Dark Mode

Dark mode follows Atlassian's dark theme guidelines:

| Element | Light | Dark |
|---------|-------|------|
| Page Background | `#F7F8F9` | `#1D2125` |
| Card Background | `#FFFFFF` | `#22272B` |
| Elevated Surface | `#FFFFFF` | `#282E33` |
| Primary Text | `#172B4D` | `#B6C2CF` |
| Secondary Text | `#626F86` | `#8C9BAB` |
| Border | `#DCDFE4` | `#A1BDD914` |
| Navigation | `#1D2125` | `#1D2125` |

---

## ⚡ Animations & Transitions

### Standard Transitions
```css
--transition-fast: 100ms ease-in-out;
--transition-normal: 200ms ease-in-out;
--transition-slow: 300ms ease-in-out;
```

### Key Animations
1. **Card hover**: Subtle lift with shadow
2. **Button press**: Scale down to 0.98
3. **Panel slide-in**: 200ms slide from right
4. **Drag & drop**: 150ms snap animation
5. **Status change**: 200ms background color fade

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 768px | Single column, no sidebar |
| Tablet | 768px - 1024px | Collapsed sidebar |
| Desktop | > 1024px | Full layout |

---

## ✅ Implementation Checklist

- [ ] Update CSS variables in `_variables.css`
- [ ] Create component styles in `_components.css`
- [ ] Implement sidebar navigation
- [ ] Build Kanban board component
- [ ] Create issue detail panel
- [ ] Update all existing components
- [ ] Implement dark mode toggle
- [ ] Add loading skeletons
- [ ] Ensure responsive design

---

## References

- [Atlassian Design System](https://atlassian.design/)
- [Jira Software](https://www.atlassian.com/software/jira)
