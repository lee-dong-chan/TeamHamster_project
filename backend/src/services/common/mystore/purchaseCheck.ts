import { Request, Response } from "express";
import { Category, DeliveryCost, Product } from "../../../models";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;
    const nowproid: string = req.params.id;
    if (!nowproid) {
      throw Error("err");
    }
    const product: Product | null = await Product.findOne({
      where: { id: nowproid, itemState: "배송 완료" },
      attributes: ["id"],
    });
    if (!product) {
      throw Error("not find");
    }
    await product?.update({ itemState: "구매 확정" });

    res.json({ result: "ok" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: "fail" });
  }
};
