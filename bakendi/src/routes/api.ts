import express, { Request, Response, NextFunction } from 'express';


export const router = express.Router();

export async function index(req: Request, res: Response) {
  return res.json([
    {
      users: '/users',
      methods: ['GET', 'POST'],
    },
    {
      user: '/users/:id',
      methods: ['GET', 'PATCH', 'DELETE'],
    },
    {
      games: '/games',
      methods: ['GET', 'POST'],
    },
    {
      game: '/games/:id',
      methods: ['GET', 'PATCH', 'DELETE'],
    },
  ]);
}

export async function error() {
  throw new Error('error');
}

