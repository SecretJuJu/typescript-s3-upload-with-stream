import * as dotenv from 'dotenv';

dotenv.config();

export type EnvKey =
  | 'AWS_ACCESS_KEY_ID'
  | 'AWS_SECRET_ACCESS_KEY'
  | 'AWS_REGION'
  | 'AWS_BUCKET';

export const getEnv = (key: EnvKey): string => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Environment variable not found: ${key}`);
  }

  return value;
};

export const AWS_ACCESS_KEY_ID = getEnv('AWS_ACCESS_KEY_ID');
export const AWS_SECRET_ACCESS_KEY = getEnv('AWS_SECRET_ACCESS_KEY');
export const AWS_REGION = getEnv('AWS_REGION');
export const AWS_BUCKET = getEnv('AWS_BUCKET');
