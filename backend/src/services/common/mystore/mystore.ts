import { Request, Response } from "express";
import { Product, Store, sequelize } from "../../../models";
import review from "../review";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;
    // const nowstoreid: string = req.params.id;
    const nowstoreid = req.query.id;
    let loginuser: boolean = false;

    const store: Store | null = await Store.findOne({
      where: { id: nowstoreid },
      attributes: [
        "id",
        "nick",
        "point",
        "Introduction",
        "profileimg",
        [sequelize.fn("count", sequelize.col("Sell.id")), "sellCount"],
      ],
      include: [
        {
          model: Product,
          as: "Sell",
          attributes: [],
        },
      ],
      // group: ["Sell.id"],
    });

    if (store) {
      const star: number | undefined = await review(store.id);
      store.dataValues.star = { star: star };
    }
    if (!reqbody.user) {
    } else if (reqbody.user.id == store?.id) {
      loginuser = true;
    }

    res.json({ login: reqbody.user, store: store, loginuser: loginuser });
  } catch (err) {
    console.error(err);
    res.json({ result: "fail" });
  }
};
