import * as component from "./components/indexPadre";
import CharacterData, {Attribute} from "./components/character/character";
import { charactersRickMorty } from './service/dataFetch';

class AppContainer extends HTMLElement {
    characters: any= [];

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
        this.attachListeners(); //Se necesita poner el attachListeners() para que se ejecute el evento de click 
    }
    
    //Se crea un metodo para renderizar los personajes segun la cantidad que el usuario ingrese
    attachListeners() {
        const button = this.shadowRoot?.querySelector("button"); //Se crea el boton
        const input = this.shadowRoot?.querySelector("input"); //Se crea el input

        button?.addEventListener("click", async () => {

            const count = input ? parseInt((input as HTMLInputElement).value, 10) : 0; //Operador ternario para verificar si el input existe y si es un número
            //Se hace una aseveración de tipo enecesaria en TS que indica que estamos tratando el input como un elemento de tipo HTMLInputElement para que nos deje acceder a las propiedades como value
            //Se hace un parseInt para convertir el valor del input a un número entero

            //Validamos que el input no sea 0 y si es 0 se le hace un alert 
            if (count > 0) {
                for (let index = 1; index <  count; index++) {
                    const data = await charactersRickMorty(index); // Traemos todos los personajes 
                    this.characters.push(data); //Se agrega el personaje al arreglo de personajes
                }
                
                this.renderCharacters(this.characters); // data.results es un arreglo de personajes obbtenidos. 
                //El primer argumento es el primer elemento del arreglo en posiicon 0 y el segundo argumento es la cantidad de personajes que queremos mostrar
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
//Metodo para renderizar los personajes
    renderCharacters(characters: any[]) { 
        const container = this.shadowRoot?.querySelector("#characters-container");
        if (container) {
            container.innerHTML = ""; 
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
    }
}

customElements.define('app-container', AppContainer);
