/**
 * Environment variable validation utility
 * @param key - The environment variable key to check
 * @returns The environment variable value
 * @throws Error if the environment variable is not set
 */
export function getEnvVarOrThrow(key: string): string {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Environment variable ${key} is required but not set.`);
    }
    return value;
}

/**
 * Validated environment variables
 * These will throw an error at startup if not set
 */
export const URL_SERVICE_TRANSACTIONS = getEnvVarOrThrow(
    "URL_SERVICE_TRANSACTIONS"
);
