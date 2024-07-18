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

    console.log(userInfoResponse);

    res.status(200).json({ result: "ok" });
  } catch (error) {
    // console.error(error);
    await transaction.rollback();

    res.status(500).json({ result: "Error" });
  }
};
