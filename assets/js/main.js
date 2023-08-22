const body = document.getElementById('body')
const pokemonOl = document.getElementById('pokemon-list')
const pokemonModal = document.getElementById('modals')
const loadButton = document.getElementById('buttonLoadMore')

let limit = 20
let pokemonsCount = 0
let offset = 0;
const maxPokemons = 151

function convertPokemonToList(pokemon) {
    createModal(pokemon)
    return `<li class="pokemon ${pokemon.type}" id="${pokemon.number}">
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

function createModal(pokemon) {
    pokemonModal.innerHTML += `<div class="background-modal hide" id="modal-${pokemon.number}">
        <div class="modal ${pokemon.type}">
            <span class="close material-symbols-rounded" id="close-${pokemon.number}">close</span>
            <header class="header-modal">
                <div class="name-modal">
                    <h2>${pokemon.name}</h2>
                    <span>#${pokemon.number}</span>
                </div>
                <ol class="types-modal">
                    ${pokemon.types.map(typeSlot => `<li class="type-modal ${typeSlot.type.name}">${typeSlot.type.name}</li>`).join('')}
                </ol>
                <img class="image-modal"
                    src=${pokemon.image}
                    alt=${pokemon.name}>
            </header>
            <table class="info-pokemon">
                <tr>
                    <td>Height</td>
                    <td>${pokemon.height}</td>
                </tr>
                <tr>
                    <td>Weight</td>
                    <td>${pokemon.weight}</td>
                </tr>
                <tr>
                    <td>Abilities</td>
                    <td>
                        ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}
                    </td>
                </tr>
                <tr>
                    <td>HP</td>
                    <td>${pokemon.hp}</td>
                </tr>
                <tr>
                    <td>Attack</td>
                    <td>${pokemon.attack}</td>
                </tr>
                <tr>
                    <td>Defense</td>
                    <td>${pokemon.defense}</td>
                </tr>
                <tr>
                    <td>Special Attack</td>
                    <td>${pokemon.special_attack}</td>
                </tr>
                <tr>
                    <td>Special Defense</td>
                    <td>${pokemon.special_defense}</td>
                </tr>
                <tr>
                    <td>Speed</td>
                    <td>${pokemon.speed}</td>
                </tr>
            </table>
        </div>
    </div>`
}

function showOrHidePokemon(index) {
    const modalString = 'modal-'
    const modal = document.getElementById(modalString.concat(index))
    modal.classList.remove('hide')
    body.style.overflow = 'hidden'

    const closeString = 'close-'
    const closeButton = document.getElementById(closeString.concat(index))

    closeButton.addEventListener('click', () => {
        modal.classList.add('hide')
        body.style.overflow = 'inherit'
    })
}

function loadPokemons(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemonList = []) => {
        pokemonOl.innerHTML += pokemonList.map(convertPokemonToList).join('')

        let pokemons = document.querySelectorAll('.pokemon')
        pokemons.forEach((pokemon, index) => pokemon.addEventListener('click', () => {
            showOrHidePokemon(index + 1)
        }))
    })
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