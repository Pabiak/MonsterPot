import express from 'express';

import {
    getSensors,
    getAvgTemperature,
    getLastWatering,
    getNumberOfWaterings,
    getHistory,
    getLatestSensorsData,
    getStatisticsData,
} from '../controllers/sensors';

const router = express.Router();

router.get('/', getSensors);
router.get('/latest', getLatestSensorsData);
router.get('/waterings/latest', getLastWatering);
router.get('/avg-temp', getAvgTemperature);
router.get('/waterings', getNumberOfWaterings);
router.get('/history', getHistory);
router.get('/statistics', getStatisticsData);

export default router;
