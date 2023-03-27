let pokemonData;
let offset = 0;
let PokemonNames = [];
let pokemonJson = [];
let typeBackgrounds = {
    grass: 'type-bg-grass',
    fire: 'type-bg-fire',
    poison: 'type-bg-poison',
    flying: 'type-bg-flying',
    bug: 'type-bg-bug',
    water: 'type-bg-water',
    normal: 'type-bg-normal',
    electric: 'type-bg-electric',
    ground: 'type-bg-ground',
    fairy: 'type-bg-fairy',
    fighting: 'type-bg-fighting',
    psychic: 'type-bg-psychic',
    steel: 'type-bg-steel',
    ice: 'type-bg-ice',
    ghost: 'type-bg-ghost',
    dragon: 'type-bg-dragon',
    dark: 'type-bg-dark'
};
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
        pokemonData = await response.json();
        pokemonJson.push(pokemonData);
        showContent();
    }
}
function showContent() {//render the Pokemons Card,IMG, Name
    let pokemonImg = pokemonData['sprites']['other']['official-artwork']['front_default'];
    let pokemonName = pokemonData['name'];
    let pokemonId = String(pokemonData.id).padStart(4, '0');//fills the ID's with 0
    pokemonName = pokemonName[0].toUpperCase() + pokemonName.slice(1);
    document.getElementById('content').innerHTML += pokedexCardTemplate(pokemonName, pokemonImg, pokemonId);
    checkType();
    changeTypeColor();
}

function checkType() {//adds the Type category
    let pokemonFirstType = pokemonData['types'][0]['type']['name'];
    pokemonFirstType = pokemonFirstType[0].toUpperCase() + pokemonFirstType.slice(1);
    if (pokemonData['types'].length === 2) {
        let pokemonSecType = pokemonData['types'][1]['type']['name'];
        pokemonSecType = pokemonSecType[0].toUpperCase() + pokemonSecType.slice(1);
        document.getElementById(`first-type-${pokemonData['id']}`).innerHTML = `${pokemonFirstType}`;
        document.getElementById(`second-type-${pokemonData['id']}`).innerHTML = `${pokemonSecType}`;

    } else {
        document.getElementById(`first-type-${pokemonData['id']}`).innerHTML = `${pokemonFirstType}`;
        document.getElementById(`second-type-${pokemonData['id']}`).classList.add('d-none');
    }
}
function changeTypeColor() {// Changes the cards and type bg Color

    for (let i = 0; i < pokemonData['types'].length; i++) {
        let card = document.getElementById(`single-pokemon-${pokemonData['id']}`);
        let type = pokemonData['types'][i]['type']['name'];
        let typeElement = document.getElementById(`first-type-${pokemonData['id']}`);
        let typeElement1 = document.getElementById(`second-type-${pokemonData['id']}`);
        let typeBackground = typeBackgrounds[type];

        if (i === 0 && typeElement) {//checks if the typeElement exists and adds the bg Color 
            typeElement.classList.add(typeBackground);
            card.classList.add(`card-bg-${type.toLowerCase()}`);
        }
        if (i === 1 && pokemonData['types'].length > 1 && typeElement1) {// überprüft ob i im zweiten durchgang ist und ob es einen zweiten typen gibt 
            let typeBackground1 = typeBackgrounds[pokemonData['types'][1]['type']['name']];
            typeElement1.classList.add(typeBackground1);
            
        }
    }
}

function openPokemon(id) {//opens up the Pokemon Popup
    let currentPokemon = pokemonJson[id-1];
    let pokeImg = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    let pokemonName = currentPokemon['name'];
    let pokeFirstTyp = currentPokemon['types'][0]['type']['name'];
    let pokemonId = String(currentPokemon.id).padStart(4, '0');
    let popup = document.getElementById('popup');
    let content = document.getElementById('popup-content');
    let typeBtnBackground = typeBackgrounds[pokeFirstTyp.toLowerCase()];
    let weight = currentPokemon['weight'];
    let height = currentPokemon['height'];
    
    document.getElementById('content').style.filter = 'blur(5px)';
    popup.classList.remove('d-none');
    content.innerHTML = PokemonPopupTemplate(weight,height,pokemonId,pokemonName,pokeImg,id,typeBtnBackground,pokeFirstTyp);
    
    changeSelectedBg(id, pokeFirstTyp, typeBtnBackground);
    loadAbilities(currentPokemon,id);
    renderStats(id,currentPokemon,pokeFirstTyp);
    renderSecondTypeInGeneral(currentPokemon,id);
}
function renderSecondTypeInGeneral(currentPokemon,id){//renders the Second Type of the Pokemon in Popup
    if (currentPokemon['types'].length > 1) {
        let secType = currentPokemon['types'][1]['type']['name'];
        document.getElementById(`Typen-${id}`).innerHTML+=`
        <div class="${typeBackgrounds[secType]} pokemon-single-type" style="height:40px;">${secType}</div>`;
    }
}
function renderStats(id,currentPokemon,pokeFirstTyp){
    let stats = currentPokemon['stats'];
    for (let i = 0; i < stats.length; i++) {
        const stat = stats[i];
        const barWidth = stat['base_stat']/255 *100;
        document.getElementById(`stats-${id}`).innerHTML+= statsBars(stat,barWidth,pokeFirstTyp);
    }
}
function nextPokemon(id,pokemonId){//show up the next Pokemon
    id++;
    pokemonId++;
    openPokemon(id,pokemonId);
}
function previousPokemon(id,pokemonId){//show up the previous Pokemon
    id--;
    pokemonId--;
    openPokemon(id,pokemonId);
}
function changeSelectedBg(id, pokeFirstTyp, typeBtnBackground) {
    let selectedPokemonbg = document.getElementById(`selected-poke-bg-${id}`)
    let typeBg = document.getElementById(`selected-pokename-${id}`);
    selectedPokemonbg.classList.add(`card-bg-${pokeFirstTyp.toLowerCase()}`);
    typeBg.classList.add(`${typeBtnBackground}`);
}
function loadAbilities(currentPokemon, id) {
    let ability = currentPokemon['abilities'];
    for (let i = 0; i < ability.length; i++) {
        const abilities = ability[i]['ability']['name'];
        document.getElementById(`abilities-${id}`).innerHTML +=/*html*/`
         <div><b>${abilities}</b></div>   
        `;
    }
}
function openGeneralTypes(id) {
    document.getElementById(`generals-${id}`).classList.toggle('d-none');
    document.getElementById(`abilities-${id}`).classList.toggle('d-none');
    document.getElementById(`Typen-${id}`).classList.toggle('d-none');
    document.getElementById(`general-btn-${id}`).classList.toggle('inactive-btn');
    document.getElementById(`types-btn-${id}`).classList.toggle('inactive-btn');
}

function closePopup() {
    document.getElementById('popup').classList.add('d-none');
    document.getElementById('content').style.filter = 'blur(0px)';
}
function doNotClose(event){
    event.stopPropagation();
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




