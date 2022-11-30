import mongoose from "mongoose";

export interface AbsenRPL extends mongoose.Document {
   nama: string,
   kelas: string,
   status: string,
   alasan: string,
   time: Date,
}

export const model = mongoose.model<AbsenRPL>("AbsenRPL", new mongoose.Schema({
  nama: {
    type: String,
    required: false,
  },
  kelas: {
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
