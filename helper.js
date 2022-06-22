const pokemons = require("./src/db/mock-pokemon");

exports.success = (message, data) => {
  return { message, data };
};

exports.getUniqueId = (pokemons) => {
  const pokimonIds = pokemons.map((pokemon) => pokemon.id);
  const maxId = Math.max(...pokimonIds.reduce((a, b) => Math.max(a, b)));
  return maxId + 1;
};
