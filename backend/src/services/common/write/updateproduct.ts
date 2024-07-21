import { Request, Response } from "express";
import { Category, DeliveryCost, ExtraAddress, Product, Store, sequelize } from "../../../models";
import { Transaction } from "sequelize";
import { bankeyword } from "../../../models/mongoDB";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;

    if (!reqbody.user) {
      throw Error("not login");
    }
    const nowproduct = await Product.findOne({
      where: { id: req.params.id },
    });
    const nowuser: Store | null = await Store.findOne({
      where: { id: reqbody.user.id },
    });

    if (nowproduct?.sellId != nowuser?.id) {
      throw Error("not match user");
    }

    const category: number = reqbody.categoryId;
    const extraAddress: number = reqbody.extraAddressId;

    if (!category || !extraAddress) {
      throw Error("not category OR extraAddress");
    }

    const nowcategory: Category | null = await Category.findOne({
      where: { id: category },
    });
    const nowextraAddress: ExtraAddress | null = await ExtraAddress.findOne({
      where: { id: extraAddress },
    });

    ///  금지키워드 관련
    const productdiscription = reqbody.discription;
    const banword = await bankeyword.find({}, { word: 1, _id: 0 });

    for (let i = 0; i < banword.length; i++) {
      if (productdiscription.indexOf(banword[i].word!) > -1) {
        throw Error("bankeyword");
      }
    }
    ///

    await nowproduct?.update({
      title: reqbody.title,
      discription: reqbody.discription,
      price: reqbody.price,
      img: reqbody.img,
    });

    if (nowcategory && nowextraAddress) {
      await nowcategory.addProduct(nowproduct);
      await nowextraAddress.addSellAddress(nowproduct);
    } else {
      throw Error("not category OR extraAddress");
    }

    res.json({ result: "ok" });
  } catch (err) {
    console.error(err);
    res.json({ result: "fail" });
  }
};
