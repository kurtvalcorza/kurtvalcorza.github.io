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

function savedTheme() {
    try {
        const saved = localStorage.getItem('theme');
        return saved === 'dark' || saved === 'light' ? saved : null;
    } catch (e) {
        return null;
    }
}

function currentTheme() {
    return savedTheme() || (osDark.matches ? 'dark' : 'light');
}

// The button is labeled with the mode it switches to
function renderThemeToggle() {
    themeToggle.textContent = currentTheme() === 'dark' ? '[light]' : '[dark]';
}

function toggleTheme() {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    try {
        if ((next === 'dark') === osDark.matches) {
            // Matches the OS preference again — drop the override
            localStorage.removeItem('theme');
            document.documentElement.removeAttribute('data-theme');
        } else {
            localStorage.setItem('theme', next);
            document.documentElement.setAttribute('data-theme', next);
        }
    } catch (e) {
        document.documentElement.setAttribute('data-theme', next);
    }
    renderThemeToggle();
}

themeToggle.addEventListener('click', toggleTheme);
osDark.addEventListener('change', renderThemeToggle);
renderThemeToggle();
