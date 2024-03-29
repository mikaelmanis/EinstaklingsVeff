import express, { Request, Response, NextFunction} from 'express';
import { User } from '../types.js';
import { CreateNewUser, deleteUserFromId, getUserById, getUsers } from '../lib/db.js';
import slugify from 'slugify';

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

export async function createUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const { name, description } = req.body;
    const slug = slugify(name, { lower: true });
    const user = CreateNewUser(name, slug, description);
    if (!user) {
        return next(new Error('User not created'));
    }
    return res.json(user);
}

export async function deleteUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const id = parseInt(req.params.id);
    const team = await deleteUserFromId(id);
    
    if (!team) {
      return next(new Error('Game not deleted'));
    }
  
    return res.json(team);
  }