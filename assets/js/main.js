const pokemonList = document.getElementById("pokemonList");
const btnLoad = document.getElementById("btnLoad");

const maxLimit = 151;
const limit = 10;
let offset = 0;

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons
      .map(
        (pokemon) => `
    <li class="pokemon ${pokemon.type}">

    <div id="pokemonCard-${
      pokemon.number
    }" class="pokemonCard" style="display:inline-block">
    
    <span class="number">#${pokemon.number}</span>
    <div class="name">${pokemon.name}</div>
        <div class="detail">
          <ol class="types">
          ${pokemon.types
            .map((type) => `<li class="type ${type}">${type}</li>`)
            .join("")}
          </ol>

                    
          <img src="${pokemon.photo}"
              alt="${pokemon.name}">
        </div>
      </div>

      <!-- Estatísticas do Pokemon -->
      <div id="details-${
        pokemon.number
      }" class="pokemonDetails" style="display:none">
        <table class="pokemonStats">
          <tbody>
            ${pokemon.stats
              .map(
                (stat, index) => `
              <tr>
                <td>${stat}</td>
                <td class="values">${pokemon.values[index]}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>

      <!-- Botão para mostrar/ocultar as estatísticas do Pokemon -->
      <div class="divStats">
        <button class="btnStats" onclick="showStats(${
          pokemon.number
        })" style="font-size:0.75rem">
        Pokemon stats
        </button>
      </div>
      
    </li>
    `
      )
      .join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

function showCard(id) {
  const pokemonCard = document.querySelector(`#pokemonCard-${id}`);
  if (pokemonCard.style.display === "none") {
    pokemonCard.style.display = "inline-block";
  } else {
    pokemonCard.style.display = "none";
  }
}

function showStats(id) {
  const pokemonStats = document.querySelector(`#details-${id}`);
  if (pokemonStats.style.display === "none") {
    pokemonStats.style.display = "block";
  } else {
    pokemonStats.style.display = "none";
  }
  showCard(id);
}

btnLoad.addEventListener("click", () => {
  offset += limit;
  const qtdNextPage = offset + limit;

  if (qtdNextPage >= maxLimit) {
    let newLimit = maxLimit - offset;
    loadPokemonItens(offset, newLimit);

    btnLoad.parentElement.removeChild(btnLoad);
  } else {
    loadPokemonItens(offset, limit);
  }
});
