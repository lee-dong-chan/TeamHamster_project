import { Request, Response } from "express";
import { Category } from "../../models";
import { Op } from "sequelize";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;
    let cate = reqbody.category;
    // where에 undefined가 들어가면 오류뜸
    if (!cate) {
      throw Error("err");
    }

    let categorylist: Category | null = await Category.findOne({
      where: { name: { [Op.like]: `%${cate}%` } },
      attributes: ["id", "name"],
      include: [{ model: Category, as: "Children", attributes: ["id", "name"] }],
    });
<<<<<<< HEAD

=======
>>>>>>> 06ad4b9 (-fix)
    res.json({ category: categorylist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: "fail" });
  }
};
