import express, { Request, Response, NextFunction} from 'express';
import { User } from '../types.js';
import { getUserById, getUsers } from '../lib/db.js';

export async function ListUsers(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const users = await getUsers();
    if (!users) {
        return next(new Error('Could not get users'));
    }
    return res.json(users);
}

export async function getUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const id = parseInt(req.params.id);
    const user = await getUserById(id)
  
    if (!user) {
      return next(new Error('Unable to get user'));
    }
  
    return res.json(user);
  }