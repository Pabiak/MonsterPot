import express from 'express';
import { getSensors } from '../controllers/sensors';

const router = express.Router();

router.get('/', getSensors);

export default router;
