import { Request, Response } from "express";
import { Address, Category, ExtraAddress, Product } from "../../models";
import { delivery } from "../../models/mongoDB";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;
    const selectproduct: string = req.params.id;

    const waitepickup: Product | null = await Product.findOne({
      where: { id: selectproduct, itemState: "픽업중" },
    });
    if (waitepickup) {
      waitepickup.update({ itemState: "픽업 완료" });
      delivery.create({
        userId: reqbody.user.id,
        productId: waitepickup.id,
        spotX: reqbody.spotX,
        spotY: reqbody.spotY,
      });
    } else {
      throw Error("not choice pickup");
    }

    res.json({ result: "ok" });
  } catch (err) {
    console.error(err);
    res.json({ result: "fail" });
  }
};
