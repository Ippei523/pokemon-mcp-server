import { PokeAPIClient } from '../../src/client/pokeapi-client.js';
import { setupPokeAPIMocks } from '../helpers/test-helpers.js';
import {
  mockPikachuResponse,
  mockFireTypeResponse,
  mockThunderboltResponse,
  mockPokemonListResponse,
  mockStaticAbilityResponse,
  mockEvolutionChainResponse,
} from '../fixtures/pokemon-responses.js';

describe('Pokemon MCP Server E2E Tests', () => {
  let client: PokeAPIClient;
  let pokeAPIMocks: ReturnType<typeof setupPokeAPIMocks>;

  beforeEach(() => {
    pokeAPIMocks = setupPokeAPIMocks();
    client = new PokeAPIClient();
  });

  afterEach(() => {
    pokeAPIMocks.clean();
  });

  describe('PokeAPIClient Integration', () => {
    it('should retrieve Pokemon information successfully', async () => {
      pokeAPIMocks.mockPokemon('pikachu', mockPikachuResponse);

      const pokemon = await client.getPokemon('pikachu');
      
      expect(pokemon.id).toBe(25);
      expect(pokemon.name).toBe('pikachu');
      expect(pokemon.height).toBe(4);
      expect(pokemon.weight).toBe(60);
      expect(pokemon.types).toHaveLength(1);
      expect(pokemon.types[0].type.name).toBe('electric');
    });

    it('should retrieve Pokemon type information successfully', async () => {
      pokeAPIMocks.mockPokemonType('fire', mockFireTypeResponse);

      const type = await client.getPokemonType('fire');
      
      expect(type.id).toBe(10);
      expect(type.name).toBe('fire');
      expect(type.damage_relations).toBeDefined();
      expect(type.pokemon).toBeInstanceOf(Array);
    });

    it('should retrieve move information successfully', async () => {
      pokeAPIMocks.mockMove('thunderbolt', mockThunderboltResponse);

      const move = await client.getMove('thunderbolt');
      
      expect(move.id).toBe(85);
      expect(move.name).toBe('thunderbolt');
      expect(move.power).toBe(90);
      expect(move.accuracy).toBe(100);
      expect(move.pp).toBe(15);
    });

    it('should retrieve ability information successfully', async () => {
      pokeAPIMocks.mockAbility('static', mockStaticAbilityResponse);

      const ability = await client.getAbility('static');
      
      expect(ability.id).toBe(9);
      expect(ability.name).toBe('static');
      expect(ability.generation.name).toBe('generation-iii');
      expect(ability.pokemon).toBeInstanceOf(Array);
    });

    it('should retrieve evolution chain information successfully', async () => {
      pokeAPIMocks.mockEvolutionChain(1, mockEvolutionChainResponse);

      const evolutionChain = await client.getEvolutionChain(1);
      
      expect(evolutionChain.id).toBe(1);
      expect(evolutionChain.chain.species.name).toBe('bulbasaur');
      expect(evolutionChain.chain.evolves_to).toBeInstanceOf(Array);
    });

    it('should search Pokemon successfully', async () => {
      const searchResponse = {
        count: 1302,
        next: null,
        previous: null,
        results: [
          { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
          { name: 'pikablu', url: 'https://pokeapi.co/api/v2/pokemon/999/' },
        ],
      };
      
      pokeAPIMocks.mockPokemonListAll(searchResponse);

      const searchResults = await client.searchPokemon('pika');
      
      expect(searchResults).toBeInstanceOf(Array);
      expect(searchResults).toHaveLength(2);
      expect(searchResults[0].name).toBe('pikachu');
      expect(searchResults[1].name).toBe('pikablu');
    });

    it('should retrieve Pokemon list successfully', async () => {
      pokeAPIMocks.mockPokemonList(mockPokemonListResponse, 20, 0);

      const pokemonList = await client.getPokemonList(20, 0);
      
      expect(pokemonList.count).toBe(1302);
      expect(pokemonList.results).toBeInstanceOf(Array);
      expect(pokemonList.results).toHaveLength(3);
      expect(pokemonList.results[0].name).toBe('bulbasaur');
    });

    it('should handle Pokemon not found error', async () => {
      pokeAPIMocks.mockError('/pokemon/invalidpokemon', 404);

      await expect(client.getPokemon('invalidpokemon')).rejects.toThrow('Failed to get pokemon invalidpokemon');
    });

    it('should handle type not found error', async () => {
      pokeAPIMocks.mockError('/type/invalidtype', 404);

      await expect(client.getPokemonType('invalidtype')).rejects.toThrow('Failed to get pokemon type invalidtype');
    });

    it('should handle move not found error', async () => {
      pokeAPIMocks.mockError('/move/invalidmove', 404);

      await expect(client.getMove('invalidmove')).rejects.toThrow('Failed to get move invalidmove');
    });

    it('should handle ability not found error', async () => {
      pokeAPIMocks.mockError('/ability/invalidability', 404);

      await expect(client.getAbility('invalidability')).rejects.toThrow('Failed to get ability invalidability');
    });

    it('should handle evolution chain not found error', async () => {
      pokeAPIMocks.mockError('/evolution-chain/9999', 404);

      await expect(client.getEvolutionChain(9999)).rejects.toThrow('Failed to get evolution chain 9999');
    });

    it('should handle search error', async () => {
      pokeAPIMocks.mockError('/pokemon?limit=1000', 500);

      await expect(client.searchPokemon('test')).rejects.toThrow('Failed to search pokemon');
    });

    it('should handle Pokemon list error', async () => {
      pokeAPIMocks.mockError('/pokemon?limit=20&offset=0', 500);

      await expect(client.getPokemonList(20, 0)).rejects.toThrow('Failed to get pokemon list');
    });
  });
});