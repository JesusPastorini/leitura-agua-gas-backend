import Measure from '../models/ExistingMeasure';
import { IListMeasuresParams } from '../types/measure';


export const listMeasures = async ({ customer_code, measure_type }: IListMeasuresParams) => {
    const query: any = { customer_code };

    if (measure_type) {
        query.measure_type = measure_type.toUpperCase();
    }

    return await Measure.find(query);
};
