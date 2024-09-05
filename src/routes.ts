import { Router } from 'express';
import { uploadImage } from './controllers/uploadController';
import { confirmMeasure } from './controllers/confirmController';
import { listMeasures } from './controllers/listController';
import { validateUploadImageRequestBody } from './middleware/validateRequestBody';

const router = Router();

router.post('/upload', uploadImage);
router.patch('/confirm', confirmMeasure);
router.get('/:customer_code/list', listMeasures);

export default router;
