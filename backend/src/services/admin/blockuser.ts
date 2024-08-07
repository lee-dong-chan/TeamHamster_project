import { Request, Response } from "express";
import { Store } from "../../models";

export default async (_req: Request, res: Response) => {
  try {
    const blockuser: Store[] = await Store.findAll({
      where: { block: true },
      attributes: ["id", "nick"],
    });

    res.json({ block: blockuser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: "fail" });
  }
};
