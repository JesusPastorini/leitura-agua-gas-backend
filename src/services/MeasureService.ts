const { GoogleGenerativeAI } = require("@google/generative-ai");
import { v4 as uuidv4 } from 'uuid';
import { RequestAi } from '../types/RequestAi';
import Measure from '../models/ExistingMeasure';

export const checkExistingMeasure = async (
    customer_code: string,
    measure_datetime: string
): Promise<boolean> => {
    return await Measure.checkExistingMeasure(customer_code, measure_datetime);
};

export const extractValueFromImage = async (image: string): Promise<RequestAi> => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-pro",
    });
    // Detectar o MIME type da imagem
    const mimeType = image.match(/^data:(image\/[a-z]+);base64,/i)?.[1];
    // Remove o prefixo "data:image/png;base64,"
    const cleanedImage = image.replace(/^data:image\/[a-z]+;base64,/, '');

    const imagePart = {
        inlineData: {
            data: cleanedImage,
            mimeType: mimeType
        }
    };

    // Enviar a imagem para a API
    //const resultAi = await model.generateContent([imagePart, { text: "Quais os numeros da imagem? mostre somente os numeros" }]);

    //const response = resultAi.response;
    // Acessa o valor do texto dentro do array
    //const textValue = response.candidates[0].content.parts[0].text;
    //const measureValue = parseInt(textValue, 10);
    const measureUuid = uuidv4();
    const measureValue = 1111;

    return {
        image_url: cleanedImage,
        measure_value: measureValue,
        measure_uuid: measureUuid
    };
};
