import { ChangeEvent } from "react";

interface IProps {
  detail: string;
  item: string;
  selectadress: (value: string, id: number) => void;
  id: number;
}

const AdressItem = ({
  detail,
  item,
  selectadress,
  id,
}: IProps): JSX.Element => {
  return (
    <div className="mt-5 p-4 h-[10rem] flex gap-5 text-[1.2rem] border border-gray-300 overflow-auto">
      <input
        className="h-[1.5rem] w-[1.5rem]"
        type="radio"
        value={item + " " + detail}
        name="buy"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          selectadress(e.target.value, id);
        }}
      ></input>
      <div>
        {item} {detail}
      </div>
    </div>
  );
};

export default AdressItem;
