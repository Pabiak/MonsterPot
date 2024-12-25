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
}, { timestamps: true });

HumiditySchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
    },
});
const Humidity = mongoose.model('Humidity', HumiditySchema);

export default Humidity;
