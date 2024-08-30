import { Request, Response, NextFunction } from 'express';
import { UploadImageRequestBody } from '../types/RequestBody';

const isValidBase64 = (str: string): boolean => {
    const regex = /^data:image\/(png|jpeg|jpg|webp|heic|heif);base64,[A-Za-z0-9+/=]+$/;
    return regex.test(str);
};

export const validateUploadImageRequestBody = (req: Request, res: Response, next: NextFunction) => {
    const { image, customer_code, measure_datetime, measure_type } = req.body as UploadImageRequestBody;

    if (typeof customer_code !== 'string' || customer_code.trim() === '') {
        return res.status(400).json({
            error_code: 'INVALID_DATA',
            error_description: 'Código do cliente inválido. Deve ser uma string não vazia.'
        });
    }

    if (!isValidBase64(image)) {
        return res.status(400).json({
            error_code: 'INVALID_DATA',
            error_description: 'Formato de imagem inválido. Deve ser uma string Base64 válida.'
        });
    }

    if (!['WATER', 'GAS'].includes(measure_type)) {
        return res.status(400).json({
            error_code: 'INVALID_DATA',
            error_description: 'Tipo de medição inválido. Deve ser "WATER" ou "GAS".'
        });
    }

    if (isNaN(Date.parse(measure_datetime))) {
        return res.status(400).json({
            error_code: 'INVALID_DATA',
            error_description: 'Data de medição inválida. Deve ser uma string de data e hora válida.'
        });
    }

    next();
};
