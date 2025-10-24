import type { User } from '../types';
import { users as seedUsers } from '../data/seed';

// --- Authentication ---
export const authenticateUser = (identifier: string, password: string): Promise<User | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, you would fetch from a user database.
      // For this simulation, we use the seed data.
      // NOTE: This will not reflect users added/edited at runtime.
      // The login system is separate from the dynamic user management inside the app.
      const user = seedUsers.find(u => 
        (u.username.toLowerCase() === identifier.toLowerCase() || (u.email && u.email.toLowerCase() === identifier.toLowerCase()))
        && u.passwordHash === password
      );
      resolve(user || null);
    }, 500);
  });
};
