import { Link } from "react-router-dom";

interface IProps {
  content: string;
}

const Category = ({ content }: IProps): JSX.Element => {
  const id: number = 1;
  return (
    <div className="ms-3 px-3 bg-white text-[1.2rem]">
      <Link to={`/category/${id}`}>{content}</Link>
    </div>
  );
};

export default Category;
