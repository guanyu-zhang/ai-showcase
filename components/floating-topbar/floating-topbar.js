

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

            // Find the brand link and update its href
            const brandLink = placeholder.querySelector('.brand');
            if (brandLink) {
                brandLink.href = `${basePath}/`;
                console.log(`floating-topbar.js: Updated brand link href to: ${brandLink.href}`);
            } else {
                console.error('floating-topbar.js: Brand link (.brand) not found in floating top bar.');
            }

            const topbarElement = placeholder.querySelector('.floating-topbar');

            // Load CSS dynamically
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = `${basePath}/components/floating-topbar/floating-topbar.css`;
            link.onload = () => {
                console.log('floating-topbar.js: CSS loaded.');
                // Defer height calculation to ensure styles are applied
                setTimeout(() => {
                    if (topbarElement) {
                        const computedStyle = window.getComputedStyle(topbarElement);
                        const topbarHeight = topbarElement.offsetHeight;
                        const topbarGap = parseFloat(computedStyle.top) || 0;
                        const totalHeight = topbarHeight + topbarGap;
                        console.log(`floating-topbar.js: Calculated top bar height: ${topbarHeight}px, gap: ${topbarGap}px, total: ${totalHeight}px`);
                        // We set the placeholder's height to the total of the bar's height plus its top gap.
                        placeholder.style.height = `${totalHeight}px`;
                    } else {
                        console.error('floating-topbar.js: .floating-topbar element not found inside placeholder.');
                    }
                }, 0);
            };
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