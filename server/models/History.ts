import mongoose from 'mongoose';

const HistorySchema = new mongoose.Schema({
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
}, { timestamps: true });

const History = mongoose.model('History', HistorySchema);

export default History;
