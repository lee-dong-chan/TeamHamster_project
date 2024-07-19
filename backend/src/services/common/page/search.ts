import { Request, Response } from "express";
import { Category, Product } from "../../../models";
import { Op } from "sequelize";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;
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
      where: { title: { [Op.like]: `%${req.params.keyword}%` } },
      include: [{ model: Category, as: "Category", attributes: ["name"] }],
    });
    res.json({ product: productlist });
  } catch (err) {
    console.error(err);
    res.json({ result: "fail" });
  }
};
