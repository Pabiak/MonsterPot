import mqtt from 'mqtt';
import dotenv from 'dotenv';

dotenv.config();

const options = {
    host: process.env.HOST,
    port: process.env.PORT,
    protocol: process.env.PROTOCOL,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    reconnectPeriod: Number(process.env.RECONNECT_PERIOD)
};

const brokerUrl = `${options.protocol}://${options.host}:${options.port}`;

const mqttClientInstance = mqtt.connect(brokerUrl, {
    username: options.username,
    password: options.password,
    reconnectPeriod: options.reconnectPeriod
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

export default mqttClientInstance;
