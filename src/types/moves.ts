/**
 * 技関連の型定義
 */

import {
  NamedAPIResource,
  APIResource,
  Name,
  FlavorText,
  Effect,
  EffectChange,
  StatChange,
  MachineReference,
  ContestCombos,
} from "./common";

export type MoveStatChange = StatChange;

export interface MoveMeta {
  ailment: NamedAPIResource;
  category: NamedAPIResource;
  min_hits: number | null;
  max_hits: number | null;
  min_turns: number | null;
  max_turns: number | null;
  drain: number;
  healing: number;
  crit_rate: number;
  ailment_chance: number;
  flinch_chance: number;
  stat_chance: number;
}

export interface MoveContestCombo {
  use_before: NamedAPIResource[];
  use_after: NamedAPIResource[];
}

export interface MovePastValues {
  accuracy: number | null;
  effect_chance: number | null;
  power: number | null;
  pp: number;
  effect_entries: Effect[];
  type: NamedAPIResource;
  version_group: NamedAPIResource;
}

export interface Move {
  id: number;
  name: string;
  accuracy: number | null;
  effect_chance: number | null;
  pp: number;
  priority: number;
  power: number | null;
  contest_combos: ContestCombos<MoveContestCombo>;
  contest_type: NamedAPIResource;
  contest_effect: APIResource;
  damage_class: NamedAPIResource;
  effect_entries: Effect[];
  effect_changes: EffectChange[];
  flavor_text_entries: FlavorText[];
  generation: NamedAPIResource;
  machines: MachineReference[];
  meta: MoveMeta;
  names: Name[];
  past_values: MovePastValues[];
  stat_changes: MoveStatChange[];
  super_contest_effect: APIResource;
  target: NamedAPIResource;
  type: NamedAPIResource;
}
