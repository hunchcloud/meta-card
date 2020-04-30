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
  display: block;
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

.origin {
  display: flex;
  align-items: center;
}

.logo {
  width: 1em;
  height: 1em;
  border-radius: 100%;
  margin-right: 0.25em;
}

.url {
  font-size: 0.75em;
  color: #657786;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

<a target="_blank">
  <img class="img" loading="lazy">
  <div class="info">
    <div class="title"></div>
    <div class="description"></div>
    <div class="origin">
      <img class="logo" loading="lazy">
      <div class="url"></div>
    </div>
  </div>
</a>
`;

class MetaCard extends HTMLElement {
  $card: HTMLAnchorElement;
  $title: HTMLDivElement;
  $img: HTMLImageElement;
  $description: HTMLDivElement;
  $logo: HTMLImageElement;
  $url: HTMLDivElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));

    this.$card = shadow.querySelector(`a`) as HTMLAnchorElement;
    this.$img = shadow.querySelector(`.img`) as HTMLImageElement;
    this.$title = shadow.querySelector(`.title`) as HTMLDivElement;
    this.$description = shadow.querySelector(`.description`) as HTMLDivElement;
    this.$logo = shadow.querySelector(`.logo`) as HTMLImageElement;
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

  stripSchema(href: string) {
    const url = new URL(href);
    return `${url.host}${url.pathname === "/" ? "" : url.pathname}`;
  }

  async render() {
    const href = this.getAttribute("href");
    if (href) {
      this.$card.href = href;
      const { image, title, description, logo } = await fetchMeta(href);
      this.$img.src = image;
      this.$title.innerText = title;
      this.$description.innerText = description;
      if (logo) {
        this.$logo.src = logo;
        this.$logo.hidden = false;
      }
      this.$url.innerText = this.stripSchema(href);
    }
  }
}

customElements.define("meta-card", MetaCard);
