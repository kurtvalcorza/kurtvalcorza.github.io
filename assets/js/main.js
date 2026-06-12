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

// The button is labeled with the mode it switches to
function renderThemeToggle() {
    themeToggle.textContent = currentTheme() === 'dark' ? '[light]' : '[dark]';
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
