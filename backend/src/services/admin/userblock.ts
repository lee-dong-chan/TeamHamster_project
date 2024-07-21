import { Request, Response } from "express";
import { Store } from "../../models";

export default async (req: Request, res: Response) => {
  try {
    await Store.update(
      {
        block: true,
      },
      { where: { id: req.params.id } }
    );

    res.json({ result: "ok" });
  } catch (err) {
    console.error(err);
    res.json({ result: "fail" });
  }
};
