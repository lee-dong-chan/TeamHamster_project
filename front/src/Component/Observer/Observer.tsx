import { useEffect, useMemo, useRef } from "react";

interface IProps {
  func: (i: number) => void;
  funcValue: number;
}

const Observer = ({ func, funcValue }: IProps): JSX.Element => {
  const observerElem: React.MutableRefObject<null> = useRef(null);

  const observer = useMemo<IntersectionObserver>(() => {
    return new IntersectionObserver(
      async (entries) => {
        if (!entries[0].isIntersecting) return;

        //실행할 함수
        func(funcValue);
        console.log("옵저버 실행");

        //옵저버 재실행
        observer.unobserve(entries[0].target);
        if (observerElem.current) observer.observe(observerElem.current);
      },
      { threshold: 0.1 }
    );
  }, []);

  useEffect(() => {
    if (observerElem.current) observer.observe(observerElem.current);
  }, [observerElem.current]);

  return <div ref={observerElem} className={`p-3`}></div>;
};

export default Observer;
