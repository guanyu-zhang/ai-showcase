This project is a showcase of various front-end projects. It is a single-page application that lists all the sub-projects.

Fixed the link to the weather card project to be clickable.

Restyled the entry point page to be more 'AI-like' and added a dark/bright theme toggle.

Added a margin to the project list to give more space for the theme switcher and replaced the clickable list item with a button to allow users to read the description before navigating to the project page.

Adjusted the spacing on the main page to improve mobile layout and reduce the gap between the title and the project list.

Made the project list more artistic with a theme-adaptive flashing card animation.

Improved the visibility of the flashing card animation in dark mode by using a more vibrant color.

Added a comprehensive, responsive footer to all pages, including a new privacy policy page and contact information.

Refactored the footer into a modular, reusable component loaded via JavaScript to improve maintainability.

Fixed the alignment of the social media icon in the footer on the entry point page.

Added a hyperlink to the 'Powered by Gemini-CLI' text in the footer, linking to the Gemini home page.

Updated the hyperlink for 'Powered by Gemini-CLI' in the footer to point to the official Gemini CLI documentation.

Added a .gitignore file to exclude all files except .html, .js, GEMINI.md, and .gitignore from version control.

Updated the hyperlink for 'Powered by Gemini-CLI' in the footer to point to the official Gemini CLI GitHub repository.

Modularized the footer's CSS into a separate `footer.css` file and linked it in `footer.html`.

Fixed the GitHub logo alignment in the footer on mobile by adding `justify-content: center;` to the `.social-icons` class in `footer.css`.

Created a reusable theme toggle component by extracting its HTML, CSS, and JavaScript into `components/theme-toggle/theme-toggle.html`, `theme-toggle.css` and `theme-toggle.js` respectively.

Organized the 'Weather Card' project into a subdirectory `projects/weather-card/` and moved `weather-card.html` to `projects/weather-card/index.html`.

Updated the 'View Project' link in `index.html` to reflect the new path for the 'Weather Card' project.

Modularized the 'Weather Card' project's inlined CSS into `projects/weather-card/style.css`.

Integrated both the footer and the new theme toggle components into `projects/weather-card/index.html` and updated all relevant script paths.

Ensured the theme toggle's original style is applied by dynamically loading `theme-toggle.css` in `theme-toggle.js`.

Corrected component loading paths in `main.js` and `theme-toggle.js` to be root-relative (starting with `/`), ensuring proper functionality across all pages for future hosting.

Extracted global theme styles (CSS variables and body theme rules) from `index.html` into a new `global-theme.css` file and linked it in both `index.html` and `projects/weather-card/index.html` to ensure consistent theming across all pages.

Ensured footer styles are consistently applied across all pages by dynamically loading `footer.css` in `main.js` using a root-relative path.

Fixed footer color inconsistencies by explicitly setting text colors for `h4` and `p` elements within the footer, and using theme-specific CSS variables for border colors in `footer.css`.

Adjusted the alignment of social media icons in the footer to be left-aligned on wide screens and centered on narrow screens by modifying `justify-content` in `footer.css` with a media query.

Improved the hover effect of the theme toggle by adding smoother transitions for the slider and its handle, using `ease-in-out` for a more natural feel, and adding a subtle `box-shadow` on hover for the slider to enhance visual feedback.

Implemented a floating, always-visible top bar with a semi-transparent dark background, blur effect, rounded bottom corners, and a soft shadow. The bar contains the 'entirely.ai' site name on the left and the theme toggle button on the right. This involved:
- Creating `floating-topbar.css` with the specified styles.
- Adding the new HTML structure for the top bar to `index.html` and `projects/weather-card/index.html`.
- Removing the old theme toggle placeholder from `index.html` and `projects/weather-card/index.html`.
- Linking `floating-topbar.css` in `index.html` and `projects/weather-card/index.html`.
- Adjusting the `padding-top` of the main content (`.content-wrap`) in `index.html` and `projects/weather-card/index.html` to account for the fixed top bar.
- Refactored `components/theme-toggle/theme-toggle.js` to remove dynamic HTML/CSS loading and directly manage the theme toggle button within the new top bar structure, including `aria-pressed` state management.

Reverted the. changes to `components/theme-toggle/theme-toggle.js` to its previous state, where it dynamically loads `theme-toggle.html` and `theme-toggle.css` into a placeholder. Modified `index.html` and `projects/weather-card/index.html` to place the `theme-toggle-placeholder` div inside the floating top bar's `topbar-inner` div, ensuring the existing theme toggle component is reused as requested.

Organized the project structure by creating `css`, `html`, and `js` directories and moving relevant files into them. Updated all file paths in `html/index.html`, `html/privacy.html`, `projects/weather-card/index.html`, and `js/main.js` to reflect these changes.

Moved `html/index.html` to the project root (`index.html`) to serve as the main entry point for GitHub Pages deployment. Verified that all internal links to `index.html` (e.g., brand links in the floating top bar) correctly point to the new root location.

Converted the floating top bar into a reusable component. This involved:
- Creating a new directory: `components/floating-topbar/`.
- Moving the HTML structure of the floating top bar into `components/floating-topbar/floating-topbar.html`.
- Moving the CSS from `css/floating-topbar.css` to `components/floating-topbar/floating-topbar.css`.
- Creating `components/floating-topbar/floating-topbar.js` to dynamically load the HTML and CSS into a placeholder.
- Replacing the existing floating top bar HTML in `index.html`, `projects/weather-card/index.html`, and `html/privacy.html` with a placeholder `div` (`<div id="floating-topbar-placeholder"></div>`).
- Updating `js/main.js` to load the new `floating-topbar.js` component.
- Removing the direct link to `floating-topbar.css` from `index.html`, `projects/weather-card/index.html`, and `html/privacy.html`.

Fixed the issue where the floating top bar was not visible by removing the `.theme-toggle` styles from `components/floating-topbar/floating-topbar.css`. This ensures that the theme toggle's own CSS (`components/theme-toggle/theme-toggle.css`) is the sole source of truth for its styling, preventing conflicts and ensuring proper rendering within the top bar.

Ensured correct loading order for the floating top bar and theme toggle components. `components/floating-topbar/floating-topbar.js` now dynamically loads `components/theme-toggle/theme-toggle.js` *after* the top bar's HTML content has been inserted into the DOM. This guarantees that the `theme-toggle-placeholder` element exists when `theme-toggle.js` attempts to access it. The direct `<script>` tag for `theme-toggle.js` has been removed from `index.html`, `projects/weather-card/index.html`, and `html/privacy.html` to prevent premature execution.

Removed `DOMContentLoaded` event listeners from `components/floating-topbar/floating-topbar.js` and `components/theme-toggle/theme-toggle.js`. Since these scripts are dynamically loaded by `main.js` (which already waits for `DOMContentLoaded`), their internal code can execute immediately upon being appended to the DOM, resolving the issue where their console logs were not appearing and likely fixing the top bar visibility.

Adjusted the floating top bar's background color in dark theme to be brighter for better visibility. This was achieved by adding `--topbar-bg-dark` and `--topbar-text-dark` variables to `css/global-theme.css` and applying them in `components/floating-topbar/floating-topbar.css` based on the active theme. Similarly, `--topbar-bg-light` and `--topbar-text-light` were added for the light theme to ensure consistent contrast.

Improved the readability of text behind the floating top bar's glass effect by reducing the `backdrop-filter` blur from `10px` to `5px` and slightly increasing the background opacity from `0.7` to `0.8` for both dark and light themes in `css/global-theme.css`.

Further improved the readability of text behind the floating top bar by reducing the `backdrop-filter` blur from `5px` to `2px` and increasing the background opacity from `0.8` to `0.9` for both dark and light themes in `css/global-theme.css`.

Significantly improved the readability of text behind the floating top bar by increasing the `backdrop-filter` blur to `20px` and decreasing the background opacity to `0.6` for both dark and light themes in `css/global-theme.css`. This creates a stronger frosted glass effect that better obscures background content, making the text on the top bar more distinct.

Removed the `backdrop-filter` (frosted glass effect) from the floating top bar and made it fully opaque. This was achieved by removing the `backdrop-filter` and `-webkit-backdrop-filter` properties from `.floating-topbar` in `components/floating-topbar/floating-topbar.css`, and setting the alpha value of `--topbar-bg-dark` and `--topbar-bg-light` to `1` (fully opaque) in `css/global-theme.css`. The `--topbar-blur` variable was also removed from `css/global-theme.css` as it is no longer needed.

Reintroduced a subtle frosted glass effect to the floating top bar. This was achieved by reintroducing the `backdrop-filter` and `-webkit-backdrop-filter` properties to `.floating-topbar` in `components/floating-topbar/floating-topbar.css`, setting `--topbar-blur` to `2px` in `css/global-theme.css`, and adjusting the alpha value of `--topbar-bg-dark` and `--topbar-bg-light` to `0.95` (95% opaque) in `css/global-theme.css`. This aims to provide a hint of the background without compromising the readability of the top bar's content.

Slightly increased the transparency of the floating top bar by changing the alpha value of `--topbar-bg-dark` and `--topbar-bg-light` in `css/global-theme.css` from `0.95` to `0.9`.

Added a `16px` gap between the top of the page and the floating top bar, and rounded the top two corners of the top bar to `16px` by modifying `components/floating-topbar/floating-topbar.css`. Also, adjusted the `padding-top` of the main content (`.content-wrap`) in `index.html`, `projects/weather-card/index.html`, and `html/privacy.html` to account for the new top margin by introducing a new CSS variable `--topbar-total-offset` in `css/global-theme.css`.

Fixed a layout bug where the theme toggle was incorrectly positioned due to a redundant `position: fixed` style. By removing this, the toggle now correctly aligns within the flexbox layout of the floating top bar.

Added a new "Todo List" project to the showcase. This involved creating the necessary HTML, CSS, and JavaScript files for the project and adding it to the main project list on the index page.

Centered the footer on wide screens by applying `max-width` and `margin: auto` to the `.site-footer` element in a media query, while preserving the internal alignment of its content.

Added `localStorage` persistence to the "Todo List" project, allowing tasks to be saved and reloaded across sessions.

Adjusted the footer layout to center the columns as a group on wider screens, preventing them from stretching and leaving a large gap on the right.

Fixed an invisible border issue on the "Todo List" project's input field by defining missing color variables (`--border-color`, `--input-bg-color`, etc.) in `css/global-theme.css`. Also added a theme-adaptive "glow" effect on focus to the input field for better visual feedback.

Fixed 404 errors for `global-theme.css` and `main.js` on GitHub Pages by prepending `/ai-showcase` to their root-relative paths in `index.html`, `html/privacy.html`, `projects/todo-list/index.html`, and `projects/weather-card/index.html`.

Fixed local development 404 errors by converting all asset paths (CSS and JS) in `index.html`, `html/privacy.html`, `projects/todo-list/index.html`, and `projects/weather-card/index.html` from absolute to relative paths. This ensures they work correctly in both local and GitHub Pages environments.

Fixed asset loading issues on GitHub Pages by using a dynamic `basePath` variable in JavaScript to construct correct relative paths for all resources.

Updated `basePath` logic to differentiate between local development and any remote deployment, ensuring correct relative URLs across all environments.

Addressed console log errors by:
- Updating `Content-Security-Policy` in `index.html` to allow Google Fonts.
- Removing inline `onclick` attributes and an empty script tag from `index.html`.
- Moving navigation logic for project buttons to `js/main.js`.
- Resolving `REPO` identifier re-declaration by removing redundant declarations from `components/floating-topbar/floating-topbar.js` and ensuring it uses the `basePath` defined in `js/main.js`.
- Resolving `REPO` identifier re-declaration by removing redundant declarations from `components/theme-toggle/theme-toggle.js`.
- Resolving CSP inline script error by externalizing the inline script in `projects/weather-card/index.html` to `projects/weather-card/script.js`.
- Updating `Content-Security-Policy` in `index.html`, `html/privacy.html`, `projects/todo-list/index.html`, and `projects/weather-card/index.html` to include `script-src 'unsafe-inline'` to resolve remaining inline script CSP violations.

Improved UI for widescreen displays and top bar alignment:
- Widened the main content area by adjusting `max-width`, `margin-inline`, and `padding-inline` for `.content-wrap` in `css/global-theme.css`.
- Adjusted `gap` and added `display: flex`, `flex-wrap`, and `justify-content` to `.project-list` in `css/global-theme.css` for better card layout.
- Added `width` to `.project-list li` in `css/global-theme.css` for better card scaling.
- Modified `.floating-topbar` in `components/floating-topbar/floating-topbar.css` to be fixed and full-width.
- Updated `.topbar-inner` in `components/floating-topbar/floating-topbar.css` to control its own background, blur, radius, and shadow, and to use `space-between` for alignment.
- Set `margin-left: 0;` for `.brand` in `components/floating-topbar/floating-topbar.css` to ensure it's flush-left.
- Set `margin-left: auto;` for `.theme-switcher` in `components/theme-toggle/theme-toggle.css` to ensure it's flush-right.
- Added a media query to `components/floating-topbar/floating-topbar.css` to increase top bar side padding on wide screens (≥1440px).

Fixed mobile layout for floating top bar:
- Modified `max-width` of `.topbar-inner` in `components/floating-topbar/floating-topbar.css` to `92vw` to allow it to shrink on mobile.
- Added a media query for `min-width: 960px` to set `max-width: 1320px;` for `.topbar-inner` on larger screens.

Re-added 16px gap and rounded corners to the floating top bar:
- Added `margin-top: 16px;` and `border-radius: 16px;` to `.floating-topbar` in `components/floating-topbar/floating-topbar.css`.