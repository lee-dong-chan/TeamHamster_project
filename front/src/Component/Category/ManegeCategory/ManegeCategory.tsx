interface IProps {}

const ManegeCategoryList = ({}: IProps): JSX.Element => {
  return (
    <div className="w-[60rem] h-[30rem] flex border">
      <div className="h-[100%] flex-1 border-e overflow-y-auto"></div>
      <div className="h-[100%] flex-1 border-e overflow-y-auto"></div>
      <div className="h-[100%] flex-1 overflow-y-auto"></div>
    </div>
  );
};

export default ManegeCategoryList;
