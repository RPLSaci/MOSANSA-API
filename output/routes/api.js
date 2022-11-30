import * as Express from "express";
const router = Express.Router();
import { model } from "../db/model/absen.js";
router.post("/absen", async function (req, res) {
    try {
        console.log(req.query);
        const { nama, kelas, status, alasan } = req.query;
        const absenModel = new model({ nama, kelas, status, alasan, time: Date.now() });
        await absenModel.save();
        res.json({ status: 200, message: `Success ${nama}, ${kelas}` });
    }
    catch (err) {
        res.json({ status: 401, message: err.message });
    }
});
router.get("/showabsen", async function (req, res) {
    try {
        const manusia = await model.find();
        console.log(manusia);
        res.json({ status: 200, message: JSON.stringify(manusia) });
    }
    catch (err) {
        res.json({ status: 401, message: err.message });
    }
});
export default router;
