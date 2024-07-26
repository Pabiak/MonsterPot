import { Request, Response } from 'express';

export const getSensors = async (req: Request, res: Response) => {
    try {
        // tutaj będzie klient MQTT, aby pobrać dane z czujników
        // przykładowe wartości
        const humidity: string = '50';
        const temperature: string = '25';
        const light: string = '100';

        res.status(200).json({ humidity, temperature, light });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
