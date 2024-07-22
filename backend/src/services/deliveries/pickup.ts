import { Request, Response } from "express";
import { Address, Category, ExtraAddress, Product } from "../../models";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;

    const product: Product[] = await Product.findAll({
      where: { itemState: "픽업 대기" },
      attributes: ["id", "title", "discription", "img"],
      include: [
        {
          model: ExtraAddress,
          as: "SellAddress",
          attributes: ["detailAddress"],
          include: [{ model: Address, as: "Address", attributes: ["address"] }],
        },
        {
          model: Category,
          as: "Category",
          attributes: ["name"],
        },
      ],
    });

    for (let i = 0; i < product.length; i++) {
      const splimg = product[i].img.split(",");
      product[i].dataValues.image = splimg;
    }

    res.json({ login: reqbody.user, product: product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: "fail" });
  }
};
