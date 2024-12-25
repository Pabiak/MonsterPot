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

LightSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
    },
});

const Light = mongoose.model('Light', LightSchema);

export default Light;
