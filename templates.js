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