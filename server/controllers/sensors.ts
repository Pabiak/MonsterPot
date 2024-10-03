import { Request, Response } from 'express';
import Humidity from '../models/Humidity';
import Temperature from '../models/Temperature';
import Light from '../models/Light';
import Watering from '../models/Watering';

export const getSensors = async (req: Request, res: Response) => {
    try {
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
        const waterings: string = '5';

        res.status(200).json({ waterings });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const loadSampleData = async (req, res) => {
    try {
        const sampleData = [
            { value: 50, time: '10:00 AM', date: '2022-01-01' },
            { value: 60, time: '11:00 AM', date: '2022-01-01' },
            { value: 70, time: '12:00 PM', date: '2022-01-01' },
            { value: 80, time: '01:00 PM', date: '2022-01-01' },
            { value: 90, time: '02:00 PM', date: '2022-01-01' },
            { value: 100, time: '03:00 PM', date: '2022-01-01' }
        ];

        const parseDate = (date) => {
            return new Date(date);
        };

        const humidityData = sampleData.map(entry => ({
            value: entry.value,
            time: entry.time,
            date: parseDate(entry.date)
        }));

        const lightData = sampleData.map(entry => ({
            value: entry.value,
            time: entry.time,
            date: parseDate(entry.date)
        }));

        const temperatureData = sampleData.map(entry => ({
            value: entry.value,
            time: entry.time,
            date: parseDate(entry.date)
        }));

        // Zapis w bazie danych
        await Humidity.insertMany(humidityData);
        await Temperature.insertMany(temperatureData);
        await Light.insertMany(lightData);

        res.status(200).json({ humidity: humidityData, temperature: temperatureData, light: lightData });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loadSampleWAtering = async (req: Request, res: Response) => {
    try {
        const sampleData = [
            { date: '2022-01-01' },
            { date: '2022-01-02' },
            { date: '2022-01-03' },
            { date: '2022-01-04' },
            { date: '2022-01-05' },
            { date: '2022-01-06' }
        ];

        const parseDate = (date) => {
            return new Date(date);
        };

        const wateringData = sampleData.map(entry => ({
            date: parseDate(entry.date)
        }));

        // Zapis w bazie danych
        await Watering.insertMany(wateringData);

        res.status(200).json({ watering: wateringData });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};