export const charactersRickMorty = async () => {
  try {
    const data = await fetch(
      "https://rickandmortyapi.com/api/character"
    );
    const characters = await data.json();
    return characters;
  } catch (error) {
    console.log(error);
  }
};

export const episodeCharacter = async ( url:string) => {
    try {
        const dataEpisode = await fetch(
            url
        );
        const episode = await dataEpisode.json();
        return episode;
    } catch (error){
        console.log(error)
    }
};
