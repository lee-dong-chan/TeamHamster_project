import { Request, Response } from "express";
import { Address, Category, ExtraAddress, Product } from "../../models";

export default async (req: Request, res: Response) => {
  try {
    const product: Product[] = await Product.findAll({
      where: { itemState: "픽업 대기" },
      attributes: ["id", "itemState"],
      include: [
        {
          model: ExtraAddress,
          as: "SellAddress",
          attributes: ["detailAddress"],
          include: [{ model: Address, as: "Address", attributes: ["address"] }],
        },
      ],
    });
    res.json({ product: product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: "fail" });
  }
};
