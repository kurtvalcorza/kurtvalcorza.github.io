const chatToggle = document.querySelector('.chat-toggle-btn');
const chatWindow = document.querySelector('.chat-window');

function toggleChat() {
    chatWindow.classList.toggle('active');
    const open = chatWindow.classList.contains('active');
    chatToggle.textContent = open ? '[x]' : '[chat]';
    chatToggle.setAttribute('aria-expanded', String(open));
}

chatToggle.addEventListener('click', toggleChat);

// --- Theme toggle ---
const themeToggle = document.querySelector('.theme-toggle-btn');
const osDark = window.matchMedia('(prefers-color-scheme: dark)');

// data-theme on <html> is the single source of truth for an active override
// (set by theme.js before first paint, or by toggleTheme below). Reading it —
// rather than localStorage — keeps the toggle working when storage is blocked.
function currentTheme() {
    const applied = document.documentElement.getAttribute('data-theme');
    if (applied === 'dark' || applied === 'light') return applied;
    return osDark.matches ? 'dark' : 'light';
}

// The visible sun/moon icon swap is handled in pure CSS (see style.css);
// here we only keep the accessible label in sync with the mode it switches to.
function renderThemeToggle() {
    themeToggle.setAttribute(
        'aria-label',
        currentTheme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    );
}

function toggleTheme() {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    if ((next === 'dark') === osDark.matches) {
        // Matches the OS preference again — drop the override
        document.documentElement.removeAttribute('data-theme');
        try {
            localStorage.removeItem('theme');
        } catch (e) {
            // storage blocked; attribute removal already took effect
        }
    } else {
        document.documentElement.setAttribute('data-theme', next);
        try {
            localStorage.setItem('theme', next);
        } catch (e) {
            // storage blocked; override still applies for this page view
        }
    }
    renderThemeToggle();
}

themeToggle.addEventListener('click', toggleTheme);
osDark.addEventListener('change', renderThemeToggle);
renderThemeToggle();

// --- Project filter ---
// Bracketed toggles show one theme at a time so the grid never runs long.
// Visible cards are renumbered [01], [02], … per view; with JS disabled every
// card stays visible with its static index, so nothing is hidden by default.
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.card[data-category]');

function applyFilter(filter) {
    let visible = 0;
    projectCards.forEach((card) => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.hidden = !match;
        if (match) {
            visible += 1;
            const index = card.querySelector('.card-index');
            if (index) index.textContent = '[' + String(visible).padStart(2, '0') + ']';
        }
    });
    filterBtns.forEach((btn) => {
        const active = btn.dataset.filter === filter;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-pressed', String(active));
    });
}

filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
});
