import { LuScanLine } from "react-icons/lu";

const Scan = (): JSX.Element => {
  return (
    <div className="h-[20rem] w-[20em] border border-black">
      <div className="absolute h-[20rem] w-[20rem]">
        <LuScanLine
          className="h-[20rem] w-[20rem]"
          color="gray"
          opacity={0.3}
        />
      </div>
      <img src="/imgs/IMG_1409.png" className="h-[100%] w-[100%]"></img>
    </div>
  );
};

export default Scan;
