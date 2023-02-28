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
     function showContent(pokemonData, i) {
        let pokemonImg = pokemonData['sprites']['other']['official-artwork']['front_default'];
        let pokemonName = pokemonData['name'];
        let pokemonFirstType = pokemonData['types'][0]['type']['name'];
        pokemonName = pokemonName[0].toUpperCase() + pokemonName.slice(1);
        console.log(pokemonData);
        document.getElementById('content').innerHTML += pokedexCardTemplate(pokemonName, pokemonData, pokemonImg,i);
        
        /*changeTypeColor(pokemonFirstType,i)
        changeBgColor();*/
    }
}
function checkType(pokemonData, i,pokemonFirstType){//TEST 
    if (pokemonData['types'].length === 2) {
            document.getElementById(`first-type${i}`).innerHTML=`${pokemonFirstType}`;
            document.getElementById(`second-type${i}`).innerHTML=`${pokemonData['types'][1]['type']['name']}`;
        } else {
            document.getElementById(`first-type${i}`).innerHTML=`${pokemonFirstType}`;
        }
    
    
}
function changeTypeColor(pokemonFirstType,i){
    if (pokemonFirstType == 'grass') {
        document.getElementById('')
    } else {
        
    }
}
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




