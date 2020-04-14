import { fetchMeta } from "./meta-proxy";

const rootCls = "MetaCard";
const cls = {
  root: rootCls,
  img: `${rootCls}__img`,
  title: `${rootCls}__title`,
  description: `${rootCls}__description`
};

class MetaCard extends HTMLElement {
  $card: HTMLAnchorElement;
  $title: HTMLDivElement;
  $img: HTMLImageElement;
  $description: HTMLDivElement;
  // $card: HTMLAnchorElement = document.createElement("a");
  // $title: HTMLDivElement = document.createElement("div");
  // $img: HTMLImageElement = document.createElement("img");
  // $description: HTMLDivElement = document.createElement("div");

  constructor() {
    super();
    this.innerHTML = `
<a class="${cls.root}">
  <img class="${cls.img}" loading="lazy">
  <div class="${cls.title}"></div>
  <div class="${cls.description}"></div>
</a>
`;
    this.$card = this.querySelector(`.${cls.root}`) as HTMLAnchorElement;
    this.$img = this.querySelector(`.${cls.img}`) as HTMLImageElement;
    this.$title = this.querySelector(`.${cls.title}`) as HTMLDivElement;
    this.$description = this.querySelector(
      `.${cls.description}`
    ) as HTMLDivElement;
    // this.$img.className = "MetaImg_img";
    // this.$img.loading = "lazy";
    // this.appendChild(this.$img);
  }

  static get observedAttributes() {
    return ["href"];
  }

  attributeChangedCallback() {
    this.render();
  }

  connectedCallback() {
    // this.$card = this.querySelector(`.${cls.root}`) as HTMLAnchorElement;
    // this.$img = this.querySelector(`.${cls.img}`) as HTMLImageElement;
    // this.$title = this.querySelector(`.${cls.title}`) as HTMLDivElement;
    // this.$description = this.querySelector(
    //   `${cls.description}`
    // ) as HTMLDivElement;
    //   this.appendChild(this.$card);
    //   this.$img.loading = "lazy";
    //   this.$card.appendChild(this.$img);
    //   this.$card.appendChild(this.$title);
    //   this.$card.appendChild(this.$description);
  }

  async render() {
    const href = this.getAttribute("href");
    if (href) {
      this.$card.href = href;
      const { image, title, description } = await fetchMeta(href);
      this.$img.src = image;
      this.$title.innerText = title;
      this.$description.innerText = description;
    }
  }
}

customElements.define("meta-card", MetaCard);
