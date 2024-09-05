import { Document, Model } from 'mongoose';

export interface IMeasure {
    customer_code: string;
    measures: {
        measure_uuid: string;
        measure_datetime: Date;
        measure_type: string;
        has_confirmed: boolean;
        image_url: string;
        measure_value: number;
    }[];
}

export interface IMeasureModel extends Model<IMeasure> {
    checkExistingMeasure(customer_code: string, measure_datetime: string): Promise<boolean>;
}

export interface IMeasureConfirm extends Model<IMeasure> {
    findByUUID(measure_uuid: string): Promise<IMeasure | null>;
    confirmMeasure(measure_uuid: string, confirmed_value: number): Promise<void>;
}

export interface IListMeasuresParams {
    customer_code: string;
    measure_type?: any;
}
