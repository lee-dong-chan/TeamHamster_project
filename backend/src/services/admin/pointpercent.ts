import { Request, Response } from "express";
import { Store } from "../../models";
import { point } from "../../models/mongoDB";

export default async (req: Request, res: Response) => {
  try {
    const pointpercent = await point.findOne({}, { pointPercent: 1, _id: 0 }).sort({ _id: -1 });

    res.json({ point: pointpercent });
  } catch (err) {
    console.error(err);
    res.json({ result: "fail" });
  }
};
