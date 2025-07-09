import { PokeAPIClient } from '../src/client/pokeapi-client';

async function test(): Promise<void> {
  const client = new PokeAPIClient();
  
  try {
    console.log('Testing Pokemon API client...');
    
    // Test get Pokemon
    const pikachu = await client.getPokemon('pikachu');
    console.log('✓ Successfully retrieved Pikachu data');
    console.log(`Name: ${pikachu.name}`);
    console.log(`ID: ${pikachu.id}`);
    console.log(`Height: ${pikachu.height}`);
    console.log(`Weight: ${pikachu.weight}`);
    
    // Test get Pokemon type
    const fireType = await client.getPokemonType('fire');
    console.log('✓ Successfully retrieved Fire type data');
    console.log(`Fire type has ${fireType.pokemon.length} Pokemon`);
    
    // Test get move
    const thunderbolt = await client.getMove('thunderbolt');
    console.log('✓ Successfully retrieved Thunderbolt move data');
    console.log(`Power: ${thunderbolt.power}`);
    console.log(`Accuracy: ${thunderbolt.accuracy}`);
    
    // Test search Pokemon
    const searchResults = await client.searchPokemon('pika');
    console.log('✓ Successfully searched for Pokemon');
    console.log(`Found ${searchResults.length} Pokemon matching "pika"`);
    
    // Test get Pokemon list
    const pokemonList = await client.getPokemonList(5, 0);
    console.log('✓ Successfully retrieved Pokemon list');
    console.log(`Retrieved ${pokemonList.results.length} Pokemon`);
    console.log(`Total count: ${pokemonList.count}`);
    
    // Test get Pokemon species
    const pikachuSpecies = await client.getPokemonSpecies('pikachu');
    console.log('✓ Successfully retrieved Pikachu species data');
    console.log(`Is legendary: ${pikachuSpecies.is_legendary}`);
    console.log(`Is mythical: ${pikachuSpecies.is_mythical}`);
    
    // Test get ability
    const staticAbility = await client.getAbility('static');
    console.log('✓ Successfully retrieved Static ability data');
    console.log(`Generation: ${staticAbility.generation.name}`);
    
    // Test get evolution chain
    const evolutionChain = await client.getEvolutionChain(1);
    console.log('✓ Successfully retrieved evolution chain data');
    console.log(`Species: ${evolutionChain.chain.species.name}`);
    
    console.log('\nAll tests passed! The Pokemon MCP server is working correctly.');
    
  } catch (error) {
    console.error('Test failed:', error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }
}

test();