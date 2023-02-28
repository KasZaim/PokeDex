function pokedexCardTemplate(pokemonName, pokemonData,pokemonImg,pokemonFirstType,i){
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
        <div>
            <div class="first-type-${i}"></div> <div id="second-type-${i}"></div>
        </div>
    </div>` 
}