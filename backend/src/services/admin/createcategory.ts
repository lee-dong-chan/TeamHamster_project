import { Request, Response } from "express";
import { Category, sequelize } from "../../models";
import { Transaction } from "sequelize";

export default async (req: Request, res: Response) => {
  const transaction: Transaction = await sequelize.transaction();

  try {
    const reqbody = req.body;
    console.log(reqbody);
    /// 상위 카테고리
    const selectprecate: number | null = reqbody.precate;

    if (!reqbody.name) {
      throw Error("err");
    }

    const newcategory: Category = await Category.create(
      {
        name: reqbody.name,
      },
      { transaction }
    );

    await transaction.commit();

    if (selectprecate) {
      const precate: Category | null = await Category.findOne({
        where: { id: selectprecate },
        attributes: ["id", "name"],
      });

      if (precate) {
        await precate.addChildren(newcategory);
      }
    }

    res.json({ result: "ok" });
  } catch (err) {
    console.error(err);
    await transaction.rollback();
    res.status(500).json({ result: "fail" });
  }
};
