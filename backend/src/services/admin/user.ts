import { Request, Response } from "express";
import { Address, Category, ExtraAddress, Product, Report, Store, sequelize } from "../../models";
import { Op } from "sequelize";

export default async (req: Request, res: Response) => {
  try {
    const blockuser = await Store.findAll({
      where: { block: true },
      attributes: ["id", "nick"],
    });
    const manyreport = await Store.findAll({
      where: { report_point: { [Op.gte]: 5 } },
      attributes: ["id", "nick"],
    });

    res.json({ userlist: [{ manyreport: manyreport }, { block: blockuser }] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: "fail" });
  }
};
