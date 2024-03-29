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
export function mapUsers(potentialUsers: unknown): Array<User> {
  const users = potentialUsers as Array<unknown> | null;

  if (!users || !Array.isArray(users)) {
    return [];
  }

  const mapped = users.map(mapUser);


  return mapped.filter((i): i is User => Boolean(i));
}



