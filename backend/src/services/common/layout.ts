import { Request, Response, NextFunction } from "express";
import { Store } from "../../models";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.session.store) {
      req.body.user = await Store.findOne({
        where: { id: req.session.store },
        attributes: ["id", "nick", "point"],
        raw: true,
      });
    }
    res.json({ login: req.body.user });
  } catch (err) {
    console.error(err);
    res.json({ result: "fail" });
  }
};
