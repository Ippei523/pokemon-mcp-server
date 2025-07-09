# Pokemon MCP Server

PokeAPIを利用したModel Context Protocol (MCP)サーバーです。Pokemonの情報を取得するためのツールを提供します。

## 機能

- Pokemon情報の取得
- Pokemon種族情報の取得
- Pokemonタイプ情報の取得
- Pokemon技情報の取得
- Pokemon特性情報の取得
- 進化チェーン情報の取得
- Pokemon検索
- Pokemonリスト取得（ページネーション対応）

## インストール

```bash
npm install
```

## ビルド

```bash
npm run build
```

## 開発

### 開発モードで実行

```bash
npm run dev
```

### ビルドしてから実行

```bash
npm run build
npm start
```

## テスト

### 全テスト実行

```bash
npm test
```

### 単体テストのみ

```bash
npm run test:unit
```

### E2Eテストのみ

```bash
npm run test:e2e
```

### テストカバレッジ

```bash
npm run test:coverage
```

### 統合テスト（実際のAPIを使用）

```bash
npm run test:integration
```

## MCP クライアントでの使用方法

### Claude Desktop での設定

Claude Desktop の設定ファイル（`claude_desktop_config.json`）に以下を追加：

```json
{
  "mcpServers": {
    "pokemon": {
      "command": "node",
      "args": ["/path/to/pokemon-mcp-server/dist/index.js"]
    }
  }
}
```

### 使用可能なツール

1. **get_pokemon** - Pokemon情報取得
   ```
   引数: name (string) - Pokemon名
   ```

2. **get_pokemon_type** - Pokemonタイプ情報取得
   ```
   引数: name (string) - タイプ名
   ```

3. **get_move** - Pokemon技情報取得
   ```
   引数: name (string) - 技名
   ```

4. **get_ability** - Pokemon特性情報取得
   ```
   引数: name (string) - 特性名
   ```

5. **get_evolution_chain** - 進化チェーン情報取得
   ```
   引数: id (number) - 進化チェーンID
   ```

6. **search_pokemon** - Pokemon検索
   ```
   引数: query (string) - 検索クエリ
   ```

7. **get_pokemon_list** - Pokemonリスト取得
   ```
   引数: limit (number, optional) - 取得件数（デフォルト: 20）
         offset (number, optional) - オフセット（デフォルト: 0）
   ```

## 使用例

Claude Desktop でこのMCPサーバーを設定後、以下のような質問ができます：

- "ピカチュウの情報を教えて"
- "炎タイプのポケモンについて教えて"
- "10万ボルトという技について教えて"
- "静電気という特性について教えて"
- "pikaで始まるポケモンを検索して"

## プロジェクト構造

```
src/
├── client/          # PokeAPI クライアント
│   └── pokeapi-client.ts
├── server/          # MCP サーバー設定
│   └── mcp-server.ts
├── tools/           # ツール定義とハンドラー
│   ├── tool-definitions.ts
│   └── tool-handlers.ts
├── config/          # 設定ファイル
│   └── server-config.ts
├── types/           # TypeScript 型定義
│   ├── index.ts
│   ├── common.ts
│   ├── pokemon.ts
│   ├── species.ts
│   ├── type.ts
│   ├── move.ts
│   ├── ability.ts
│   └── evolution.ts
└── index.ts         # エントリーポイント
```

## 依存関係

- `@modelcontextprotocol/sdk` - MCP SDK
- `axios` - HTTP クライアント

## 開発依存関係

- `typescript` - TypeScript コンパイラ
- `jest` - テストフレームワーク
- `ts-jest` - Jest TypeScript サポート
- `nock` - HTTP モッキング
- `@types/node` - Node.js 型定義

## ライセンス

MIT