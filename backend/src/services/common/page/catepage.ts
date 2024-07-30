import { Request, Response } from "express";
import { Category, Product, sequelize } from "../../../models";

export default async (req: Request, res: Response) => {
  try {
    console.log(req.body.idx, "인덱스");
    const cateid: number[] = [];

    const firstcate = await Category.findAll({
      attributes: ["id"],
      where: { preCateId: req.params.id },
    });

    for (let i = 0; i < firstcate.length; i++) {
      cateid.push(firstcate[i].id);
    }

    const secondcate = await Category.findAll({
      attributes: ["id"],
      where: { preCateId: [...cateid] },
    });

    for (let i = 0; i < secondcate.length; i++) {
      cateid.push(secondcate[i].id);
    }

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
        {
          model: Category,
          as: "Category",
          attributes: ["name"],
          where: { id: [req.params.id, ...cateid] },
        },
      ],
      offset: req.body.idx,
      limit: 6,
    });

    for (let i = 0; i < productlist.length; i++) {
      if (productlist[i].img) {
        const splimg = productlist[i].img.split(",");
        productlist[i].dataValues.image = splimg;
      }

      const nowcate = await Category.findOne({
        attributes: ["name"],
        where: { id: req.params.id },
      });

      res.json({ product: productlist, nowcate: nowcate });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: "fail" });
  }
};
