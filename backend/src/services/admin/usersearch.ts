import { Request, Response } from "express";
import { Store } from "../../models";
import { Op } from "sequelize";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;
    const searchuser = reqbody.nick;

    const userlist = await Store.findAll({
      attributes: ["id", "nick"],
      where: { nick: { [Op.like]: `%${searchuser}%` } },
    });

    res.json({ userlist: userlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: "fail" });
  }
};
