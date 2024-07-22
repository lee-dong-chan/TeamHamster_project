import { Request, Response } from "express";
import { Product, Review, Store, sequelize } from "../../../models";
import review from "../review";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;
    // const nowstoreid: string = req.params.id;
    const nowstoreid: any = req.query.id;

    const star: number | undefined = await review(nowstoreid);

    const reviewlist: Review[] = await Review.findAll({
      attributes: ["star", "reviewContent"],
      include: [
        { model: Store, as: "Store", attributes: ["nick", "img"] },
        { model: Product, as: "Product", attributes: ["title"] },
      ],
    });

    const preductcount: number = await Product.count({
      where: { sellId: nowstoreid },
    });
    const reviewcount: number = await Review.count({
      include: [{ model: Product, as: "Product", where: { sellId: nowstoreid } }],
    });
    const reviewpercent = Math.floor((reviewcount / preductcount) * 100);
    res.json({
      reviewCount: reviewcount,
      reviewAverage: { star: star },
      reviewPercent: reviewpercent,
      reviewlist: reviewlist,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: "fail" });
  }
};
