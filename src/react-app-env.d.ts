/// <reference types="react-scripts" />
// Access environment variables
export const apiUrl = process.env.REACT_APP_BACKEND_URL;

// TypeScript type safety
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            REACT_APP_BACKEND_URL: string;
            // Add other env variables here
        }
    }
}