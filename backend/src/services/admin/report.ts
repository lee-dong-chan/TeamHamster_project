import { Request, Response } from "express";
import { Address, Category, ExtraAddress, Product, Report, Store } from "../../models";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;

    const reportlist = await Report.findAll({
      attributes: ["id", "reportText"],
      include: [
        {
          model: Product,
          as: "Product",
          attributes: ["id"],
          include: [{ model: Store, as: "Sell", attributes: ["nick"] }],
        },
      ],
    });

    res.json({ report: reportlist });
  } catch (err) {
    console.error(err);
    res.json({ result: "fail" });
  }
};
