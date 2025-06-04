import * as dotenv from 'dotenv';

dotenv.config();

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} environment variable is required`);
  }
  return value;
}

export const env = {
  backendPort: parseInt(process.env.BACKEND_PORT || '3000', 10),
  databaseUrl: requireEnv('DATABASE_URL'),
  jwtSecret: requireEnv('JWT_SECRET'),
  iaServiceUrl: requireEnv('IA_SERVICE_URL'),
  dbLogging: process.env.DB_LOGGING === 'true',
  rabbitMqUrl: requireEnv('RABBITMQ_URL'),
};
