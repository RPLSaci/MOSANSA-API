import { connect } from "../db/Mongo.js";
export class Client {
    constructor(uri) {
        this.MongoUrl = uri;
    }
    async start() {
        if (this.MongoUrl) {
            await connect(this.MongoUrl);
            return;
        }
        console.log("No URI");
    }
}
