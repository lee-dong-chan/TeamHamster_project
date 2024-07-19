import { Request, Response } from "express";
import { Address, Category, ExtraAddress, Product } from "../../models";
import { delivery } from "../../models/mongoDB";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;
    const selectproduct: string = req.params.id;

    console.log(reqbody.id);

    const waitepickup: Product[] | null = await Product.findAll({
      where: { id: reqbody.id, itemState: "픽업 대기" },
    });
    // if (waitepickup) {
    //   waitepickup.update({ itemState: "픽업중" });
    //   delivery.create({ userId: reqbody.user.id, productId: waitepickup.id });
    // } else {
    //   throw Error("other pickup");
    // }
    if (waitepickup.length == 0) {
      throw Error("other pickup");
    }
    for (let i = 0; i < waitepickup.length; i++) {
      waitepickup[i].update({ itemState: "픽업중" });
      delivery.create({ userId: reqbody.user.id, productId: waitepickup[i].id });
    }

    res.json({ result: "ok" });
  } catch (err) {
    console.error(err);
    res.json({ result: "fail" });
  }
};
