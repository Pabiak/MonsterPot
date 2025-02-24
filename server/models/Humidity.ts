import mongoose from 'mongoose';

const HumiditySchema = new mongoose.Schema({
    value: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
}, { timestamps: false, versionKey: false });

const Humidity = mongoose.model('Humidity', HumiditySchema);

export default Humidity;
