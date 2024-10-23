import mongoose from 'mongoose';

const LightSchema = new mongoose.Schema({
    value: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
}, { timestamps: true });

const Light = mongoose.model('Light', LightSchema);

export default Light;
