import type { User } from '../types';
import { authenticateUserFromFirestore } from './firestore';

export const authenticateUser = async (identifier: string, password: string): Promise<User | null> => {
  return await authenticateUserFromFirestore(identifier, password);
};
