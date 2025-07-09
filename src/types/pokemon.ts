/**
 * ポケモン関連の型定義
 */

import { PokemonBasicInfo, NamedAPIResource, VersionGameIndex, VersionDetail, MoveLearnDetail, GenerationTypeHistory } from './common';

export interface PokemonSprite {
  front_default: string | null;
  front_shiny: string | null;
  back_default: string | null;
  back_shiny: string | null;
  front_female?: string | null;
  front_shiny_female?: string | null;
  back_female?: string | null;
  back_shiny_female?: string | null;
}

export interface PokemonType {
  slot: number;
  type: NamedAPIResource;
}

export interface PokemonAbility {
  ability: NamedAPIResource;
  is_hidden: boolean;
  slot: number;
}

export interface PokemonMove {
  move: NamedAPIResource;
  version_group_details: MoveLearnDetail[];
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}

export interface PokemonHeldItem {
  item: NamedAPIResource;
  version_details: VersionDetail[];
}

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: PokemonAbility[];
  forms: PokemonBasicInfo[];
  game_indices: VersionGameIndex[];
  held_items: PokemonHeldItem[];
  location_area_encounters: string;
  moves: PokemonMove[];
  species: NamedAPIResource;
  sprites: PokemonSprite;
  stats: PokemonStat[];
  types: PokemonType[];
  past_types: GenerationTypeHistory<PokemonType>[];
}