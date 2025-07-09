/**
 * MCPサーバー設定
 */

export const SERVER_CONFIG = {
  name: 'pokemon-mcp-server',
  version: '1.0.0',
} as const;

export const POKEAPI_CONFIG = {
  baseURL: 'https://pokeapi.co/api/v2',
  timeout: 10000,
} as const;