import { Request, Response } from "express";
import { Product, Review, Store, sequelize } from "../../../models";
import { Transaction } from "sequelize";

export default async (req: Request, res: Response) => {
  const transaction: Transaction = await sequelize.transaction();

  try {
    const reqbody = req.body;
    const selectproduct: string = req.params.id;
    if (!reqbody.user) {
      throw Error("not login");
    }

    const product = await Product.findOne({
      where: { id: selectproduct },
    });

    const nowuser = await Store.findOne({
      where: { id: reqbody.user.id },
    });

    const duplicationcheck = await Review.findOne({
      where: { productId: selectproduct, storeId: reqbody.user.id },
    });

    const reviewWrite = await Review.create(
      {
        star: reqbody.star,
        reviewContent: reqbody.content,
      },
      { transaction }
    );
    if (duplicationcheck) {
      throw Error("duplication review");
    } else {
      await transaction.commit();
      await product?.addReview(reviewWrite);
      await nowuser?.addReview(reviewWrite);
    }

    res.json({ login: reqbody.user, result: "ok", duplicationcheck: duplicationcheck });
  } catch (err) {
    console.error(err);
    await transaction.rollback();
    res.json({ result: "fail" });
  }
};
