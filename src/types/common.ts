/**
 * 共通の基本型定義
 */

export interface PokemonBasicInfo {
  name: string;
  url: string;
}

export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface APIResource {
  url: string;
}

export interface VersionGameIndex {
  game_index: number;
  version: NamedAPIResource;
}

export interface GenerationGameIndex {
  game_index: number;
  generation: NamedAPIResource;
}

export interface Name {
  name: string;
  language: NamedAPIResource;
}

export interface FlavorText {
  flavor_text: string;
  language: NamedAPIResource;
  version?: NamedAPIResource;
  version_group?: NamedAPIResource;
}

export interface Effect {
  effect: string;
  short_effect: string;
  language: NamedAPIResource;
}

export interface EffectChange {
  version_group: NamedAPIResource;
  effect_entries: Effect[];
}

/**
 * 頻繁に使用される型パターン
 */

// スロット付きのアイテム関連
export interface SlottedItem<T = NamedAPIResource> {
  slot: number;
  item?: T;
}

// バージョン詳細パターン
export interface VersionDetail {
  rarity: number;
  version: NamedAPIResource;
}

// レベル学習詳細パターン
export interface MoveLearnDetail {
  level_learned_at: number;
  move_learn_method: NamedAPIResource;
  version_group: NamedAPIResource;
}

// 世代別のタイプ履歴パターン
export interface GenerationTypeHistory<T> {
  generation: NamedAPIResource;
  types: T[];
}

// マシン関連パターン
export interface MachineReference {
  machine: APIResource;
  version_group: NamedAPIResource;
}

// ポケモンのスロット情報パターン
export interface PokemonSlotInfo {
  pokemon: NamedAPIResource;
  slot: number;
}

// 統計変化パターン
export interface StatChange {
  change: number;
  stat: NamedAPIResource;
}

// コンテストコンボパターン
export interface ContestCombos<T> {
  normal: T;
  super: T;
}

// 世代別ダメージ関係履歴パターン
export interface GenerationDamageRelations<T> {
  generation: NamedAPIResource;
  damage_relations: T;
}

// 図鑑番号パターン
export interface PokedexEntry {
  entry_number: number;
  pokedex: NamedAPIResource;
}

// 特性所持ポケモンパターン
export interface AbilityPokemon {
  is_hidden: boolean;
  slot: number;
  pokemon: NamedAPIResource;
}