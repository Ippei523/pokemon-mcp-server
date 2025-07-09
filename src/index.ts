#!/usr/bin/env node

/**
 * Pokemon MCP Server エントリーポイント
 */

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createMCPServer } from './server/mcp-server.js';

async function main(): Promise<void> {
  const server = createMCPServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Pokemon MCP Server running on stdio');
}

if (require.main === module) {
  main().catch(console.error);
}