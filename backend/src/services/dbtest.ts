import { Request, Response } from "express";
import {
  User,
  Store,
  Category,
  DeliveryCost,
  Name,
  Address,
  ExtraAddress,
  Product,
  Report,
  Review,
  PointHistory,
} from "../models";
import mongoose from "mongoose";
import { delivery } from "../models/mongoDB";

export default async (req: Request, res: Response) => {
  try {
    // 첫번째 유저 만들고 찾기
    await User.create({
      email: "first@gmail.com",
      password: "asdasda",
      mobile: "asdasda",
    });
    const firstuser: any = await User.findOne({
      where: { id: 1 },
    });
    await User.create({
      email: "second@gmail.com",
      password: "asdasda",
      mobile: "asdasda",
    });
    const seconduser: any = await User.findOne({
      where: { id: 2 },
    });

    //첫번째 스토어 만들고 찾기
    //찾아서 hasOne 연결
    await Store.create({
      nick: "first",
    });
    const firststore: any = await Store.findOne({
      where: { id: 1 },
    });
    await firstuser.setStore(firststore);
    await Store.create({
      nick: "second",
    });
    const secondstore: any = await Store.findOne({
      where: { id: 2 },
    });
    await seconduser.setStore(secondstore);

    //첫번째 카테고리 만들고 찾기
    //두번째 카테고리 만들고 자식으로 넣기
    await Category.create({ name: "firstcate" });
    await Category.create({ name: "secondcate" });

    const firstcate: any = await Category.findOne({
      where: { id: 1 },
    });
    const secondcate: any = await Category.findOne({
      where: { id: 2 },
    });
    await firstcate.addChildren(secondcate);

    //택배비
    await DeliveryCost.create({ cost: 5000 });
    const DeliCost: any = await DeliveryCost.findOne({
      where: { id: 1 },
    });

    //이름
    await Name.create({ name: "김철수" });
    const firstname: any = await Name.findOne({
      where: { id: 1 },
    });

    //주소
    await Address.create({ address: "서울특별시 어딘가" });
    const firstaddress: any = await Address.findOne({
      where: { id: 1 },
    });
    await Address.create({ address: "경기도 어딘가" });
    const secondaddress: any = await Address.findOne({
      where: { id: 2 },
    });

    //주소 전체
    await ExtraAddress.create({ datailAddress: "여기 어딘가", mobile: "01012345678" });
    const firstextraaddress: any = await ExtraAddress.findOne({
      where: { id: 1 },
    });
    await firstname.addExtraAddress(firstextraaddress);
    await firstaddress.addExtraAddress(firstextraaddress);
    await firststore.addExtraAddress(firstextraaddress);

    await ExtraAddress.create({ datailAddress: "저기 어딘가", mobile: "01087654321" });
    const secondextraaddress: any = await ExtraAddress.findOne({
      where: { id: 2 },
    });
    await firstname.addExtraAddress(secondextraaddress);
    await secondaddress.addExtraAddress(secondextraaddress);
    await secondstore.addExtraAddress(secondextraaddress);

    //게시글(프로덕트)
    await Product.create({
      title: "firsttitle",
      discription: "firstdiscription",
      price: 1000,
      prepayment: false,
      img: "img",
    });
    const firstproduct: any = await Product.findOne({
      where: { id: 1 },
    });

    await firststore.addSell(firstproduct);
    await firstextraaddress.addSellAddress(firstproduct);
    await firstcate.addProduct(firstproduct);
    await secondstore.addPurchase(firstproduct);
    await DeliCost.addProduct(firstproduct);
    await secondextraaddress.addPurchaseAddress(firstproduct);

    const firstreport = await Report.create({ reportText: "이상한글" });

    await firstproduct.addReport(firstreport);

    const firstreview = await Review.create({ star: 0, reviewContent: "쓰레기" });
    await secondstore.addReview(firstreview);
    await firstproduct.addReview(firstreview);

    const firstpoint = await PointHistory.create({ point: 10000, history: "직접결제" });
    await firststore.addPointHistory(firstpoint);

    delivery.create({ userId: 1, spotX: 124 });

    res.json({ result: "ok", user: firstuser });
  } catch (err) {
    console.error(err);
    res.json({ result: "fail" });
  }
};
