import { Request, Response } from "express";
import { Category } from "../../models";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;
    const catefirst: Category[] = await Category.findAll({
      where: { preCateId: null },
      attributes: ["id", "name"],
    });
    res.json({ category: catefirst });
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: "fail" });
  }
};
