import mongoose from 'mongoose';

const TemperatureSchema = new mongoose.Schema({
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

const Temperature = mongoose.model('Temperature', TemperatureSchema);

export default Temperature;
