console.log('theme-toggle.js: Script started.');
fetch('/components/theme-toggle/theme-toggle.html')
    .then(response => response.text())
    .then(data => {
        const themeTogglePlaceholder = document.getElementById('theme-toggle-placeholder');
        if (themeTogglePlaceholder) {
            console.log('theme-toggle.js: Placeholder found.');
            themeTogglePlaceholder.innerHTML = data;
            console.log('theme-toggle.js: HTML inserted.');

            // Dynamically load the CSS
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = '/components/theme-toggle/theme-toggle.css';
            link.onload = () => console.log('theme-toggle.js: CSS loaded.');
            link.onerror = () => console.error('theme-toggle.js: CSS failed to load.');
            document.head.appendChild(link);

            // After HTML is loaded, attach event listener and apply theme
            const themeToggle = document.getElementById('theme-toggle');
            const body = document.body;

            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            const savedTheme = localStorage.getItem('theme');

            function applyTheme(theme) {
                console.log('theme-toggle.js: Applying theme:', theme);
                if (theme === 'dark') {
                    body.classList.add('dark-theme');
                    body.classList.remove('light-theme');
                    themeToggle.checked = true;
                } else {
                    body.classList.add('light-theme');
                    body.classList.remove('dark-theme');
                    themeToggle.checked = false;
                }
                console.log('theme-toggle.js: Body classes after theme apply:', body.classList.value);
            }

            if (savedTheme) {
                applyTheme(savedTheme);
            } else if (prefersDark) {
                applyTheme('dark');
            } else {
                applyTheme('light');
            }

            themeToggle.addEventListener('change', () => {
                const newTheme = themeToggle.checked ? 'dark' : 'light';
                applyTheme(newTheme);
                localStorage.setItem('theme', newTheme);
                console.log('theme-toggle.js: Theme changed by user to:', newTheme);
            });
        } else {
            console.error('theme-toggle.js: Placeholder not found!');
        }
    })
    .catch(error => console.error('theme-toggle.js: Error loading theme toggle component:', error));