import { Request, Response } from "express";
import axios from "axios";
import { Transaction } from "sequelize";
import { Name, Store, User, sequelize } from "../../../models";
import dotenv from "dotenv";
import crypto from "crypto";

export default async (req: Request, res: Response) => {
  dotenv.config();

  const code = req.query.code as string;
  const redirectUrl = req.body.callbackUrl as string;
  const tokenEndpoint = "https://oauth2.googleapis.com/token";

  const client_id: string = process.env.CLIENT_G_ID as string;
  const client_secret: string = process.env.CLIENT_G_SECRET as string;

  const params: URLSearchParams = new URLSearchParams();
  params.append("code", code);
  params.append("client_id", client_id);
  params.append("client_secret", client_secret);
  params.append("redirect_uri", redirectUrl);
  params.append("grant_type", "authorization_code");

  const transaction: Transaction = await sequelize.transaction();

  try {
    const response = await axios.post(tokenEndpoint, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    // console.log(response);

    const accessToken = response.data.access_token;

    // 여기서 추가로 사용자 정보 요청
    const userInfoResponse = await (
      await axios.get("https://www.googleapis.com/oauth2/v1/userinfo", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    ).data;

    // console.log(userInfoResponse);

    const key = crypto.scryptSync("hgaomasttmexrj", `${process.env.KEY || ""}`, 32);
    const iv = process.env.IV || "";
    const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

    const encryptionemail: string = cipher.update(`${userInfoResponse.email}`, "utf-8", "hex");

    const emailcheck: User | null = await User.findOne({
      where: { email: encryptionemail },
    });
    const encryptionpw = crypto
      .createHash("sha512")
      .update(`${userInfoResponse.id + process.env.SALT}`)
      .digest("hex");

    /// name = given_name 에서 앞 4글자
    const registname = userInfoResponse.given_name.slice(0, 4);
    /// 회원가입 코드
    if (!emailcheck) {
      const name: Name | null = await Name.findOne({
        where: { name: registname },
      });

      const nickcheck: Store | null = await Store.findOne({
        where: { nick: userInfoResponse.name },
      });

      if (nickcheck) {
        throw Error("duplication nick");
      }

      // const navermobile: string = userInfoResponse.mobile_e164.replace("+82", "0");
      // console.log(navermobile);
      // navermobile = navermobile.replace("+82", "0");
      // console.log(navermobile);

      const regist = await User.create(
        {
          email: encryptionemail,
          password: encryptionpw,
          // mobile: navermobile,
          Oauth: "구글",
        },
        { transaction }
      );

      const store = await Store.create(
        {
          nick: userInfoResponse.name,
          // mobile: navermobile,
          profileimg: userInfoResponse.picture,
        },
        { transaction }
      );

      if (name) {
        await transaction.commit();
        await name.addUser(regist);
      } else {
        const newname = await Name.create({
          name: registname,
        });
        await transaction.commit();
        await newname.addUser(regist);
      }

      await regist.setStore(store);
    }

    /// 여기부터 로그인코드
    const usercheck: User | null = await User.findOne({
      where: { email: encryptionemail, password: encryptionpw, Oauth: "구글" },
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
