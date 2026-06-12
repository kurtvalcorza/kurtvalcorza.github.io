const chatToggle = document.querySelector('.chat-toggle-btn');
const chatWindow = document.querySelector('.chat-window');

function toggleChat() {
    chatWindow.classList.toggle('active');
    const open = chatWindow.classList.contains('active');
    chatToggle.textContent = open ? '[x]' : '[chat]';
    chatToggle.setAttribute('aria-expanded', String(open));
}

chatToggle.addEventListener('click', toggleChat);
