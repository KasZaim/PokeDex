let currentPokemon;
let offset = 0;
let PokemonNames = [];
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
    document.getElementById('content').innerHTML += pokedexCardTemplate(pokemonName, pokemonData, pokemonImg,pokemonFirstType);

    checkType(pokemonData, pokemonFirstType);
    changeTypeColor(pokemonData);

}
function checkType(pokemonData, pokemonFirstType) {//adds the Type category

    if (pokemonData['types'].length === 2) {
        let pokemonSecType = pokemonData['types'][1]['type']['name'];
        pokemonSecType =pokemonSecType[0].toUpperCase() + pokemonSecType.slice(1);
        document.getElementById(`first-type-${pokemonData['id']}`).innerHTML = `${pokemonFirstType}`;
        document.getElementById(`second-type-${pokemonData['id']}`).innerHTML = `${pokemonSecType}`;
        
    } else {
        document.getElementById(`first-type-${pokemonData['id']}`).innerHTML = `${pokemonFirstType}`;
        document.getElementById(`second-type-${pokemonData['id']}`).classList.add('d-none');
    }
}
function changeTypeColor(pokemonData) {// Changes the cards and type bg Color
   
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
function openPokemon(id,pokemonFirstType,pokemonData,pokeImg,pokemonName){//opens up the Pokemon Popup
    let popup = document.getElementById('popup');
    let content = document.getElementById('popup-content');
    let typeBackgroundss = typeBackgrounds[pokemonFirstType.toLowerCase()];
    document.getElementById('content').style.filter = 'blur(5px)';
    popup.classList.remove('d-none');
    
    content.innerHTML=/*html*/`
    <div class="selected-pokemon">
        <img src="img/close.png" alt="close-popup" onclick="closePopup()" style="cursor:pointer;">
        <div class="selected-poke-bg" id="selected-poke-bg-${id}">
            <div class="pokemon-img-container" >
                <img src="img/pokeball1.png" class="single-card-bg">
                <img src="${pokeImg}" class="pokemon-img" style="transform: scale(1);">
            </div>
        </div>
        <div class="selected-pokename" id="selected-pokename-${id}">
            <img src="img/left.png" id="left">
            <h2>${pokemonName}</h2>
            <span style="margin-bottom: 6px;">#ID 000${id}</span>
            <img src="img/right.png" id="right">
        </div>
        <div class="stats-bg">
            <div class="stats">
                <div>
                    
                </div>
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
    changeSelectedBg(id,pokemonData,pokemonFirstType,typeBackgroundss)
}
function changeSelectedBg(id, pokemonData,pokemonFirstType,typeBackgroundss){
    let selectedPokemonbg = document.getElementById(`selected-poke-bg-${id}`)
    let typeBg = document.getElementById(`selected-pokename-${id}`);
    selectedPokemonbg.classList.add(`card-bg-${pokemonFirstType.toLowerCase()}`);
    typeBg.classList.add(`${typeBackgroundss}`);
}
function closePopup(){
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




