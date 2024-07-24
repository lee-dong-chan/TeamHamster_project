import { Request, Response } from "express";
import dotenv from "dotenv";
import crypto from "crypto";
import { Name, Store, User, sequelize } from "../../../models";
import { Transaction } from "sequelize";

export default async (req: Request, res: Response) => {
  const transaction: Transaction = await sequelize.transaction();
  try {
    dotenv.config();
    const reqbody = req.body;

    const name: Name | null = await Name.findOne({
      where: { name: reqbody.name },
    });

    const nickcheck: Store | null = await Store.findOne({
      where: { nick: reqbody.nick },
    });

    if (nickcheck) {
      throw Error("duplication nick");
    }

    const key = crypto.scryptSync(
      "hgaomasttmexrj",
      `${process.env.KEY || ""}`,
      32
    );
    const iv = process.env.IV || "";
    const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

    const encryptionemail: string = cipher.update(
      `${reqbody.email}`,
      "utf-8",
      "hex"
    );

    const emailcheck: User | null = await User.findOne({
      where: { email: encryptionemail },
    });
    if (emailcheck) {
      throw Error("duplication email");
    }

    const encryptionpw = crypto
      .createHash("sha512")
      .update(`${reqbody.pw + process.env.SALT}`)
      .digest("hex");

    const nowmobile = reqbody.mobile.replaceAll("-", "");

    const regist = await User.create(
      {
        email: encryptionemail,
        password: encryptionpw,
        mobile: nowmobile,
      },
      { transaction }
    );

    const store = await Store.create(
      {
        nick: reqbody.nick,
        mobile: nowmobile,
      },
      { transaction }
    );

    if (name) {
      await transaction.commit();
      await name.addUser(regist);
    } else {
      const newname = await Name.create({
        name: reqbody.name,
      });
      await transaction.commit();
      await newname.addUser(regist);
    }

    await regist.setStore(store);

    res.json({ result: "ok" });
  } catch (err: any) {
    console.error(err);
    await transaction.rollback();
    if (err.message == "duplication nick") {
      res.status(400).json({ result: "duplication nick" });
    } else if (err.message == "duplication email") {
      res.status(400).json({ result: "duplication email" });
    } else {
      res.status(500).json({ result: "fail" });
    }
  }
};
