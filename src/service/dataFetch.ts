export const charactersRickMorty = async () => {
    try{
        const data = await fetch("https://rickandmortyapi.com/documentation/#get-a-single-character").then((response) => response.json());
        return data;
    } catch (error) {
        console.log(error);
        
    }
}