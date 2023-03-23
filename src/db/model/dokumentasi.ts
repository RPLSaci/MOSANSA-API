import mongoose from "mongoose";

export interface Docs extends mongoose.Document {
   url: string,
   namaAcara: string,
   deskripsiAcara: string,
   tanggal: Date,
   user: string,
   idAcara: string,
}

export const model = mongoose.model<Docs>("Docs", new mongoose.Schema({
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
