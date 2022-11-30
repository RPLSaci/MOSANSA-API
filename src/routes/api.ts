import * as Express from "express";
const router = Express.Router();
import {model} from "../db/model/absen.js";

router.post("/absen", async function(req:Express.Request, res:Express.Response) {
  try {
    console.log(req.params);
    const {nama, kelas, status, alasan} = req.params;
    const absenModel = new model({nama, kelas, status, alasan, time: Date.now()});
    await absenModel.save();
    res.json({status: 300, message: `Success ${nama}, ${kelas}`});
  } catch (err) {
    res.json({status: 401, message: (err as Error).message});
  }
});

export default router;
