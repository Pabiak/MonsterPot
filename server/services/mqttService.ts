import mqttClient from '../utils/mqttClient';

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
