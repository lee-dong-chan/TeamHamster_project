import { Request, Response } from "express";
import { Store } from "../../models";
import { point } from "../../models/mongoDB";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;

    if (reqbody.point >= 100 || reqbody.point < 0) {
      throw Error("point precent");
    }

    await point.create({ userId: reqbody.user.id, pointPercent: reqbody.point });

    res.json({ result: "ok" });
  } catch (err) {
    console.error(err);
    res.json({ result: "fail" });
  }
};
