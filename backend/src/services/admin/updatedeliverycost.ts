import { Request, Response } from "express";
import { DeliveryCost, Store } from "../../models";
import { point } from "../../models/mongoDB";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;

    await DeliveryCost.create({
      cost: reqbody.cost,
    });

    res.json({ result: "ok" });
  } catch (err) {
    console.error(err);
    res.json({ result: "fail" });
  }
};
