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

export function mapGame(potentialGame: unknown): Game | null {
  const game = potentialGame as Game;
  if (!game || !game.id || !game.kill || !game.assists || !game.deaths || !game.champion || !game.user || !game.date) {
    return null;
  }
  const mapped: Game = {
    id: game.id,
    kill: game.kill,
    assists: game.assists,
    deaths: game.deaths,
    champion: game.champion,
    user: game.user,
    date: game.date,
  };

  return mapped;
}

export function mapGames(potentialGames: unknown): Array<Game> {
  const games = potentialGames as Array<unknown> | null;

  if (!games || !Array.isArray(games)) {
    return [];
  }

  const mapped = games.map(mapGame);

  return mapped.filter((i): i is Game => Boolean(i));
}

