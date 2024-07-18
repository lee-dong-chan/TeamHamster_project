import { Request, Response } from "express";
import { ExtraAddress, Product, Store } from "../../../models";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;
    if (!reqbody.user) {
      throw Error("not login");
    }
    const nowproid: string = req.params.id;
    const product: Product | null = await Product.findOne({
      where: { id: nowproid },
    });
    if (product?.itemState != "판매중") {
      throw Error("not Sell");
    }
    const nowuser: Store | null = await Store.findOne({
      where: { id: reqbody.user.id },
    });
    const Purchaseaddress: ExtraAddress | null = await ExtraAddress.findOne({
      where: { id: reqbody.extraAddressId },
    });

    await nowuser?.addPurchase(product);
    await Purchaseaddress?.addPurchaseAddress(product);
    await product?.update({ itemState: "배송중" });

    res.json({ login: reqbody.user, result: "ok" });
  } catch (err) {
    console.error(err);
    res.json({ result: "fail" });
  }
};
