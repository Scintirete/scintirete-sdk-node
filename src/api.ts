import { CallOptions, Metadata } from '@grpc/grpc-js';
import type { Client } from './client';
import {
  CreateDatabaseRequest,
  CreateDatabaseResponse,
  DropDatabaseRequest, 
  DropDatabaseResponse,
  ListDatabasesRequest,
  ListDatabasesResponse,
  CreateCollectionRequest,
  CreateCollectionResponse,
  DropCollectionRequest,
  DropCollectionResponse,
  GetCollectionInfoRequest,
  CollectionInfo,
  ListCollectionsRequest,
  ListCollectionsResponse,
  InsertVectorsRequest,
  InsertVectorsResponse,
  DeleteVectorsRequest,
  DeleteVectorsResponse,
  SearchRequest,
  SearchResponse,
  EmbedAndInsertRequest,
  EmbedAndInsertResponse,
  EmbedAndSearchRequest,
  EmbedTextRequest,
  EmbedTextResponse,
  ListEmbeddingModelsRequest,
  ListEmbeddingModelsResponse,
  SaveRequest,
  SaveResponse,
  BgSaveRequest,
  BgSaveResponse,
} from '../gen/ts/scintirete/v1/scintirete';

export class Scintirete {
  constructor(private readonly client: Client) {}

  private callUnary<TRequest, TResponse>(
    method: (req: TRequest, metadata: Metadata, options: Partial<CallOptions>, callback: (error: Error | null, response: TResponse) => void) => unknown,
    request: TRequest,
    options?: CallOptions
  ): Promise<TResponse> {
    return new Promise((resolve, reject) => {
      const metadata = new Metadata();
      method.call(this.client.raw, request, metadata, options || {}, (err, res) => {
        if (err) reject(err);
        else resolve(res!);
      });
    });
  }

  // Database operations
  createDatabase(
    req: Omit<CreateDatabaseRequest, 'auth'>, 
    options?: CallOptions
  ): Promise<CreateDatabaseResponse> {
    return this.callUnary(
      this.client.raw.createDatabase,
      this.client.withAuth(req),
      options
    );
  }

  dropDatabase(
    req: Omit<DropDatabaseRequest, 'auth'>,
    options?: CallOptions
  ): Promise<DropDatabaseResponse> {
    return this.callUnary(
      this.client.raw.dropDatabase,
      this.client.withAuth(req),
      options
    );
  }

  listDatabases(
    req: Omit<ListDatabasesRequest, 'auth'> = {},
    options?: CallOptions
  ): Promise<ListDatabasesResponse> {
    return this.callUnary(
      this.client.raw.listDatabases,
      this.client.withAuth(req),
      options
    );
  }

  // Collection operations
  createCollection(
    req: Omit<CreateCollectionRequest, 'auth'>,
    options?: CallOptions
  ): Promise<CreateCollectionResponse> {
    return this.callUnary(
      this.client.raw.createCollection,
      this.client.withAuth(req),
      options
    );
  }

  dropCollection(
    req: Omit<DropCollectionRequest, 'auth'>,
    options?: CallOptions
  ): Promise<DropCollectionResponse> {
    return this.callUnary(
      this.client.raw.dropCollection,
      this.client.withAuth(req),
      options
    );
  }

  getCollectionInfo(
    req: Omit<GetCollectionInfoRequest, 'auth'>,
    options?: CallOptions
  ): Promise<CollectionInfo> {
    return this.callUnary(
      this.client.raw.getCollectionInfo,
      this.client.withAuth(req),
      options
    );
  }

  listCollections(
    req: Omit<ListCollectionsRequest, 'auth'>,
    options?: CallOptions
  ): Promise<ListCollectionsResponse> {
    return this.callUnary(
      this.client.raw.listCollections,
      this.client.withAuth(req),
      options
    );
  }

  // Vector operations
  insertVectors(
    req: Omit<InsertVectorsRequest, 'auth'>,
    options?: CallOptions
  ): Promise<InsertVectorsResponse> {
    return this.callUnary(
      this.client.raw.insertVectors,
      this.client.withAuth(req),
      options
    );
  }

  deleteVectors(
    req: Omit<DeleteVectorsRequest, 'auth'>,
    options?: CallOptions
  ): Promise<DeleteVectorsResponse> {
    return this.callUnary(
      this.client.raw.deleteVectors,
      this.client.withAuth(req),
      options
    );
  }

  search(
    req: Omit<SearchRequest, 'auth'>,
    options?: CallOptions
  ): Promise<SearchResponse> {
    return this.callUnary(
      this.client.raw.search,
      this.client.withAuth(req),
      options
    );
  }

  // Text embedding operations
  embedAndInsert(
    req: Omit<EmbedAndInsertRequest, 'auth'>,
    options?: CallOptions
  ): Promise<EmbedAndInsertResponse> {
    return this.callUnary(
      this.client.raw.embedAndInsert,
      this.client.withAuth(req),
      options
    );
  }

  embedAndSearch(
    req: Omit<EmbedAndSearchRequest, 'auth'>,
    options?: CallOptions
  ): Promise<SearchResponse> {
    return this.callUnary(
      this.client.raw.embedAndSearch,
      this.client.withAuth(req),
      options
    );
  }

  embedText(
    req: Omit<EmbedTextRequest, 'auth'>,
    options?: CallOptions
  ): Promise<EmbedTextResponse> {
    return this.callUnary(
      this.client.raw.embedText,
      this.client.withAuth(req),
      options
    );
  }

  listEmbeddingModels(
    req: Omit<ListEmbeddingModelsRequest, 'auth'> = {},
    options?: CallOptions
  ): Promise<ListEmbeddingModelsResponse> {
    return this.callUnary(
      this.client.raw.listEmbeddingModels,
      this.client.withAuth(req),
      options
    );
  }

  // Persistence operations
  save(
    req: Omit<SaveRequest, 'auth'> = {},
    options?: CallOptions
  ): Promise<SaveResponse> {
    return this.callUnary(
      this.client.raw.save,
      this.client.withAuth(req),
      options
    );
  }

  bgSave(
    req: Omit<BgSaveRequest, 'auth'> = {},
    options?: CallOptions
  ): Promise<BgSaveResponse> {
    return this.callUnary(
      this.client.raw.bgSave,
      this.client.withAuth(req),
      options
    );
  }
}
