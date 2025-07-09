/**
 * MCPサーバーセットアップ
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { PokeAPIClient } from '../client/pokeapi-client.js';
import { ToolHandlers } from '../tools/tool-handlers.js';
import { POKEMON_TOOLS } from '../tools/tool-definitions.js';
import { SERVER_CONFIG } from '../config/server-config.js';

export function createMCPServer(): Server {
  const pokeClient = new PokeAPIClient();
  const toolHandlers = new ToolHandlers(pokeClient);

  const server = new Server({
    name: SERVER_CONFIG.name,
    version: SERVER_CONFIG.version,
  });

  // ツール一覧を返すハンドラー
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: POKEMON_TOOLS,
    };
  });

  // ツール実行ハンドラー
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    return await toolHandlers.handleTool(name, args);
  });

  return server;
}