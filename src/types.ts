// Re-export commonly used types for convenience
export {
  Vector,
  TextWithMetadata,
  SearchResultItem,
  CollectionInfo,
  HnswConfig,
  EmbeddingModel,
  EmbedTextResult,
  DistanceMetric,
} from '../gen/ts/scintirete/v1/scintirete';

// Additional helper types
export interface VectorData {
  id?: string;
  elements: number[];
  metadata?: Record<string, unknown>;
}

export interface TextData {
  id?: string;
  text: string;
  metadata?: Record<string, unknown>;
}

export interface SearchOptions {
  topK: number;
  efSearch?: number;
  includeVector?: boolean;
}

export interface ConnectionConfig {
  address: string;
  password?: string;
  useTLS?: boolean;
  timeout?: number;
}
