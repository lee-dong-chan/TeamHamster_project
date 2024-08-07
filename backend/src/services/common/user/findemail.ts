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

    const usercheck: User | null = await User.findOne({
      where: { mobile: reqbody.mobile, Oauth: "햄스터" },
      attributes: ["email", "nameId"],
    });

    if (!usercheck) {
      throw Error("not find email");
    }

    console.log(usercheck);

    const namecheck: Name | null = await Name.findOne({
      where: { id: usercheck.nameId, name: reqbody.name },
    });

    if (!namecheck) {
      throw Error("not find email");
    }

    const decipher: crypto.DecipherGCM = crypto.createDecipheriv("aes-256-gcm", key, iv);
    let findemail: string = decipher.update(usercheck.email, "hex", "utf-8");

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
