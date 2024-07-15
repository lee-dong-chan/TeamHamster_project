import express, { Express } from "express";
import axios from "axios";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongodb from "mongodb";
import mongoose from "mongoose";
import morgan from "morgan";
import multer from "multer";
import mysql2 from "mysql2";
// import sequelize from "sequelize";
import session from "express-session";
import sessionFileStore from "session-file-store";
const FileStore = sessionFileStore(session);

import router from "./controllers";
import { sequelize } from "./models";
import { delivery } from "./models/mongoDB";

delivery.create({ userId: 1 });
mongoose.connection.dropCollection("deliveries");

dotenv.config();

const app: Express = express();

app.set("port", process.env.PORT || 3000);
sequelize.sync({ force: true });

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use("/api/imgs", express.static("../uploads"));

app.use("/api", router);

app.listen(app.get("port"), (): void => {
  console.log(app.get("port"), "port server open");
});
