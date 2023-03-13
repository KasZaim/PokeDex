let pokemonData;
let offset = 0;
let PokemonNames = [];
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

        showContent();
    }
}
function showContent() {//render the Pokemons Card,IMG, Name
    let pokemonImg = pokemonData['sprites']['other']['official-artwork']['front_default'];
    let pokemonName = pokemonData['name'];
    let pokemonFirstType = pokemonData['types'][0]['type']['name'];
    let height = pokemonData['height'];
    let weight = pokemonData['weight'];
    console.log(pokemonData)
    let pokemonId = String(pokemonData.id).padStart(4, '0');
    pokemonName = pokemonName[0].toUpperCase() + pokemonName.slice(1);
    pokemonFirstType = pokemonFirstType[0].toUpperCase() + pokemonFirstType.slice(1);
    document.getElementById('content').innerHTML += pokedexCardTemplate(pokemonName, pokemonImg, pokemonFirstType, height, pokemonId, weight);

    checkType(pokemonFirstType);
    changeTypeColor();
}

function checkType(pokemonFirstType) {//adds the Type category

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

        if (i === 0 && typeElement) {//überprüft ob das typelement schon gerendert wurde und fügt dann die entprechende Hintergrundfarbe nach type hinzu
            typeElement.classList.add(typeBackground);
            card.classList.add(`card-bg-${type.toLowerCase()}`);
        }
        if (i === 1 && pokemonData['types'].length > 1 && typeElement1) {// überprüft ob i im zweiten durchgang ist und ob es einen zweiten typen gibt 
            let typeBackground1 = typeBackgrounds[pokemonData['types'][1]['type']['name']];
            typeElement1.classList.add(typeBackground1);
        }
    }
}
async function openPokemon(id, pokemonFirstType, pokeImg, pokemonName, height, pokemonId, weight) {//opens up the Pokemon Popup
    let pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;
    let response = await fetch(pokemonUrl);
    let currentPokemonJson = await response.json();
    pokemonData = currentPokemonJson;
    console.log(pokemonData)

    let popup = document.getElementById('popup');
    let content = document.getElementById('popup-content');
    let typeBackgroundss = typeBackgrounds[pokemonFirstType.toLowerCase()];
    let pokemonSecType = pokemonData['types'][1]['type']['name'];
    document.getElementById('content').style.filter = 'blur(5px)';
    popup.classList.remove('d-none');
    content.innerHTML =/*html*/`
    <div class="selected-pokemon">
        <img src="img/close.png" alt="close-popup" onclick="closePopup()" style="cursor:pointer;">
        <div class="selected-poke-bg" id="selected-poke-bg-${id}">
            <div class="pokemon-img-container" >
                <img src="img/pokeball1.png" class="single-card-bg">
                <img src="${pokeImg}" class="pokemon-img" style="transform: scale(1);">
            </div>
        </div>
        <div class="selected-pokename" id="selected-pokename-${id}">
            <img onclick="previousPokemon()" src="img/left.png" id="left">
            <h2>${pokemonName}</h2>
            <span style="margin-bottom: 6px;">#ID ${pokemonId}</span>
            <img onclick="nextPokemon()" src="img/right.png" id="right">
        </div>
        <div class="stats-bg">
            <div class="General">
                <div onclick="openGeneralTypes(${id})" class="general-btn" id="general-btn-${id}">General</div>
                <div onclick="openGeneralTypes(${id})" class="general-types inactive-btn" id="types-btn-${id}">Types</div>
            </div>
            <div id="infos-${id}" class="infos">
            
                <div id="Typen-${id}" class="d-none">
                    <div class="${typeBackgroundss} pokemon-single-type" style="height:40px;">${pokemonFirstType}</div>
                    <div class="${typeBackgrounds[pokemonSecType]} pokemon-single-type" style="height:40px;">${pokemonSecType}</div>
                </div>
                
                <div id="generals-${id}">
                    <span>
                        Height
                    </span> <br>
                    <div>
                        <b>${(height / 10).toFixed(1).replace('.', ',') + ' m'}</b>
                    </div>
                    <span>
                        Weight
                    </span> <br>
                    <div>
                        <b>${(weight / 10).toFixed(1).replace('.', ',') + ' kg'}</b>
                    </div>
                </div>
                <div id="abilities-${id}">
                    <span>
                       Abilities
                    </span> <br>
                    <div class="abilities" id="abilities-${id}">
                    </div>
                </div>
            </div>
            
            <div class="stats">
                <div class="stats-content">
                    <div class="single-bar">
                        <span class="stats-span">HP</span>
                        <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar" style="width: 0%"></div>
                        </div>
                    </div>
                    <div class="single-bar">
                        <span class="stats-span">Attack</span>
                        <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar" style="width: 25%"></div>
                        </div>
                    </div>
                <div class="single-bar">
                    <span class="stats-span">Defense</span>
                    <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar" style="width: 50%"></div>
                    </div>
                </div>
                <div class="single-bar">
                    <span class="stats-span">Special-Attack</span>
                    <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar" style="width: 75%"></div>
                    </div>
                </div>
                <div class="single-bar">
                    <span class="stats-span">Special-Defense</span>
                    <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar" style="width: 100%"></div>
                    </div>
                </div>
                <div class="single-bar">
                    <span class="stats-span">Speed</span>
                    <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar" style="width: 100%"></div>
                    </div>
                </div>
                </div>
            </div>
        
        </div>
    </div> `;
    changeSelectedBg(id, pokemonFirstType, typeBackgroundss);
    loadAbilities(id);

}
function changeSelectedBg(id, pokemonFirstType, typeBackgroundss) {
    let selectedPokemonbg = document.getElementById(`selected-poke-bg-${id}`)
    let typeBg = document.getElementById(`selected-pokename-${id}`);
    selectedPokemonbg.classList.add(`card-bg-${pokemonFirstType.toLowerCase()}`);
    typeBg.classList.add(`${typeBackgroundss}`);
}
async function loadAbilities(id) {
    let ability = pokemonData['abilities'];
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




