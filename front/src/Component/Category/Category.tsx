import { Link } from "react-router-dom";

interface IProps {}

const Category = ({}: IProps): JSX.Element => {
  const id: number = 1;
  return (
    <div className="ms-3 px-3 bg-white">
      <Link to={`/category/${id}`}>cate</Link>
    </div>
  );
};

export default Category;
