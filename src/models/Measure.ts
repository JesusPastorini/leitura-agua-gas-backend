import { Schema, model } from 'mongoose';

const measureSchema = new Schema({
    customer_code: String,
    measure_uuid: String,
    measure_datetime: Date,
    measure_type: String,
    has_confirmed: Boolean,
    image_url: String,
    measure_value: Number,
});

export default measureSchema;
