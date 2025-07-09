/**
 * MCPツール定義
 */

import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const POKEMON_TOOLS: Tool[] = [
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
    name: 'get_pokemon_species',
    description: 'Get species information about a specific Pokemon',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'The name of the Pokemon species to get information about',
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
] as const;