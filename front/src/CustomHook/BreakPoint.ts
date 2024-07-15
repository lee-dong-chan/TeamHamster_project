import { useEffect, useState } from "react";

export const useBreakPoint = () => {
  const [ismobile, setIsMobile] = useState(false);
  const [isdesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setIsMobile(screenWidth < 768);
      setIsDesktop(screenWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return { ismobile, isdesktop };
};
