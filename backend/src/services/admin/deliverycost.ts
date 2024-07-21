import { Request, Response } from "express";
import { DeliveryCost, Store } from "../../models";
import { point } from "../../models/mongoDB";

export default async (req: Request, res: Response) => {
  try {
    const deliverycost: DeliveryCost | null = await DeliveryCost.findOne({
      order: [["id", "DESC"]],
      attributes: ["cost"],
    });
    res.json({ cost: deliverycost });
  } catch (err) {
    console.error(err);
    res.json({ result: "fail" });
  }
};
