import { Request, Response, NextFunction } from 'express';
import { getChampions } from '../lib/db.js';

export async function ListChampions(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const champions = await getChampions();
    if (!champions) {
        return next(new Error('Could not get champions'));
    }
    return res.json(champions);
}
