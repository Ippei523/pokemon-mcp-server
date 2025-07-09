import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { 
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { PokeAPIClient } from '../../src/client/pokeapi-client';
import { TestMCPServer, setupPokeAPIMocks, expectToolResult, expectToolError, parseToolResult } from '../helpers/test-helpers';
import {
  mockPikachuResponse,
  mockFireTypeResponse,
  mockThunderboltResponse,
  mockPokemonListResponse,
  mockStaticAbilityResponse,
  mockEvolutionChainResponse,
} from '../fixtures/pokemon-responses';

describe('Pokemon MCP Server E2E Tests', () => {
  let server: Server;
  let testServer: TestMCPServer;
  let pokeAPIMocks: ReturnType<typeof setupPokeAPIMocks>;

  beforeEach(() => {
    pokeAPIMocks = setupPokeAPIMocks();
    
    const pokeClient = new PokeAPIClient();
    
    server = new Server({
      name: 'pokemon-mcp-server',
      version: '1.0.0',
    });

    const tools = [
      {
        name: 'get_pokemon',
        description: 'Get information about a specific Pokemon',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'The name of the Pokemon to get information about',
            },
          },
          required: ['name'],
        },
      },
      {
        name: 'get_pokemon_type',
        description: 'Get information about a specific Pokemon type',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'The name of the Pokemon type to get information about',
            },
          },
          required: ['name'],
        },
      },
      {
        name: 'get_move',
        description: 'Get information about a specific Pokemon move',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'The name of the move to get information about',
            },
          },
          required: ['name'],
        },
      },
      {
        name: 'get_ability',
        description: 'Get information about a specific Pokemon ability',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'The name of the ability to get information about',
            },
          },
          required: ['name'],
        },
      },
      {
        name: 'get_evolution_chain',
        description: 'Get evolution chain information',
        inputSchema: {
          type: 'object',
          properties: {
            id: {
              type: 'number',
              description: 'The ID of the evolution chain to get information about',
            },
          },
          required: ['id'],
        },
      },
      {
        name: 'search_pokemon',
        description: 'Search for Pokemon by name',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'The search query to find Pokemon',
            },
          },
          required: ['query'],
        },
      },
      {
        name: 'get_pokemon_list',
        description: 'Get a paginated list of Pokemon',
        inputSchema: {
          type: 'object',
          properties: {
            limit: {
              type: 'number',
              description: 'The number of Pokemon to retrieve (default: 20)',
              default: 20,
            },
            offset: {
              type: 'number',
              description: 'The offset for pagination (default: 0)',
              default: 0,
            },
          },
          required: [],
        },
      },
    ];

    server.setRequestHandler(ListToolsRequestSchema, async () => {
      return { tools };
    });

    server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'get_pokemon': {
            const pokemon = await pokeClient.getPokemon((args as any)?.name as string);
            return {
              content: [{ type: 'text', text: JSON.stringify(pokemon, null, 2) }],
              isError: false,
            };
          }

          case 'get_pokemon_type': {
            const type = await pokeClient.getPokemonType((args as any)?.name as string);
            return {
              content: [{ type: 'text', text: JSON.stringify(type, null, 2) }],
              isError: false,
            };
          }

          case 'get_move': {
            const move = await pokeClient.getMove((args as any)?.name as string);
            return {
              content: [{ type: 'text', text: JSON.stringify(move, null, 2) }],
              isError: false,
            };
          }

          case 'get_ability': {
            const ability = await pokeClient.getAbility((args as any)?.name as string);
            return {
              content: [{ type: 'text', text: JSON.stringify(ability, null, 2) }],
              isError: false,
            };
          }

          case 'get_evolution_chain': {
            const evolutionChain = await pokeClient.getEvolutionChain((args as any)?.id as number);
            return {
              content: [{ type: 'text', text: JSON.stringify(evolutionChain, null, 2) }],
              isError: false,
            };
          }

          case 'search_pokemon': {
            const results = await pokeClient.searchPokemon((args as any)?.query as string);
            return {
              content: [{ type: 'text', text: JSON.stringify(results, null, 2) }],
              isError: false,
            };
          }

          case 'get_pokemon_list': {
            const limit = (args as any)?.limit ? Number((args as any).limit) : 20;
            const offset = (args as any)?.offset ? Number((args as any).offset) : 0;
            const results = await pokeClient.getPokemonList(limit, offset);
            return {
              content: [{ type: 'text', text: JSON.stringify(results, null, 2) }],
              isError: false,
            };
          }

          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
            },
          ],
          isError: true,
        };
      }
    });

    testServer = new TestMCPServer(server);
  });

  afterEach(() => {
    pokeAPIMocks.clean();
  });

  describe('Tool Listing', () => {
    it('should list all available tools', async () => {
      const result = await testServer.listTools();
      
      expect(result).toHaveProperty('tools');
      expect(result.tools).toHaveLength(7);
      
      const toolNames = result.tools.map((tool: any) => tool.name);
      expect(toolNames).toContain('get_pokemon');
      expect(toolNames).toContain('get_pokemon_type');
      expect(toolNames).toContain('get_move');
      expect(toolNames).toContain('get_ability');
      expect(toolNames).toContain('get_evolution_chain');
      expect(toolNames).toContain('search_pokemon');
      expect(toolNames).toContain('get_pokemon_list');
    });
  });

  describe('get_pokemon tool', () => {
    it('should retrieve Pokemon information successfully', async () => {
      pokeAPIMocks.mockPokemon('pikachu', mockPikachuResponse);

      const result = await testServer.callTool('get_pokemon', { name: 'pikachu' });
      
      expectToolResult(result, 'pikachu');
      const pokemon = parseToolResult(result);
      
      expect(pokemon.id).toBe(25);
      expect(pokemon.name).toBe('pikachu');
      expect(pokemon.height).toBe(4);
      expect(pokemon.weight).toBe(60);
      expect(pokemon.types).toHaveLength(1);
      expect(pokemon.types[0].type.name).toBe('electric');
    });

    it('should handle Pokemon not found error', async () => {
      pokeAPIMocks.mockError('/pokemon/invalidpokemon', 404);

      const result = await testServer.callTool('get_pokemon', { name: 'invalidpokemon' });
      
      expectToolError(result, 'Failed to get pokemon invalidpokemon');
    });
  });

  describe('get_pokemon_type tool', () => {
    it('should retrieve Pokemon type information successfully', async () => {
      pokeAPIMocks.mockPokemonType('fire', mockFireTypeResponse);

      const result = await testServer.callTool('get_pokemon_type', { name: 'fire' });
      
      expectToolResult(result, 'fire');
      const type = parseToolResult(result);
      
      expect(type.id).toBe(10);
      expect(type.name).toBe('fire');
      expect(type.damage_relations).toBeDefined();
      expect(type.pokemon).toBeInstanceOf(Array);
    });

    it('should handle type not found error', async () => {
      pokeAPIMocks.mockError('/type/invalidtype', 404);

      const result = await testServer.callTool('get_pokemon_type', { name: 'invalidtype' });
      
      expectToolError(result, 'Failed to get pokemon type invalidtype');
    });
  });

  describe('get_move tool', () => {
    it('should retrieve move information successfully', async () => {
      pokeAPIMocks.mockMove('thunderbolt', mockThunderboltResponse);

      const result = await testServer.callTool('get_move', { name: 'thunderbolt' });
      
      expectToolResult(result, 'thunderbolt');
      const move = parseToolResult(result);
      
      expect(move.id).toBe(85);
      expect(move.name).toBe('thunderbolt');
      expect(move.power).toBe(90);
      expect(move.accuracy).toBe(100);
      expect(move.pp).toBe(15);
    });

    it('should handle move not found error', async () => {
      pokeAPIMocks.mockError('/move/invalidmove', 404);

      const result = await testServer.callTool('get_move', { name: 'invalidmove' });
      
      expectToolError(result, 'Failed to get move invalidmove');
    });
  });

  describe('get_ability tool', () => {
    it('should retrieve ability information successfully', async () => {
      pokeAPIMocks.mockAbility('static', mockStaticAbilityResponse);

      const result = await testServer.callTool('get_ability', { name: 'static' });
      
      expectToolResult(result, 'static');
      const ability = parseToolResult(result);
      
      expect(ability.id).toBe(9);
      expect(ability.name).toBe('static');
      expect(ability.generation.name).toBe('generation-iii');
      expect(ability.pokemon).toBeInstanceOf(Array);
    });

    it('should handle ability not found error', async () => {
      pokeAPIMocks.mockError('/ability/invalidability', 404);

      const result = await testServer.callTool('get_ability', { name: 'invalidability' });
      
      expectToolError(result, 'Failed to get ability invalidability');
    });
  });

  describe('get_evolution_chain tool', () => {
    it('should retrieve evolution chain information successfully', async () => {
      pokeAPIMocks.mockEvolutionChain(1, mockEvolutionChainResponse);

      const result = await testServer.callTool('get_evolution_chain', { id: 1 });
      
      expectToolResult(result);
      const evolutionChain = parseToolResult(result);
      
      expect(evolutionChain.id).toBe(1);
      expect(evolutionChain.chain.species.name).toBe('bulbasaur');
      expect(evolutionChain.chain.evolves_to).toBeInstanceOf(Array);
    });

    it('should handle evolution chain not found error', async () => {
      pokeAPIMocks.mockError('/evolution-chain/9999', 404);

      const result = await testServer.callTool('get_evolution_chain', { id: 9999 });
      
      expectToolError(result, 'Failed to get evolution chain 9999');
    });
  });

  describe('search_pokemon tool', () => {
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

      const result = await testServer.callTool('search_pokemon', { query: 'pika' });
      
      expectToolResult(result);
      const searchResults = parseToolResult(result);
      
      expect(searchResults).toBeInstanceOf(Array);
      expect(searchResults).toHaveLength(2);
      expect(searchResults[0].name).toBe('pikachu');
      expect(searchResults[1].name).toBe('pikablu');
    });

    it('should handle search error', async () => {
      pokeAPIMocks.mockError('/pokemon?limit=1000', 500);

      const result = await testServer.callTool('search_pokemon', { query: 'test' });
      
      expectToolError(result, 'Failed to search pokemon');
    });
  });

  describe('get_pokemon_list tool', () => {
    it('should retrieve Pokemon list with default parameters', async () => {
      pokeAPIMocks.mockPokemonList(mockPokemonListResponse, 20, 0);

      const result = await testServer.callTool('get_pokemon_list', {});
      
      expectToolResult(result);
      const pokemonList = parseToolResult(result);
      
      expect(pokemonList.count).toBe(1302);
      expect(pokemonList.results).toBeInstanceOf(Array);
      expect(pokemonList.results).toHaveLength(3);
      expect(pokemonList.results[0].name).toBe('bulbasaur');
    });

    it('should retrieve Pokemon list with custom parameters', async () => {
      pokeAPIMocks.mockPokemonList(mockPokemonListResponse, 10, 20);

      const result = await testServer.callTool('get_pokemon_list', { limit: 10, offset: 20 });
      
      expectToolResult(result);
      const pokemonList = parseToolResult(result);
      
      expect(pokemonList.count).toBe(1302);
      expect(pokemonList.results).toBeInstanceOf(Array);
    });

    it('should handle Pokemon list error', async () => {
      pokeAPIMocks.mockError('/pokemon?limit=20&offset=0', 500);

      const result = await testServer.callTool('get_pokemon_list', {});
      
      expectToolError(result, 'Failed to get pokemon list');
    });
  });

  describe('Error Handling', () => {
    it('should handle unknown tool name', async () => {
      const result = await testServer.callTool('unknown_tool', {});
      
      expectToolError(result, 'Unknown tool: unknown_tool');
    });

    it('should handle missing required parameters', async () => {
      const result = await testServer.callTool('get_pokemon', {});
      
      expectToolError(result);
    });
  });
});