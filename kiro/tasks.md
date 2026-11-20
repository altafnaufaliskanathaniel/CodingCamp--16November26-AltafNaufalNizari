# Tasks — Kiro Dashboard

## Status Legend
- `[x]` Done
- `[ ]` Not started

---

## Phase 1 — Project Setup

- [x] Create folder structure (`css/`, `js/`, `Kiro/`)
- [x] Create `index.html` base template
- [x] Create `css/style.css`
- [x] Create `js/app.js`
- [x] Link CSS and JS in HTML

---

## Phase 2 — Core Features

### F-1: Greeting & Clock
- [x] Display live clock (HH:MM:SS), updates every second
- [x] Display current date (Day, Month Date, Year)
- [x] Show greeting phrase based on time of day

### F-2: Focus Timer
- [x] Render default 25-minute countdown
- [x] Start button — begins countdown
- [x] Pause button — pauses countdown
- [x] Reset button — restores to full duration
- [x] Progress bar synced to remaining time
- [x] Status text (Focusing / Paused / Complete)
- [x] Audio beep on session complete

### F-3: To-Do List
- [x] Add task via input + button (or Enter key)
- [x] Render task list from Local Storage on load
- [x] Mark task as done (toggle checkbox)
- [x] Edit task inline
- [x] Delete task
- [x] Save all changes to Local Storage
- [x] Show completion count in footer

### F-4: Quick Links
- [x] Render link tiles from Local Storage on load
- [x] Pre-load 3 default links on first visit (Google, YouTube, GitHub)
- [x] Open links in new tab
- [x] Delete link on hover (✕ button)
- [x] Add new link via label + URL form
- [x] Auto-prepend `https://` if missing
- [x] Save links to Local Storage
- [x] Load favicon via Google S2 API

---

## Phase 3 — Challenges

### C-1: Light / Dark Mode
- [x] CSS custom properties for both themes
- [x] `data-theme` attribute toggle on `<html>`
- [x] Theme toggle button in top bar
- [x] Button label updates to reflect current theme
- [x] Save selected theme to Local Storage

### C-2: Custom Name in Greeting
- [x] Display name below greeting phrase
- [x] Edit button opens inline name form
- [x] Save button writes name to Local Storage
- [x] Enter key submits the form
- [x] Name persists on page reload

### C-3: Change Pomodoro Time
- [x] Number input for custom minutes (1–180)
- [x] Apply button updates timer duration
- [x] Timer resets to new duration immediately
- [x] Custom duration saved to Local Storage
- [x] Input pre-filled with saved duration on load

### C-4: Prevent Duplicate Tasks
- [x] Case-insensitive duplicate check on add
- [x] Case-insensitive duplicate check on edit
- [x] Inline warning message shown on duplicate add
- [x] Toast shown on duplicate edit attempt

### C-5: Sort Tasks
- [x] Sort dropdown in To-Do card header
- [x] Sort options: Default, A→Z, Z→A, Undone first, Done first
- [x] Re-renders list on sort change without modifying saved order

---

## Phase 4 — Polish & Quality

- [x] Toast notification system (success + warning types)
- [x] HTML special character escaping for user input
- [x] Responsive layout (single column on mobile)
- [x] Custom scrollbar on task list
- [x] Smooth transitions on theme switch
- [x] Hover effects on all interactive elements

---

## Phase 5 — Deployment

- [ ] Initialize Git repository
- [ ] Create GitHub repository
- [ ] Push code with GitHub Desktop
- [ ] Enable GitHub Pages (branch: `main`, root: `/`)
- [ ] Verify live URL works correctly
