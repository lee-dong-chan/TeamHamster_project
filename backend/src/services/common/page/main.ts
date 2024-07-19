import { Request, Response } from "express";
import { Category, Product } from "../../../models";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;
    const productlist: Product[] = await Product.findAll({
      where: { itemState: "판매중" },
      attributes: ["id", "title", "discription", "price", "createdAt", "img"],
      include: [{ model: Category, as: "Category", attributes: ["name"] }],
      raw: true,
    });

    res.json({ product: productlist });
  } catch (err) {
    console.error(err);
    res.json({ result: "fail" });
  }
};
