/**
 * Text embedding example
 * 
 * This example demonstrates:
 * - Using automatic text embedding
 * - Inserting text documents
 * - Searching by text queries
 * - Working with embedding models
 */

import { createScintireteClient, Scintirete, DistanceMetric } from '../src';

async function main() {
  // Create client
  const client = createScintireteClient({
    address: '127.0.0.1:50051',
    password: 'your-password', // Replace with actual password
    useTLS: false,
  });

  const api = new Scintirete(client);

  try {
    // Create database and collection
    console.log('Setting up database and collection...');
    await api.createDatabase({ name: 'text_db' });
    await api.createCollection({
      dbName: 'text_db',
      collectionName: 'documents',
      metricType: DistanceMetric.COSINE,
    });
    console.log('✓ Setup complete');

    // List available embedding models
    console.log('Listing embedding models...');
    const modelsResponse = await api.listEmbeddingModels();
    console.log('✓ Available models:');
    modelsResponse.models.forEach(model => {
      console.log(`  - ${model.id}: ${model.name} (${model.dimension}D)`);
    });
    console.log(`Default model: ${modelsResponse.defaultModel}`);

    // Insert text documents with automatic embedding
    console.log('Inserting text documents...');
    const documents = [
      {
        text: 'The quick brown fox jumps over the lazy dog',
        metadata: { category: 'animals', source: 'example1.txt' },
      },
      {
        text: 'Python is a high-level programming language',
        metadata: { category: 'programming', source: 'example2.txt' },
      },
      {
        text: 'Machine learning algorithms can process large datasets',
        metadata: { category: 'ai', source: 'example3.txt' },
      },
      {
        text: 'Vector databases are optimized for similarity search',
        metadata: { category: 'database', source: 'example4.txt' },
      },
    ];

    const insertResponse = await api.embedAndInsert({
      dbName: 'text_db',
      collectionName: 'documents',
      texts: documents,
      embeddingModel: modelsResponse.defaultModel, // Use default model
    });
    console.log(`✓ Inserted ${insertResponse.insertedCount} documents`);

    // Search by text query
    console.log('Searching for similar documents...');
    const queries = [
      'programming languages',
      'artificial intelligence',
      'animal behavior',
      'database technology',
    ];

    for (const query of queries) {
      console.log(`\nQuery: "${query}"`);
      const searchResults = await api.embedAndSearch({
        dbName: 'text_db',
        collectionName: 'documents',
        queryText: query,
        topK: 2,
        includeVector: false, // We don't need the vectors, just metadata
      });

      searchResults.results.forEach((result, index) => {
        console.log(`  ${index + 1}. Distance: ${result.distance.toFixed(4)}`);
        console.log(`     Category: ${result.metadata?.category}`);
        console.log(`     Source: ${result.metadata?.source}`);
      });
    }

    // Manually embed text for caching
    console.log('\nManually embedding text...');
    const textsToEmbed = [
      'Natural language processing',
      'Computer vision algorithms',
    ];

    const embedResponse = await api.embedText({
      texts: textsToEmbed,
      embeddingModel: modelsResponse.defaultModel,
    });

    console.log('✓ Embedding results:');
    embedResponse.results.forEach(result => {
      console.log(`  Text: "${result.text}"`);
      console.log(`  Vector length: ${result.embedding.length}`);
      console.log(`  First few dimensions: [${result.embedding.slice(0, 3).map(x => x.toFixed(3)).join(', ')}...]`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Clean up
    try {
      await api.dropDatabase({ name: 'text_db' });
      console.log('✓ Database cleaned up');
    } catch (error) {
      console.error('Cleanup error:', error);
    }
    
    client.close();
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}
