export const charactersRickMorty = async (id: number) => { //funcion para traer los personajes
  try {
    const data = await fetch(
      "https://rickandmortyapi.com/api/character" + id
    );
    const characters = await data.json(); // Convertir la respuesta a JSON
    return characters;
  } catch (error) {
    console.log(error);
  }
};

export const episodeCharacter = async ( url:string) => { //funcion para traer los episodios
    try {
        const dataEpisode = await fetch(
            url
        );
        const episode = await dataEpisode.json(); //Realizamos una solicitud fetch a la URL pasada como argumento (que será la URL del episodio) y convertimos la respuesta a JSON. Luego, devolvemos el episodio para ser utilizado.
        return episode;
    } catch (error){
        console.log(error)
    }
};
