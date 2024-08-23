import "dotenv/config";
import { parseEnv, port } from "znv";
import { z } from "zod";

const createConfigFromEnvironment = (environment: NodeJS.ProcessEnv) => {
  const config = parseEnv(environment, {
    MONGODB_URI: z.string(),
    PORT: port().default(3001),
    SECRET_KEY: z.string(),
    ADMIN_TOKEN: z.string(),
  });

  return {
    ...config,
  };
};

export type Config = ReturnType<typeof createConfigFromEnvironment>;

export const config = createConfigFromEnvironment(process.env);
