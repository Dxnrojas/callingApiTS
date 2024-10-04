import styles from'./Character.css';
export enum Attribute {
  "image" = "image",
  "name" = "name",
  "status" = "status",
  "species" = "species",
  "type" = "type",
  "origin" = "origin",
  "episode" = "episode",
}

class CharacterData extends HTMLElement {
  image?: string;
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  origin?: string;
  episode?: string;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return Object.keys(Attribute);
  }

  attributeChangedCallback(
    propName: Attribute,
    oldValue: string | undefined,
    newValue: string | undefined
  ) {
    this[propName] = newValue;
    this.render();
  }

  connectedCallback() {
    this.render();
    console.log("holaaa");
    
  }

  render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
            <article>
            <link rel="stylesheet" href="../src/components/character/character.css"/>
                <img class='profilePic' src='${this.image}'/>
                <h2 class='title'>${this.name}</h2>
                <p class='txt'><strong>Status:</strong> ${this.status}</p>
                <p class='txt'> <strong>Specie: </strong> ${this.species}</p>
                <p class='txt'><strong>Type: </strong>${this.type}</p>
                <p class='txt'><strong>Origin: </strong> ${this.origin}</p>
                <p class='txt'><strong>Episode: </strong> ${this.episode}</p>
            </article>
            `;
    }
    const cssCard = this.ownerDocument.createElement('style');
            cssCard.innerHTML = styles;
            this.shadowRoot?.appendChild(cssCard);
  }
}
customElements.define("character-data", CharacterData);
export default CharacterData;
