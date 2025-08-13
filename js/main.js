const REPO = 'ai-showcase';
const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
const basePath = isLocal ? '' : `/${REPO}`;

// Function to add meta and link tags to the head
function addHeadTags() {
    const head = document.head;

    // Add Content Security Policy meta tag
    const cspMeta = document.createElement('meta');
    cspMeta.setAttribute('http-equiv', 'Content-Security-Policy');
    cspMeta.setAttribute('content', "default-src 'self' https://fonts.gstatic.com; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'");
    head.prepend(cspMeta); // Prepend to ensure it's early in the head

    // Add Google Fonts preconnect links
    const preconnect1 = document.createElement('link');
    preconnect1.rel = 'preconnect';
    preconnect1.href = 'https://fonts.googleapis.com';
    head.appendChild(preconnect1);

    const preconnect2 = document.createElement('link');
    preconnect2.rel = 'preconnect';
    preconnect2.href = 'https://fonts.gstatic.com';
    preconnect2.crossOrigin = '';
    head.appendChild(preconnect2);

    // Add Google Fonts stylesheet
    const fontStylesheet = document.createElement('link');
    fontStylesheet.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap';
    fontStylesheet.rel = 'stylesheet';
    head.appendChild(fontStylesheet);
}

document.addEventListener('DOMContentLoaded', function() {
    addHeadTags(); // Call the function to add the tags

    // Load Footer Component
    fetch(`${basePath}/html/footer.html`)
        .then(response => response.text())
        .then(data => {
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder) {
                // Create a temporary div to parse the HTML string
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = data;

                // Find the privacy policy link and update its href
                const privacyLink = tempDiv.querySelector('a[href="${basePath}/html/privacy.html"]');
                if (privacyLink) {
                    privacyLink.href = `${basePath}/html/privacy.html`;
                }

                footerPlaceholder.innerHTML = tempDiv.innerHTML;

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

    // Add event listeners for project buttons
    document.querySelectorAll('.view-project-btn').forEach(button => {
        button.addEventListener('click', function() {
            const projectPath = this.dataset.projectPath;
            if (projectPath) {
                window.location.href = `${basePath}/${projectPath}`;
            }
        });
    });
});