import express from 'express';
import { getSensors, loadSampleWAtering, getAvgTemperature } from '../controllers/sensors';
import { loadSampleData } from '../controllers/sensors';

const router = express.Router();

router.get('/', getSensors);
router.get('/avg-temp', getAvgTemperature);
router.post('/load-sample', loadSampleData);
router.post('/load-watering', loadSampleWAtering);
 
export default router;
