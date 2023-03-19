import * as Express from "express";
import * as csv from "fast-csv";
const router = Express.Router();
import { model } from "../db/model/absen.js";
router.post("/absen", async function (req, res) {
    try {
        console.log(req.body);
        const { nama, id } = req.body;
        const absenQR = await model.findOne({ absenId: id });
        if (absenQR) {
            absenQR.absen.push(new Date());
            await absenQR.save();
            res.json({ status: 200, message: `${nama} telah absen` });
        }
        else {
            throw new Error("ID tidak ditemukan");
        }
    }
    catch (err) {
        res.json({ status: 401, message: err.message });
    }
});
router.post("/checkAuthority", async function (req, res) {
    const { token } = req.body;
    try {
        if (token !== process.env.TOKENLOGIN) {
            throw Error("Unauthorized Access Token");
        }
        res.json({ status: 200, message: "Authorized" });
    }
    catch (err) {
        res.json({ status: 400, message: err.message });
    }
});
function checkAuth(req, res, next) {
    const { token } = req.body;
    try {
        if (token !== process.env.TOKENLOGIN) {
            throw Error("Unauthorized Access Token");
        }
        next();
    }
    catch (err) {
        res.json({ status: 400, message: err.message });
    }
}
router.get("/getuser", async function (req, res) {
    try {
        const { id } = req.query;
        const absenQR = await model.findOne({ absenId: id });
        if (!absenQR) {
            throw new Error("ID tidak ditemukan");
        }
        res.json({ status: 200, message: absenQR });
    }
    catch (err) {
        res.json({ status: 401, message: err.message });
    }
});
router.post("/addabsen", checkAuth, async function (req, res) {
    try {
        const { nama, kelas, id } = req.body;
        const absenQR = await model.findOne({ absenId: id });
        if (absenQR) {
            throw new Error("ID sudah ada");
        }
        else {
            const newAbsen = new model({
                nama,
                kelas,
                absenId: id,
            });
            await newAbsen.save();
            res.json({ status: 200, message: `${nama} telah ditambahkan` });
        }
    }
    catch (err) {
        res.json({ status: 401, message: err.message });
    }
});
router.delete("/remuser", checkAuth, async function (req, res) {
    try {
        const { id } = req.body;
        const deletedUser = await model.findOneAndDelete({ absenId: id });
        if (!deletedUser) {
            throw new Error("ID tidak ditemukan");
        }
        else {
            res.json({ status: 200, message: `${deletedUser.nama} telah dihapus` });
        }
    }
    catch (err) {
        res.json({ status: 401, message: err.message });
    }
});
router.get("/showabsen", async function (req, res) {
    try {
        const absenRPLs = await model.find({});
        res.json({ status: 200, message: absenRPLs });
    }
    catch (err) {
        res.json({ status: 401, message: err.message });
    }
});
router.get("/export", async function (req, res) {
    model.find({}).lean().exec((err, absenRPLs) => {
        if (err)
            throw err;
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment; filename=" + "AbsenRPL.csv");
        csv.write(absenRPLs, { headers: true }).pipe(res);
    });
});
export default router;
