import { Request, Response } from "express";
import { Address, Category, ExtraAddress, Product, Report, Store, User } from "../../models";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;
    const selectreport: string = req.params.id;

    const delproduct: Product | null = await Product.findOne({
      where: { id: selectreport },
      include: [{ model: Store, as: "Sell" }],
    });
    if (!delproduct) {
      throw Error("not find product");
    }

    const reportuser: Store | null = await Store.findOne({
      where: { id: delproduct.dataValues.Sell.id },
    });
    if (!reportuser) {
      throw Error("not find user");
    }

    const reportpoint: number = reportuser.report_point;

    await reportuser.update({ report_point: reportpoint + 1 });

    delproduct.destroy();

    res.json({ result: "ok", delproduct: delproduct });
  } catch (err) {
    console.error(err);
    res.json({ result: "fail" });
  }
};
