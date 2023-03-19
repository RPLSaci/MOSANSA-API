import mongoose from "mongoose";

export interface AbsenQR extends mongoose.Document {
   nama: string,
   kelas: string,
   absenId: string,
   absen: Array<Date>
}

export const model = mongoose.model<AbsenQR>("AbsenQR", new mongoose.Schema({
  nama: {
    type: String,
    required: false,
  },
  kelas: {
    type: String,
    required: true,
  },
  absenId: {
    type:String,
    require:true,
  },
  absen : {
    type: [Date],
    required: false,
    default: [],
  }

}));
