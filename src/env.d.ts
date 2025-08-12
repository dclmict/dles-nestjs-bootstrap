/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface Env {
  // Database
  DATABASE_PORT: string;
  DATABASE_HOST: string;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;
  DATABASE_NAME: string;

  // API
  HTTP_PORT: string;
  GRPC_PORT: string;
  X_API_KEY: string;

  // Rate Limiting
  THROTTLE_TTL: string;
  THROTTLE_LIMIT: string;

  // CORS
  CORS_ORIGINS: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}
