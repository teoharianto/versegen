import { Client, Databases, Account } from 'appwrite';

const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const databases = new Databases(client);
export const account = new Account(client);

// Create anonymous session if not exists
export async function ensureSession() {
  try {
    const session = await account.get();
    console.log('Existing session found:', session);
    return session;
  } catch (error) {
    console.log('No session found, creating anonymous session...');
    try {
      const newSession = await account.createAnonymousSession();
      console.log('Anonymous session created:', newSession);
      return newSession;
    } catch (sessionError) {
      console.error('Failed to create session:', sessionError);
      throw sessionError;
    }
  }
}

export { client };
