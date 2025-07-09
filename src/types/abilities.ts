/**
 * 特性関連の型定義
 */

import {
  NamedAPIResource,
  Name,
  Effect,
  EffectChange,
  FlavorText,
  AbilityPokemon,
} from "./common";

export interface Ability {
  id: number;
  name: string;
  is_main_series: boolean;
  generation: NamedAPIResource;
  names: Name[];
  effect_entries: Effect[];
  effect_changes: EffectChange[];
  flavor_text_entries: FlavorText[];
  pokemon: AbilityPokemon[];
}
