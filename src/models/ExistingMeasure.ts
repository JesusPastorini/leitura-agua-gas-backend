import { Schema, model } from 'mongoose';
import { IMeasure, IMeasureModel } from '../types/measure';

// Definindo o esquema
const measureSchema = new Schema({
    customer_code: { type: String, required: true },
    measure_uuid: { type: String, required: true },
    measure_datetime: { type: Date, required: true },
    measure_type: { type: String, required: true },
    has_confirmed: { type: Boolean, default: false },
    image_url: { type: String },
    measure_value: { type: Number, required: true },
});

measureSchema.statics.checkExistingMeasure = async function (
    customer_code: string,
    measure_datetime: string
): Promise<boolean> {
    try {
        // Separando date
        const datetime = new Date(measure_datetime);
        const year = datetime.getFullYear();
        const month = datetime.getMonth();

        const existingMeasure = await this.findOne({
            customer_code,
            measure_datetime: {
                $gte: new Date(year, month, 1), // Início do mês
                $lt: new Date(year, month + 1, 1) // Início do próximo mês
            }
        });

        return existingMeasure !== null;
    } catch (error) {
        console.error('Erro ao verificar medição existente:', error);
        throw new Error('Erro ao verificar medição existente');
    }
};

// Cria o modelo usando o esquema importado e a interface do modelo
const Measure = model<IMeasure, IMeasureModel>('Measure', measureSchema);

export default Measure;
