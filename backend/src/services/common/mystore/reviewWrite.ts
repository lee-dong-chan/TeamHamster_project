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

    const nowuser = await Store.findOne({
      where: { id: reqbody.user.id },
    });
    if (nowuser?.block) {
      throw Error("block");
    }

    const product = await Product.findOne({
      where: { id: selectproduct },
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

    res.json({ result: "ok", duplicationcheck: duplicationcheck });
  } catch (err: any) {
    console.error(err);
    await transaction.rollback();
    if (err.message == "not login") {
      res.status(400).json({ result: "not login" });
    } else if (err.message == "duplication review") {
      res.status(400).json({ result: "duplication review" });
    } else {
      res.status(500).json({ result: "fail" });
    }
  }
};
