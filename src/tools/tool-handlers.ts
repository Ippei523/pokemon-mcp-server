/**
 * MCPツールハンドラー
 */

import { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { PokeAPIClient } from '../client/pokeapi-client.js';

export class ToolHandlers {
  constructor(private pokeClient: PokeAPIClient) {}

  async handleGetPokemon(args: any): Promise<CallToolResult> {
    const pokemon = await this.pokeClient.getPokemon(args?.name as string);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(pokemon, null, 2),
        },
      ],
      isError: false,
    };
  }

  async handleGetPokemonSpecies(args: any): Promise<CallToolResult> {
    const species = await this.pokeClient.getPokemonSpecies(args?.name as string);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(species, null, 2),
        },
      ],
      isError: false,
    };
  }

  async handleGetPokemonType(args: any): Promise<CallToolResult> {
    const type = await this.pokeClient.getPokemonType(args?.name as string);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(type, null, 2),
        },
      ],
      isError: false,
    };
  }

  async handleGetMove(args: any): Promise<CallToolResult> {
    const move = await this.pokeClient.getMove(args?.name as string);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(move, null, 2),
        },
      ],
      isError: false,
    };
  }

  async handleGetAbility(args: any): Promise<CallToolResult> {
    const ability = await this.pokeClient.getAbility(args?.name as string);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(ability, null, 2),
        },
      ],
      isError: false,
    };
  }

  async handleGetEvolutionChain(args: any): Promise<CallToolResult> {
    const evolutionChain = await this.pokeClient.getEvolutionChain(args?.id as number);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(evolutionChain, null, 2),
        },
      ],
      isError: false,
    };
  }

  async handleSearchPokemon(args: any): Promise<CallToolResult> {
    const results = await this.pokeClient.searchPokemon(args?.query as string);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(results, null, 2),
        },
      ],
      isError: false,
    };
  }

  async handleGetPokemonList(args: any): Promise<CallToolResult> {
    const limit = args?.limit ? Number(args.limit) : 20;
    const offset = args?.offset ? Number(args.offset) : 0;
    const results = await this.pokeClient.getPokemonList(limit, offset);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(results, null, 2),
        },
      ],
      isError: false,
    };
  }

  async handleTool(name: string, args: any): Promise<CallToolResult> {
    try {
      switch (name) {
        case 'get_pokemon':
          return await this.handleGetPokemon(args);
        case 'get_pokemon_species':
          return await this.handleGetPokemonSpecies(args);
        case 'get_pokemon_type':
          return await this.handleGetPokemonType(args);
        case 'get_move':
          return await this.handleGetMove(args);
        case 'get_ability':
          return await this.handleGetAbility(args);
        case 'get_evolution_chain':
          return await this.handleGetEvolutionChain(args);
        case 'search_pokemon':
          return await this.handleSearchPokemon(args);
        case 'get_pokemon_list':
          return await this.handleGetPokemonList(args);
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
  }
}