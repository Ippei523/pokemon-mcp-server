# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## コマンド

**ビルドと開発:**
```bash
npm run build         # TypeScriptをdist/にコンパイル
npm run start         # コンパイル済みMCPサーバーを実行
npm run dev           # ts-nodeで開発サーバーを実行
npm run watch         # ウォッチモードでコンパイル
```

**テスト:**
```bash
npm test              # 全テストを実行 (Jest)
npm run test:unit     # ユニットテストのみ実行
npm run test:e2e      # E2Eテストのみ実行
npm run test:watch    # ウォッチモードでテスト実行
npm run test:coverage # カバレッジレポート付きでテスト実行
npm run test:integration  # 実際のPokeAPIを使った手動統合テスト
```

**特定のテストを実行:**
```bash
npm test -- tests/unit/simple.test.ts           # 単一テストファイル
npm test -- --testNamePattern="should fetch"    # パターンマッチするテスト
```

## アーキテクチャ

これは**Model Context Protocol (MCP) サーバー**で、PokeAPI経由でポケモンデータを提供します。サーバーはstdioで動作し、MCPクライアントにポケモン関連のツールを公開します。

### コアコンポーネント

**MCPサーバー (`src/index.ts`):**
- `@modelcontextprotocol/sdk`を使用してMCPサーバーを実装
- ポケモンデータアクセス用の8つのツールを公開
- ツールリクエストを処理してPokeAPIClientに委譲
- 適切なエラーハンドリングでJSON形式のレスポンスを返却

**PokeAPIクライアント (`src/pokeapi-client.ts`):**
- PokeAPI v2 (https://pokeapi.co/api/v2) 用のHTTPクライアント
- ポケモン、技、特性、タイプなどの型安全なメソッド
- 10秒タイムアウトのAxiosベース
- 大文字小文字を区別しない入力とエラー変換を処理

**型定義 (`src/types/`):**
- 機能別に分割されたTypeScriptインターフェース
- `common.ts` - 共通の基本型とAPIリソース型
- `pokemon.ts` - ポケモン基本情報、スプライト、ステータス
- `species.ts` - ポケモン種族情報（伝説、説明文など）
- `types.ts` - タイプ相性とタイプ関連情報
- `moves.ts` - 技の詳細情報と効果
- `abilities.ts` - 特性の説明と効果
- `evolution.ts` - 進化チェーンと進化条件
- `index.ts` - 全型定義の再エクスポート

### ツール構成

サーバーは以下のMCPツールを公開:
- `get_pokemon` - ポケモンの基本情報（ステータス、タイプ、特性）
- `get_pokemon_species` - 種族データ（伝説ステータス、説明文）
- `get_pokemon_type` - タイプ相性とポケモンリスト
- `get_move` - 技の詳細（威力、命中率、効果）
- `get_ability` - 特性の説明とポケモンリスト
- `get_evolution_chain` - 進化系統情報
- `search_pokemon` - 名前の部分文字列でポケモン検索
- `get_pokemon_list` - ページ付きポケモンリスト

### テスト構成

**ユニットテスト (`tests/unit/`):**
- PokeAPIClientメソッドを単体でテスト
- `nock`でHTTPリクエストをモック
- エラーハンドリングとデータ変換を検証

**E2Eテスト (`tests/e2e/`):**
- 完全なMCPサーバーツールフローをテスト
- テストフィクスチャでPokeAPIレスポンスをモック
- MCPプロトコル準拠とツールレスポンスを検証

**テストインフラ:**
- TypeScriptサポートとESM互換性を持つJest
- MCPサーバー操作とAPIモック用のテストヘルパー
- PokeAPIレスポンスデータの包括的なフィクスチャ
- カバレッジレポートとウォッチモードサポート

### 開発ノート

- ビルドファイルは`dist/`ディレクトリに出力
- TypeScript設定はJest用にDOMタイプを含むNode.jsをサポート
- 互換性のための`.js`拡張子付きESMインポート
- 全APIコールは大文字小文字を区別せず、エラーを適切に処理
- サーバーはMCPサーバー（stdio transport）として動作することを期待