function pokedexCardTemplate(pokemonName,pokemonImg,pokemonFirstType,height,pokemonId){
    return/*html*/` 
    <div onclick="openPokemon(${pokemonData['id']},'${pokemonImg}','${pokemonName}','${height}','${pokemonId}')" class="single-pokemon" id="single-pokemon-${pokemonData['id']}">
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
function statsBars(){
    return/*html*/`
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
    `;
}