import { describe, it, expect } from 'vitest';
import { createScintireteClient } from '../client';

describe('ScintireteClient', () => {
  it('should create client with default options', () => {
    const client = createScintireteClient({
      address: '127.0.0.1:50051',
    });

    expect(client).toBeDefined();
    expect(client.raw).toBeDefined();
    expect(client.withAuth).toBeDefined();
    expect(client.close).toBeDefined();

    client.close();
  });

  it('should inject auth when password is provided', () => {
    const client = createScintireteClient({
      address: '127.0.0.1:50051',
      password: 'test-password',
    });

    const req = { name: 'test' };
    const authedReq = client.withAuth(req);

    expect(authedReq).toEqual({
      auth: { password: 'test-password' },
      name: 'test',
    });

    client.close();
  });

  it('should not inject auth when password is not provided', () => {
    const client = createScintireteClient({
      address: '127.0.0.1:50051',
    });

    const req = { name: 'test' };
    const authedReq = client.withAuth(req);

    expect(authedReq).toEqual(req);

    client.close();
  });
});
