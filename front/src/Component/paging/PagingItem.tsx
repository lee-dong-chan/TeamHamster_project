interface IProps {
  item: number;
}

const Item = ({ item }: IProps): JSX.Element => {
  return <div className="py-1 px-2 border">{item}</div>;
};

export default Item;
