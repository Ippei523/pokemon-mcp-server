import axios, { AxiosInstance } from 'axios';
import {
  Pokemon,
  PokemonSpecies,
  PokemonTypeInfo,
  Move,
  Ability,
  EvolutionChain,
  PokemonBasicInfo,
} from '../types/index.js';
import { POKEAPI_CONFIG } from '../config/server-config.js';

export class PokeAPIClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: POKEAPI_CONFIG.baseURL,
      timeout: POKEAPI_CONFIG.timeout,
    });
  }

  async getPokemon(pokemonName: string): Promise<Pokemon> {
    try {
      const response = await this.client.get<Pokemon>(`/pokemon/${pokemonName.toLowerCase()}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get pokemon ${pokemonName}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getPokemonSpecies(pokemonName: string): Promise<PokemonSpecies> {
    try {
      const response = await this.client.get<PokemonSpecies>(`/pokemon-species/${pokemonName.toLowerCase()}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get pokemon species ${pokemonName}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getPokemonType(typeName: string): Promise<PokemonTypeInfo> {
    try {
      const response = await this.client.get<PokemonTypeInfo>(`/type/${typeName.toLowerCase()}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get pokemon type ${typeName}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getMove(moveName: string): Promise<Move> {
    try {
      const response = await this.client.get<Move>(`/move/${moveName.toLowerCase()}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get move ${moveName}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getAbility(abilityName: string): Promise<Ability> {
    try {
      const response = await this.client.get<Ability>(`/ability/${abilityName.toLowerCase()}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get ability ${abilityName}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getEvolutionChain(evolutionChainId: number): Promise<EvolutionChain> {
    try {
      const response = await this.client.get<EvolutionChain>(`/evolution-chain/${evolutionChainId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get evolution chain ${evolutionChainId}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async searchPokemon(query: string): Promise<PokemonBasicInfo[]> {
    try {
      const response = await this.client.get<{
        count: number;
        next: string | null;
        previous: string | null;
        results: PokemonBasicInfo[];
      }>('/pokemon?limit=1000');
      
      const allPokemon = response.data.results;
      return allPokemon.filter(pokemon => 
        pokemon.name.includes(query.toLowerCase())
      );
    } catch (error) {
      throw new Error(`Failed to search pokemon: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getPokemonList(limit: number = 20, offset: number = 0): Promise<{
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonBasicInfo[];
  }> {
    try {
      const response = await this.client.get<{
        count: number;
        next: string | null;
        previous: string | null;
        results: PokemonBasicInfo[];
      }>(`/pokemon?limit=${limit}&offset=${offset}`);
      
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get pokemon list: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}