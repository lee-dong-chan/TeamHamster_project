import { Request, Response } from "express";
import { DeliveryCost, ExtraAddress, Product, Store } from "../../../models";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;
    if (!reqbody.user) {
      throw Error("not login");
    }
    const nowproid: string = req.params.id;
    const nowuser: Store | null = await Store.findOne({
      where: { id: reqbody.user.id },
    });
    if (!nowuser) {
      throw Error("not find user");
    }

    const product: Product | null = await Product.findOne({
      where: { id: nowproid },
    });
    if (product?.itemState != "판매중") {
      throw Error("not Sell");
    }
    const deliverycost: DeliveryCost | null = await DeliveryCost.findOne({
      order: [["id", "DESC"]],
      attributes: ["id", "cost"],
    });

    let pointcheck: number = nowuser.point - product.price;
    const delcost: number = deliverycost?.cost || 1000;

    if (product.prepayment) {
      pointcheck = nowuser.point - product.price - delcost;
    }

    if (pointcheck < 0) {
      throw Error("not have point");
    }

    const Purchaseaddress: ExtraAddress | null = await ExtraAddress.findOne({
      where: { id: reqbody.extraAddressId },
    });

    await nowuser?.addPurchase(product);
    await Purchaseaddress?.addPurchaseAddress(product);
    await product?.update({ itemState: "픽업 대기" });
    await nowuser?.update({ point: pointcheck });
    await product.addDeliveryCost(deliverycost);

    res.json({ login: reqbody.user, result: "ok" });
  } catch (err) {
    console.error(err);
    res.json({ result: "fail" });
  }
};
