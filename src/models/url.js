import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const urlSchema = new Schema({
    urlId: {
        type: String,
        required: true
    },
    origUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true
    },
    clicks: {
        type: Number,
        default: 0,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Url = mongoose.model('Url', urlSchema);

export { Url };