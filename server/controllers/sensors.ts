import { Request, Response } from 'express';
import Humidity from '../models/Humidity';
import Temperature from '../models/Temperature';
import Light from '../models/Light';
import Watering from '../models/Watering';

export const getSensors = async (req: Request, res: Response) => {
    try {
        //TODO: sample date, change to fetched data from mqtt broker
        const humidity: string = '50';
        const temperature: string = '25';
        const light: string = '100';

        res.status(200).json({ humidity, temperature, light });
    } catch (error) {
        res.status(404).json({ message: error.message });
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

export const loadSampleData = async (req, res) => {
    try {
        const sampleData = [
            { value: 50 },
            { value: 60 },
            { value: 70 },
            { value: 80 },
            { value: 90 },
            { value: 100 }
        ];

        const humidityData = sampleData.map(entry => {
            const date = new Date();
            date.setHours(Math.floor(Math.random() * (20 - 8 + 1)) + 8);
            return {
            value: entry.value,
            date
            };
        });

        const lightData = sampleData.map(entry => ({
            value: entry.value,
            date: new Date()
        }));

        const temperatureData = sampleData.map(entry => ({
            value: entry.value,
            date: new Date(),
        }));

        await Humidity.insertMany(humidityData);
        await Temperature.insertMany(temperatureData);
        await Light.insertMany(lightData);

        res.status(200).json({ humidity: humidityData, temperature: temperatureData, light: lightData });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loadSampleWatering = async (req: Request, res: Response) => {
    try {

        const wateringData = [];

        for (let i = 0; i < 5; i++) {
            wateringData.push({
                date: new Date()
            });
        }

        await Watering.insertMany(wateringData);

        res.status(200).json({ watering: wateringData });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};