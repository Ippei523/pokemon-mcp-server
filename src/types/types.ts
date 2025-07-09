/**
 * ポケモンタイプ関連の型定義
 */

import {
  NamedAPIResource,
  GenerationGameIndex,
  Name,
  PokemonSlotInfo,
  GenerationDamageRelations,
} from "./common";

export interface TypeRelations {
  no_damage_to: NamedAPIResource[];
  half_damage_to: NamedAPIResource[];
  double_damage_to: NamedAPIResource[];
  no_damage_from: NamedAPIResource[];
  half_damage_from: NamedAPIResource[];
  double_damage_from: NamedAPIResource[];
}

export interface PokemonTypeInfo {
  id: number;
  name: string;
  damage_relations: TypeRelations;
  past_damage_relations: GenerationDamageRelations<TypeRelations>[];
  game_indices: GenerationGameIndex[];
  generation: NamedAPIResource;
  move_damage_class: NamedAPIResource;
  names: Name[];
  pokemon: PokemonSlotInfo[];
  moves: NamedAPIResource[];
}
