import { Request, Response } from 'express';
import { listMeasures as listMeasuresService } from '../services/listService';

export const listMeasures = async (req: Request, res: Response) => {
    const { customer_code } = req.params;
    const { measure_type } = req.query;
    console.log(measure_type)

    try {
        if (measure_type && measure_type !== 'WATER' && measure_type !== 'GAS') {
            return res.status(400).json({
                error_code: 'INVALID_TYPE',
                error_description: 'Tipo de medição não permitida',
            });
        }

        const measures = await listMeasuresService({ customer_code, measure_type });

        if (measures.length === 0) {
            return res.status(404).json({
                error_code: 'MEASURES_NOT_FOUND',
                error_description: 'Nenhuma leitura encontrada',
            });
        }

        return res.status(200).json({
            customer_code,
            measures: measures.map(measure => ({
                measure_uuid: measure.measure_uuid,
                measure_datetime: measure.measure_datetime,
                measure_type: measure.measure_type,
                has_confirmed: measure.has_confirmed,
                image_url: measure.image_url,
            })),
        });
    } catch (error) {
        return res.status(500).json({
            error_code: 'INTERNAL_SERVER_ERROR',
            error_description: 'Ocorreu um erro no servidor',
        });
    }
};
