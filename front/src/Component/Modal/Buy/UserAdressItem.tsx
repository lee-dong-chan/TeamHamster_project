import { ChangeEvent } from "react";

interface IProps {
  item: string;
  selectadress: (value: string, id: number) => void;
  id: number;
}

const AdressItem = ({ item, selectadress, id }: IProps): JSX.Element => {
  return (
    <div className="p-4 flex gap-5 text-[1.2rem] ">
      <input
        className="h-[1.5rem] w-[1.5rem]"
        type="radio"
        value={item}
        name="buy"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          selectadress(e.target.value, id);
        }}
      ></input>
      <div>{item}</div>
    </div>
  );
};

export default AdressItem;
