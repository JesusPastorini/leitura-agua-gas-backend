import Measure from '../models/ExistingMeasure';
import { RequestAi } from '../types/RequestAi';

export const createMeasure = async (
    extractedValue: RequestAi,
    customer_code: string,
    measure_datetime: Date,
    measure_type: string
): Promise<void> => {
    try {
        // Verifica se já existe um documento com o customer_code
        const existingCustomer = await Measure.findOne({ customer_code });

        if (existingCustomer) {
            // Adiciona a nova medição ao array "measures"
            existingCustomer.measures.push({
                measure_uuid: extractedValue.measure_uuid,
                measure_value: extractedValue.measure_value,
                measure_type,
                measure_datetime,
                has_confirmed: false, // Definido como padrão
                image_url: extractedValue.image_url,
            });

            await existingCustomer.save();
            console.log('Nova medição adicionada ao cliente existente no banco de dados:');
        } else {
            // Se não existir, cria um novo documento
            const newMeasure = new Measure({
                customer_code,
                measures: [{
                    measure_uuid: extractedValue.measure_uuid,
                    measure_value: extractedValue.measure_value,
                    measure_type,
                    measure_datetime,
                    has_confirmed: false, // Definido como padrão
                    image_url: extractedValue.image_url,
                }],
            });

            await newMeasure.save();
            console.log('Novo cliente e medida salvos no banco de dados:');
        }
    } catch (error) {
        console.error('Erro ao salvar a medida no banco de dados:', error);
        throw new Error('Erro ao salvar a medida no banco de dados');
    }
};
