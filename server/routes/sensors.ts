import express from 'express';

import { getSensors, getAvgTemperature, getLastWatering, getNumberOfWaterings, getHistory } from '../controllers/sensors';

const router = express.Router();

router.get('/', getSensors);
router.get('/last-watering', getLastWatering);
router.get('/avg-temp', getAvgTemperature);
router.get('/waterings', getNumberOfWaterings);
router.get('/history', getHistory);
 
export default router;
