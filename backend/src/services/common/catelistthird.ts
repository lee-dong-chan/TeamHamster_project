import { Request, Response } from "express";
import { Category } from "../../models";

export default async (req: Request, res: Response) => {
  try {
    const selectcategory: string = req.params.id;

    const categorylist: Category[] = await Category.findAll({
      where: { id: selectcategory },
      attributes: ["id", "name"],
      include: [{ model: Category, as: "Children", attributes: ["id", "name"] }],
    });
    res.json({ category: categorylist });
  } catch (err) {
    console.error(err);
    res.json({ result: "fail" });
  }
};
