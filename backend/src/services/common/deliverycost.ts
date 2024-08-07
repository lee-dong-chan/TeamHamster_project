import { Request, Response } from "express";
import { DeliveryCost } from "../../models";

export default async (_req: Request, res: Response) => {
  try {
    const deliverycost: DeliveryCost | null = await DeliveryCost.findOne({
      order: [["id", "DESC"]],
      attributes: ["cost"],
    });
    res.json({ cost: deliverycost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: "fail" });
  }
};
