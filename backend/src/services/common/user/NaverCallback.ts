import { Request, Response } from "express";
import axios from "axios";
import { Transaction } from "sequelize";
import { Name, Store, User, sequelize } from "../../../models";
import dotenv from "dotenv";
import crypto from "crypto";

export default async (req: Request, res: Response) => {
  dotenv.config();

  const code: string = req.query.code as string;
  const state: string = req.query.state as string;
  const redirectUrl = req.body.callbackUrl;

  const client_id: string | undefined = process.env.CLIENT_N_ID;
  const client_secret: string | undefined = process.env.CLIENT_N_SECRET;

  const tokenEndpoint = "https://nid.naver.com/oauth2.0/token";
  const transaction: Transaction = await sequelize.transaction();

  try {
    const response = await axios.post(tokenEndpoint, null, {
      params: {
        grant_type: "authorization_code",
        client_id: client_id,
        client_secret: client_secret,
        redirect_uri: redirectUrl,
        code: code,
        state: state,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const accessToken = response.data.access_token;

    // 여기서 추가로 사용자 정보 요청
    const userInfoResponse = await (
      await axios.get("https://openapi.naver.com/v1/nid/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    ).data.response;

    console.log(userInfoResponse);

    if (!userInfoResponse) {
      throw Error("err");
    }

    /// 여기부터 회원가입 코드

    const key: Buffer = crypto.scryptSync("hgaomasttmexrj", `${process.env.KEY || ""}`, 32);
    const iv: Buffer = Buffer.from(`${process.env.IV}`, "base64");
    const cipher: crypto.CipherGCM = crypto.createCipheriv("aes-256-gcm", key, iv);

    const encryptionemail: string = cipher.update(`${userInfoResponse.email}`, "utf-8", "hex");

    const emailcheck: User | null = await User.findOne({
      where: { email: encryptionemail },
    });
    const encryptionpw: string = crypto
      .createHash("sha512")
      .update(`${userInfoResponse.id + process.env.SALT}`)
      .digest("hex");

    if (!emailcheck) {
      const name: Name | null = await Name.findOne({
        where: { name: userInfoResponse.name },
      });

      const nickcheck: Store | null = await Store.findOne({
        where: { nick: userInfoResponse.nickname },
      });

      if (nickcheck) {
        throw Error("duplication nick");
      }

      const navermobile: string = userInfoResponse.mobile_e164.replace("+82", "0");

      const regist: User = await User.create(
        {
          email: encryptionemail,
          password: encryptionpw,
          mobile: navermobile,
          Oauth: "네이버",
        },
        { transaction }
      );

      const store: Store = await Store.create(
        {
          nick: userInfoResponse.nickname,
          mobile: navermobile,
          profileimg: userInfoResponse.profile_image,
        },
        { transaction }
      );

      if (name) {
        await transaction.commit();
        await name.addUser(regist);
      } else {
        const newname: Name = await Name.create({
          name: userInfoResponse.name,
        });
        await transaction.commit();
        await newname.addUser(regist);
      }

      await regist.setStore(store);
    }

    /// 여기부터 로그인코드
    const usercheck: User | null = await User.findOne({
      where: { email: encryptionemail, password: encryptionpw, Oauth: "네이버", admin: false },
    });

    if (usercheck) {
      req.session.store = usercheck.id;
    } else {
      throw Error("not match user");
    }
    res.status(200).json({ result: "ok" });
  } catch (err: any) {
    console.error(err);
    await transaction.rollback();
    if (err.message == "duplication nick") {
      res.status(400).json({ result: "duplication nick" });
    } else if (err.message == "not match user") {
      res.status(400).json({ result: "not match user" });
    } else {
      res.status(500).json({ result: "fail" });
    }
  }
};
