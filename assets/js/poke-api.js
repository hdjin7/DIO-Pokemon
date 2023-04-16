const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id; //acessar o ID(id) do pokemon e guarda em 'number'
  pokemon.name = pokeDetail.name; //acessar o nome(name) do pokemon e guarda em 'name'

  //acessar os tipos(type) do pokemon e guarda no array 'types'
  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;
  pokemon.types = types;
  pokemon.type = type;

  //acessar as estatísticas(stat) do pokemon e guarda no array 'stats'
  const stats = pokeDetail.stats.map(
    (statBase_stat) => statBase_stat.stat.name
  );
  const [stat] = stats;
  pokemon.stats = stats;
  pokemon.stat = stat;

  //acessar os valores estatísticos(base_stat) do pokemon e guarda no array 'values'
  const values = pokeDetail.stats.map(
    (statBase_stat) => statBase_stat.base_stat
  );
  const [value] = values;
  pokemon.values = values;
  pokemon.value = value;

  //acessar a imagem(sprites.other.dream_world.front_default) do pokemon e guarda em 'photo'
  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((PokemonsDetails) => PokemonsDetails);
};
