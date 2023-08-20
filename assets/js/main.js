let pokemonOl = document.getElementById('pokemon-list')
const loadButton = document.getElementById('buttonLoadMore')
let limit = 20
let pokemonsCount = 0
let offset = 0;
const maxPokemons = 151


function convertPokemonToList(pokemon) {
    return `<li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
            <ol class="types" id="pokemon-list">
                ${pokemon.types.map(typeSlot => `<li class="type ${typeSlot.type.name}">${typeSlot.type.name}</li>`).join('')}
            </ol>

            <img src=${pokemon.image}
                alt=${pokemon.name} />
        </div>
    </li>`
}

function loadPokemons(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemonList = []) => {
        // pokemonOl.innerHTML = pokemonList.map(pokemon => convertPokemonToList(pokemon)).join('')}
        pokemonOl.innerHTML += pokemonList.map(convertPokemonToList).join('')
    }
    )
}

loadPokemons(offset, limit)

loadButton.addEventListener('click', () => {
    offset += limit
    pokemonsCount = offset + limit

    if (pokemonsCount >= maxPokemons) {
        const newLimit = maxPokemons - offset
        loadPokemons(offset, newLimit)
        loadButton.remove()
    } else {
        loadPokemons(offset, limit)
    }   
})