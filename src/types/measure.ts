import { Document, Model } from 'mongoose';

export interface IMeasure extends Document {
    customer_code?: string;
    measure_uuid?: string;
    measure_datetime?: Date;
    measure_type?: string;
    has_confirmed?: boolean;
    image_url?: string;
    measure_value?: number;
}

export interface IMeasureModel extends Model<IMeasure> {
    checkExistingMeasure(customer_code: string, measure_datetime: string): Promise<boolean>;
}
