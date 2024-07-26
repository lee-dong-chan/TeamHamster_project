import { box, center } from "../../lib/styles";
import ButtonComp, { SmallButton } from "../../Component/Button/Button";
import { Button } from "../../lib/Button/Button";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Debounce } from "../../CostomHook/Debounce";
import AuthorityComp from "../../Component/List/ManegeList/authoritylist/authority";
import { IUser } from "../../Component/List/ManegeList/authoritylist/authorityitem";
import { Navigate } from "react-router-dom";

interface IProps {}

const Authority = ({}: IProps): JSX.Element => {
  const btn = new Button("확인", "bg-orange-500");
  const [list, setlist] = useState();
  const [userData, setData] = useState<IUser>();
  const [user, setuser] = useState<string>("");
  const searchuser = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setuser(e.target.value);
  }, []);

  const text = Debounce(user, 1000);
  const queryClient = useQueryClient();

  const userlist = useMutation({
    mutationKey: ["authorityuser"],
    mutationFn: async () => {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/admin/usersearch`,
        { nick: text },
        { withCredentials: true }
      );
      const list = data.userlist;

      setlist(list);
    },
  });

  const changeauth = useMutation({
    mutationKey: ["changeauthority"],
    mutationFn: async () => {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/admin/authority`,
        {
          id: userData?.id,
          superadmin: userData?.superAdmin,
          admin: userData?.admin,
          delivery: userData?.delivery,
        },
        { withCredentials: true }
      );
    },
  });

  const redirect = () => {
    setuser("");
    setData(undefined);
    setlist(undefined);
  };
  useEffect(() => {
    if (text) {
      userlist.mutate();
    }
  }, [text]);

  return (
    <div className={`${box}`}>
      <div className={`${center} flex-col`}>
        <div className="w-[50rem] h-[20rem] border">
          <AuthorityComp auth={list} setdata={setData} />
        </div>
        <div className="mt-[5rem] mb-3 w-[50rem] flex justify-between items-center">
          <div className="h-[4rem] flex flex-1 justify-center ">
            <input
              placeholder="유저검색"
              className="p-3 h-[100%] w-[30rem] border border-gray-400"
              value={user}
              onInput={searchuser}
            ></input>
          </div>
        </div>
        <div className="p-20 flex text-[2rem] font-bold gap-10 items-center ">
          <div>
            유저
            <span className="px-2 text-orange-500">{userData?.nick}</span>의
            권한을 변경하시겠습니까?
          </div>
          <div
            onClick={() => {
              changeauth.mutate();
              redirect();
            }}
          >
            <ButtonComp width="w-[10rem]" btn={btn} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authority;
