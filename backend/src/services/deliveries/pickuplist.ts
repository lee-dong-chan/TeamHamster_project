import { Request, Response } from "express";
import { Address, Category, ExtraAddress, Product } from "../../models";
import { delivery } from "../../models/mongoDB";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;
    // const deliveryfind: any = await delivery.find({ userId: 1 }).distinct("productId");

    const deliveryfind: any = await delivery
      .find({ userId: reqbody.user.id })
      .distinct("productId");

    const waitepickup: Product[] = await Product.findAll({
      where: { id: deliveryfind, itemState: "픽업중" },
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

    for (let i = 0; i < waitepickup.length; i++) {
      const splimg = waitepickup[i].img.split(",");
      waitepickup[i].dataValues.image = splimg;
    }

    res.json({ product: waitepickup });
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: "fail" });
  }
};
