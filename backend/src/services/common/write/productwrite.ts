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
    const category: number = reqbody.categoryId;
    // const deliveryCost: number = reqbody.deliveryCostId;
    const extraAddress: number = reqbody.extraAddressId;

    if (!category || !extraAddress) {
      throw Error("not category OR deliveryCost OR extraAddress");
    }
    const nowuser: Store | null = await Store.findOne({
      where: { id: reqbody.user.id },
    });
    const nowcategory: Category | null = await Category.findOne({
      where: { id: category },
    });
    // const nowdeliveryCost: DeliveryCost | null = await DeliveryCost.findOne({
    //   where: { id: deliveryCost },
    // });
    const nowextraAddress: ExtraAddress | null = await ExtraAddress.findOne({
      where: { id: extraAddress },
    });

    const write = await Product.create(
      {
        title: reqbody.title,
        discription: reqbody.discription,
        price: reqbody.price,
        prepayment: reqbody.prepayment,
        img: reqbody.img,
      },
      { transaction }
    );

    if (nowcategory && nowextraAddress && nowuser) {
      await transaction.commit();
      await nowcategory.addProduct(write);
      // await nowdeliveryCost.addProduct(write);
      await nowextraAddress.addSellAddress(write);
      await nowuser.addSell(write);
    } else {
      throw Error("not category OR deliveryCost OR extraAddress");
    }

    res.json({ result: "ok" });
  } catch (err) {
    console.error(err);
    await transaction.rollback();
    res.json({ result: "fail" });
  }
};
