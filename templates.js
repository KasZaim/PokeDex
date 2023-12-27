function pokedexCardTemplate(pokemonName,pokemonImg,pokemonId){
    return/*html*/` 
    <div onclick="openPokemon(${pokemonData['id']},'${pokemonId}')" class="single-pokemon" id="single-pokemon-${pokemonData['id']}">
        <div class="headline">
            <span>${pokemonName}</span>
            <p class="id-nr" id="id-nr">#${pokemonId}</p>
        </div>
        <div class="pokemon-img-container">
            <img src="img/pokeball1.png" class="single-card-bg">
            <img src="${pokemonImg}" class="pokemon-img">
        </div>
        <div class="types">
            <div class="pokemon-single-type" id="first-type-${pokemonData['id']}"></div> <div class="pokemon-single-type" id="second-type-${pokemonData['id']}"></div>
        </div>
    </div>` 
}
function statsBars(stat,barWidth,pokeFirstTyp){
    return/*html*/`
                <div class="stats-content">
                    <div class="single-bar">
                        <span class="stats-span">${stat['stat']['name']}</span>
                        <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar progress-bar-striped progress-bar-animated card-bg-${pokeFirstTyp.toLowerCase()}" style="width: ${barWidth}%;">
                                ${stat['base_stat']}
                            </div>
                        </div>
                    </div>
                </div>
                
    `;
}
function PokemonPopupTemplate(data){
    return/*html*/`
        <img src="img/close.png" id="close-popup" alt="close-popup" onclick="closePopup()" style="cursor:pointer;">
    <div class="selected-pokemon" id="selected-pokemon-${data.id}">
        <div class="selected-poke-bg" id="selected-poke-bg-${data.id}">
            <div class="pokemon-img-container" style="margin-bottom: 30px">
                <img src="img/pokeball1.png" class="single-card-bg">
                <img src="${data.pokeImg}" class="pokemon-img" style="transform: scale(1);">
            </div>
        </div>
        <div class="selected-pokename" id="selected-pokename-${data.id}">
            <img onclick="previousPokemon(${data.id},${data.pokemonid})" src="img/left.png" id="left">
            <span class="poke-name">${data.pokemonName}</span>
            <span>#ID ${data.pokemonid}</span>
            <img onclick="nextPokemon(${data.id},${data.pokemonid})" src="img/right.png" id="right">
        </div>
        <div class="stats-bg">
            <div id="General-${data.id}" class="General">
                <div onclick="openGeneralTypes(${data.id})" class="general-btn" id="general-btn-${data.id}">General</div>
                <div onclick="openGeneralTypes(${data.id})" class="general-types inactive-btn" id="types-btn-${data.id}">Types</div>
            </div>
            <div id="infos-${data.id}" class="infos">
            
                <div id="Typen-${data.id}" class="d-none category-types">
                    <div class="${data.typeBtnBackground} pokemon-single-type" style="height:40px;">${data.pokeFirstTyp}</div>
                    
                </div>
                
                <div id="generals-${data.id}">
                    <span>
                        Height
                    </span> <br>
                    <div>
                        <b>${(data.height / 10).toFixed(1).replace('.', ',') + ' m'}</b>
                    </div>
                    <span>
                        Weight
                    </span> <br>
                    <div>
                        <b>${(data.weight / 10).toFixed(1).replace('.', ',') + ' kg'}</b>
                    </div>
                </div>
                <div class="abilities" id="abilities-${data.id}">
                    <span>
                       Abilities
                    </span> <br>
                    <div  id="abilities-${data.id}">
                    </div>
                </div>
            </div>
                <div class="stats"id="stats-${data.id}">

                </div>
        </div>
    </div> `;
}