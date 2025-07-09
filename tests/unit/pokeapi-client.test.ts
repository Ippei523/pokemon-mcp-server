import { PokeAPIClient } from '../../src/client/pokeapi-client';
import { setupPokeAPIMocks } from '../helpers/test-helpers';
import {
  mockPikachuResponse,
  mockFireTypeResponse,
  mockThunderboltResponse,
  mockPokemonListResponse,
  mockStaticAbilityResponse,
  mockEvolutionChainResponse,
} from '../fixtures/pokemon-responses';

describe('PokeAPIClient Unit Tests', () => {
  let client: PokeAPIClient;
  let pokeAPIMocks: ReturnType<typeof setupPokeAPIMocks>;

  beforeEach(() => {
    client = new PokeAPIClient();
    pokeAPIMocks = setupPokeAPIMocks();
  });

  afterEach(() => {
    pokeAPIMocks.clean();
  });

  describe('getPokemon', () => {
    it('should fetch Pokemon data successfully', async () => {
      pokeAPIMocks.mockPokemon('pikachu', mockPikachuResponse);

      const result = await client.getPokemon('pikachu');

      expect(result).toEqual(mockPikachuResponse);
      expect(result.id).toBe(25);
      expect(result.name).toBe('pikachu');
      expect(result.types[0].type.name).toBe('electric');
    });

    it('should handle case insensitive Pokemon names', async () => {
      pokeAPIMocks.mockPokemon('pikachu', mockPikachuResponse);

      const result = await client.getPokemon('PIKACHU');

      expect(result).toEqual(mockPikachuResponse);
    });

    it('should throw error when Pokemon not found', async () => {
      pokeAPIMocks.mockError('/pokemon/nonexistent', 404);

      await expect(client.getPokemon('nonexistent')).rejects.toThrow(
        'Failed to get pokemon nonexistent'
      );
    });

    it('should handle network errors', async () => {
      pokeAPIMocks.mockError('/pokemon/pikachu', 500, 'Internal Server Error');

      await expect(client.getPokemon('pikachu')).rejects.toThrow(
        'Failed to get pokemon pikachu'
      );
    });
  });

  describe('getPokemonType', () => {
    it('should fetch Pokemon type data successfully', async () => {
      pokeAPIMocks.mockPokemonType('fire', mockFireTypeResponse);

      const result = await client.getPokemonType('fire');

      expect(result).toEqual(mockFireTypeResponse);
      expect(result.id).toBe(10);
      expect(result.name).toBe('fire');
      expect(result.damage_relations).toBeDefined();
    });

    it('should handle case insensitive type names', async () => {
      pokeAPIMocks.mockPokemonType('fire', mockFireTypeResponse);

      const result = await client.getPokemonType('FIRE');

      expect(result).toEqual(mockFireTypeResponse);
    });

    it('should throw error when type not found', async () => {
      pokeAPIMocks.mockError('/type/invalidtype', 404);

      await expect(client.getPokemonType('invalidtype')).rejects.toThrow(
        'Failed to get pokemon type invalidtype'
      );
    });
  });

  describe('getMove', () => {
    it('should fetch move data successfully', async () => {
      pokeAPIMocks.mockMove('thunderbolt', mockThunderboltResponse);

      const result = await client.getMove('thunderbolt');

      expect(result).toEqual(mockThunderboltResponse);
      expect(result.id).toBe(85);
      expect(result.name).toBe('thunderbolt');
      expect(result.power).toBe(90);
    });

    it('should handle case insensitive move names', async () => {
      pokeAPIMocks.mockMove('thunderbolt', mockThunderboltResponse);

      const result = await client.getMove('THUNDERBOLT');

      expect(result).toEqual(mockThunderboltResponse);
    });

    it('should throw error when move not found', async () => {
      pokeAPIMocks.mockError('/move/invalidmove', 404);

      await expect(client.getMove('invalidmove')).rejects.toThrow(
        'Failed to get move invalidmove'
      );
    });
  });

  describe('getAbility', () => {
    it('should fetch ability data successfully', async () => {
      pokeAPIMocks.mockAbility('static', mockStaticAbilityResponse);

      const result = await client.getAbility('static');

      expect(result).toEqual(mockStaticAbilityResponse);
      expect(result.id).toBe(9);
      expect(result.name).toBe('static');
      expect(result.generation.name).toBe('generation-iii');
    });

    it('should handle case insensitive ability names', async () => {
      pokeAPIMocks.mockAbility('static', mockStaticAbilityResponse);

      const result = await client.getAbility('STATIC');

      expect(result).toEqual(mockStaticAbilityResponse);
    });

    it('should throw error when ability not found', async () => {
      pokeAPIMocks.mockError('/ability/invalidability', 404);

      await expect(client.getAbility('invalidability')).rejects.toThrow(
        'Failed to get ability invalidability'
      );
    });
  });

  describe('getEvolutionChain', () => {
    it('should fetch evolution chain data successfully', async () => {
      pokeAPIMocks.mockEvolutionChain(1, mockEvolutionChainResponse);

      const result = await client.getEvolutionChain(1);

      expect(result).toEqual(mockEvolutionChainResponse);
      expect(result.id).toBe(1);
      expect(result.chain.species.name).toBe('bulbasaur');
    });

    it('should throw error when evolution chain not found', async () => {
      pokeAPIMocks.mockError('/evolution-chain/9999', 404);

      await expect(client.getEvolutionChain(9999)).rejects.toThrow(
        'Failed to get evolution chain 9999'
      );
    });
  });

  describe('searchPokemon', () => {
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

      const result = await client.searchPokemon('pika');

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('pikachu');
      expect(result[1].name).toBe('pikablu');
    });

    it('should return empty array when no matches found', async () => {
      const searchResponse = {
        count: 1302,
        next: null,
        previous: null,
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        ],
      };

      pokeAPIMocks.mockPokemonListAll(searchResponse);

      const result = await client.searchPokemon('xyz');

      expect(result).toHaveLength(0);
    });

    it('should handle case insensitive search', async () => {
      const searchResponse = {
        count: 1302,
        next: null,
        previous: null,
        results: [
          { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
        ],
      };

      pokeAPIMocks.mockPokemonListAll(searchResponse);

      const result = await client.searchPokemon('PIKA');

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('pikachu');
    });

    it('should throw error when search fails', async () => {
      pokeAPIMocks.mockError('/pokemon?limit=1000', 500);

      await expect(client.searchPokemon('test')).rejects.toThrow(
        'Failed to search pokemon'
      );
    });
  });

  describe('getPokemonList', () => {
    it('should fetch Pokemon list with default parameters', async () => {
      pokeAPIMocks.mockPokemonList(mockPokemonListResponse, 20, 0);

      const result = await client.getPokemonList();

      expect(result).toEqual(mockPokemonListResponse);
      expect(result.count).toBe(1302);
      expect(result.results).toHaveLength(3);
    });

    it('should fetch Pokemon list with custom parameters', async () => {
      pokeAPIMocks.mockPokemonList(mockPokemonListResponse, 10, 20);

      const result = await client.getPokemonList(10, 20);

      expect(result).toEqual(mockPokemonListResponse);
    });

    it('should throw error when list fetch fails', async () => {
      pokeAPIMocks.mockError('/pokemon?limit=20&offset=0', 500);

      await expect(client.getPokemonList()).rejects.toThrow(
        'Failed to get pokemon list'
      );
    });
  });

  describe('Error handling', () => {
    it('should handle timeout errors', async () => {
      pokeAPIMocks.mockError('/pokemon/timeout', 408, 'Request Timeout');

      await expect(client.getPokemon('timeout')).rejects.toThrow(
        'Failed to get pokemon timeout'
      );
    });

    it('should handle malformed responses', async () => {
      const malformedResponse = 'not json';
      pokeAPIMocks.mockPokemon('malformed', malformedResponse);

      await expect(client.getPokemon('malformed')).rejects.toThrow();
    });
  });
});