import { Request, Response } from "express";
import { Category } from "../../models";
import { Op } from "sequelize";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;
    let cate = reqbody.category;
    console.log(req.params);

    let categorylist: Category[] = [];
    // where에 undefined가 들어가면 오류뜸
    if (!cate) {
    } else {
      categorylist = await Category.findAll({
        where: { name: { [Op.like]: `%${cate}%` } },
        attributes: ["id", "name"],
        include: [
          { model: Category, as: "Children", attributes: ["id", "name"] },
        ],
      });
    }
    res.json({ category: categorylist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: "fail" });
  }
};
