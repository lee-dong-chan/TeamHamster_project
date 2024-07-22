import { MouseEventHandler, useCallback, useEffect, useState } from "react";
import CateItem, { ICate } from "./CateItem";
import { useQuery } from "react-query";
import axios from "axios";

interface IProps {
  settopcate: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const ManegeCategoryList = ({ settopcate }: IProps): JSX.Element => {
  const [cate, setcate] = useState<number>();

  // const firstcate = useQuery({
  //   queryKey: "firstcate",
  //   queryFn: async () => {
  //     const { data } = await axios.post(
  //       `${process.env.REACT_APP_AXIOS}`,

  //       { withCredentials: true }
  //     );
  //   },
  // });

  const firstcate: ICate[] = [
    { id: 1, name: "디지털" },
    { id: 2, name: "전자제품" },
  ];

  useEffect(() => {
    settopcate(cate);
  }, [cate]);
  return (
    <div className="w-[60rem] h-[30rem] flex border">
      <div className="h-[100%] flex-1 border-e overflow-y-auto">
        <div className="p-2">
          {firstcate.map((item: ICate, idx: number) => (
            <CateItem key={idx} item={item} setcate={setcate} />
          ))}
        </div>
      </div>
      <div className="h-[100%] flex-1 border-e overflow-y-auto">
        <div className="p-2">
          {firstcate.map((item: ICate, idx: number) => (
            <CateItem key={idx} item={item} setcate={setcate} />
          ))}
        </div>
      </div>
      <div className="h-[100%] flex-1 overflow-y-auto">
        <div className="p-2">
          {firstcate.map((item: ICate, idx: number) => (
            <CateItem key={idx} item={item} setcate={setcate} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManegeCategoryList;
