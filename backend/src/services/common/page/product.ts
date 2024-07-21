import { Request, Response } from "express";
import { Category, DeliveryCost, Product, Review, Store, sequelize } from "../../../models";

import review from "../review";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;
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
    // console.log(productlist.Sell, "asdasdas");

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
  } catch (err) {
    console.error(err);
    res.json({ result: "fail" });
  }
};
