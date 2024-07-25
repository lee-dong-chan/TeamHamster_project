import { Link } from "react-router-dom";
import { ICategory } from "../Search/SearchComp";
import CategoryItem, { IChild } from "./categoryItem";

interface IProps {
  content: string;
  category?: ICategory;
}

const Category = ({ content, category }: IProps): JSX.Element => {
  console.log(category);
  console.log(category?.Children);
  return (
    <div className="ms-3 px-3 bg-white text-[1.2rem] border-b border-s border-e">
      {category && (
        <Link to={`/category/${category.id}`}>
          <div className="py-1 ">{category.name}</div>
        </Link>
      )}
      {category &&
        category.Children.map((item: IChild, idx: number) => (
          <CategoryItem key={idx} item={item} idx={idx + 1} />
        ))}
    </div>
  );
};

export default Category;
