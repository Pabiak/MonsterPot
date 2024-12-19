import { Request, Response } from 'express';

import { mqttRequest } from '../services/mqttService';

import Humidity from '../models/Humidity';
import Temperature from '../models/Temperature';
import Light from '../models/Light';
import Watering from '../models/Watering';
import History from '../models/History';

export const getSensors = async (req: Request, res: Response) => {
    try {
        const result = await mqttRequest('monsterpot/request/sensors', 'monsterpot/sensors') as {
            humidity: number;
            temperature: number;
            light: number;
        };

        const now = new Date();

        await Promise.all([
            Humidity.create({ value: result.humidity, date: now }),
            Temperature.create({ value: result.temperature, date: now }),
            Light.create({ value: result.light, date: now }),
        ]);

        res.status(200).json(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(504).json({ error });
    }
};

export const getLastWatering = async (req: Request, res: Response) => {
    try {
        const watering = await Watering.find().sort({ date: -1 }).limit(1);
        res.status(200).json({ watering: watering[0] });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getAvgTemperature = async (req: Request, res: Response) => {
    try {
        const temperatures = await Temperature.find();
        const avgTemperature = temperatures.reduce((acc, curr) => acc + curr.value, 0) / temperatures.length;
        res.status(200).json({ avgTemperature });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getNumberOfWaterings = async (req: Request, res: Response) => {
    try {
        const count = await Watering.countDocuments();

        res.status(200).json({ count });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getHistory = async (req: Request, res: Response) => {
    try {
        const history = await History.find();
        res.status(200).json({ history });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}