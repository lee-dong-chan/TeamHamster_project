import { Request, Response } from "express";
import { point } from "../../models/mongoDB";

export default async (_req: Request, res: Response) => {
  try {
    const pointpercent = await point.findOne({}, { pointPercent: 1, _id: 0 }).sort({ _id: -1 });

    res.json({ point: pointpercent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: "fail" });
  }
};
