import { Request, Response, NextFunction } from "express";
import { Store, User } from "../../models";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.session.store) {
      req.body.user = await Store.findOne({
        where: { id: req.session.store },
        attributes: ["id", "nick", "point"],
        raw: true,
      });
      const check = await User.findOne({
        where: { id: req.body.user.id },
      });
      req.body.user.admin = check?.admin;
      req.body.user.delivery = check?.delivery;
    }
    res.json({ login: req.body.user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: "fail" });
  }
};
