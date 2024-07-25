import Item, { IUser } from "./authorityitem";

interface IProps {
  auth?: IUser[];
  setdata: React.Dispatch<React.SetStateAction<IUser | undefined>>;
}

const AuthorityComp = ({ auth, setdata }: IProps): JSX.Element => {
  console.log(auth);

  return (
    <div>
      <div className="px-5 py-2 flex items-center border-b">
        <span>번호</span>
        <span className="flex-1 text-center">유저</span>
        <span className="mx-3  py-2 ">슈퍼관리자</span>
        <span className="mx-3  py-2 w-[3rem] ">관리자</span>
        <span className="mx-3  py-2 w-[4rem] ">배송기사</span>
        <span className="mx-3  py-1 w-[2rem] ">선택</span>
      </div>
      {auth &&
        auth.map((item: IUser, idx: number) => (
          <Item key={idx} item={item} idx={idx + 1} setdata={setdata} />
        ))}
    </div>
  );
};

export default AuthorityComp;
