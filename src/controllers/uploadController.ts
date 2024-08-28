import { Request, Response } from 'express';

export const uploadImage = async (req: Request, res: Response) => {

    res.status(200).json({ message: '' });
};
