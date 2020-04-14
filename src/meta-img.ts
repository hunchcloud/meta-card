import { fetchMeta } from "./meta-proxy";

const cls = "MetaImg__img";

class MetaImg extends HTMLElement {
  $img: HTMLImageElement;

  constructor() {
    super();
    this.innerHTML = `<img class="${cls}" loading="lazy">`;
    this.$img = this.querySelector(`.${cls}`) as HTMLImageElement;
  }

  static get observedAttributes() {
    return ["href"];
  }

  attributeChangedCallback() {
    this.render();
  }

  async render() {
    const href = this.getAttribute("href");
    if (href) {
      const { image } = await fetchMeta(href);
      this.$img.src = image;
    }
  }
}

customElements.define("meta-img", MetaImg);
