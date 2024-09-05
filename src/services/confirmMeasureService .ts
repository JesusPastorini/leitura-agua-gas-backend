import serviceConfirmed from '../models/MeasureConfirmed';

export const confirmMeasureService = async (measure_uuid: string, confirmed_value: number): Promise<void> => {
    if (typeof confirmed_value !== 'number' || !Number.isInteger(confirmed_value)) {
        throw {
            status: 400,
            error_code: 'INVALID_DATA',
            error_description: 'O valor confirmado deve ser um número inteiro'
        };
    }

    await serviceConfirmed.confirmMeasure(measure_uuid, confirmed_value);
};
