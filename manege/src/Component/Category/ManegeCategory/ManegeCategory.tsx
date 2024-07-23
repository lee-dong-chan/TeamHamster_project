import { useEffect, useState } from "react";
import CateItem, { ICate } from "./CateItem";
import { useQuery } from "react-query";
import axios from "axios";

interface IData {
  category: ICate[];
}

interface IProps {
  settopcate: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const ManegeCategoryList = ({ settopcate }: IProps): JSX.Element => {
  const [cate, setcate] = useState<number>();
  const [selectcate1, setselectcate1] = useState<number | undefined>(undefined);
  const [selectcate2, setselectcate2] = useState<number | undefined>(undefined);

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

  const secondcate = useQuery<IData>({
    queryKey: "secondcate",
    queryFn: async () => {
      const { data } = await axios.post(
        `${process.env.REACT_APP_AXIOS}/catelist/${selectcate1}`,
        {
          withCredentials: true,
        }
      );
      return data;
    },
  });

  const thirdcate = useQuery<IData>({
    queryKey: "secondcate",
    queryFn: async () => {
      const { data } = await axios.post(
        `${process.env.REACT_APP_AXIOS}/catelist/${selectcate2}`,
        {
          withCredentials: true,
        }
      );

      return data;
    },
  });

  console.log(`cate:${cate}`);
  console.log(`cate1:${selectcate1}`);
  console.log(`cate2:${selectcate2}`);

  useEffect(() => {
    settopcate(cate);
  }, [cate]);
  return (
    <div className="w-[60rem] h-[30rem] flex border">
      <div className="h-[100%] flex-1 border-e overflow-y-auto">
        <div className="p-2">
          {firstcate.data?.category.map((item: ICate, idx: number) => (
            <CateItem
              key={idx}
              item={item}
              setcate={setcate}
              setselectcate1={setselectcate1}
            />
          ))}
        </div>
      </div>
      <div className="h-[100%] flex-1 border-e overflow-y-auto">
        <div className="p-2">
          {selectcate1 !== undefined &&
            secondcate.data?.category.map((item: ICate, idx: number) => (
              <CateItem
                key={idx}
                item={item}
                setcate={setcate}
                setselectcate2={setselectcate2}
              />
            ))}
        </div>
      </div>
      <div className="h-[100%] flex-1 overflow-y-auto">
        <div className="p-2">
          {selectcate2 !== undefined &&
            thirdcate.data?.category.map((item: ICate, idx: number) => (
              <CateItem key={idx} item={item} setcate={setcate} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ManegeCategoryList;
