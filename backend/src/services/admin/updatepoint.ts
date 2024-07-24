import { Request, Response } from "express";
import { point } from "../../models/mongoDB";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;
    console.log(reqbody);
    // if (reqbody.point >= 100 || reqbody.point < 0) {
    //   throw Error("point precent");
    // }

    await point.create({
      userId: reqbody.user.id,
      pointPercent: reqbody.point,
    });

    res.json({ result: "ok" });
  } catch (err: any) {
    console.error(err);
    if (err.message == "point precent") {
      res.status(400).json({ result: "spoint precent" });
    } else {
      res.status(500).json({ result: "fail" });
    }
  }
};
