let url = 'https://pokeapi.co/api/v2/pokemon?limit=1118';
let all_pokemon = [];
let pokemonData;
let offset = 0;
let PokemonNames = [];
let pokemonJson = [];
let isLoading;
let isSearching;
let currentPokemonJSON;
let prevId;
let nextId;
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
    showStartScreen();
    isLoading = true;
    showLoader();
    deactivateSearch();
    let url = `https://pokeapi.co/api/v2/pokemon?limit=2000&offset=${offset}`;
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
    renderPokemonJson(PokemonNames);
}

async function renderPokemonJson(PokemonNames) {//loads the single Json for each Pokemon with the Names 
    for (let i = 0; i < 20; i++) {
        let pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${PokemonNames[i]}`;
        let response = await fetch(pokemonUrl);
        pokemonData = await response.json();
        pokemonJson.push(pokemonData); 
        showContent();
    }
    
    document.getElementById('content').innerHTML += '<button id="load-more" onclick="loadMorePokemon()" class="load-more-btn">Load More</button>'
    setTimeout(() => {
        isLoading = false;
        showLoader();
    }, 1000);

    isSearching = false;
    activateSearch();
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

// function openPokemon(id) {//opens up the Pokemon Popup
//     let currentPokemon = pokemonJson[id - 1];
//     let pokeImg = currentPokemon['sprites']['other']['official-artwork']['front_default'];
//     let pokemonName = currentPokemon['name'];
//     let pokeFirstTyp = currentPokemon['types'][0]['type']['name'];
//     let pokemonId = String(currentPokemon.id).padStart(4, '0');
//     let popup = document.getElementById('popup');
//     let content = document.getElementById('popup-content');
//     let typeBtnBackground = typeBackgrounds[pokeFirstTyp.toLowerCase()];
//     let weight = currentPokemon['weight'];
//     let height = currentPokemon['height'];

//     document.getElementById('content').style.filter = 'blur(5px)';
//     popup.classList.remove('d-none');
//     content.innerHTML = PokemonPopupTemplate(weight, height, pokemonId, pokemonName, pokeImg, id, typeBtnBackground, pokeFirstTyp);

//     changeSelectedBg(id, pokeFirstTyp, typeBtnBackground);
//     loadAbilities(currentPokemon, id);
//     renderStats(id, currentPokemon, pokeFirstTyp);
//     renderSecondTypeInGeneral(currentPokemon, id);
// }

function openPokemon(id) {
    let { prevId, nextId } = calculateIds(id);
    
    let popup = document.getElementById('popup');
    let content = document.getElementById('popup-content');
    let currentPokemon = pokemonJson[id - 1];
    let pokeFirstTyp = currentPokemon['types'][0]['type']['name'];
    let typeBtnBackground = typeBackgrounds[pokeFirstTyp.toLowerCase()];

    document.getElementById('content').style.filter = 'blur(5px)';
    popup.classList.remove('d-none');

    content.innerHTML = `
        ${generatePokemonContent(prevId)}
        ${generatePokemonContent(id)}
        ${generatePokemonContent(nextId)}
    `;

    changeSelectedBg(id);
    loadAbilities(currentPokemon, id);
    renderStats(id, currentPokemon, pokeFirstTyp);
    renderSecondTypeInGeneral(currentPokemon, id);
}
function changeSelectedBg(id) {
    for (let i = id - 2; i < id+1; i++){
        if (i === -1) {
            document.getElementById(`selected-pokemon-${pokemonJson.length}`).classList.add('d-none');
            i=0;
        }
        setVariablesForBG(i);
        blurBackgroundCards(i,selectedPokemn,id)
        console.log(currentPokemon,i)
        let pokeFirstTyp = currentPoke['types'][0]['type']['name'];
        let typeBtnBackground = typeBackgrounds[pokeFirstTyp.toLowerCase()];
        MainPokemonbg.classList.add(`card-bg-${pokeFirstTyp.toLowerCase()}`);
        MaintypeBg.classList.add(`${typeBtnBackground}`);
    }
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

function blurBackgroundCards(i,selectedPokemn,id){
    if (i === id - 2 || i === id) { // Überprüft, ob es das erste oder dritte Element ist
        if (selectedPokemn) selectedPokemn.style.filter = 'blur(5px)'; 
    } else {
        if (selectedPokemn) selectedPokemn.style.filter = 'none';
    }
    if (i == pokemonJson.length) {
        document.getElementById(`selected-pokemon-${pokemonJson.length}`).style.filter='none';
    }
}

function setVariablesForBG(i){
    if (i === pokemonJson.length) {
        // Spezielle Anpassungen, wenn i den Wert pokemonJson.length erreicht
        document.getElementById(`selected-pokemon-${1}`).classList.add('d-none');
        currentPoke = pokemonJson[i - 1];
        MainPokemonbg = document.getElementById(`selected-poke-bg-${i}`);
        MaintypeBg = document.getElementById(`selected-pokename-${i}`);
        selectedPokemn = document.getElementById(`selected-pokemon-${i}`);
    } else {
        // Normaler Fall
        currentPoke = pokemonJson[i];
        MainPokemonbg = document.getElementById(`selected-poke-bg-${i + 1}`);
        MaintypeBg = document.getElementById(`selected-pokename-${i + 1}`);
        selectedPokemn = document.getElementById(`selected-pokemon-${i+1}`);
    }
}

function calculateIds(currentId) { // Berechnet die vorherige und nächste Pokémon-ID
        prevId = currentId - 1;
        nextId = currentId + 1;
        console.log(prevId,nextId)
        // Wenn das erste Pokémon angezeigt wird, setze das vorherige auf das letzte Pokémon
        if (prevId < 1) prevId = pokemonJson.length;
        // Wenn das letzte Pokémon angezeigt wird, setze das nächste auf das erste Pokémon
        if (nextId > pokemonJson.length) nextId = 1;

        return { prevId, nextId };
    }

// Erzeugt den Inhalt für ein Pokémon
function generatePokemonContent(pokemonId) {
    let pokemon = pokemonJson[pokemonId - 1];
    let pokemonNumber = String(pokemonId).padStart(4, '0');
    currentPokemonJSON = {
        pokeImg: pokemon['sprites']['other']['official-artwork']['front_default'],
        pokemonName: pokemon['name'],
        pokeFirstTyp: pokemon['types'][0]['type']['name'],
        formattedId: String(pokemon.id).padStart(4, '0'),
        typeBtnBackground: typeBackgrounds[pokemon['types'][0]['type']['name'].toLowerCase()],
        weight: pokemon['weight'],
        height: pokemon['height'],
        id: pokemonId,
        pokemonid: pokemonNumber
    };

    return PokemonPopupTemplate(currentPokemonJSON);
}

function renderSecondTypeInGeneral(currentPokemon, id) {//renders the Second Type of the Pokemon in Popup
    if (currentPokemon['types'].length > 1) {
        let secType = currentPokemon['types'][1]['type']['name'];
        document.getElementById(`Typen-${id}`).innerHTML += `
        <div class="${typeBackgrounds[secType]} pokemon-single-type" style="height:40px;">${secType}</div>`;
    }
}

function renderStats(id, currentPokemon, pokeFirstTyp) {
    let stats = currentPokemon['stats'];
    for (let i = 0; i < stats.length; i++) {
        const stat = stats[i];
        const barWidth = stat['base_stat'] / 255 * 100;
        document.getElementById(`stats-${id}`).innerHTML += statsBars(stat, barWidth, pokeFirstTyp);
    }
}

function nextPokemon(id, pokemonId) {//show up the next Pokemon
    id++;
    pokemonId++;
    openPokemon(id, pokemonId);
}

function previousPokemon(id, pokemonId) {//show up the previous Pokemon
    id--;
    pokemonId--;
    openPokemon(id, pokemonId);
}





function openGeneralTypes(id) {
    document.getElementById(`generals-${id}`).classList.toggle('d-none');
    document.getElementById(`abilities-${id}`).classList.toggle('d-none');
    document.getElementById(`Typen-${id}`).classList.toggle('d-none');
    document.getElementById(`general-btn-${id}`).classList.toggle('inactive-btn');
    document.getElementById(`types-btn-${id}`).classList.toggle('inactive-btn');
}

async function findPokemon() {
    isSearching = true;
    let input = document.getElementById('input').value.toLowerCase();
    let content = document.getElementById('content');
    let results = PokemonNames.filter(pokemonName => pokemonName.toLowerCase().includes(input));
    content.innerHTML = '';
    renderPokemonJson(results);
    deactivateLoadMoreBtn()
    if (input.length < 1) {
        document.getElementById('load-more').classList.remove('d-none');
    }
}

function deactivateSearch() {
    document.getElementById('input').disabled = true;
}

function activateSearch() {
    document.getElementById('input').disabled = false;
}

function closePopup() {
    document.getElementById('popup').classList.add('d-none');
    document.getElementById('content').style.filter = 'blur(0px)';
}

function doNotClose(event) {
    event.stopPropagation();
}

function loadMorePokemon() {
    if (!isLoading || isSearching) {
        PokemonNames = [];
        loadPokemonAPI()
    }
}

function deactivateLoadMoreBtn() {
    const loadMoreDiv = document.getElementById('load-more');
    if (isSearching = true) {
        loadMoreDiv.classList.add('d-none');
    } else {
        loadMoreDiv.classList.add('d-flex');
    }
}

function reloadPage() {
    location.reload();
}

function showLoader() {
    let loader = document.getElementById('loader');
    if (isLoading) {
        loader.classList.remove('d-none');
    }
    if (!isLoading) {
        loader.classList.add('d-none');
    }
}

function showStartScreen(){
    let startScreen = document.getElementById('start-screen');
    setTimeout(() => {
        startScreen.classList.add('animate-up');
    }, 1500);
}


