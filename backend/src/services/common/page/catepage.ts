import { Request, Response } from "express";
import { Category, Product } from "../../../models";

export default async (req: Request, res: Response) => {
  try {
    let productlist: Product[] = await Product.findAll({
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
    for (let i = 0; i < productlist.length; i++) {
      if (productlist[i].img) {
        const splimg = productlist[i].img.split(",");
        productlist[i].dataValues.image = splimg;
      }
    }

    const nowcate = await Category.findOne({
      attributes: ["name"],
      where: { id: req.params.id },
    });

    res.json({ product: productlist, nowcate: nowcate });
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: "fail" });
  }
};
