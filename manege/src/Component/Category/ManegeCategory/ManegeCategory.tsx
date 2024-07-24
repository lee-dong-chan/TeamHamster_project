import { useEffect, useState } from "react";
import CateItem, { ICate } from "./CateItem";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import axios, { AxiosResponse } from "axios";

interface IData {
  category: ICate[];
}

interface IProps {
  settopcate: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const ManegeCategoryList = ({ settopcate }: IProps): JSX.Element => {
  const queryClient = useQueryClient();
  const [cate, setcate] = useState<number>();
  const [selectcate1, setselectcate1] = useState<number>(0);
  const [selectcate2, setselectcate2] = useState<number>(0);
  const [data2, setdata2] = useState<ICate[]>([]);
  const [data3, setdata3] = useState<ICate[]>([]);

  const firstcate = useQuery<IData>({
    queryKey: "firstcate",
    queryFn: async () => {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/catefirst`,
        {
          withCredentials: true,
        }
      );
      return data;
    },
  });

  const secondcate = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/catelist/${selectcate1}`,
        {},
        { withCredentials: true }
      )
      .then((data: AxiosResponse) => {
        const Children: ICate[] = data.data.category[0].Children;
        setdata2(Children);
      })
      .catch(() => {
        console.log("안되네");
      });
  };

  const thirdcate = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/catelist/${selectcate2}`,
        {},
        { withCredentials: true }
      )
      .then((data: AxiosResponse) => {
        const Children: ICate[] = data.data.category[0].Children;
        setdata3(Children);
      })
      .catch(() => {
        console.log("안되네");
      });
  };

  console.log(`cate:${cate}`);
  console.log(`cate1:${selectcate1}`);
  console.log(`cate2:${selectcate2}`);

  useEffect(() => {
    settopcate(cate);
    secondcate();
    thirdcate();
  }, [cate]);

  useEffect(() => {
    setdata3([]);
    thirdcate();
  }, [selectcate1]);

  return (
    <div className="w-[60rem] h-[30rem] flex border">
      <div className="h-[100%] flex-1 border-e overflow-y-auto scrollbat-hide">
        <div className="p-2">
          {firstcate.data?.category.map((item: ICate, idx: number) => (
            <CateItem
              key={idx}
              item={item}
              setcate={setcate}
              cate1={selectcate1}
              cate2={selectcate2}
              setselectcate1={setselectcate1}
            />
          ))}
        </div>
      </div>
      <div className="h-[100%] flex-1 border-e overflow-y-auto">
        <div className="p-2">
          {selectcate1 !== undefined &&
            data2.map((item: ICate, idx: number) => (
              <CateItem
                key={idx}
                item={item}
                setcate={setcate}
                cate1={selectcate1}
                cate2={selectcate2}
                setselectcate2={setselectcate2}
              />
            ))}
        </div>
      </div>
      <div className="h-[100%] flex-1 overflow-y-auto">
        <div className="p-2">
          {selectcate2 !== undefined &&
            data3.map((item: ICate, idx: number) => (
              <CateItem
                key={idx}
                item={item}
                setcate={setcate}
                cate1={selectcate1}
                cate2={selectcate2}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ManegeCategoryList;
