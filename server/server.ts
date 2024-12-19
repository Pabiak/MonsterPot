import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import mqttClientInstance from './utils/mqttClient';

import sensorsRoutes from './routes/sensors';
import { listenToMQTTMessages } from './services/mqttService';

//* Configurations
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

//* test route
app.get('/', (req, res) => {
    res.send('Hello MonsterPot');
});

//* ROUTES
app.use('/sensors', sensorsRoutes);

//* MONGOOSE SETUP
const PORT = process.env.PORT || 6061;
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
    })
    .catch((error) => console.log(error.message));

//* MQTT
mqttClientInstance.subscribe('monsterpot/#', (err) => {
    if (!err) {
        console.log('MQTT is listening to all topics under "monsterpot"');
    }
});

listenToMQTTMessages();