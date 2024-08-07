import { Request, Response } from "express";
import { User } from "../../../models";
import dotenv from "dotenv";
import crypto from "crypto";

export default async (req: Request, res: Response) => {
  try {
    dotenv.config();

    const reqbody = req.body;

    const encryptionpw: string = crypto
      .createHash("sha512")
      .update(`${reqbody.pw + process.env.SALT}`)
      .digest("hex");

    await User.update({ password: encryptionpw }, { where: { id: req.session.finduser } });

    res.json({ result: "ok" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: "fail" });
  }
};
