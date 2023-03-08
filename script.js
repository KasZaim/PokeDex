let currentPokemon;
let offset = 0;
let PokemonNames = [];

async function loadPokemonAPI() {//loads the list from the PokemonAPI
    let url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    renderPokemonList();
    offset += 20;


}
function renderPokemonList() {//loads the Names of the Pokemon and push them in the Array
    let pokeNames = currentPokemon['results'];
    for (let i = 0; i < pokeNames.length; i++) {
        const element = pokeNames[i];
        PokemonNames.push(element['name']);
    }
    renderPokemonJson();

}
async function renderPokemonJson() {//loads the single Json for each Pokemon
    for (let i = 0; i < PokemonNames.length; i++) {
        let pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${PokemonNames[i]}`;
        let response = await fetch(pokemonUrl);
        let pokemonData = await response.json();

        showContent(pokemonData, i);

    }
}
function showContent(pokemonData, i) {//render the Pokemons Card,IMG, Name
    let pokemonImg = pokemonData['sprites']['other']['official-artwork']['front_default'];
    let pokemonName = pokemonData['name'];
    let pokemonFirstType = pokemonData['types'][0]['type']['name'];


    pokemonName = pokemonName[0].toUpperCase() + pokemonName.slice(1);
    pokemonFirstType = pokemonFirstType[0].toUpperCase() + pokemonFirstType.slice(1);

    console.log(pokemonData);
    document.getElementById('content').innerHTML += pokedexCardTemplate(pokemonName, pokemonData, pokemonImg, i);

    checkType(pokemonData, pokemonFirstType);

    changeTypeColor(pokemonData);

}


function checkType(pokemonData, pokemonFirstType) {//adds the Type category

    if (pokemonData['types'].length === 2) {
        pokemonSecType = pokemonData['types'][1]['type']['name'];
        pokemonSecType =pokemonSecType[0].toUpperCase() + pokemonSecType.slice(1);
        document.getElementById(`first-type-${pokemonData['id']}`).innerHTML = `${pokemonFirstType}`;
        document.getElementById(`second-type-${pokemonData['id']}`).innerHTML = `${pokemonSecType}`;
        
    } else {
        document.getElementById(`first-type-${pokemonData['id']}`).innerHTML = `${pokemonFirstType}`;
        document.getElementById(`second-type-${pokemonData['id']}`).classList.add('d-none');
    }
}
function changeTypeColor(pokemonData) {// Changes the cards and type bg Color
    let typeBackgrounds = {
        grass: 'type-bg-grass',
        fire: 'type-bg-fire',
        poison: 'type-bg-poison',
        flying:'type-bg-flying',
        bug:'type-bg-bug',
        water:'type-bg-water',
        normal:'type-bg-normal',
        electric:'type-bg-electric',
        ground:'type-bg-ground',
        fairy:'type-bg-fairy',
        fighting:'type-bg-fighting',
        psychic:'type-bg-psychic',
        steel:'type-bg-steel',
        ice:'type-bg-ice',
        ghost:'type-bg-ghost',
        dragon:'type-bg-dragon',
        dark:'type-bg-dark'
    };
    for (let i = 0; i < pokemonData['types'].length; i++) {
        let card = document.getElementById(`single-pokemon-${pokemonData['id']}`);
        let type = pokemonData['types'][i]['type']['name'];
        let typeElement = document.getElementById(`first-type-${pokemonData['id']}`);
        let typeElement1 = document.getElementById(`second-type-${pokemonData['id']}`);
        let typeBackground = typeBackgrounds[type];

        if (i===0 && typeElement) {//überprüft ob das typelement schon gerendert wurde und fügt dann die entprechende Hintergrundfarbe nach type hinzu
            typeElement.classList.add(typeBackground);
            card.classList.add(`card-bg-${type.toLowerCase()}`);
        }
        if (i===1 && pokemonData['types'].length > 1 && typeElement1) {// überprüft ob i im zweiten durchgang ist und ob es einen zweiten typen gibt 
            let typeBackground1 = typeBackgrounds[pokemonData['types'][1]['type']['name']];
            typeElement1.classList.add(typeBackground1);
        }
    }
}
function openPokemon(id){
    let popup = document.getElementById('popup');
    document.getElementById('content').style.filter = 'blur(5px)';
    popup.classList.remove('d-none');

}
function checkBottom() {//load more 20 Pokemon
    let documentHeight = document.body.scrollHeight;
    let currentScroll = window.scrollY + window.innerHeight;
    let modifier = 1;
    if (currentScroll + modifier > documentHeight) {
        PokemonNames = [];
        loadPokemonAPI()
    }
}
window.addEventListener('scroll', checkBottom);




