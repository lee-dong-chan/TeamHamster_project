export interface ICate {
  id: number;
  name: string;
}

interface IProps {
  item: ICate;
  setcate: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const CateItem = ({ item, setcate }: IProps): JSX.Element => {
  const select = () => {
    setcate(item.id);
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
