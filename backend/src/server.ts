import express, { Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import crypto from "crypto";

import router from "./controllers";
import { DeliveryCost, Name, Store, User, sequelize } from "./models";
import { point } from "./models/mongoDB";
import basicCate from "./services/common/basicCate";

dotenv.config();
console.log("test1");

const app: Express = express();
app.use(cookieParser(process.env.COOKIE || "test"));

app.set("port", process.env.PORT || 3080);
app.set("url", process.env.MONGURL || "mongodb://localhost:27017");
sequelize.sync({ force: false });

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:8000", "http://localhost:8888"],
    credentials: true,
  })
);
console.log("test2");

app.use("/api/imgs", express.static("uploads"));

app.use("/api", router);

mongoose.connect(app.get("url"), {
  dbName: "hamster",
});
mongoose.connection.on("connected", () => {
  console.log("mongoose connection");
});

console.log("test3");

console.log(process.env.KEY);

console.log(process.env.IV);

const basicvalue = async () => {
  try {
    if (!(await User.findOne())) {
      mongoose.connection.dropCollection("deliveries");
      mongoose.connection.dropCollection("points");
      mongoose.connection.dropCollection("bankeywords");

      DeliveryCost.create({ cost: 3000 });
      point.create({ pointPercent: 1000 });

      const key: Buffer = crypto.scryptSync("hgaomasttmexrj", `${process.env.KEY || ""}`, 32);
      const iv: Buffer = Buffer.from(`${process.env.IV}`, "base64");
      const cipher: crypto.CipherGCM = crypto.createCipheriv("aes-256-gcm", key, iv);

      const encryptionemail: string = cipher.update(`admin1@admin.com`, "utf-8", "hex");

      const encryptionpw: string = crypto
        .createHash("sha512")
        .update(`admin11@${process.env.SALT}`)
        .digest("hex");

      const store: Store = await Store.create({
        nick: "admin1",
        mobile: "",
        report_point: 10,
      });

      await Name.create({
        name: "관리자",
      });

      const newname: Name | null = await Name.findOne({
        where: { name: "관리자" },
      });

      const regist: User = await User.create({
        email: encryptionemail,
        password: encryptionpw,
        superAdmin: true,
        admin: true,
        delivery: true,
      });

      await newname?.addUser(regist);

      await regist.setStore(store);
      basicCate();
    }
  } catch (err) {
    console.error(err);
  }
};

basicvalue();

app.listen(app.get("port"), (): void => {
  console.log(app.get("port"), "port server open");
});
