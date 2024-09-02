import { Request, Response } from 'express';
import { confirmMeasureService } from '../services/confirmMeasureService ';

export const confirmMeasure = async (req: Request, res: Response) => {
    const { measure_uuid, confirmed_value } = req.body;
    try {
        await confirmMeasureService(measure_uuid, confirmed_value);

        res.status(200).json({ success: true });
    } catch (error: any) {
        res.status(error.status || 500).json({
            error_code: error.error_code || 'INTERNAL_SERVER_ERROR',
            error_description: error.error_description || 'Erro interno do servidor',
        });
    }
};
