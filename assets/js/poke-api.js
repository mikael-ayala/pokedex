const pokeApi = {}

function convertPokemonToModel(pokemon) {
    const pokemonModel = new Pokemon()

    pokemonModel.number = pokemon.id
    pokemonModel.name = pokemon.name
    pokemonModel.types = pokemon.types
    pokemonModel.type = pokemonModel.types[0].type.name
    pokemonModel.image = pokemon.sprites.other.dream_world.front_default
    pokemonModel.height = pokemon.height
    pokemonModel.weight = pokemon.weight
    pokemonModel.abilities = pokemon.abilities
    pokemonModel.hp = pokemon.stats[0].base_stat
    pokemonModel.attack = pokemon.stats[1].base_stat
    pokemonModel.defense = pokemon.stats[2].base_stat
    pokemonModel.special_attack = pokemon.stats[3].base_stat
    pokemonModel.special_defense = pokemon.stats[4].base_stat
    pokemonModel.speed = pokemon.stats[5].base_stat

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