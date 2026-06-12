// Applies a saved manual theme override before first paint. OS preference
// is handled in pure CSS (prefers-color-scheme); this only runs for visitors
// who used the [dark]/[light] toggle. Loaded synchronously from <head>
// because the CSP disallows inline scripts.
(function () {
    try {
        var saved = localStorage.getItem('theme');
        if (saved === 'dark' || saved === 'light') {
            document.documentElement.setAttribute('data-theme', saved);
        }
    } catch (e) {
        // localStorage unavailable (private mode); fall back to OS preference
    }
})();
