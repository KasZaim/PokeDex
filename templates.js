function pokedexCardTemplate(pokemonName,pokemonImg,pokemonFirstType,height,pokemonId,weight){
    return/*html*/` 
    <div onclick="openPokemon(${pokemonData['id']}, '${pokemonFirstType}', '${pokemonImg}','${pokemonName}','${height}','${pokemonId}','${weight}')" class="single-pokemon" id="single-pokemon-${pokemonData['id']}">
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
