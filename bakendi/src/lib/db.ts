import pg from 'pg';
import { User, Game, Champion} from '../types.js';
import { mapUser, mapUsers } from './mapper.js';


let savedPool: pg.Pool | undefined;

export function getPool(): pg.Pool {
  if (savedPool) {
    return savedPool;
  }

  const { DATABASE_URL: connectionString } = process.env;
  if (!connectionString) {
    console.error('vantar DATABASE_URL í .env');
    throw new Error('missing DATABASE_URL');
  }

  savedPool = new pg.Pool({ connectionString });

  savedPool.on('error', (err: any) => {
    console.error('Villa í tengingu við gagnagrunn, forrit hættir', err);
    throw new Error('error in db connection');
  });

  return savedPool;
}

export async function query(
  q: string,
  values: Array<unknown> = [],
  silent = false,
) {
  const pool = getPool();

  let client;
  try {
    client = await pool.connect();
  } catch (e) {
    if (!silent) console.error('unable to get client from pool', e);
    return null;
  }

  try {
    const result = await client.query(q, values);
    return result;
  } catch (e) {
    if (!silent) console.error('unable to query', e);
    if (!silent) console.info(q, values);
    return null;
  } finally {
    client.release();
  }
}

export async function getUsers(): Promise<Array<User> | null> {
  const result = await query('SELECT * FROM users');
  if (!result) {
    return null;
  }

  return mapUsers(result.rows);
  
}

export async function getUserById(id: number): Promise<User | null> {
  const result = await query('SELECT * FROM users WHERE id = $1', [id]);

  if (!result || result.rows.length !== 1) {
    return null;
  }

  return mapUser(result.rows[0]);
}

export async function CreateNewUser(name: string, slug: string, description: string): Promise<User | null> {
  const result = await query('INSERT INTO users (name, slug, description) VALUES ($1, $2, $3) RETURNING *', [name, slug, description]);
  if (!result) {
    return null;
  }

  return mapUser(result.rows[0]);
}

export async function deleteUserFromId(id: number): Promise<User | null> {
  const result = await query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
  if (!result) {
    return null;
  }

  return mapUser(result.rows[0]);
}

export async function getChampions(): Promise<Array<Champion> | null> {
  const result = await query('SELECT * FROM Champion');
  if (!result) {
    return null;
  }

  return result.rows;
  
}

