import { Request, Response } from "express";
import { Address, ExtraAddress, Product } from "../../models";
import { delivery } from "../../models/mongoDB";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;

    const deliveryfind: any = await delivery
      .find({ userId: reqbody.user.id })
      .distinct("productId");

    const waitepickup: Product[] = await Product.findAll({
      where: { id: deliveryfind, itemState: "픽업 중" },
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

    res.json({ product: waitepickup });
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: "fail" });
  }
};
