let currentPokemon;
let offset = 0;
let PokemonNames = [];

async function loadPokemonAPI() {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    renderPokemonList();
    offset += 20;


}
function renderPokemonList() {
    let pokeNames = currentPokemon['results'];
    for (let i = 0; i < pokeNames.length; i++) {
        const element = pokeNames[i];
        PokemonNames.push(element['name']);
    }
    renderPokemonJson();

}
async function renderPokemonJson() {
    for (let i = 0; i < PokemonNames.length; i++) {
        let pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${PokemonNames[i]}`;
        let response = await fetch(pokemonUrl);
        let pokemonData = await response.json();

        showContent(pokemonData, i);

    }
}
function showContent(pokemonData, i) {
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


function checkType(pokemonData, pokemonFirstType) {

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
function changeTypeColor(pokemonData) {
    let typeBackgrounds = {
        grass: 'type-bg-grass',
        fire: 'type-bg-fire',
        poison: 'type-bg-poison',
        flying:'type-bg-flying',
        bug:'type-bg-bug',
        water:'type-bg-water'
    };
    for (let i = 0; i < pokemonData['types'].length; i++) {
        let card = document.getElementById(`single-pokemon-${pokemonData['id']}`);
        let type = pokemonData['types'][i]['type']['name'];
        let typeElement = document.getElementById(`first-type-${pokemonData['id']}`);
        let typeElement1 = document.getElementById(`second-type-${pokemonData['id']}`);
        let typeBackground = typeBackgrounds[type];

        if (i=== 0 && typeElement) {
            typeElement.classList.add(typeBackground);
            
        }
        if (i===1 && pokemonData['types'].length > 1 && typeElement1) {
            let typeBackground1 = typeBackgrounds[pokemonData['types'][1]['type']['name']];
            typeElement1.classList.add(typeBackground1);
        }
        if (card) {
            card.classList.add(`card-bg-${type.toLowerCase()}`);
        }
    }
}
/*
function changeTypeColor(pokemonFirstType,pokemonData) {
    let firstType = document.getElementById(`first-type-${pokemonData['id']}`);
    let singleCard = document.getElementById(`single-pokemon-${pokemonData['id']}`);
    if (pokemonFirstType == 'Grass') {
        firstType.classList.add('type-bg-grass');
    }else if (pokemonFirstType =='Fire') {
        firstType.classList.add('type-bg-fire');
    }
}
*/

function checkBottom() {
    let documentHeight = document.body.scrollHeight;
    let currentScroll = window.scrollY + window.innerHeight;
    let modifier = 1;
    if (currentScroll + modifier > documentHeight) {
        PokemonNames = [];
        loadPokemonAPI()
    }
}
window.addEventListener('scroll', checkBottom);




