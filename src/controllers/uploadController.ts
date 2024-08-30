import { Request, Response } from 'express';
import { checkExistingMeasure, extractValueFromImage } from '../services/MeasureService';

export const uploadImage = async (req: Request, res: Response): Promise<Response> => {
    const { image, customer_code, measure_datetime, measure_type } = req.body;

    try {
        // 1- Verificar se já existe uma leitura no mês
        // const exists = await checkExistingMeasure(customer_code, measure_datetime, measure_type);
        // if (exists) {
        //     return res.status(409).json({
        //         error_code: 'DOUBLE_REPORT',
        //         error_description: 'Leitura do mês já realizada',
        //     });
        // }

        const extractedValue = await extractValueFromImage(image);

        return res.status(200).json({
            measure_value: extractedValue,
        });
    } catch (error: any) {
        return res.status(400).json({
            error_code: 'INVALID_DATA',
            error_description: error.message,
        });
    }
};