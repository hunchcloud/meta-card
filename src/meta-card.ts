import { fetchMeta } from "./meta-proxy";

const template = document.createElement("template");
template.innerHTML = `
<style>
a {
  text-decoration: none;
  color: inherit;
  display: block;
  border: 1px solid #e1e8ed;
  border-radius: 0.75em;
  overflow: hidden;
}
.img {
  width: 100%;
}

.info {
  border-top: 1px solid #e1e8ed;
  padding: 0.75em;
}

.title {
  font-weight: 500;
  margin-bottom: 0.5em;
}
.description {
  font-size: 0.875em;
  margin-bottom: 0.5em;
  color: #657786;
}
.url {
  font-size: 0.75em;
  color: #657786;
}
</style>

<a>
  <img class="img" loading="lazy">
  <div class="info">
    <div class="title"></div>
    <div class="description"></div>
    <div class="url"></div>
  </div>
</a>
`;

class MetaCard extends HTMLElement {
  $card: HTMLAnchorElement;
  $title: HTMLDivElement;
  $img: HTMLImageElement;
  $description: HTMLDivElement;
  $url: HTMLDivElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));

    this.$card = shadow.querySelector(`a`) as HTMLAnchorElement;
    this.$img = shadow.querySelector(`.img`) as HTMLImageElement;
    this.$title = shadow.querySelector(`.title`) as HTMLDivElement;
    this.$description = shadow.querySelector(`.description`) as HTMLDivElement;
    this.$url = shadow.querySelector(`.url`) as HTMLDivElement;
  }

  static get observedAttributes() {
    return ["href"];
  }

  attributeChangedCallback(_: string, oldVal: string, newVal: string) {
    if (oldVal !== newVal) {
      this.render();
    }
  }

  async render() {
    const href = this.getAttribute("href");
    if (href) {
      this.$card.href = href;
      const { image, title, description, url } = await fetchMeta(href);
      this.$img.src = image;
      this.$title.innerText = title;
      this.$description.innerText = description;
      this.$url.innerText = href;
    }
  }
}

customElements.define("meta-card", MetaCard);
