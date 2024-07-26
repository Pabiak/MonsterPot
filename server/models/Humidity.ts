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
    time: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Humidity = mongoose.model('Humidity', HumiditySchema);

export default Humidity;
