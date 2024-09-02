import { Schema, model } from 'mongoose';
import { IMeasure, IMeasureConfirm } from '../types/measure';

const measureSchema = new Schema<IMeasure>({
    customer_code: String,
    measure_uuid: String,
    measure_datetime: Date,
    measure_type: String,
    has_confirmed: Boolean,
    image_url: String,
    measure_value: Number,
});

measureSchema.statics.findByUUID = async function (measure_uuid: string): Promise<IMeasure | null> {
    return this.findOne({ measure_uuid });
};

measureSchema.statics.confirmMeasure = async function (measure_uuid: string, confirmed_value: number): Promise<void> {
    const existingMeasure = await this.findOne({ measure_uuid });
    console.log(existingMeasure)
    if (!existingMeasure) {
        throw {
            status: 404,
            error_code: 'MEASURE_NOT_FOUND',
            error_description: 'Leitura não encontrada',
        };
    }

    if (existingMeasure.has_confirmed) {
        throw {
            status: 409,
            error_code: 'CONFIRMATION_DUPLICATE',
            error_description: 'Leitura já confirmada',
        };
    }

    // Alterando o valor de `measure_value` e confirmando a leitura
    existingMeasure.measure_value = confirmed_value;
    existingMeasure.has_confirmed = true;
    await existingMeasure.save();
};

const serviceConfirmed = model<IMeasure, IMeasureConfirm>('measures', measureSchema);

export default serviceConfirmed;
