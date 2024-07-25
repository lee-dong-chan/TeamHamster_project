import { Request, Response } from "express";
import { Store } from "../../models";
import { Op } from "sequelize";

export default async (req: Request, res: Response) => {
  try {
    const manyreport = await Store.findAll({
      where: { report_point: { [Op.gte]: 5 } },
      attributes: ["id", "nick"],
    });

    res.json({ manyreport: manyreport });
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: "fail" });
  }
};
