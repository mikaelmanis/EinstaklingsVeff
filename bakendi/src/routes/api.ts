import express, { Request, Response, NextFunction } from 'express';
import { ListChampions } from './champions.js';
import { ListUsers, createUser, deleteUser, getUser } from './users.js';


export const router = express.Router();

export async function index(req: Request, res: Response) {
  return res.json([
    {
      users: '/users',
      methods: ['GET', 'POST'],
    },
    {
      user: '/users/:id',
      methods: ['GET', 'DELETE'],
    },
    {
      games: '/games',
      methods: ['GET', 'POST'],
    },
    {
      game: '/games/:id',
      methods: ['GET', 'PATCH', 'DELETE'],
    },
    {
      champions: '/champions',
      methods: ['GET'],
    }
  ]);
}

export async function error() {
  throw new Error('error');
}

router.get('/', index);
router.get('/champions', ListChampions);
router.get('/users', ListUsers);
router.post('/users', createUser);
router.get('/users/:id', getUser);
router.delete('/users/:id', deleteUser);
