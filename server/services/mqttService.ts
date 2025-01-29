import mqttClient from '../utils/mqttClient';
import { sendEmail } from '../utils/mailHandler';

import Watering from '../models/Watering';
import History from '../models/History';
import Humidity from '../models/Humidity';
import Temperature from '../models/Temperature';
import Light from '../models/Light';

import HISTORY_TYPE from '../types/HistoryType';
import MQTT_TOPICS from '../types/enums/MqttTopics';
import ALERTS from '../types/enums/Alerts';

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
        if (topic === MQTT_TOPICS.WATERING) {
            const now = new Date();
            await Watering.create({ date: now });
            await History.create({ date: now, type: HISTORY_TYPE.WATERING, message: 'wateringCompleted' });
        }

        if (topic === MQTT_TOPICS.ERROR_TEMPERATURE) {
            const now = new Date();
            await History.create({ date: now, type: HISTORY_TYPE.ERROR, message: 'highTemperature' });
            await sendEmail(ALERTS.TEMPERATURE);
        }

        if (topic === MQTT_TOPICS.ERROR_WATER_LEVEL) {
            const now = new Date();
            await History.create({ date: now, type: HISTORY_TYPE.ERROR, message: 'lowWaterLevel' });
            await sendEmail(ALERTS.LOW_WATER_LEVEL);
        }

        if (topic === MQTT_TOPICS.SENSORS) {
            const data = JSON.parse(message.toString());
            const now = new Date();
            await Promise.all([
                Humidity.create({ value: data.humidity, date: now }),
                Temperature.create({ value: data.temperature, date: now }),
                Light.create({ value: data.light, date: now }),
            ]);
        }
      } catch (error) {
        console.error('Error handling MQTT message:', error);
      }
    });
  };