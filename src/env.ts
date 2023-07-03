import { createEnv } from '@t3-oss/env-nuxt';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    EMAIL_SENDER: z.string().email(),
    EMAIL_PASS: z.string(),
    EMAIL_RECEIVER: z.string().email(),
  },
  client: {},
});
