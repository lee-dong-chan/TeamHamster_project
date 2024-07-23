import { Request, Response } from "express";
import { Product } from "../../models";
import { delivery } from "../../models/mongoDB";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;

    const waitepickup: Product[] | null = await Product.findAll({
      where: { id: reqbody.id, itemState: "픽업 대기" },
    });
    if (waitepickup.length == 0) {
      throw Error("other pickup");
    }
    for (let i = 0; i < waitepickup.length; i++) {
      waitepickup[i].update({ itemState: "픽업 중" });
      delivery.create({ userId: reqbody.user.id, productId: waitepickup[i].id });
    }

    res.json({ result: "ok" });
  } catch (err: any) {
    console.error(err);
    if (err.message == "other pickup") {
      res.status(400).json({ result: "other pickup" });
    } else {
      res.status(500).json({ result: "fail" });
    }
  }
};
