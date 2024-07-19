interface IProps {
  item: string;
}

const Radioitem = ({ item }: IProps): JSX.Element => {
  return (
    <div className="py-3 flex gap-4 items-center">
      <input
        type="radio"
        name="report"
        className="h-[1.5rem] w-[1.5rem] "
        value={`${item}`}
      ></input>
      <div>{item}</div>
    </div>
  );
};

export default Radioitem;
