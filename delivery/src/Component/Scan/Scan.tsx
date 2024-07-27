import { LuScanLine } from "react-icons/lu";

const Scan = (): JSX.Element => {
  return (
    <div
      className="h-[20rem] w-[20rem] border border-black "
      style={{
        backgroundImage: `url(/imgs/IMG_1409.png)`,
        backgroundSize: "cover",
      }}
    >
      <div className="fix h-[20rem] w-[20rem]">
        <LuScanLine
          className="h-[20rem] w-[20rem]"
          color="gray"
          opacity={0.3}
        />
        {/* <img src="/imgs/IMG_1409.png" className="h-[100%] w-[100%]"></img> */}
      </div>
    </div>
  );
};

export default Scan;
