export interface UploadImageRequestBody {
    image: string;
    customer_code: string;
    measure_datetime: string;
    measure_type: 'WATER' | 'GAS';
}
