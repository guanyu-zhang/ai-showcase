document.addEventListener('DOMContentLoaded', function() {
    // Load Footer Component
    fetch(`${basePath}/html/footer.html`)
        .then(response => response.text())
        .then(data => {
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder) {
                footerPlaceholder.innerHTML = data;

                // Dynamically load the CSS
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = `${basePath}/css/footer.css`;
                link.onload = () => console.log('main.js: footer.css loaded.');
                link.onerror = () => console.error('main.js: footer.css failed to load.');
                document.head.appendChild(link);
            }
        });

    // Load Floating Top Bar Component
    const topbarScript = document.createElement('script');
    topbarScript.src = `${basePath}/components/floating-topbar/floating-topbar.js`;
    topbarScript.onload = () => console.log('main.js: floating-topbar.js loaded.');
    topbarScript.onerror = () => console.error('main.js: floating-topbar.js failed to load.');
    document.body.appendChild(topbarScript);
});