import { Request, Response } from "express";
import { Address, Category, ExtraAddress, Product } from "../../models";
import { delivery } from "../../models/mongoDB";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;
    const selectproduct: string = req.params.id;

    const waitepickup: Product | null = await Product.findOne({
      where: { id: selectproduct, itemState: "픽업 대기" },
    });
    if (waitepickup) {
      waitepickup.update({ itemState: "픽업중", delivery: reqbody.user.id });
      delivery.create({ userId: reqbody.user.id, productId: waitepickup.id });
    } else {
      throw Error("other pickup");
    }

    res.json({ result: "ok" });
  } catch (err) {
    console.error(err);
    res.json({ result: "fail" });
  }
};
