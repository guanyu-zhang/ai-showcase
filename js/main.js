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

    // Load Flipping Card Component
    const flippingCardScript = document.createElement('script');
    flippingCardScript.src = `${basePath}/components/flipping-card/flipping-card.js`;
    flippingCardScript.onload = () => {
        console.log('main.js: flipping-card.js loaded.');
        // After the script is loaded, create the project cards
        createProjectCards();
    };
    flippingCardScript.onerror = () => console.error('main.js: flipping-card.js failed to load.');
    document.body.appendChild(flippingCardScript);

    function createProjectCards() {
        const projects = [
            {
                title: 'Todo List',
                details: '<p>This is a feature-rich Todo List application designed to help users manage their daily tasks efficiently. It leverages the power of browser\'s localStorage to ensure that all your tasks are persistently saved, even if you close the browser or refresh the page. Users can add new tasks, mark them as complete, and delete them. The intuitive user interface makes task management a breeze, providing a seamless experience for organizing your to-do items and staying productive throughout your day. This application demonstrates robust client-side data storage and dynamic DOM manipulation.</p>',
                projectPath: 'projects/todo-list/index.html'
            },
            {
                title: 'Weather Card',
                details: '<p>The Weather Card application provides real-time weather information for any specified location. Users can input a city name, and the application will fetch and display current weather conditions, including temperature, humidity, wind speed, and a brief description of the weather. This project showcases asynchronous data fetching using modern JavaScript APIs, dynamic content updates, and responsive design to ensure a pleasant user experience across various devices. It\'s a practical example of integrating external APIs to deliver valuable information directly to the user.</p>',
                projectPath: 'projects/weather-card/index.html'
            }
        ];

        const projectsContainer = document.getElementById('projects-container');
        projects.forEach(project => {
            const card = document.createElement('flip-card');
            card.setAttribute('title', project.title);
            card.setAttribute('details', project.details);
            card.setAttribute('project-path', project.projectPath);
            projectsContainer.appendChild(card);
        });
    }
});