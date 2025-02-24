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
}, { timestamps: false, versionKey: false });

const Temperature = mongoose.model('Temperature', TemperatureSchema);

export default Temperature;
