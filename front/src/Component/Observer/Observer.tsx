import { useState } from "react";
import { outborder } from "../../lib/styles";

interface IProps {}

const Observer = ({}: IProps): JSX.Element => {
  //옵저버

  //

  const [Testdumis, setTestDumis] = useState<string[]>([]);

  const [starterObserver, setStartObserver] = useState<IntersectionObserver>(
    new IntersectionObserver(
      async (entries) => {
        if (!entries[0].isIntersecting) return;

        setTestDumis((Values) => [...Values, "hi"]);
      },
      { threshold: 0.3 }
    )
  );

  const dumiAdd = () => {};

  //첫 옵저버 셋팅
  //   starterObserver.unobserve(entries[0].target);
  //   starterObserver.observe(lastRoomElem);

  //   lastroomObserver.observe(document.getElementById("forOb"));

  return <div className={`${outborder} p-10`}></div>;
};

export default Observer;
