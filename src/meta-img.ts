import { fetchMeta } from "./meta-proxy";

const template = document.createElement("template");
template.innerHTML = `
<style>
:host {
  display: inline-block;
}
img {
  width: 100%;
  height: 100%;
  object-fit: inherit;
}
</style>
<img loading="lazy">
`;

class MetaImg extends HTMLElement {
  $img: HTMLImageElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));
    this.$img = shadow.querySelector("img") as HTMLImageElement;
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
      const { image, url } = await fetchMeta(href);
      // Fallback to the url if image field is null, this is useful when passing
      // img url to <meta-img href="https://example.com/a.jpg"></meta-img>.
      this.$img.src = image || url;
    }
  }
}

customElements.define("meta-img", MetaImg);
