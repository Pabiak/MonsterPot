import mongoose from 'mongoose';

const HistorySchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        message: {
            type: String,
        },
    },
    { timestamps: true }
);

HistorySchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
    },
});

const History = mongoose.model('History', HistorySchema);

export default History;
