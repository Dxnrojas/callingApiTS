export enum Attribute {
    'image' = 'image',
    'name' = 'name',
    'status' = 'status',
    'species' = 'species',
    'type' = 'type',
    'origin' = 'origin',
    'episode' = 'episode'
}

class CharacterData extends HTMLElement {
    image?: string;
    name?: string;
    status?: string;
    species?: string;
    type?: string;
    origin?: { name: string };
    episode?: string[];

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return Object.keys(Attribute);
    }

    attributeChangeCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined){
        this[propName] = newValue;
        this.render();
    }

    connectedCallback(){
        this.render();
    }

    render(){
        if (this.shadowRoot){
            this.shadowRoot.innerHTML=`
            <article>
                <img src='${this.image}'/>
                <h2>${this.name}</h2>
                <p>Status: ${this.status}</p>
                <p>Specie: ${this.species}</p>
                <p>Type: ${this.type}</p>
                <p>Origin: ${this.origin}</p>
                <p>First Episode: ${this.episode}</p>
            </article>
            `
        }
    }
}
customElements.define('character-data', CharacterData);
export default CharacterData