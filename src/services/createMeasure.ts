import Measure from '../models/ExistingMeasure';
import { RequestAi } from '../types/RequestAi';

export const createMeasure = async (
    extractedValue: RequestAi,
    customer_code: string,
    measure_datetime: Date,
    measure_type: string
): Promise<void> => {

    const newMeasure = new Measure({
        measure_uuid: extractedValue.measure_uuid,
        measure_value: extractedValue.measure_value,
        measure_type,
        measure_datetime,
        customer_code,
        has_confirmed: false, // Definido como padrão
        image_url: extractedValue.image_url,
    });

    try {
        const savedMeasure = await newMeasure.save();
        console.log('Nova medida salva no banco de dados:', savedMeasure);
    } catch (error) {
        console.error('Erro ao salvar a medida no banco de dados:', error);
        throw new Error('Erro ao salvar a medida no banco de dados');
    }
};
