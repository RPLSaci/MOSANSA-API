import mongoose from "mongoose";
export const model = mongoose.model("UserAdmin", new mongoose.Schema({
    nama: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    tipe: {
        type: String,
        require: true,
    },
}));
