import { Request, Response } from "express";
import { Address, Category, ExtraAddress, Product, Report, Store } from "../../models";
import { Op } from "sequelize";

export default async (req: Request, res: Response) => {
  try {
    const searchnick = req.body.nick;

    const reportlist = await Report.findAll({
      attributes: ["id", "reportText"],
      include: [
        {
          model: Product,
          as: "Product",
          attributes: ["id"],
          include: [
            {
              model: Store,
              as: "Sell",
              attributes: ["nick"],
              where: { nick: { [Op.like]: `%${searchnick}%` } },
            },
          ],
        },
      ],
    });

    res.json({ report: reportlist });
  } catch (err) {
    console.error(err);
    res.json({ result: "fail" });
  }
};
