import { Request, Response } from "express";
import { Store } from "../../models";
import { Op } from "sequelize";

export default async (req: Request, res: Response) => {
  try {
    const searchnick = req.body.nick;
    if (!searchnick) {
      throw Error("search nick");
    }
    const blockuser: Store[] = await Store.findAll({
      where: { block: true, nick: { [Op.like]: `%${searchnick}%` } },
      attributes: ["id", "nick"],
    });

    res.json({ block: blockuser });
  } catch (err: any) {
    console.error(err);
    if (err.message == "search nick") {
      res.status(400).json({ result: "not search nick" });
    } else {
      res.status(500).json({ result: "fail" });
    }
  }
};
