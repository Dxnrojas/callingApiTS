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
            console.log('Button clicked'); // Para verificar si el click se detecta

            const count = input ? parseInt((input as HTMLInputElement).value, 10) : 0;
            console.log(`Input value: ${count}`); // Para verificar el valor del input

            if (count > 0) {
                const data = await charactersRickMorty(); // Traemos todos los personajes 
                console.log(data); // Verifica que los datos de la API se están obteniendo
                
                this.renderCharacters(data.results.slice(0, count)); // Renderizamos sólo la cantidad solicitada
                console.log(data.results.slice(0, count)); // Verifica que los datos se están cortando correctamente
            } else {
                alert('Por favor, ingrese un número mayor a 0');
            }
        });
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <h1>Rick and Morty Characters</h1>
                <input type="number" min="1" placeholder="Number of characters" />
                <button>Submit</button>
                <div id="characters-container"></div>
            `;
        }
    }

    renderCharacters(characters: any[]) {
        const container = this.shadowRoot?.querySelector("#characters-container");
        if (container) {
            container.innerHTML = ""; // Limpiar el contenedor antes de añadir los personajes
            characters.forEach((character: any) => {
                
                const characterElement = document.createElement('character-data') as CharacterData;
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
