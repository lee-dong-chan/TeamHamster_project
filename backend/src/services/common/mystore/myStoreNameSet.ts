import { Request, Response } from "express";
import { Store } from "../../../models";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;
    const nowstoreid = req.query.id;

    if (reqbody.user.id != nowstoreid) {
      throw Error("not match user");
    }

    const storeupdate = await Store.update(
      {
        nick: reqbody.name,
      },
      { where: { id: nowstoreid } }
    );

    res.json({ result: "ok" });
  } catch (err: any) {
    console.error(err);
    if (err.message == "not match user") {
      res.status(400).json({ result: "not match user" });
    } else {
      res.status(500).json({ result: "fail" });
    }
  }
};
