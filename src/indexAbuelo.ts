import * as component from "./components/indexPadre";
import CharacterData, {Attribute} from "./components/character/character";
import {charactersRickMorty} from './service/dataFetch';

class AppContainer extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: 'open'})

        
    }

    async connectedCallback(){
        const data = await charactersRickMorty();
        console.log(data);
        
        this.render();
    }
    
    render(){
        if(this.shadowRoot){
            this.shadowRoot.innerHTML=`
            <h1>App Container</h1>
            `
        }
    }

}
customElements.define('app-container', AppContainer)