import { User, Game, Champion } from '../types.js';

export function mapUser(potentialUser: unknown): User | null {
  const user = potentialUser as User;
  if (!user || !user.id || !user.name) {
    return null;
  }
  const mapped: User = {
    id: user.id,
    name: user.name,
    slug: user.slug,
    description: user.description,
  };

  return mapped;
}



