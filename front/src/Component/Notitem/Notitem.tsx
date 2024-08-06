const Notitem = (): JSX.Element => {
  return (
    <div>
      <div className="h-[30rem] flex flex-col items-center">
        <div
          className="my-5 h-[10rem] w-[10rem] bg-[length:10rem_10rem]"
          style={{ backgroundImage: "url(/imgs/hamster.png)" }}
        ></div>
        <div className="text-[1.3rem] font-bold">
          현재 등록된 상품이 없습니다.<div className=""></div>
        </div>
      </div>
    </div>
  );
};

export default Notitem;
