import express from 'express';

import { getSensors, loadSampleWatering, getAvgTemperature, getLastWatering, getNumberOfWaterings } from '../controllers/sensors';
import { loadSampleData } from '../controllers/sensors';

const router = express.Router();

router.get('/', getSensors);
router.get('/last-watering', getLastWatering);
router.get('/avg-temp', getAvgTemperature);
router.get('/waterings', getNumberOfWaterings);

router.post('/load-sample', loadSampleData);
router.post('/load-watering', loadSampleWatering);
 
export default router;
