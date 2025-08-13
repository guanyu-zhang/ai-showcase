

console.log('floating-topbar.js: Script started.');
const placeholder = document.getElementById('floating-topbar-placeholder');
if (placeholder) {
    console.log('floating-topbar.js: Placeholder found.');
    fetch(`${basePath}/components/floating-topbar/floating-topbar.html`)
        .then(response => {
            console.log('floating-topbar.js: HTML fetch response received.', response.status);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            console.log('floating-topbar.js: HTML content received.');
            placeholder.innerHTML = html;
            console.log('floating-topbar.js: HTML inserted.');

            // Load CSS dynamically
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = `${basePath}/components/floating-topbar/floating-topbar.css`;
            link.onload = () => console.log('floating-topbar.js: CSS loaded.');
            link.onerror = () => console.error('floating-topbar.js: CSS failed to load.');
            document.head.appendChild(link);

            // Load theme-toggle.js after floating-topbar.html is in DOM
            const themeToggleScript = document.createElement('script');
            themeToggleScript.src = `${basePath}/components/theme-toggle/theme-toggle.js`;
            themeToggleScript.onload = () => console.log('floating-topbar.js: theme-toggle.js loaded.');
            themeToggleScript.onerror = () => console.error('floating-topbar.js: theme-toggle.js failed to load.');
            document.body.appendChild(themeToggleScript);
        })
        .catch(error => console.error('floating-topbar.js: Error loading floating top bar component:', error));
} else {
    console.error('floating-topbar.js: Placeholder not found!');
}