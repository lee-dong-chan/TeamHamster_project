import Star from "../Star/Star";

export interface IUser {
  id: number;
  name: string;
  adress: string;
  star: number;
  img: string;
}

interface IProps {
  user: IUser;
}

const User = ({ user }: IProps): JSX.Element => {
  const serverURL = process.env.REACT_APP_IMG_BASE;
  return (
    <div className="pb-3 flex justify-between items-center border-b">
      <div className="py-5 flex items-center gap-5">
        <div>
          <img className="h-[5rem] border rounded-[5rem]" src={`${serverURL}${user.img}`}></img>
        </div>
        <div>
          <div className="text-[1.1rem] font-bold">{user.name}</div>
          <div>{user.adress}</div>
        </div>
      </div>
      <div className="pe-[3rem] text-center">
        <div>판매자평점</div>
        <div className="flex bg-green-400">
          <Star storeStar={user.star}></Star>
        </div>
      </div>
    </div>
  );
};

export default User;
