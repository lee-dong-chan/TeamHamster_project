import { Request, Response, NextFunction } from "express";
import { Store, User } from "../../models";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reqbody = req.body;
    if (!reqbody.user) {
      throw Error("not login");
    }
    const delck: Store | null = await Store.findOne({
      where: { id: reqbody.user.id },
      include: [{ model: User, as: "User", where: { delivery: true } }],
    });
    if (!delck) {
      throw Error("not delivery");
    }
    next();
  } catch (err: any) {
    console.error(err);
    if (err.message == "not login") {
      res.json({ result: "not login" });
    } else if (err.message == "not delivery") {
      res.json({ result: "not delivery" });
    } else {
      res.json({ result: "fail" });
    }
  }
};
