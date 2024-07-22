import { Request, Response } from "express";
import { Product } from "../../../models";
import { delivery } from "../../../models/mongoDB";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;
    const selectproduct: string = req.params.id;
    // const deliveryid: Product | null = await Product.findOne({
    //   attributes: ["delivery"],
    //   where: { id: selectproduct },
    // });
    // let deliveryspot;
    // if (deliveryid) {
    // await delivery.create({
    //   userId: deliveryid.dataValues.delivery,
    //   productId: 1,
    //   spotX: 124,
    //   spotY: 212,
    // });
    let deliveryspot = await delivery
      .findOne({ productId: selectproduct }, { spotX: 1, spotY: 1, _id: 0 })
      .sort({ _id: -1 });
    // } else {
    //   throw Error("not pickup");
    // }
    res.json({ deliveryspot: deliveryspot });
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: "fail" });
  }
};
