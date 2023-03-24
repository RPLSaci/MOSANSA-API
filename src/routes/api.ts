import * as Express from "express";
const router = Express.Router();
import fetch from "node-fetch";
import {model} from "../db/model/dokumentasi.js";
import {model as userModel} from "../db/model/user.js";
import "dotenv/config";
const api_key = process.env.API_KEY;
router.post("/newUser", async function(req:Express.Request, res:Express.Response) {
  try {
    const {nama, password, tipe, token} = req.body;

    if (token !== process.env.TOKENSUPERADMIN) {
      throw Error("Unauthorized Access Token");
    }

    const newUser = new userModel({
      nama,
      password,
      tipe,
    });
    await newUser.save();
    res.status(200).json({message: "Success"});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "An error occurred"});
  }
});

router.delete("/remFolder", checkAuth, async function(req:Express.Request, res:Express.Response) {
  try {
    const {idAcara} = req.body;
    const deletedUser = await model.findOneAndDelete({idAcara: idAcara});
    if (!deletedUser) {
      throw new Error("ID tidak ditemukan");
    } else {
      res.json({status: 200, message: `${deletedUser.idAcara} telah dihapus`});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "An error occurred"});
  }
});

router.get("/allFolders", async function(req:Express.Request, res:Express.Response) {
  try {
    const data = await model.find();
    res.status(200).json({status: 200, message: data});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "An error occurred"});
  }
});

router.post("/login", async function(req:Express.Request, res:Express.Response) {
  const {username, password} = req.body;
  try {
    if (!username || !password) {
      throw Error("Username or Password is empty");
    }

    const user = await userModel.findOne({username});

    if (!user || user.password !== password) {
      throw new Error("Invalid username or password");
    }
    res.json({status: 200, message: "Success"});
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "An error occurred"});
  }
});

router.post("/getFiles", async function(req:Express.Request, res:Express.Response) {
  try {
    console.log(req.body);
    let {folderId} = req.body;

    const folderOnModel = await model.findOne({idAcara: folderId});
    if (folderOnModel) {
      folderId = folderOnModel.url;
      folderId = getDriveIdFromUrl(folderId);
    }

    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${api_key}`;
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "An error occurred"});
  }
});

router.post("/addFolder", checkAuth, async function(req:Express.Request, res:Express.Response) {
  try {
    const {url, namaAcara, deskripsiAcara, user, idAcara, tanggal} = req.body;

    // if id acara is already exist on model
    const isExist = await model.findOne({idAcara});
    if (isExist) {
      throw Error("Id Acara already exist");
    }
    const newTanggal = new Date(tanggal);
    const newDoc = new model({
      url,
      namaAcara,
      deskripsiAcara,
      user,
      tanggal: newTanggal,
      idAcara,
    });
    await newDoc.save();
    res.status(200).json({status: 200, message: "Success"});
  } catch (error) {
    console.error(error);
    res.status(500).json({status: 501, error: "An error occurred "+(error as Error).message});
  }
});


async function checkAuth(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
  const {username, password} = req.body;
  try {
    if (!username || !password) {
      throw Error("Username or Password is empty");
    }

    const user = await userModel.findOne({username});

    if (!user || user.password !== password) {
      throw new Error("Invalid username or password");
    }

    next();
  } catch (err) {
    res.json({status: 400, message: (err as Error).message});
  }
}


export default router;


function getDriveIdFromUrl(url:string) {
  // Extract the file ID from the URL
  const match = url.match(/\/([a-zA-Z0-9_-]{25,})/);
  if (match) {
    return match[1];
  } else {
    return null;
  }
}
