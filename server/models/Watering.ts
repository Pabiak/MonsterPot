import mongoose from 'mongoose';

const WateringSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
}, { timestamps: false, versionKey: false });

const Watering = mongoose.model('Watering', WateringSchema);

export default Watering;
