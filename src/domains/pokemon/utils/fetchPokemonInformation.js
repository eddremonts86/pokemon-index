import { getByUrl, all } from "@/helpers/axiosConnection";

export const fetchPokemonInformation = async (pokemonList) => {
  try {
    const urlsRequest = pokemonList.map(({ url }) => getByUrl(url));
    const result = await all(urlsRequest);
    return Object.values(result).map(({ data }) => data);
  } catch (error) {
    console.log(error);
  }
};
