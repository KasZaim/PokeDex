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
                            <div class="progress-bar card-bg-${pokeFirstTyp.toLowerCase()}" style="width: ${barWidth}%;">
                                ${stat['base_stat']}
                            </div>
                        </div>
                    </div>
                </div>
                
    `;
}
function PokemonPopupTemplate(weight,height,pokemonId,pokemonName,pokeImg,id,typeBtnBackground,pokeFirstTyp){
    return/*html*/`
    <div class="selected-pokemon">
        <img src="img/close.png" id="close-popup" alt="close-popup" onclick="closePopup()" style="cursor:pointer;">
        <div class="selected-poke-bg" id="selected-poke-bg-${id}">
            <div class="pokemon-img-container" >
                <img src="img/pokeball1.png" class="single-card-bg">
                <img src="${pokeImg}" class="pokemon-img" style="transform: scale(1);">
            </div>
        </div>
        <div class="selected-pokename" id="selected-pokename-${id}">
            <img onclick="previousPokemon(${id},${pokemonId})" src="img/left.png" id="left">
            <h2>${pokemonName}</h2>
            <span style="margin-bottom: 6px;">#ID ${pokemonId}</span>
            <img onclick="nextPokemon(${id},${pokemonId})" src="img/right.png" id="right">
        </div>
        <div class="stats-bg">
            <div id="General-${id}" class="General">
                <div onclick="openGeneralTypes(${id})" class="general-btn" id="general-btn-${id}">General</div>
                <div onclick="openGeneralTypes(${id})" class="general-types inactive-btn" id="types-btn-${id}">Types</div>
            </div>
            <div id="infos-${id}" class="infos">
            
                <div id="Typen-${id}" class="d-none">
                    <div class="${typeBtnBackground} pokemon-single-type" style="height:40px;">${pokeFirstTyp}</div>
                    
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
                <div class="abilities" id="abilities-${id}">
                    <span>
                       Abilities
                    </span> <br>
                    <div  id="abilities-${id}">
                    </div>
                </div>
            </div>
                <div class="stats"id="stats-${id}">

                </div>
        </div>
    </div> `;
}