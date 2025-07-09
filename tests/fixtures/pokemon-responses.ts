export const mockPikachuResponse = {
  id: 25,
  name: 'pikachu',
  base_experience: 112,
  height: 4,
  is_default: true,
  order: 35,
  weight: 60,
  abilities: [
    {
      ability: {
        name: 'static',
        url: 'https://pokeapi.co/api/v2/ability/9/',
      },
      is_hidden: false,
      slot: 1,
    },
    {
      ability: {
        name: 'lightning-rod',
        url: 'https://pokeapi.co/api/v2/ability/31/',
      },
      is_hidden: true,
      slot: 3,
    },
  ],
  forms: [
    {
      name: 'pikachu',
      url: 'https://pokeapi.co/api/v2/pokemon-form/25/',
    },
  ],
  game_indices: [
    {
      game_index: 84,
      version: {
        name: 'red',
        url: 'https://pokeapi.co/api/v2/version/1/',
      },
    },
  ],
  held_items: [],
  location_area_encounters: 'https://pokeapi.co/api/v2/pokemon/25/encounters',
  moves: [
    {
      move: {
        name: 'mega-punch',
        url: 'https://pokeapi.co/api/v2/move/5/',
      },
      version_group_details: [
        {
          level_learned_at: 0,
          move_learn_method: {
            name: 'machine',
            url: 'https://pokeapi.co/api/v2/move-learn-method/4/',
          },
          version_group: {
            name: 'red-blue',
            url: 'https://pokeapi.co/api/v2/version-group/1/',
          },
        },
      ],
    },
  ],
  species: {
    name: 'pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon-species/25/',
  },
  sprites: {
    back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png',
    back_female: null,
    back_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/25.png',
    back_shiny_female: null,
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    front_female: null,
    front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/25.png',
    front_shiny_female: null,
  },
  stats: [
    {
      base_stat: 35,
      effort: 0,
      stat: {
        name: 'hp',
        url: 'https://pokeapi.co/api/v2/stat/1/',
      },
    },
    {
      base_stat: 55,
      effort: 0,
      stat: {
        name: 'attack',
        url: 'https://pokeapi.co/api/v2/stat/2/',
      },
    },
    {
      base_stat: 40,
      effort: 0,
      stat: {
        name: 'defense',
        url: 'https://pokeapi.co/api/v2/stat/3/',
      },
    },
    {
      base_stat: 50,
      effort: 0,
      stat: {
        name: 'special-attack',
        url: 'https://pokeapi.co/api/v2/stat/4/',
      },
    },
    {
      base_stat: 50,
      effort: 0,
      stat: {
        name: 'special-defense',
        url: 'https://pokeapi.co/api/v2/stat/5/',
      },
    },
    {
      base_stat: 90,
      effort: 2,
      stat: {
        name: 'speed',
        url: 'https://pokeapi.co/api/v2/stat/6/',
      },
    },
  ],
  types: [
    {
      slot: 1,
      type: {
        name: 'electric',
        url: 'https://pokeapi.co/api/v2/type/13/',
      },
    },
  ],
  past_types: [],
};

export const mockFireTypeResponse = {
  id: 10,
  name: 'fire',
  damage_relations: {
    no_damage_to: [],
    half_damage_to: [
      {
        name: 'fire',
        url: 'https://pokeapi.co/api/v2/type/10/',
      },
      {
        name: 'water',
        url: 'https://pokeapi.co/api/v2/type/11/',
      },
    ],
    double_damage_to: [
      {
        name: 'grass',
        url: 'https://pokeapi.co/api/v2/type/12/',
      },
      {
        name: 'ice',
        url: 'https://pokeapi.co/api/v2/type/15/',
      },
    ],
    no_damage_from: [],
    half_damage_from: [
      {
        name: 'fire',
        url: 'https://pokeapi.co/api/v2/type/10/',
      },
      {
        name: 'grass',
        url: 'https://pokeapi.co/api/v2/type/12/',
      },
    ],
    double_damage_from: [
      {
        name: 'water',
        url: 'https://pokeapi.co/api/v2/type/11/',
      },
      {
        name: 'ground',
        url: 'https://pokeapi.co/api/v2/type/5/',
      },
    ],
  },
  past_damage_relations: [],
  game_indices: [
    {
      game_index: 9,
      generation: {
        name: 'generation-i',
        url: 'https://pokeapi.co/api/v2/generation/1/',
      },
    },
  ],
  generation: {
    name: 'generation-i',
    url: 'https://pokeapi.co/api/v2/generation/1/',
  },
  move_damage_class: {
    name: 'special',
    url: 'https://pokeapi.co/api/v2/move-damage-class/3/',
  },
  names: [
    {
      name: 'Fire',
      language: {
        name: 'en',
        url: 'https://pokeapi.co/api/v2/language/9/',
      },
    },
  ],
  pokemon: [
    {
      pokemon: {
        name: 'charmander',
        url: 'https://pokeapi.co/api/v2/pokemon/4/',
      },
      slot: 1,
    },
    {
      pokemon: {
        name: 'charmeleon',
        url: 'https://pokeapi.co/api/v2/pokemon/5/',
      },
      slot: 1,
    },
  ],
  moves: [
    {
      name: 'fire-punch',
      url: 'https://pokeapi.co/api/v2/move/7/',
    },
  ],
};

export const mockThunderboltResponse = {
  id: 85,
  name: 'thunderbolt',
  accuracy: 100,
  effect_chance: 10,
  pp: 15,
  priority: 0,
  power: 90,
  contest_combos: {
    normal: {
      use_before: [],
      use_after: [],
    },
    super: {
      use_before: [],
      use_after: [],
    },
  },
  contest_type: {
    name: 'cool',
    url: 'https://pokeapi.co/api/v2/contest-type/1/',
  },
  contest_effect: {
    url: 'https://pokeapi.co/api/v2/contest-effect/1/',
  },
  damage_class: {
    name: 'special',
    url: 'https://pokeapi.co/api/v2/move-damage-class/3/',
  },
  effect_entries: [
    {
      effect: 'Has a 10% chance to paralyze the target.',
      short_effect: 'Has a 10% chance to paralyze the target.',
      language: {
        name: 'en',
        url: 'https://pokeapi.co/api/v2/language/9/',
      },
    },
  ],
  effect_changes: [],
  flavor_text_entries: [
    {
      flavor_text: 'A strong electric blast is loosed at the target.',
      language: {
        name: 'en',
        url: 'https://pokeapi.co/api/v2/language/9/',
      },
      version_group: {
        name: 'ruby-sapphire',
        url: 'https://pokeapi.co/api/v2/version-group/5/',
      },
    },
  ],
  generation: {
    name: 'generation-i',
    url: 'https://pokeapi.co/api/v2/generation/1/',
  },
  machines: [],
  meta: {
    ailment: {
      name: 'paralysis',
      url: 'https://pokeapi.co/api/v2/move-ailment/1/',
    },
    category: {
      name: 'damage+ailment',
      url: 'https://pokeapi.co/api/v2/move-category/4/',
    },
    min_hits: null,
    max_hits: null,
    min_turns: null,
    max_turns: null,
    drain: 0,
    healing: 0,
    crit_rate: 0,
    ailment_chance: 10,
    flinch_chance: 0,
    stat_chance: 0,
  },
  names: [
    {
      name: 'Thunderbolt',
      language: {
        name: 'en',
        url: 'https://pokeapi.co/api/v2/language/9/',
      },
    },
  ],
  past_values: [],
  stat_changes: [],
  super_contest_effect: {
    url: 'https://pokeapi.co/api/v2/super-contest-effect/1/',
  },
  target: {
    name: 'selected-pokemon',
    url: 'https://pokeapi.co/api/v2/move-target/10/',
  },
  type: {
    name: 'electric',
    url: 'https://pokeapi.co/api/v2/type/13/',
  },
};

export const mockPokemonListResponse = {
  count: 1302,
  next: 'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20',
  previous: null,
  results: [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
    {
      name: 'ivysaur',
      url: 'https://pokeapi.co/api/v2/pokemon/2/',
    },
    {
      name: 'venusaur',
      url: 'https://pokeapi.co/api/v2/pokemon/3/',
    },
  ],
};

export const mockStaticAbilityResponse = {
  id: 9,
  name: 'static',
  is_main_series: true,
  generation: {
    name: 'generation-iii',
    url: 'https://pokeapi.co/api/v2/generation/3/',
  },
  names: [
    {
      name: 'Static',
      language: {
        name: 'en',
        url: 'https://pokeapi.co/api/v2/language/9/',
      },
    },
  ],
  effect_entries: [
    {
      effect: 'Whenever a move makes contact with this Pokémon, the move\'s user has a 30% chance of being paralyzed.',
      short_effect: 'Has a 30% chance of paralyzing attacking Pokémon on contact.',
      language: {
        name: 'en',
        url: 'https://pokeapi.co/api/v2/language/9/',
      },
    },
  ],
  effect_changes: [],
  flavor_text_entries: [
    {
      flavor_text: 'Contact with the Pokémon may cause paralysis.',
      language: {
        name: 'en',
        url: 'https://pokeapi.co/api/v2/language/9/',
      },
      version_group: {
        name: 'ruby-sapphire',
        url: 'https://pokeapi.co/api/v2/version-group/5/',
      },
    },
  ],
  pokemon: [
    {
      is_hidden: false,
      slot: 1,
      pokemon: {
        name: 'pikachu',
        url: 'https://pokeapi.co/api/v2/pokemon/25/',
      },
    },
  ],
};

export const mockEvolutionChainResponse = {
  id: 1,
  baby_trigger_item: null,
  chain: {
    is_baby: false,
    species: {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
    },
    evolution_details: [],
    evolves_to: [
      {
        is_baby: false,
        species: {
          name: 'ivysaur',
          url: 'https://pokeapi.co/api/v2/pokemon-species/2/',
        },
        evolution_details: [
          {
            item: null,
            trigger: {
              name: 'level-up',
              url: 'https://pokeapi.co/api/v2/evolution-trigger/1/',
            },
            gender: null,
            held_item: null,
            known_move: null,
            known_move_type: null,
            location: null,
            min_level: 16,
            min_happiness: null,
            min_beauty: null,
            min_affection: null,
            needs_overworld_rain: false,
            party_species: null,
            party_type: null,
            relative_physical_stats: null,
            time_of_day: '',
            trade_species: null,
            turn_upside_down: false,
          },
        ],
        evolves_to: [
          {
            is_baby: false,
            species: {
              name: 'venusaur',
              url: 'https://pokeapi.co/api/v2/pokemon-species/3/',
            },
            evolution_details: [
              {
                item: null,
                trigger: {
                  name: 'level-up',
                  url: 'https://pokeapi.co/api/v2/evolution-trigger/1/',
                },
                gender: null,
                held_item: null,
                known_move: null,
                known_move_type: null,
                location: null,
                min_level: 32,
                min_happiness: null,
                min_beauty: null,
                min_affection: null,
                needs_overworld_rain: false,
                party_species: null,
                party_type: null,
                relative_physical_stats: null,
                time_of_day: '',
                trade_species: null,
                turn_upside_down: false,
              },
            ],
            evolves_to: [],
          },
        ],
      },
    ],
  },
};