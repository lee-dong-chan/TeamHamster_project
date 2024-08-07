import { Request, Response } from "express";
import { Address, ExtraAddress, Product } from "../../../models";

export default async (req: Request, res: Response) => {
  try {
    const selectproduct: string = req.params.id;
    let useraddress: Address | null = await Address.findOne({
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
    const PurchaseAddress: string | undefined = useraddress?.address;
    res.json({ PurchaseAddress: PurchaseAddress });
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: "fail" });
  }
};
