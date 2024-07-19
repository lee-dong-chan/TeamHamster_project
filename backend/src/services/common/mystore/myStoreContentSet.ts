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
        introduction: reqbody.content,
      },
      { where: { id: nowstoreid } }
    );

    res.json({ result: "ok" });
  } catch (err) {
    console.error(err);
    res.json({ result: "fail" });
  }
};
