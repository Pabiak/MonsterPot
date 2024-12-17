import mqtt from 'mqtt';
import dotenv from 'dotenv';

dotenv.config();

const options = {
    host: process.env.HOST,
    port: process.env.MQTT_PORT,
    protocol: process.env.PROTOCOL,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    reconnectPeriod: Number(process.env.RECONNECT_PERIOD)
};

const brokerUrl = `${options.protocol}://${options.host}:${options.port}`;

const mqttClientInstance = mqtt.connect(brokerUrl, {
    username: options.username,
    password: options.password,
    reconnectPeriod: options.reconnectPeriod,
    clientId: `mqtt_${Math.random().toString(16).slice(3)}`,
});


mqttClientInstance.on("connect", () => {
    console.log('Successfully connected to MQTT');
});

mqttClientInstance.on("error", (error) => {
    console.error(`Failed to connect to MQTT: ${error.message}`);
});

mqttClientInstance.on("close", () => {
    console.log('MQTT connection closed');
});

mqttClientInstance.on('message', (topic, message) => {
    console.log(`Otrzymano wiadomość na ${topic}: ${message.toString()}`);
  });

export default mqttClientInstance;
