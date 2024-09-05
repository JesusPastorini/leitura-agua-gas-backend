import Measure from '../models/ExistingMeasure';
import { IListMeasuresParams } from '../types/measure';


export const listMeasures = async ({ customer_code, measure_type }: IListMeasuresParams) => {
    const query: any = { customer_code };

    // Busca o cliente com o código fornecido
    const customer = await Measure.findOne(query);

    if (!customer) {
        return []; // Retorna um array vazio se o cliente não for encontrado
    }
    // Filtra as medidas dentro do array 'measures'
    const filteredMeasures = customer.measures.filter((measure) => {
        return measure_type ? measure.measure_type === measure_type.toUpperCase() : true;
    });

    return filteredMeasures;
};
