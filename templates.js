function pokedexCardTemplate(pokemonName, pokemonData,pokemonImg,i){
    return/*html*/` 
    <div class="single-pokemon">
        <div class="headline">
            <span>${pokemonName}</span>
            <p>#000${pokemonData['id']}</p>
        </div>
        <div class="pokemon-img-container">
            <img src="img/pokeball1.png" class="single-card-bg">
            <img src="${pokemonImg}" class="pokemon-img">
        </div>
        <div class="types">
            <div id="first-type-${i}"></div> <div id="second-type-${i}"></div>
        </div>
    </div>` 
}