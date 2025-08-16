const REPO = 'ai-showcase';
const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
const basePath = isLocal ? '' : `/${REPO}`;
