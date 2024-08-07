import { Request, Response } from "express";
import dotenv from "dotenv";
import crypto from "crypto";
import { Name, User } from "../../../models";

export default async (req: Request, res: Response) => {
  try {
    dotenv.config();

    const reqbody = req.body;

    const key: Buffer = crypto.scryptSync("hgaomasttmexrj", `${process.env.KEY || ""}`, 32);
    const iv: Buffer = Buffer.from(`${process.env.IV}`, "base64");
    const cipher: crypto.CipherGCM = crypto.createCipheriv("aes-256-gcm", key, iv);

    let encryptionemail: string = cipher.update(`${reqbody.email}`, "utf-8", "hex");

    const usercheck: User | null = await User.findOne({
      where: { email: encryptionemail, mobile: reqbody.mobile, Oauth: "햄스터" },
      attributes: ["id", "email", "nameId"],
    });

    if (!usercheck) {
      throw Error("not find user");
    }

    const namecheck: Name | null = await Name.findOne({
      where: { id: usercheck.nameId, name: reqbody.name },
    });

    if (!namecheck) {
      throw Error("not find user");
    }

    req.session.finduser = usercheck.id;

    console.log(req.session.finduser);

    res.json({ result: "ok" });
  } catch (err: any) {
    console.error(err);
    if (err.message == "not find user") {
      res.status(400).json({ result: "not find user" });
    } else {
      res.status(500).json({ result: "fail" });
    }
  }
};
