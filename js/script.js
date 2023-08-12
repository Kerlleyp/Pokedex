const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImg = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const prev = document.querySelector('.btn-prev');
const next = document.querySelector('.btn-next');

let NumberPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    if(APIPokemon.status === 200) {
        const data = await APIPokemon.json();
        return data
    }

} 

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loanding...';
    pokemonNumber.innerHTML = '';
    const data = await fetchPokemon(pokemon)

    if(data) {
        pokemonImg.style.display = 'block'
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        input.value = '';
        NumberPokemon = data.id;
    }else {
        pokemonImg.style.display = 'none'
        pokemonName.innerHTML = 'Not found :c';
        pokemonNumber.innerHTML = '';
    }

    
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});
prev.addEventListener('click', () => {
    if(NumberPokemon > 1) {
        NumberPokemon -= 1;
         renderPokemon(NumberPokemon);
    }
});
next.addEventListener('click', () => {
    NumberPokemon += 1;
    renderPokemon(NumberPokemon);
});
renderPokemon(NumberPokemon);