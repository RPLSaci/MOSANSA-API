import mongoose from "mongoose";
export const model = mongoose.model("AbsenRPL", new mongoose.Schema({
    nama: {
        type: String,
        required: false,
    },
    kelas: {
        type: String,
        required: true,
    },
    kelasStr: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    alasan: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        default: Date.now(),
        required: false,
    },
}));
