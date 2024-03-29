import express, { Request, Response, NextFunction} from 'express';
import { Game } from '../types.js';
import { CreateNewGame, deleteGameFromId, getGameById, getGames, updateGameById } from '../lib/db.js';

export async function ListGames(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const games = await getGames();
    if (!games) {
        return next(new Error('Could not get games'));
    }
    return res.json(games);
}

export async function getGame(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const id = parseInt(req.params.id);
    const game = await getGameById(id)
  
    if (!game) {
      return next(new Error('Unable to get game'));
    }
  
    return res.json(game);
  }

export async function createGame(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const { kills, assists, deaths, champion, user, date, wol  } = req.body;
    const game = CreateNewGame(kills, assists, deaths, champion, user, date, wol);
    if (!game) {
        return next(new Error('Game not created'));
    }
    return res.json(game);
}

export async function updateGame(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const id = parseInt(req.params.id);
    const { kills, assists, deaths, champion, user, date, wol  } = req.body;
    const game = updateGameById(kills, assists, deaths, champion, user, date, wol, id);
    if (!game) {
        return next(new Error('Game not updated'));
    }
    return res.json(game);
}

export async function deleteGame(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const id = parseInt(req.params.id);
    const game = await deleteGameFromId(id);
    
    if (!game) {
      return next(new Error('Game not deleted'));
    }
  
    return res.json(game);
  }