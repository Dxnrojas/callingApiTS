import * as component from "./components/indexPadre";
import CharacterData, {Attribute} from "./components/character/character";
import { charactersRickMorty } from './service/dataFetch';

class AppContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
        this.attachListeners(); 
    }
    
    attachListeners() {
        const button = this.shadowRoot?.querySelector("button");
        const input = this.shadowRoot?.querySelector("input");

        console.log('Listeners attached');

        button?.addEventListener("click", async () => {

            const count = input ? parseInt((input as HTMLInputElement).value, 10) : 0;

            if (count > 0) {
                const data = await charactersRickMorty(); // Traemos todos los personajes 
                
                this.renderCharacters(data.results.slice(0, count)); // Renderizamos sólo la cantidad solicitada
            } else {
                alert('Por favor, ingrese un número mayor a 0');
            }
        });
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
             <link rel="stylesheet" href="../dist/global.css"/>
                <h1>Rick and Morty Characters</h1>
                <input class='input-character' type="number" placeholder="Number of characters" />
                <button class='button-character'>Submit</button>
                <div id="characters-container"></div>
            `;
        }
    }

    renderCharacters(characters: any[]) {
        const container = this.shadowRoot?.querySelector("#characters-container");
        if (container) {
            container.innerHTML = ""; // Limpiar el contenedor antes de añadir los personajes
            characters.forEach((character: any) => {
            
                const characterElement = new CharacterData();
                characterElement.setAttribute('image', character.image);
                characterElement.setAttribute('name', character.name);
                characterElement.setAttribute('status', character.status);
                characterElement.setAttribute('species', character.species);
                characterElement.setAttribute('type', character.type || "Unknown");
                characterElement.setAttribute('origin', character.origin.name);
                characterElement.setAttribute('episode', character.episode[0]); 
                container.appendChild(characterElement);
            });
        }
        console.log(`Characters rendered: ${characters}`); // Verifica cuántos personajes se están renderizando

    }
}

customElements.define('app-container', AppContainer);
