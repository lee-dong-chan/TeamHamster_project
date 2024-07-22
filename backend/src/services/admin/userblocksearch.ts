import { Request, Response } from "express";
import { Store } from "../../models";
import { Op } from "sequelize";

export default async (req: Request, res: Response) => {
  try {
    const searchnick = req.body.nick;
    if (!searchnick) {
      throw Error("search nick");
    }
    const blockuser = await Store.findAll({
      where: { block: true, nick: { [Op.like]: `%${searchnick}%` } },
      attributes: ["id", "nick"],
    });

    res.json({ userlist: { block: blockuser } });
  } catch (err) {
    console.error(err);
    res.json({ result: "fail" });
  }
};
