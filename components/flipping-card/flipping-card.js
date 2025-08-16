class FlipCard extends HTMLElement {
  static get observedAttributes(){ return ['title','details','theme','project-path']; }

  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this._title   = this.getAttribute('title')   || 'Card Title';
    this._details = this.getAttribute('details') || '<p>No details.</p>';
    this._theme   = (this.getAttribute('theme')  || 'system').toLowerCase();
    this._projectPath = this.getAttribute('project-path') || '';
  }

  async connectedCallback() {
    const css = await fetch(`${basePath}/components/flipping-card/flipping-card.css`).then(res => res.text());
    const colorfulFontCss = await fetch(`${basePath}/components/colorful-font/colorful-font.css`).then(res => res.text());
    const html = await fetch(`${basePath}/components/flipping-card/flipping-card.html`).then(res => res.text());
    this.shadowRoot.innerHTML = `<style>${css}</style><style>${colorfulFontCss}</style>${html}`;
    this._apply();

    this.shadowRoot.querySelector('.wrapper').addEventListener('click', (event) => {
      const inner = this.shadowRoot.querySelector('.inner');
      const isMobile = window.matchMedia('(pointer: coarse)').matches;

      if (isMobile) {
        // Mobile behavior: first click flips, second click navigates
        if (inner.classList.contains('flipped')) {
          if (this._projectPath) {
            window.location.href = `${basePath}/${this._projectPath}`;
          }
        } else {
          this._toggleFlip();
        }
      } else {
        // PC behavior: click always navigates if projectPath exists, otherwise toggles flip
        if (this._projectPath) {
          window.location.href = `${basePath}/${this._projectPath}`;
        } else {
          this._toggleFlip();
        }
      }
    });
  }

  static _looksLikeHTML(s){ return typeof s === 'string' && /<[a-z][\s\S]*>/i.test(s); }

  attributeChangedCallback(name, oldV, newV){
  if (oldV === newV) return;

  if (name === 'title') {
    this._title = newV || '';
  } else if (name === 'details') {
    this._details = newV || '';
  } else if (name === 'theme') {
    this._theme = (newV || 'system').toLowerCase();
  } else if (name === 'project-path') {
    this._projectPath = newV || '';
  }

  this._apply();
}


  _toggleFlip() {
    this.shadowRoot.querySelector('.inner').classList.toggle('flipped');
  }

  _apply(){
    if (!this.shadowRoot.querySelector('.wrapper')) return;
    const root = this.shadowRoot;
    root.querySelector('.title').textContent = this._title;

    const body = root.querySelector('.body');
    if (FlipCard._looksLikeHTML(this._details)) body.innerHTML = this._details;
    else body.textContent = this._details;

    if (this._theme) this.setAttribute('theme', this._theme);

    
  }
}
customElements.define('flip-card', FlipCard);
