import { IUser } from "../../lib/layout";

interface IProps {
  workstate: boolean | undefined;
  camp: string;
  user: IUser;
}

const Info = ({ workstate, camp, user }: IProps): JSX.Element => {
  return (
    <div className="flex justify-between items-center h-[7rem] border">
      <div className="p-2 flex  items-center gap-4">
        <div className="h-[5rem] w-[5rem] rounded-[5rem] border border-gray-400 overflow-hidden">
          <img
            src="/imgs/good.png"
            alt="imgNotFound"
            className="h-[100%] w-[100%]"
          ></img>
        </div>
        <div className="font-bold">
          <div>배송파트너</div>
          <div>{user.nick}</div>
        </div>
        <div className="px-10 text-center font-bold">
          <div>상태</div>
          {workstate ? (
            <div className="p-1 border bg-yellow-200">업무중</div>
          ) : (
            <div className="p-1 border bg-blue-200">대기중</div>
          )}
        </div>
      </div>
      {workstate && (
        <div className="p-2 text-center font-bold ">
          <div>금일 배정캠프</div>
          <div className="p-3 border">{camp ? camp : "배정전"}</div>
        </div>
      )}
    </div>
  );
};

export default Info;
