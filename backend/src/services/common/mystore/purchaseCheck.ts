import { Request, Response } from "express";
import { PointHistory, Product, Store } from "../../../models";

export default async (req: Request, res: Response) => {
  try {
    const nowproid: string = req.params.id;
    if (!nowproid) {
      throw Error("err");
    }
    const product: Product | null = await Product.findOne({
      where: { id: nowproid, itemState: "배송 완료" },
      attributes: ["id", "sellId", "price", "title"],
    });
    if (!product) {
      throw Error("not find");
    }
    await product?.update({ itemState: "구매 확정" });

    const selluser: Store | null = await Store.findOne({
      where: { id: product.sellId },
    });

    const nowhistory: PointHistory = await PointHistory.create({
      point: product.price,
      history: `${product.title} 상품 판매`,
    });
    await selluser?.update({ point: selluser.point + product.price });
    await selluser?.addPointHistory(nowhistory);

    res.json({ result: "ok" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: "fail" });
  }
};
