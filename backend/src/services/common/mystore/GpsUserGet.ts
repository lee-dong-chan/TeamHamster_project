import { Request, Response } from "express";
import { Address, ExtraAddress, Product } from "../../../models";
import { delivery } from "../../../models/mongoDB";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;
    const selectproduct: string = req.params.id;
    let useraddress = await Address.findOne({
      attributes: ["address"],
      include: [
        {
          model: ExtraAddress,
          as: "ExtraAddress",
          attributes: ["id"],
          include: [
            {
              model: Product,
              as: "PurchaseAddress",
              attributes: ["id"],
              where: { id: selectproduct },
            },
          ],
        },
      ],
    });
    const PurchaseAddress = useraddress?.address;
    res.json({ PurchaseAddress: PurchaseAddress });
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: "fail" });
  }
};
