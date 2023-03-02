function pokedexCardTemplate(pokemonName, pokemonData,pokemonImg,i){
    return/*html*/` 
    <div class="single-pokemon" id="single-pokemon-${pokemonData['id']}">
        <div class="headline">
            <span>${pokemonName}</span>
            <p class ="id-nr">#000${pokemonData['id']}</p>
        </div>
        <div class="pokemon-img-container">
            <img src="img/pokeball1.png" class="single-card-bg">
            <img src="${pokemonImg}" class="pokemon-img">
        </div>
        <div class="types">
            <div id="first-type-${pokemonData['id']}"></div> <div id="second-type-${pokemonData['id']}"></div>
        </div>
    </div>` 
}