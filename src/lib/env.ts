import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    CDP_WALLET_SECRET: z.string(),
    CDP_API_KEY_ID: z.string(),
    CDP_API_KEY_SECRET: z.string(),
    URL: z.string().url().default("http://localhost:3000"),
    SELLER_WALLET_ADDRESS: z.string().optional(),
  },

  client: {
    NEXT_PUBLIC_NETWORK: z.enum(["base-sepolia", "base"]).default("base-sepolia"),
  },

  /**
   * What object holds the environment variables at runtime. This is usually
   * `process.env` or `import.meta.env`.
   */
  runtimeEnv: {
    CDP_WALLET_SECRET: process.env.CDP_WALLET_SECRET,
    CDP_API_KEY_ID: process.env.CDP_API_KEY_ID,
    CDP_API_KEY_SECRET: process.env.CDP_API_KEY_SECRET,
    URL: process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : undefined,
    SELLER_WALLET_ADDRESS: process.env.SELLER_WALLET_ADDRESS,
    NEXT_PUBLIC_NETWORK: process.env.NEXT_PUBLIC_NETWORK,
  },

  /**
   * By default, this library will feed the environment variables directly to
   * the Zod validator.
   *
   * This means that if you have an empty string for a value that is supposed
   * to be a number (e.g. `PORT=` in a ".env" file), Zod will incorrectly flag
   * it as a type mismatch violation. Additionally, if you have an empty string
   * for a value that is supposed to be a string with a default value (e.g.
   * `DOMAIN=` in an ".env" file), the default value will never be applied.
   *
   * In order to solve these issues, we recommend that all new projects
   * explicitly specify this option as true.
   */
  emptyStringAsUndefined: true,
});
