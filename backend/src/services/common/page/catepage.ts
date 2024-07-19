import { Request, Response } from "express";
import { Category, Product } from "../../../models";

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
      include: [
        { model: Category, as: "Category", attributes: ["name"], where: { id: req.params.id } },
      ],
    });
    res.json({ product: productlist });
  } catch (err) {
    console.error(err);
    res.json({ result: "fail" });
  }
};
