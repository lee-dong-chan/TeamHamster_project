import express, { Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import multer from "multer";
import mysql2 from "mysql2";
import session from "express-session";
import sessionFileStore from "session-file-store";
const FileStore = sessionFileStore(session);

import router from "./controllers";
import { sequelize } from "./models";

dotenv.config();

const app: Express = express();

app.set("port", process.env.PORT || 3000);
app.set("url", process.env.MONGURL || "mongodb://localhost:27017");
sequelize.sync({ force: true });

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use("/api/imgs", express.static("../uploads"));

app.use("/api", router);

mongoose.connect(app.get("url"));
mongoose.connection.on("connected", () => {
  console.log("mongoose connection");
});
mongoose.connection.dropCollection("deliveries");

app.listen(app.get("port"), (): void => {
  console.log(app.get("port"), "port server open");
});
