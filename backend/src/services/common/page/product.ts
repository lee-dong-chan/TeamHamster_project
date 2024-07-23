import { Request, Response } from "express";
import { Category, DeliveryCost, Product, Store } from "../../../models";

import review from "../review";

export default async (req: Request, res: Response) => {
  try {
    let productlist: Product | null = await Product.findOne({
      attributes: [
        "id",
        "title",
        "discription",
        "price",
        "createdAt",
        "itemState",
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

    if (!productlist) {
      throw Error("not product");
    }

    const star: number | undefined = await review(productlist.dataValues.Sell.id);
    productlist.dataValues.Sell.dataValues.star = { star: star };
    if (productlist.img) {
      const splimg = productlist.img.split(",");
      productlist.dataValues.image = splimg;
    }

    res.json({ product: productlist });
  } catch (err: any) {
    console.error(err);
    if (err.message == "not product") {
      res.status(400).json({ result: "not product" });
    } else {
      res.status(500).json({ result: "fail" });
    }
  }
};
