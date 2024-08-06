import { useCallback, useEffect, useMemo, useState } from "react";
import AdressItem from "./UserAdressItem";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Modal, Modalproduct } from "../../../Context/Modal";
import ButtonComp from "../../Button/Button";
import { Button } from "../../../lib/Button/Button";
import axios, { AxiosResponse } from "axios";
import { IProductPage } from "../../../lib/interFace";
import { Modalcontent, Modalstate } from "../../../Context/SystemModal/Modal";

interface IProps {
  userDataCheck: () => void;
}

export interface IAdress {
  id: number;
  mobile: string;
  detailAddress: string;
  Address: {
    address: string;
  };
  Name: {
    name: string;
  };
}
export interface IData {
  extraAddress: IAdress[];
}

export interface IAdressData {
  address: string;
  addressId: number;
  detailAddress: string;
}

const Buy = ({ userDataCheck }: IProps): JSX.Element => {
  const setsystemonoff = useSetRecoilState(Modalstate);
  const setModalcontent = useSetRecoilState(Modalcontent);
  const navigate = useNavigate();
  const btn = new Button("구매하기", "bg-orange-200");
  const modalstate = useSetRecoilState(Modal);
  const productid = useRecoilState(Modalproduct)[0];
  const [selectcontent, setcontent] = useState<string>();
  const [id, setId] = useState<number>();
  const serverUrl = useMemo(() => process.env.REACT_APP_SERVER_URL, []);
  const [adress, setAdress] = useState<IAdressData[]>([
    { address: "오류", addressId: 999, detailAddress: "디테일주소" },
  ]);
  const [price, setPrice] = useState<number>(0);
  const [deliveryCost, setDeliveryCost] = useState<number>();

  //func
  const selectadress = (value: string, id: number) => {
    setcontent(value);
    setId(id);
  };

  const addadress = useCallback(() => {
    modalstate("addadress");
  }, [modalstate]);

  console.log("무한 돌기 체크");
  //유저 주소 정보 가져오기
  const getUserAddress = useCallback(async () => {
    await axios
      .post(`${serverUrl}/address`, {}, { withCredentials: true })
      .then((data: AxiosResponse<IData>) => {
        console.log("주소 가져오기 성공", data);
        const addressArr: IAdress[] = data.data.extraAddress;
        const result = addressArr.map((adress: IAdress) => {
          return {
            address: adress.Address.address,
            addressId: adress.id,
            detailAddress: adress.detailAddress,
          };
        });

        setAdress(result);
      })
      .catch((err) => {
        console.log("주소 에러", err);
        setAdress([
          {
            address: "햄찌동 햄찌빌라",
            addressId: 1,
            detailAddress: "햄찌호",
          },
          {
            address: "따봉별 햄스터시티",
            addressId: 2,
            detailAddress: "오류동",
          },
          { address: "빠킹오류", addressId: 3, detailAddress: "그만떠라" },
        ]);
      });
  }, [serverUrl]);

  interface IFix<T> {
    product: T;
  }
  //값 가져오기
  interface IDeCosRes {
    cost: {
      cost: number;
    };
  }
  const getProductValues = useCallback(async () => {
    await axios
      .post(`${serverUrl}/product/${productid}`, {}, { withCredentials: true })
      .then(async (data: AxiosResponse<IFix<IProductPage>>) => {
        console.log(data.data, "asdasdadasd");
        setPrice(data.data.product.price);

        await axios
          .post(`${serverUrl}/deliverycost`, {}, { withCredentials: true })
          .then((data: AxiosResponse<IDeCosRes>) => {
            console.log(data, "data");
            setDeliveryCost(data.data.cost.cost);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log("err", err);
        setPrice(10);
      });
  }, [serverUrl, productid]);

  //구매하기 버튼 클릭
  const buyClick = async () => {
    await axios
      .post(
        `${serverUrl}/purchase/${productid}`,
        {
          extraAddressId: id,
        },
        { withCredentials: true }
      )
      .then((data) => {
        userDataCheck();
        setModalcontent("sucsesspurchase");
        setsystemonoff(true);
        console.log("구매 버튼 클릭 data", data);
        navigate("/");
      })
      .catch((err) => {
        setModalcontent("failpurchase");
        setsystemonoff(true);
        console.log("구매 버튼 클릭 오류", err);
        navigate("/");
      });
  };

  //mount
  useEffect(() => {
    getUserAddress();
    getProductValues();
  }, [getUserAddress, getProductValues]);

  return (
    <div className="flex flex-col items-center">
      <div className="p-3 text-center text-[1.3rem] font-bold">구매하기</div>
      <div className="p-4 h-[15rem] w-[90%] bg-white border border-gray-400 overflow-y-auto scrollbar-hide">
        {adress &&
          adress.map((item: IAdressData, idx: number) => (
            <AdressItem
              key={idx}
              detail={item.detailAddress}
              item={item.address}
              id={item.addressId}
              selectadress={selectadress}
            />
          ))}
      </div>
      <div onClick={addadress} className="p-4 text-center text-blue-500">
        +주소추가
      </div>
      <div className="h-[20rem] w-[90%]">
        <div className="">
          <div className="p-3 text-[1.2rem]">현재주소: {selectcontent}</div>
        </div>
        <div className="p-3 text-[1.3rem]">
          <div>
            상품금액:<span className="text-orange-400">{price}</span>원
          </div>
          {deliveryCost && (
            <div>
              택배비:
              <span className="text-orange-400">{deliveryCost + ""}</span>원
            </div>
          )}
          <div>
            총 금액:
            <span className="text-orange-400">
              {deliveryCost ? deliveryCost + price : "err"}
            </span>
            원
          </div>
        </div>
      </div>
      <div>
        <div
          onClick={() => {
            console.log(id, selectcontent);
            if (id && selectcontent) {
              buyClick();
            }
          }}
        >
          <ButtonComp btn={btn} height="h-[4rem]" />
        </div>
      </div>
    </div>
  );
};

export default Buy;
