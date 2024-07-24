import { useEffect } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";

interface IProps {
  setaddress({}): void;
}

const DaumApi = ({ setaddress }: IProps): JSX.Element => {
  const style = {
    width: "100%",
    height: "30rem",
  };
  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setaddress({
      // code: data.roadnameCode,
      code: data.zonecode,
      full: fullAddress,
    });
  };

  return (
    <div className="px-5 flex-1 flex flex-col  ">
      <div className="p-5 text-center text-[1.2rem]">주소 검색</div>
      <DaumPostcodeEmbed style={style} onComplete={handleComplete} />
    </div>
  );
};
export default DaumApi;
