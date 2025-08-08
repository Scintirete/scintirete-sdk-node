/**
 * Basic CRUD operations example
 * 
 * This example demonstrates:
 * - Creating databases and collections
 * - Inserting vectors
 * - Searching for similar vectors
 * - Deleting vectors and cleaning up
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
    // Create database
    console.log('Creating database...');
    await api.createDatabase({ name: 'example_db' });
    console.log('✓ Database created');

    // Create collection
    console.log('Creating collection...');
    await api.createCollection({
      dbName: 'example_db',
      collectionName: 'vectors',
      metricType: DistanceMetric.COSINE,
      hnswConfig: {
        m: 16,
        efConstruction: 200,
      },
    });
    console.log('✓ Collection created');

    // Insert vectors
    console.log('Inserting vectors...');
    const insertResponse = await api.insertVectors({
      dbName: 'example_db',
      collectionName: 'vectors',
      vectors: [
        {
          elements: [0.1, 0.2, 0.3, 0.4],
          metadata: { title: 'Document 1', category: 'tech' },
        },
        {
          elements: [0.2, 0.3, 0.4, 0.5],
          metadata: { title: 'Document 2', category: 'science' },
        },
        {
          elements: [0.5, 0.4, 0.3, 0.2],
          metadata: { title: 'Document 3', category: 'tech' },
        },
      ],
    });
    console.log(`✓ Inserted ${insertResponse.insertedCount} vectors`);
    console.log('Inserted IDs:', insertResponse.insertedIds);

    // Get collection info
    console.log('Getting collection info...');
    const collectionInfo = await api.getCollectionInfo({
      dbName: 'example_db',
      collectionName: 'vectors',
    });
    console.log('✓ Collection info:', {
      name: collectionInfo.name,
      dimension: collectionInfo.dimension,
      vectorCount: collectionInfo.vectorCount,
      memoryBytes: collectionInfo.memoryBytes,
    });

    // Search for similar vectors
    console.log('Searching for similar vectors...');
    const searchResults = await api.search({
      dbName: 'example_db',
      collectionName: 'vectors',
      queryVector: [0.15, 0.25, 0.35, 0.45],
      topK: 2,
      includeVector: true,
    });

    console.log('✓ Search results:');
    searchResults.results.forEach((result, index) => {
      console.log(`  ${index + 1}. ID: ${result.id}, Distance: ${result.distance}`);
      console.log(`     Metadata:`, result.metadata);
    });

    // Delete a vector
    if (insertResponse.insertedIds.length > 0) {
      console.log('Deleting vector...');
      const deleteResponse = await api.deleteVectors({
        dbName: 'example_db',
        collectionName: 'vectors',
        ids: [insertResponse.insertedIds[0]],
      });
      console.log(`✓ Deleted ${deleteResponse.deletedCount} vectors`);
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Clean up
    try {
      await api.dropDatabase({ name: 'example_db' });
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
