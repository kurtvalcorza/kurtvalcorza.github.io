const chatToggle = document.querySelector('.chat-toggle-btn');
const chatWindow = document.querySelector('.chat-window');


function toggleChat() {
    chatWindow.classList.toggle('active');
    const icon = chatToggle.querySelector('i');
    if (chatWindow.classList.contains('active')) {
        icon.classList.remove('fa-comment-dots');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-comment-dots');
    }
}

chatToggle.addEventListener('click', toggleChat);

