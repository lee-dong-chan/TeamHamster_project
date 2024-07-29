import { Request, Response } from "express";
import { Category, Product } from "../../../models";
import { JSON, Op } from "sequelize";
import { formToJSON } from "axios";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;
    console.log(req.body);
    const productlist: Product[] = await Product.findAll({
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
      where: { title: { [Op.like]: `%${reqbody.keyword}%` } },
      include: [{ model: Category, as: "Category", attributes: ["name"] }],
      offset: reqbody.idx,
      limit: 6,
    });

    for (let i = 0; i < productlist.length; i++) {
      if (productlist[i].img) {
        const splimg = productlist[i].img.split(",");
        productlist[i].dataValues.image = splimg;
      }
    }

    console.log(productlist);
    res.json({ product: productlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: "fail" });
  }
};
