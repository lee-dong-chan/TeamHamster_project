import { Request, Response } from "express";
import { DeliveryCost } from "../../models";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;

    await DeliveryCost.create({
      cost: reqbody.cost,
    });

    res.json({ result: "ok" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: "fail" });
  }
};
