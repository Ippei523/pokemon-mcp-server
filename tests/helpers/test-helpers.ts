import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { CallToolRequest, CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import nock from 'nock';

export class TestMCPServer {
  private server: Server;

  constructor(server: Server) {
    this.server = server;
  }

  async callTool(name: string, args: any = {}): Promise<CallToolResult> {
    const request: CallToolRequest = {
      method: 'tools/call',
      params: {
        name,
        arguments: args,
      },
    };

    const handlers = (this.server as any).requestHandlers;
    const handler = handlers.get('tools/call');
    
    if (!handler) {
      throw new Error('No handler found for tools/call');
    }

    return await handler(request);
  }

  async listTools() {
    const request = {
      method: 'tools/list',
      params: {},
    };

    const handlers = (this.server as any).requestHandlers;
    const handler = handlers.get('tools/list');
    
    if (!handler) {
      throw new Error('No handler found for tools/list');
    }

    return await handler(request);
  }
}

export function setupPokeAPIMocks() {
  const pokeAPIBase = 'https://pokeapi.co/api/v2';

  return {
    mockPokemon: (name: string, response: any, statusCode: number = 200) => {
      return nock(pokeAPIBase)
        .get(`/pokemon/${name}`)
        .reply(statusCode, response);
    },

    mockPokemonSpecies: (name: string, response: any) => {
      return nock(pokeAPIBase)
        .get(`/pokemon-species/${name}`)
        .reply(200, response);
    },

    mockPokemonType: (name: string, response: any) => {
      return nock(pokeAPIBase)
        .get(`/type/${name}`)
        .reply(200, response);
    },

    mockMove: (name: string, response: any) => {
      return nock(pokeAPIBase)
        .get(`/move/${name}`)
        .reply(200, response);
    },

    mockAbility: (name: string, response: any) => {
      return nock(pokeAPIBase)
        .get(`/ability/${name}`)
        .reply(200, response);
    },

    mockEvolutionChain: (id: number, response: any) => {
      return nock(pokeAPIBase)
        .get(`/evolution-chain/${id}`)
        .reply(200, response);
    },

    mockPokemonList: (response: any, limit: number = 20, offset: number = 0) => {
      return nock(pokeAPIBase)
        .get(`/pokemon`)
        .query({ limit, offset })
        .reply(200, response);
    },

    mockPokemonListAll: (response: any) => {
      return nock(pokeAPIBase)
        .get(`/pokemon`)
        .query({ limit: 1000 })
        .reply(200, response);
    },

    mockError: (endpoint: string, statusCode: number = 404, message: string = 'Not Found') => {
      return nock(pokeAPIBase)
        .get(endpoint)
        .reply(statusCode, { message });
    },

    clean: () => {
      nock.cleanAll();
    },

    isDone: () => {
      return nock.isDone();
    },
  };
}

export function expectToolResult(result: CallToolResult, expectedContent?: string) {
  expect(result).toHaveProperty('content');
  expect(result.content).toBeInstanceOf(Array);
  expect(result.content.length).toBeGreaterThan(0);
  expect(result.content[0]).toHaveProperty('type', 'text');
  expect(result.content[0]).toHaveProperty('text');
  
  if (expectedContent) {
    expect(result.content[0].text).toContain(expectedContent);
  }
}

export function expectToolError(result: CallToolResult, expectedError?: string) {
  expect(result).toHaveProperty('isError', true);
  expect(result).toHaveProperty('content');
  expect(result.content).toBeInstanceOf(Array);
  expect(result.content.length).toBeGreaterThan(0);
  expect(result.content[0]).toHaveProperty('type', 'text');
  expect(result.content[0]).toHaveProperty('text');
  
  if (expectedError) {
    expect(result.content[0].text).toContain(expectedError);
  }
}

export function parseToolResult(result: CallToolResult) {
  if (result.isError) {
    throw new Error(`Tool error: ${(result.content[0] as any).text}`);
  }
  
  return JSON.parse((result.content[0] as any).text);
}