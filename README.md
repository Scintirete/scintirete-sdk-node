# Scintirete TypeScript SDK

[![npm version](https://badge.fury.io/js/scintirete.svg)](https://badge.fury.io/js/scintirete)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

TypeScript/JavaScript SDK for [Scintirete Vector Database](https://github.com/Scintirete/Scintirete/).

## Features

- 🚀 **High Performance**: Built on gRPC with HTTP/2 multiplexing and compression
- 🔒 **Type Safe**: Full TypeScript support with generated types from protobuf
- 🌐 **Cross Platform**: Works on Node.js 18+ (ESM and CommonJS)
- 📦 **Lightweight**: Minimal dependencies with tree-shaking support
- 🔄 **Auto Retry**: Built-in connection management and error handling
- 📊 **Rich Features**: Support for vector operations, text embedding, and metadata

## Installation

```bash
npm install scintirete
# or
yarn add scintirete
# or
pnpm add scintirete
```

## Quick Start

```typescript
import { createScintireteClient, Scintirete, DistanceMetric } from 'scintirete';

// Create client
const client = createScintireteClient({
  address: '127.0.0.1:50051',
  password: 'your-password', // Optional
  useTLS: false,
});

const api = new Scintirete(client);

// Create database and collection
await api.createDatabase({ name: 'my_db' });
await api.createCollection({
  dbName: 'my_db',
  collectionName: 'documents',
  metricType: DistanceMetric.COSINE,
});

// Insert vectors with metadata
await api.insertVectors({
  dbName: 'my_db',
  collectionName: 'documents',
  vectors: [
    {
      elements: [0.1, 0.2, 0.3, 0.4],
      metadata: { title: 'Document 1' }
    }
  ]
});

// Search similar vectors
const results = await api.search({
  dbName: 'my_db',
  collectionName: 'documents',
  queryVector: [0.1, 0.2, 0.3, 0.4],
  topK: 10,
  includeVector: true
});

console.log(results.results);

// Clean up
client.close();
```

## Text Embedding

Scintirete supports automatic text embedding:

```typescript
// Insert text with automatic embedding
await api.embedAndInsert({
  dbName: 'my_db',
  collectionName: 'documents',
  texts: [
    {
      text: 'The quick brown fox jumps over the lazy dog',
      metadata: { source: 'example.txt' }
    }
  ],
  embeddingModel: 'text-embedding-ada-002' // Optional
});

// Search by text
const searchResults = await api.embedAndSearch({
  dbName: 'my_db',
  collectionName: 'documents',
  queryText: 'fox jumping',
  topK: 5
});
```

## Configuration

### Client Options

```typescript
interface ScintireteClientOptions {
  address: string;              // gRPC server address
  password?: string;            // Authentication password
  useTLS?: boolean;             // Enable TLS (default: false)
  defaultDeadlineMs?: number;   // Default timeout (default: 10000)
  enableGzip?: boolean;         // Enable compression (default: false)
  channelOptions?: ChannelOptions; // Advanced gRPC options
}
```

### Distance Metrics

```typescript
enum DistanceMetric {
  DISTANCE_METRIC_UNSPECIFIED = 0,
  L2 = 1,           // Euclidean distance
  COSINE = 2,       // Cosine similarity
  INNER_PRODUCT = 3 // Inner product
}
```

### HNSW Configuration

```typescript
interface HnswConfig {
  m?: number;             // Max connections per node (default: 16)
  efConstruction?: number; // Construction search scope (default: 200)
}
```

## API Reference

### Database Operations

- `createDatabase(req)` - Create a new database
- `dropDatabase(req)` - Delete a database
- `listDatabases()` - List all databases

### Collection Operations

- `createCollection(req)` - Create a new collection
- `dropCollection(req)` - Delete a collection
- `getCollectionInfo(req)` - Get collection metadata
- `listCollections(req)` - List collections in a database

### Vector Operations

- `insertVectors(req)` - Insert vectors (batch supported)
- `deleteVectors(req)` - Delete vectors by ID
- `search(req)` - Vector similarity search

### Text Embedding Operations

- `embedAndInsert(req)` - Insert text with auto-embedding
- `embedAndSearch(req)` - Search by text with auto-embedding
- `embedText(req)` - Convert text to vectors
- `listEmbeddingModels()` - Get available embedding models

### Persistence Operations

- `save()` - Synchronous snapshot save
- `bgSave()` - Asynchronous background save

## Error Handling

```typescript
try {
  await api.search({
    dbName: 'nonexistent',
    collectionName: 'test',
    queryVector: [1, 2, 3],
    topK: 5
  });
} catch (error) {
  if (error.code === grpc.status.NOT_FOUND) {
    console.log('Database or collection not found');
  } else {
    console.error('Unexpected error:', error.message);
  }
}
```

## Examples

Check out the [examples directory](./examples) for more usage patterns:

- [Basic CRUD Operations](./examples/basic-crud.ts)
- [Batch Operations](./examples/batch-operations.ts)
- [Text Embedding](./examples/text-embedding.ts)
- [Advanced Configuration](./examples/advanced-config.ts)

## Development

```bash
# Clone the repository
git clone https://github.com/Scintirete/scintirete-sdk-typescript.git
cd scintirete-sdk-typescript

# Install dependencies
npm install

# Generate protobuf types
npm run gen

# Build the project
npm run build

# Run tests
npm test
```

## Requirements

- Node.js 18.0.0 or higher
- Scintirete server running on accessible host

## Related Projects

- [Scintirete](https://github.com/Scintirete/Scintirete/) - The main vector database project
- [Scintirete Python SDK](https://github.com/Scintirete/scintirete-sdk-python) - Python SDK
- [Scintirete Go SDK](https://github.com/Scintirete/scintirete-sdk-go) - Go SDK

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📧 Create an issue on [GitHub Issues](https://github.com/Scintirete/scintirete-sdk-typescript/issues)
- 📖 Read the [Scintirete Documentation](https://github.com/Scintirete/Scintirete/tree/main/docs)
- 💬 Join our community discussions
