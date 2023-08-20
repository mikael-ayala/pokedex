const pokeApi = {}

function convertPokemonToModel(pokemon) {
    const pokemonModel = new Pokemon()

    pokemonModel.number = pokemon.id
    pokemonModel.name = pokemon.name
    pokemonModel.types = pokemon.types
    pokemonModel.type = pokemonModel.types[0].type.name
    pokemonModel.image = pokemon.sprites.other.dream_world.front_default

    return pokemonModel
}

pokeApi.getPokemonDetail = async (pokemon) => {
    const pokemonDetail = await fetch(pokemon.url)
    const jsonPokemonDetail = await pokemonDetail.json()
    return convertPokemonToModel(jsonPokemonDetail)
}

pokeApi.getPokemons = async (offset = 0, limit = 20) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    
    try {
        const res = await fetch(url)
        const json = await res.json()
        const pokemonsList = json.results
        const pokemonsDetails = await pokemonsList.map(pokeApi.getPokemonDetail)
        const resPokemonDetails = await Promise.all(pokemonsDetails)
        return resPokemonDetails
    } catch (error) {
        return console.log(error)
    }
}