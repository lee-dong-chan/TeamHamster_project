import { Request, Response } from "express";
import dotenv from "dotenv";
import crypto from "crypto";
import { Name, Store, User } from "../../../models";

export default async (req: Request, res: Response) => {
  try {
    dotenv.config();

    const reqbody = req.body;

    const key = crypto.scryptSync("hgaomasttmexrj", `${process.env.KEY || ""}`, 32);
    const iv = process.env.IV || "";
    // const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

    // let encryptionemail = cipher.update(`${reqbody.email}`, "utf-8", "hex");

    const usercheck: User | null = await User.findOne({
      where: { mobile: reqbody.mobile, Oauth: "햄스터" },
      attributes: ["email", "nameId"],
    });

    if (!usercheck) {
      throw Error("not find email");
    }

    console.log(usercheck);

    const namecheck = await Name.findOne({
      where: { id: usercheck.nameId, name: reqbody.name },
    });

    if (!namecheck) {
      throw Error("not find email");
    }

    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
    let findemail = decipher.update(usercheck.email, "hex", "utf-8");

    res.json({ email: findemail });
  } catch (err: any) {
    console.error(err);
    if (err.message == "not find email") {
      res.status(400).json({ result: "not find email" });
    } else {
      res.status(500).json({ result: "fail" });
    }
  }
};
