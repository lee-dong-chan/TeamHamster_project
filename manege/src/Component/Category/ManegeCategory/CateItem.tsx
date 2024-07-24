export interface ICate {
  id: number;
  name: string;
}

interface IProps {
  item: ICate;
  setcate: React.Dispatch<React.SetStateAction<number | undefined>>;
  setselectcate1?: React.Dispatch<React.SetStateAction<number>>;
  setselectcate2?: React.Dispatch<React.SetStateAction<number>>;
}

const CateItem = ({
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
    <div className="py-3 flex items-center">
      <div className=" me-2 w-6 rounded border border-black text-center">
        {item.id}
      </div>
      <div onClick={select}>{item.name}</div>
    </div>
  );
};

export default CateItem;
