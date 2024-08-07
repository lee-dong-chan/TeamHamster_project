import { Request, Response } from "express";
import { Store, User, sequelize } from "../../models";
import { Op } from "sequelize";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;
    const searchuser = reqbody.nick;

    const userlist: Store[] = await Store.findAll({
      attributes: [
        "id",
        "nick",
        [sequelize.col("User.admin"), "admin"],
        [sequelize.col("User.super_admin"), "superAdmin"],
        [sequelize.col("User.delivery"), "delivery"],
      ],
      where: { nick: { [Op.like]: `%${searchuser}%` } },
      include: { model: User, as: "User", attributes: [] },
    });

    res.json({ userlist: userlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: "fail" });
  }
};
