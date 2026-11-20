# Requirements — Kiro Dashboard

## Technical Constraints

### TC-1: Technology Stack
- HTML for structure
- CSS for styling
- Vanilla JavaScript (no frameworks like React, Vue, etc.)
- No backend server required

### TC-2: Data Storage
- Use browser Local Storage API
- All data stored client-side only

### TC-3: Browser Compatibility
- Must work in modern browsers: Chrome, Firefox, Edge, Safari
- Can be used as standalone web app or browser extension

---

## Non-Functional Requirements

### NFR-1: Simplicity
- Clean, minimal interface
- Easy to understand and use
- No complex setup required
- No test setup required

### NFR-2: Performance
- Fast load time
- Responsive UI interactions
- No noticeable lag when updating data

### NFR-3: Visual Design
- User-friendly aesthetic
- Clear visual hierarchy
- Readable typography

---

## Required Features (MVP)

### F-1: Greeting
- Show current time and date
- Show a greeting based on the time of day (morning / afternoon / evening / night)

### F-2: Focus Timer
- 25-minute countdown timer (default)
- Start, Stop (Pause), and Reset buttons

### F-3: To-Do List
- Add tasks
- Edit tasks
- Mark tasks as done
- Delete tasks
- Save tasks using Local Storage

### F-4: Quick Links
- Buttons that open favorite websites in a new tab
- Links saved in Local Storage
- Default links pre-loaded on first visit

---

## Challenges (All 5 Implemented)

### C-1: Light / Dark Mode
- Toggle button to switch between light and dark theme
- Selected theme persisted via Local Storage

### C-2: Custom Name in Greeting
- User can set their name from the greeting card
- Name saved in Local Storage and shown on every visit

### C-3: Change Pomodoro Time
- Number input to set a custom timer duration (1–180 minutes)
- Apply button updates the timer immediately
- Custom duration saved in Local Storage

### C-4: Prevent Duplicate Tasks
- Case-insensitive check when adding or editing a task
- Inline warning shown if duplicate is detected

### C-5: Sort Tasks
- Dropdown to sort tasks: Default, A→Z, Z→A, Undone first, Done first

---

## Folder Rules
- Only 1 CSS file inside `css/`
- Only 1 JavaScript file inside `js/`
- Code must be clean and readable
