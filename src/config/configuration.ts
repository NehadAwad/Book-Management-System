import { registerAs } from '@nestjs/config';

export default registerAs('configuration', () => ({
  db: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!, 10) || 5433,
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
  sentry: { dsn: process.env.SENTRY_DSN || '' },
}));