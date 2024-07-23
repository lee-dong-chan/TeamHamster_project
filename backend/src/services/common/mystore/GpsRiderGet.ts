import { Request, Response } from "express";
import { delivery } from "../../../models/mongoDB";

export default async (req: Request, res: Response) => {
  try {
    const selectproduct: string = req.params.id;
    let deliveryspot = await delivery
      .findOne({ productId: selectproduct }, { spotX: 1, spotY: 1, _id: 0 })
      .sort({ _id: -1 });
    res.json({ deliveryspot: deliveryspot });
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: "fail" });
  }
};
