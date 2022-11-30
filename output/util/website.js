// modules importing
import express from "express";
import apiRouter from "../routes/api.js";
// import bodyParser from "body-parser";
const app = express();
// router and view
app.use("/api/", apiRouter);
// redirect all http request to https
// app.use((req:express.Request, res:express.Response, next:()=> void) => req.secure ? next() : res.redirect(`https://${req.hostname}${req.url}`));
export async function start(port) {
    console.log("==========");
    app.listen(port, () => console.log(`Server started on port ${port}`));
    console.log("==========");
}
