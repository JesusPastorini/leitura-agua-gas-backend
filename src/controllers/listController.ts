import { Request, Response } from 'express';

export const listMeasures = async (req: Request, res: Response) => {

    res.status(200).json({ message: '' });
};
