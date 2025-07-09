import { PokeAPIClient } from '../../src/client/pokeapi-client';
import nock from 'nock';

describe('Simple PokeAPI Client Tests', () => {
  let client: PokeAPIClient;

  beforeEach(() => {
    client = new PokeAPIClient();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('should create a PokeAPIClient instance', () => {
    expect(client).toBeInstanceOf(PokeAPIClient);
  });

  it('should handle Pokemon API requests', async () => {
    const mockResponse = {
      id: 25,
      name: 'pikachu',
      height: 4,
      weight: 60,
      types: [{ slot: 1, type: { name: 'electric', url: 'https://pokeapi.co/api/v2/type/13/' } }]
    };

    nock('https://pokeapi.co/api/v2')
      .get('/pokemon/pikachu')
      .reply(200, mockResponse);

    const result = await client.getPokemon('pikachu');
    
    expect(result.id).toBe(25);
    expect(result.name).toBe('pikachu');
    expect(result.types[0].type.name).toBe('electric');
  });

  it('should handle API errors', async () => {
    nock('https://pokeapi.co/api/v2')
      .get('/pokemon/unknown')
      .reply(404, { message: 'Not Found' });

    await expect(client.getPokemon('unknown')).rejects.toThrow('Failed to get pokemon unknown');
  });
});