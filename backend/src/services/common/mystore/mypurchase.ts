import { Request, Response } from "express";
import { Category, DeliveryCost, Product } from "../../../models";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;
    // const nowstoreid: string = req.params.id;
    const nowstoreid = req.query.id;

    const product: {
      rows: Product[];
      count: number;
    } = await Product.findAndCountAll({
      where: { purchaseId: nowstoreid },
      attributes: [
        "id",
        "title",
        "discription",
        "price",
        "createdAt",
        "itemState",
        "prepayment",
        "img",
      ],
      include: [
        { model: DeliveryCost, as: "DeliveryCost", attributes: ["cost"] },
        { model: Category, as: "Category", attributes: ["name"] },
      ],
    });
    // const purchaseCount = product.length;
    // purchaseCount: purchaseCount,
    res.json({ login: reqbody.user, product: product });
  } catch (err) {
    console.error(err);
    res.json({ result: "fail" });
  }
};
