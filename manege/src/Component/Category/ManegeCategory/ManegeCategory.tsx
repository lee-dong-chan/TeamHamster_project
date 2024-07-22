import { useEffect, useState } from "react";
import CateItem, { ICate } from "./CateItem";
import { useQuery } from "react-query";
import axios from "axios";

interface IProps {
  settopcate: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const ManegeCategoryList = ({ settopcate }: IProps): JSX.Element => {
  const [cate, setcate] = useState<number>();
  const [selectcata1, setselectcata1] = useState<number | undefined>(undefined);
  const [selectcata2, setselectcata2] = useState<number | undefined>(undefined);

  // const firstcate = useQuery({
  //   queryKey: "firstcate",
  //   queryFn: async () => {
  //     const { data } = await axios.post(
  //       `${process.env.REACT_APP_AXIOS}/catefirst`,
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     return data;
  //   },
  // });

  // const secondcate = useQuery({
  //   queryKey: "secondcate",
  //   queryFn: async () => {
  //     const { data } = await axios.post(
  //       `${process.env.REACT_APP_AXIOS}/catelist/${selectcate1}`,
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     return data;
  //   },
  // });

  // const thirdcate = useQuery({
  //   queryKey: "secondcate",
  //   queryFn: async () => {
  //     const { data } = await axios.post(
  //       `${process.env.REACT_APP_AXIOS}/catelist/${selectcate2}`,
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     return data;
  //   },
  // });

  const firstcate: ICate[] = [
    { id: 1, name: "디지털" },
    { id: 2, name: "전자제품" },
  ];
  const secondcate: ICate[] = [
    { id: 5, name: "디지털" },
    { id: 8, name: "전자제품" },
  ];
  const thirdcate: ICate[] = [
    { id: 12, name: "디지털" },
    { id: 24, name: "전자제품" },
  ];
  console.log(`cate:${cate}`);
  console.log(`cate1:${selectcata1}`);
  console.log(`cate2:${selectcata2}`);

  useEffect(() => {
    settopcate(cate);
  }, [cate]);
  return (
    <div className="w-[60rem] h-[30rem] flex border">
      <div className="h-[100%] flex-1 border-e overflow-y-auto">
        <div className="p-2">
          {firstcate.map((item: ICate, idx: number) => (
            <CateItem
              key={idx}
              item={item}
              setcate={setcate}
              setselectcate1={setselectcata1}
            />
          ))}
        </div>
      </div>
      <div className="h-[100%] flex-1 border-e overflow-y-auto">
        <div className="p-2">
          {selectcata1 !== undefined &&
            secondcate.map((item: ICate, idx: number) => (
              <CateItem
                key={idx}
                item={item}
                setcate={setcate}
                setselectcate2={setselectcata2}
              />
            ))}
        </div>
      </div>
      <div className="h-[100%] flex-1 overflow-y-auto">
        <div className="p-2">
          {selectcata2 !== undefined &&
            thirdcate.map((item: ICate, idx: number) => (
              <CateItem key={idx} item={item} setcate={setcate} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ManegeCategoryList;
