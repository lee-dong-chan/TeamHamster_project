import { useEffect, useState } from "react";

export const Debounce = (value: string, timer: number): string => {
  const [devouncevalue, SetDevounceValue] = useState(value);

  useEffect(() => {
    const Change = setTimeout(() => {
      SetDevounceValue(value);
    }, timer);
    return () => {
      clearTimeout(Change);
    };
  }, [value, timer]);
  return devouncevalue;
};
