import mongoose from "mongoose";
import config from "@/config";

let connectionCounter = 0;

export default function connectDatabase(callback) {
  mongoose
    .connect(`${config.MONGO_URI}`)
    .then(() => {
      console.log("\x1b[34mDatabase Connection Successful");
      return callback(true);
    })
    .catch((error) => {
      console.error(error);
      connectionCounter++;
      if (connectionCounter === 10) {
        process.exit(-1);
      } else {
        setTimeout(() => {
          connectDatabase(callback);
        }, 10000);
      }
    });
}
