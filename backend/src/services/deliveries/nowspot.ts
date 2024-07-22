import { Request, Response } from "express";
import { Address, Category, ExtraAddress, Product } from "../../models";
import { delivery } from "../../models/mongoDB";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;

    // delivery.create({ userId: reqbody.user.id, spotX: reqbody.spotX, spotY: reqbody.spotY });
    const pickupspot: Product[] | null = await Product.findAll({
      where: { itemState: "픽업 완료" },
      attributes: ["id"],
    });

    for (let i = 0; i < pickupspot.length; i++) {
      const deliveryfind: any = delivery.findOne({
        productId: pickupspot[i],
        userId: reqbody.user.id,
      });
      if (deliveryfind) {
        delivery.create({
          userId: reqbody.user.id,
          productId: pickupspot[i].id,
          spotX: reqbody.spotX,
          spotY: reqbody.spotY,
        });
      }
    }

    res.json({ result: "ok" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: "fail" });
  }
};
