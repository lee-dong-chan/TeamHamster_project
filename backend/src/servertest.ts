import express, { Express, query, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import axios from "axios";

const app: Express = express();

dotenv.config();

app.set("port", 8001);
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

app.post("/NaverCallback", async (req: Request, res: Response) => {
  const code: string = req.query.code as string;
  const state: string = req.query.state as string;
  const redirectUrl = req.body.callbackUrl;

  const client_id = process.env.CLIENT_N_ID;
  const client_secret = process.env.CLIENT_N_SECRET;

  const tokenEndpoint = "https://nid.naver.com/oauth2.0/token";

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

    console.log(response);

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

    res.status(200).send("ok");
  } catch (error) {
    // console.error(error);
    res.status(500).send("Error");
  }
});

app.post("/GoogleCallback", async (req: Request, res: Response) => {
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

    res.status(200).send("ok");
  } catch (error) {
    // console.error(error);
    res.status(500).send("Error");
  }
});

app.listen(app.get("port"), (): void => {
  console.log(app.get("port"), "server open");
});
