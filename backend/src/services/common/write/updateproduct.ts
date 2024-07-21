import { Request, Response } from "express";
import { Category, DeliveryCost, ExtraAddress, Product, Store, sequelize } from "../../../models";
import { Transaction } from "sequelize";

export default async (req: Request, res: Response) => {
  const transaction: Transaction = await sequelize.transaction();

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

    await nowproduct?.update({
      title: reqbody.title,
      discription: reqbody.discription,
      price: reqbody.price,
      img: reqbody.img,
    });

    if (nowcategory && nowextraAddress) {
      await transaction.commit();
      await nowcategory.addProduct(nowproduct);
      await nowextraAddress.addSellAddress(nowproduct);
    } else {
      throw Error("not category OR extraAddress");
    }

    res.json({ result: "ok" });
  } catch (err) {
    console.error(err);
    await transaction.rollback();
    res.json({ result: "fail" });
  }
};
