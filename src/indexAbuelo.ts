class AppContainer extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: 'open'})
    }

    

}
customElements.define('app-container', AppContainer)