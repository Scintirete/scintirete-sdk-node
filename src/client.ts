import { credentials, ChannelCredentials, ChannelOptions } from '@grpc/grpc-js';
import { ScintireteServiceClient } from '../gen/ts/scintirete/v1/scintirete';

export interface ScintireteClientOptions {
  /** gRPC server address, e.g. '127.0.0.1:50051' */
  address: string;
  /** Password for authentication */
  password?: string;
  /** Whether to use TLS */
  useTLS?: boolean;
  /** gRPC channel options */
  channelOptions?: ChannelOptions;
  /** Default deadline for gRPC calls in milliseconds */
  defaultDeadlineMs?: number;
  /** Enable gzip compression */
  enableGzip?: boolean;
}

export interface Client {
  /** Raw gRPC client */
  raw: ScintireteServiceClient;
  /** Inject auth info into request */
  withAuth<T extends object>(req: T): T & { auth: { password: string } | undefined };
  /** Close the connection */
  close(): void;
}

export function createScintireteClient(opts: ScintireteClientOptions): Client {
  const defaultChannelOptions: ChannelOptions = {
    'grpc.keepalive_time_ms': 30_000,
    'grpc.keepalive_timeout_ms': 10_000,
    'grpc.max_receive_message_length': 64 * 1024 * 1024,
    'grpc.max_send_message_length': 64 * 1024 * 1024,
  };

  const channelOptions = { ...defaultChannelOptions, ...opts.channelOptions };
  const creds: ChannelCredentials = opts.useTLS 
    ? credentials.createSsl() 
    : credentials.createInsecure();

  const client = new ScintireteServiceClient(opts.address, creds, channelOptions);

  const withAuth = <T extends object>(req: T): T & { auth: { password: string } | undefined } => {
    if (!opts.password) {
      return { ...req, auth: undefined };
    }
    return { ...req, auth: { password: opts.password } };
  };

  return {
    raw: client,
    withAuth,
    close: () => client.close(),
  };
}
