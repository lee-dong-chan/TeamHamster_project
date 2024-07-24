export interface ICate {
  id: number;
  name: string;
}

interface IProps {
  item: ICate;
  setcate: React.Dispatch<React.SetStateAction<number | undefined>>;
  setselectcate1?: React.Dispatch<React.SetStateAction<number>>;
  setselectcate2?: React.Dispatch<React.SetStateAction<number>>;
  cate1: number;
  cate2: number;
}

const CateItem = ({
  cate1,
  cate2,
  item,
  setcate,
  setselectcate1,
  setselectcate2,
}: IProps): JSX.Element => {
  const select = () => {
    if (setselectcate1) {
      setcate(item.id);
      setselectcate1(item.id);
    } else if (setselectcate2) {
      setcate(item.id);
      setselectcate2(item.id);
    } else {
      setcate(item.id);
    }
  };

  return (
    <div>
      <div
        onClick={select}
        className={`py-3 flex items-center hover:bg-gray-200 ${
          (cate1 == item.id && "bg-gray-200") ||
          (cate2 == item.id && "bg-gray-200")
        }`}
      >
        <div className=" me-2 w-6 rounded  text-center">{item.id}</div>
        <div>{item.name}</div>
      </div>
    </div>
  );
};

export default CateItem;
