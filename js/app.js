/* ========================================
   KIRO DASHBOARD — app.js
   Challenges: Light/Dark mode, Custom name,
               Change Pomodoro time,
               Prevent duplicate tasks,
               Sort tasks
======================================== */

// ============================================================
// UTILITY
// ============================================================
function $(id) { return document.getElementById(id); }

function showToast(msg, type = 'success') {
  const toast = $('toast');
  toast.textContent = msg;
  toast.className = `toast ${type} show`;
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => { toast.className = 'toast'; }, 2800);
}

// ============================================================
// THEME (Light / Dark mode) — Challenge #1
// ============================================================
(function initTheme() {
  const saved = localStorage.getItem('kiro_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeBtn(saved);
})();

function updateThemeBtn(theme) {
  const btn = $('theme-toggle');
  if (!btn) return;
  if (theme === 'light') {
    btn.innerHTML = '<span class="theme-icon">🌙</span> Dark mode';
  } else {
    btn.innerHTML = '<span class="theme-icon">☀️</span> Light mode';
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('kiro_theme', next);
  updateThemeBtn(next);
}

// ============================================================
// GREETING, TIME & DATE
// ============================================================
function getGreeting(hour) {
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  if (hour < 21) return 'Good evening';
  return 'Good night';
}

function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  $('current-time').textContent = `${h}:${m}:${s}`;

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'];
  $('current-date').textContent =
    `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

  const greeting = getGreeting(now.getHours());
  $('greeting-phrase').textContent = greeting;
}

setInterval(updateClock, 1000);
updateClock();

// ============================================================
// CUSTOM NAME — Challenge #2
// ============================================================
(function initName() {
  const saved = localStorage.getItem('kiro_username') || '';
  renderNameDisplay(saved);
})();

function renderNameDisplay(name) {
  const display = $('name-display');
  display.textContent = name ? `👋 Hi, ${name}!` : '👋 Set your name';
}

function openNameEdit() {
  const name = localStorage.getItem('kiro_username') || '';
  $('name-input').value = name;
  $('name-display').style.display = 'none';
  $('edit-name-btn').style.display = 'none';
  const form = $('name-edit-form');
  form.classList.add('active');
  $('name-input').focus();
}

function saveName() {
  const val = $('name-input').value.trim();
  localStorage.setItem('kiro_username', val);
  renderNameDisplay(val);
  $('name-display').style.display = '';
  $('edit-name-btn').style.display = '';
  $('name-edit-form').classList.remove('active');
  if (val) showToast(`Name saved as "${val}"`);
}

$('edit-name-btn').addEventListener('click', openNameEdit);
$('save-name-btn').addEventListener('click', saveName);
$('name-input').addEventListener('keydown', e => { if (e.key === 'Enter') saveName(); });

// ============================================================
// FOCUS TIMER — Challenge #3: Change Pomodoro time
// ============================================================
let timerDuration = parseInt(localStorage.getItem('kiro_timer_mins') || '25', 10);
let timerRemaining = timerDuration * 60;
let timerTotal = timerRemaining;
let timerInterval = null;
let timerRunning = false;

function formatTime(secs) {
  const m = String(Math.floor(secs / 60)).padStart(2, '0');
  const s = String(secs % 60).padStart(2, '0');
  return `${m}:${s}`;
}

function renderTimer() {
  $('timer-time').textContent = formatTime(timerRemaining);
  const pct = timerTotal > 0 ? (timerRemaining / timerTotal) * 100 : 100;
  $('timer-progress-bar').style.width = pct + '%';
  $('timer-label').textContent = `${timerDuration} min session`;
}

function timerTick() {
  if (timerRemaining <= 0) {
    clearInterval(timerInterval);
    timerRunning = false;
    timerRemaining = 0;
    renderTimer();
    $('timer-status').textContent = '🎉 Session complete! Take a break.';
    $('btn-start').disabled = false;
    playBeep();
    return;
  }
  timerRemaining--;
  renderTimer();
}

function startTimer() {
  if (timerRunning) return;
  if (timerRemaining <= 0) timerRemaining = timerTotal;
  timerRunning = true;
  $('btn-start').disabled = true;
  $('timer-status').textContent = '▶ Focusing…';
  timerInterval = setInterval(timerTick, 1000);
}

function stopTimer() {
  if (!timerRunning) return;
  clearInterval(timerInterval);
  timerRunning = false;
  $('btn-start').disabled = false;
  $('timer-status').textContent = '⏸ Paused';
}

function resetTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  timerRemaining = timerTotal;
  $('btn-start').disabled = false;
  $('timer-status').textContent = '';
  renderTimer();
}

function setCustomTime() {
  const val = parseInt($('custom-mins').value, 10);
  if (isNaN(val) || val < 1 || val > 180) {
    showToast('Enter a time between 1 and 180 minutes.', 'warning');
    return;
  }
  timerDuration = val;
  timerTotal = val * 60;
  timerRemaining = timerTotal;
  localStorage.setItem('kiro_timer_mins', val);
  clearInterval(timerInterval);
  timerRunning = false;
  $('btn-start').disabled = false;
  $('timer-status').textContent = '';
  renderTimer();
  showToast(`Timer set to ${val} minutes`);
}

function playBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.8);
  } catch (e) { /* audio not available */ }
}

$('btn-start').addEventListener('click', startTimer);
$('btn-stop').addEventListener('click', stopTimer);
$('btn-reset').addEventListener('click', resetTimer);
$('btn-set-time').addEventListener('click', setCustomTime);
$('custom-mins').value = timerDuration;

// Initialize display
renderTimer();

// ============================================================
// TO-DO LIST — Challenge #4: Prevent duplicates, Challenge #5: Sort
// ============================================================
let tasks = JSON.parse(localStorage.getItem('kiro_tasks') || '[]');

function saveTasks() {
  localStorage.setItem('kiro_tasks', JSON.stringify(tasks));
}

function getSortedTasks() {
  const sort = $('sort-select').value;
  const copy = [...tasks];
  if (sort === 'az') {
    copy.sort((a, b) => a.text.localeCompare(b.text));
  } else if (sort === 'za') {
    copy.sort((a, b) => b.text.localeCompare(a.text));
  } else if (sort === 'done') {
    copy.sort((a, b) => Number(b.done) - Number(a.done));
  } else if (sort === 'undone') {
    copy.sort((a, b) => Number(a.done) - Number(b.done));
  }
  // 'default' keeps insertion order
  return copy;
}

function renderTasks() {
  const list = $('todo-list');
  const sorted = getSortedTasks();

  if (sorted.length === 0) {
    list.innerHTML = '<li class="todo-empty">No tasks yet. Add one above!</li>';
    $('todo-footer').textContent = '';
    return;
  }

  const done = tasks.filter(t => t.done).length;
  $('todo-footer').textContent = `${done} of ${tasks.length} completed`;

  list.innerHTML = '';
  sorted.forEach(task => {
    const realIndex = tasks.findIndex(t => t.id === task.id);
    const li = document.createElement('li');
    li.className = 'todo-item' + (task.done ? ' done' : '');
    li.dataset.id = task.id;

    li.innerHTML = `
      <button class="todo-check" data-action="toggle" aria-label="Toggle done"></button>
      <span class="todo-text">${escapeHtml(task.text)}</span>
      <div class="todo-actions">
        <button class="btn-icon" data-action="edit" title="Edit">✏️</button>
        <button class="btn-icon delete" data-action="delete" title="Delete">🗑️</button>
      </div>
    `;
    list.appendChild(li);
  });
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function addTask() {
  const input = $('new-task-input');
  const text = input.value.trim();
  if (!text) return;

  // Challenge #4: Prevent duplicates (case-insensitive)
  const dup = tasks.some(t => t.text.toLowerCase() === text.toLowerCase());
  if (dup) {
    $('duplicate-warning').classList.add('visible');
    input.focus();
    return;
  }
  $('duplicate-warning').classList.remove('visible');

  tasks.push({ id: Date.now(), text, done: false });
  saveTasks();
  input.value = '';
  renderTasks();
  showToast('Task added');
}

function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.done = !task.done;
    saveTasks();
    renderTasks();
  }
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderTasks();
  showToast('Task deleted');
}

function startEdit(id, li) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;
  const textEl = li.querySelector('.todo-text');
  const actionsEl = li.querySelector('.todo-actions');

  const inp = document.createElement('input');
  inp.className = 'todo-edit-input';
  inp.value = task.text;

  textEl.replaceWith(inp);
  actionsEl.innerHTML = `
    <button class="btn-icon save" data-action="save-edit" title="Save">💾</button>
    <button class="btn-icon" data-action="cancel-edit" title="Cancel">✕</button>
  `;
  inp.focus();
  inp.select();

  inp.addEventListener('keydown', e => {
    if (e.key === 'Enter') commitEdit(id, li, inp);
    if (e.key === 'Escape') renderTasks();
  });
}

function commitEdit(id, li, inp) {
  const newText = inp.value.trim();
  if (!newText) return;

  // Prevent duplicate on edit too (allow same text as self)
  const dup = tasks.some(t => t.id !== id && t.text.toLowerCase() === newText.toLowerCase());
  if (dup) {
    showToast('A task with that name already exists.', 'warning');
    return;
  }

  const task = tasks.find(t => t.id === id);
  if (task) {
    task.text = newText;
    saveTasks();
    renderTasks();
    showToast('Task updated');
  }
}

// Event delegation for the task list
$('todo-list').addEventListener('click', e => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const li = btn.closest('.todo-item');
  if (!li) return;
  const id = parseInt(li.dataset.id, 10);
  const action = btn.dataset.action;

  if (action === 'toggle') toggleTask(id);
  if (action === 'delete') deleteTask(id);
  if (action === 'edit') startEdit(id, li);
  if (action === 'save-edit') {
    const inp = li.querySelector('.todo-edit-input');
    if (inp) commitEdit(id, li, inp);
  }
  if (action === 'cancel-edit') renderTasks();
});

$('btn-add-task').addEventListener('click', addTask);
$('new-task-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') addTask();
  else $('duplicate-warning').classList.remove('visible');
});
$('sort-select').addEventListener('change', renderTasks);

renderTasks();

// ============================================================
// QUICK LINKS
// ============================================================
let links = JSON.parse(localStorage.getItem('kiro_links') || 'null');
if (!links) {
  links = [
    { id: 1, label: 'Google', url: 'https://google.com', icon: '🔍' },
    { id: 2, label: 'YouTube', url: 'https://youtube.com', icon: '▶️' },
    { id: 3, label: 'GitHub', url: 'https://github.com', icon: '🐙' },
  ];
}

function saveLinks() {
  localStorage.setItem('kiro_links', JSON.stringify(links));
}

function getFavicon(url) {
  try {
    const u = new URL(url);
    return `https://www.google.com/s2/favicons?sz=32&domain=${u.hostname}`;
  } catch {
    return '';
  }
}

function renderLinks() {
  const grid = $('links-grid');
  if (links.length === 0) {
    grid.innerHTML = '<p class="links-empty">No links yet. Add one below!</p>';
    return;
  }

  grid.innerHTML = '';
  links.forEach(link => {
    const a = document.createElement('a');
    a.className = 'quick-link';
    a.href = link.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.title = link.url;

    const faviconSrc = getFavicon(link.url);
    const iconHtml = faviconSrc
      ? `<img src="${faviconSrc}" class="link-icon" width="22" height="22" alt="" onerror="this.outerHTML='<span class=\\'link-icon\\'>${escapeHtml(link.icon || '🔗')}</span>'">`
      : `<span class="link-icon">${link.icon || '🔗'}</span>`;

    a.innerHTML = `
      ${iconHtml}
      <span class="link-label">${escapeHtml(link.label)}</span>
      <button class="link-delete" data-id="${link.id}" title="Remove" onclick="removeLink(event, ${link.id})">✕</button>
    `;
    grid.appendChild(a);
  });
}

function removeLink(e, id) {
  e.preventDefault();
  e.stopPropagation();
  links = links.filter(l => l.id !== id);
  saveLinks();
  renderLinks();
}

function addLink() {
  const labelEl = $('link-label');
  const urlEl = $('link-url');
  const label = labelEl.value.trim();
  let url = urlEl.value.trim();

  if (!label || !url) {
    showToast('Enter both a label and a URL.', 'warning');
    return;
  }
  if (!/^https?:\/\//i.test(url)) {
    url = 'https://' + url;
  }

  links.push({ id: Date.now(), label, url, icon: '🔗' });
  saveLinks();
  labelEl.value = '';
  urlEl.value = '';
  renderLinks();
  showToast(`"${label}" added`);
}

$('btn-add-link').addEventListener('click', addLink);
$('link-url').addEventListener('keydown', e => { if (e.key === 'Enter') addLink(); });

renderLinks();
