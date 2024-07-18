import Item from "./Item";

interface IProps {
  camplist: string[];
  changeselect: (item: string) => void;
}

const Camp = ({ camplist, changeselect }: IProps): JSX.Element => {
  return (
    <div className="flex grid grid-cols-2">
      {camplist.map((item: string, idx) => (
        <Item key={idx} item={item} changeselect={changeselect} />
      ))}
    </div>
  );
};

export default Camp;
