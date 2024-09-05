import { Schema, model } from 'mongoose';
import { IMeasure, IMeasureConfirm } from '../types/measure';

const measureSchema = new Schema<IMeasure>({
    customer_code: { type: String, required: true },
    measures: [
        {
            measure_uuid: String,
            measure_datetime: Date,
            measure_type: String,
            has_confirmed: Boolean,
            image_url: String,
            measure_value: Number,
        },
    ],
});

measureSchema.statics.findByUUID = async function (measure_uuid: string): Promise<IMeasure | null> {
    return this.findOne({ 'measures.measure_uuid': measure_uuid });
};

measureSchema.statics.confirmMeasure = async function (measure_uuid: string, confirmed_value: number): Promise<void> {
    const existingMeasure = await this.findOneAndUpdate(
        { 'measures.measure_uuid': measure_uuid, 'measures.has_confirmed': false },
        {
            $set: {
                'measures.$.measure_value': confirmed_value,
                'measures.$.has_confirmed': true,
            },
        },
        { new: true }
    );

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

};

const serviceConfirmed = model<IMeasure, IMeasureConfirm>('measures', measureSchema);

export default serviceConfirmed;
