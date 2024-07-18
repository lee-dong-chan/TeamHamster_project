import { Request, Response } from "express";
import { Category, DeliveryCost, Product, Review, Store, sequelize } from "../../../models";

import review from "../review";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;
    let productlist: any = await Product.findOne({
      attributes: [
        "id",
        "title",
        "discription",
        "price",
        "createdAt",
        "itemState",
        "prepayment",
        "img",
        "categoryId",
      ],
      where: { id: req.params.id },
      include: [
        { model: Category, as: "Category", attributes: ["name"] },
        { model: DeliveryCost, as: "DeliveryCost", attributes: ["cost"] },
        {
          model: Store,
          as: "Sell",
          attributes: ["id", "nick"],
        },
      ],
    });
    const star: Store | undefined = await review(productlist.Sell.id);
    productlist.dataValues.Sell.dataValues.star = star;
    res.json({ login: reqbody.user, product: productlist });
  } catch (err) {
    console.error(err);
    res.json({ result: "fail" });
  }
};
