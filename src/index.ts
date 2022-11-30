import "dotenv/config";
import {Client} from "./util/Client.js";
import {start} from "./util/website.js";
const client = new Client(process.env.URI!);
const port = process.env.Port || 8080;
client.start().then(()=>{
  console.log("Connected To MongoDB");
  start(port);
});
// const models = new model(options);
// await models.save();
