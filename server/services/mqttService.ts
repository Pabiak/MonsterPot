import mqttClient from '../utils/mqttClient';
import Watering from '../models/Watering';
import HISTORY_TYPE from '../types/HistoryType';
import History from '../models/History';

export const mqttRequest = (publishTopic: string, responseTopic: string, timeoutMs = 5000) => {
    return new Promise((resolve, reject) => {
        const onMessage = (topic: string, message: Buffer) => {
            if (topic === responseTopic) {
                try {
                    const data = JSON.parse(message.toString());
                    clearTimeout(timeout);
                    mqttClient.removeListener('message', onMessage);
                    resolve(data);
                } catch (err) {
                    reject('Error parsing sensor data');
                }
            }
        };
        
        mqttClient.on('message', onMessage);

        mqttClient.publish(publishTopic, 'get', (err) => {
            if (err) {
                clearTimeout(timeout);
                mqttClient.removeListener('message', onMessage);
                reject('Error sending MQTT message');
            }
        });

        const timeout = setTimeout(() => {
            mqttClient.removeListener('message', onMessage);
            reject('Timeout: No response from sensors');
        }, timeoutMs);


    });
};

export const listenToMQTTMessages = () => {
    mqttClient.on('message', async (topic: string, message: Buffer) => {
      console.log(`Received message on topic ${topic}: ${message.toString()}`);
  
      try {
        //TODO: Move this to an exported function
        //TODO: add enum
        if (topic === 'monsterpot/watering') {
            const now = new Date();
            await Watering.create({ date: now });
            await History.create({ date: now, type: HISTORY_TYPE.WATERING, message: 'wateringCompleted' });
        }

        if (topic === 'monsterpot/error/temperature') {
            const now = new Date();
            await History.create({ date: now, type: HISTORY_TYPE.ERROR, message: 'highTemperature' });
        }

        if (topic === 'monsterpot/error/water-level') {
            const now = new Date();
            await History.create({ date: now, type: HISTORY_TYPE.ERROR, message: 'lowWaterLevel' });
        }
      } catch (error) {
        console.error('Error handling MQTT message:', error);
      }
    });
  };