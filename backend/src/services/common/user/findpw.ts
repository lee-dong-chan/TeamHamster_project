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
    const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

    let encryptionemail = cipher.update(`${reqbody.email}`, "utf-8", "hex");

    const usercheck: User | null = await User.findOne({
      where: { email: encryptionemail, mobile: reqbody.mobile, Oauth: "햄스터" },
      attributes: ["id", "email", "nameId"],
    });

    if (!usercheck) {
      throw Error("not find user");
    }

    const namecheck = await Name.findOne({
      where: { id: usercheck.nameId, name: reqbody.name },
    });

    if (!namecheck) {
      throw Error("not find user");
    }

    req.session.finduser = usercheck.id;

    console.log(req.session.finduser);

    res.json({ result: "ok" });
  } catch (err) {
    console.error(err);
    res.json({ result: "fail" });
  }
};
