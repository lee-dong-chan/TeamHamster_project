import { Request, Response } from "express";
import { Address, Category, ExtraAddress, Product } from "../../models";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;

    const waitepickup: Product[] = await Product.findAll({
      where: { delivery: reqbody.user.id, itemState: "픽업중" },
      attributes: ["id", "title", "discription", "img"],
      include: [
        {
          model: ExtraAddress,
          as: "SellAddress",
          attributes: ["detailAddress"],
          include: [{ model: Address, as: "Address", attributes: ["address"] }],
        },
      ],
    });

    res.json({ product: waitepickup });
  } catch (err) {
    console.error(err);
    res.json({ result: "fail" });
  }
};
