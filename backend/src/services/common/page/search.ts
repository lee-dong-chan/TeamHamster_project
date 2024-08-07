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
      where: { title: { [Op.like]: `%${reqbody.keyword}%` } },
      include: [{ model: Category, as: "Category", attributes: ["name"] }],
      offset: reqbody.idx,
      limit: 6,
    });

    for (let i = 0; i < productlist.length; i++) {
      if (productlist[i].img) {
        const splimg: string[] = productlist[i].img.split(",");
        productlist[i].dataValues.image = splimg;
      }
    }

    res.json({ product: productlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: "fail" });
  }
};
