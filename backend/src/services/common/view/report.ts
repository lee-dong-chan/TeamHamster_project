import { Request, Response } from "express";
import { Product, Report, sequelize } from "../../../models";
import { Transaction } from "sequelize";

export default async (req: Request, res: Response) => {
  const transaction: Transaction = await sequelize.transaction();
  try {
    const reqbody = req.body;
    if (!reqbody.user) {
      throw Error("not login");
    }
    const nowproid: string = req.params.id;
    const product: Product | null = await Product.findOne({
      where: { id: nowproid },
    });
    const report = await Report.create(
      {
        reportText: reqbody.reporttext,
      },
      { transaction }
    );

    if (product) {
      await transaction.commit();
      await product.addReport(report);
    } else {
      throw Error("notfind product");
    }

    res.json({ result: "ok" });
  } catch (err: any) {
    console.error(err);
    await transaction.rollback();
    if (err.message == "not login") {
      res.status(400).json({ result: "not login" });
    } else if (err.message == "notfind product") {
      res.status(400).json({ result: "notfind product" });
    } else {
      res.status(500).json({ result: "fail" });
    }
  }
};
