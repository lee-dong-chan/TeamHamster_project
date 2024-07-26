import Item from "./PagingItem";

interface IProps {}

const Paging = ({}: IProps): JSX.Element => {
  const pageCount: number = 6;
  const number: Array<number> = [];
  for (let i = 0; i < pageCount && i < 10; i++) {
    number.push(i + 1);
  }

  return (
    <div className="py-10">
      {pageCount > 1 ? (
        <div className="flex gap-5 items-center">
          <div className="py-1 px-2 border">〈</div>
          {number.map((item: number, idx) => (
            <Item key={idx} item={item} />
          ))}
          <div className="py-1 px-2 border">〉</div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Paging;
