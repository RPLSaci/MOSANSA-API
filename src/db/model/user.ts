import mongoose from "mongoose";

export interface UserAdmin extends mongoose.Document {
  nama: string;
  password: string;
  tipe: string;
}

export const model = mongoose.model<UserAdmin>("UserAdmin", new mongoose.Schema({
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

