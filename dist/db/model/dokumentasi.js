import mongoose from "mongoose";
export const model = mongoose.model("Docs", new mongoose.Schema({
    url: {
        type: String,
        require: true,
    },
    idAcara: {
        type: String,
        require: true,
    },
    namaAcara: {
        type: String,
        require: true,
    },
    deskripsiAcara: {
        type: String,
        require: true,
    },
    tanggal: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: String,
        require: true,
    },
}));
