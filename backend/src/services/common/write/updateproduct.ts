import { Request, Response } from "express";
import { Category, ExtraAddress, Product, Store } from "../../../models";
import { bankeyword } from "../../../models/mongoDB";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;

    if (!reqbody.user) {
      throw Error("not login");
    }
    const nowproduct: Product | null = await Product.findOne({
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
  } catch (err: any) {
    console.error(err);
    if (err.message == "not login") {
      res.status(400).json({ result: "not login" });
    } else if (err.message == "not match user") {
      res.status(400).json({ result: "not match user" });
    } else if (err.message == "not category OR extraAddress") {
      res.status(400).json({ result: "not category OR extraAddress" });
    } else if (err.message == "bankeyword") {
      res.status(400).json({ result: "bankeyword" });
    } else {
      res.status(500).json({ result: "fail" });
    }
  }
};
