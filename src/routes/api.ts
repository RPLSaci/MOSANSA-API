import * as Express from "express";
const router = Express.Router();
import {model} from "../db/model/absen.js";

router.post("/absen", async function(req:Express.Request, res:Express.Response) {
  try {
    console.log(req.query);
    const {nama, kelas, status, alasan} = req.query;
    const absenModel = new model({nama, kelas, status, alasan, time: Date.now()});
    await absenModel.save();
    res.json({status: 200, message: `Success ${nama}, ${kelas}`});
  } catch (err) {
    res.json({status: 401, message: (err as Error).message});
  }
});

router.get("/showabsen", async function(req:Express.Request, res:Express.Response) {
  try {
    const manusia = await model.find();
    console.log(manusia);
    res.json({status: 200, message: JSON.stringify(manusia)});
  } catch (err) {
    res.json({status: 401, message: (err as Error).message});
  }
});

export default router;
