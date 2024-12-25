import mongoose from 'mongoose';

const WateringSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
}, { timestamps: true });

WateringSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
    },
});

const Watering = mongoose.model('Watering', WateringSchema);

export default Watering;
