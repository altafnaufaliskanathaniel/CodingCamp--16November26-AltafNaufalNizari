# Design — Kiro Dashboard

## Visual Style

### Color Palette

| Token | Dark Mode | Light Mode |
|---|---|---|
| `--bg-primary` | `#0f1117` | `#f0f2f8` |
| `--bg-secondary` | `#1a1d27` | `#e4e7f1` |
| `--bg-card` | `#1e2130` | `#ffffff` |
| `--accent` | `#6c63ff` | `#6c63ff` |
| `--text-primary` | `#e8eaf0` | `#1a1d2e` |
| `--text-secondary` | `#8b8fa8` | `#5a5f7a` |
| `--success` | `#4ade80` | `#22c55e` |
| `--danger` | `#f87171` | `#ef4444` |
| `--warning` | `#fbbf24` | `#f59e0b` |

Theme is applied via `data-theme` attribute on `<html>` using CSS custom properties.

### Typography
- Font: `'Segoe UI'`, system-ui, -apple-system, sans-serif
- Base size: 14–15px
- Headings: 600–700 weight
- Monospace numbers: `font-variant-numeric: tabular-nums`

### Border Radius
- Cards: `14px`
- Buttons / inputs: `8px`
- Pill buttons: `50px`

---

## Layout

```
┌─────────────────────────────────────┐
│  Top Bar (Theme Toggle)             │
├─────────────────────────────────────┤
│  Greeting Card (full width)         │
│  - Greeting phrase + name           │
│  - Live clock + date                │
├──────────────────┬──────────────────┤
│  Focus Timer     │  To-Do List      │
│                  │                  │
├──────────────────┴──────────────────┤
│  Quick Links (full width)           │
└─────────────────────────────────────┘
```

- Max width: `1100px`, centered
- Main grid: 2-column CSS Grid, collapses to 1 column below 720px
- Quick Links card spans full width (`grid-column: span 2`)

---

## Component Designs

### Greeting Card
- Full-width purple gradient banner (`#6c63ff` → `#9f6ef5`)
- Decorative translucent circles in background
- Left: greeting phrase, subtitle, name row with edit button
- Right: large live clock + date
- Name edit form slides in inline (hidden by default)

### Focus Timer
- Large tabular clock display (`60px`, bold)
- Progress bar depletes left-to-right as time runs
- Three controls: Start (accent), Pause (neutral), Reset (neutral)
- Custom time input row at the bottom, separated by a border
- Status text line below controls for state feedback

### To-Do List
- Input + Add button in a row
- Inline duplicate warning below the input (hidden until triggered)
- Sort dropdown in the card header
- Each task item: checkbox button → task text → edit/delete icons
- Completed tasks: strikethrough text, reduced opacity
- Edit mode: text replaced inline with an input field
- Max height `320px` with custom scrollbar

### Quick Links
- 3-column grid of link tiles
- Each tile: favicon image (via Google S2 API) + label
- Delete button appears on hover (top-right corner of tile)
- Add form: 2-column grid (label + URL) + full-width Add button

### Toast Notification
- Fixed bottom-right, slides up on show
- Left border color indicates type: green = success, yellow = warning
- Auto-dismisses after 2.8 seconds

---

## File Structure

```
project-kiro/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
└── Kiro/
    ├── requirements.md
    ├── design.md
    ├── tasks.md
    ├── tasks.json
    └── tasks.html
```

---

## Interaction States

| Element | Default | Hover | Active / Focus |
|---|---|---|---|
| Accent button | `#6c63ff` bg | `#574fd6` bg | — |
| Neutral button | card bg | card-hover bg | — |
| Task item | card-secondary bg | card-hover + border-light | — |
| Quick link tile | card-secondary bg | accent border + lift | — |
| Text input | secondary bg | — | accent border |
| Theme toggle | card bg, muted text | card-hover, primary text | — |
