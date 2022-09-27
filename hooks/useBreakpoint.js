import { useEffect, useState } from "react";
import breakpoints from "@utils/break-points";

const useBreakpoint = () => {
  const [breakpoint, setBreakPoint] = useState("");
  const [screen, setScreen] = useState({});
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    if (0 < windowSize.width && windowSize.width < 600) {
      setBreakPoint(breakpoints[0]);
      setScreen({ ...screen, xs: true });
    }
    if (600 < windowSize.width && windowSize.width < 960) {
      setBreakPoint(breakpoints[600]);
      setScreen({ ...screen, sm: true });
    }
    if (960 < windowSize.width && windowSize.width < 1280) {
      setBreakPoint(breakpoints[960]);
      setScreen({ ...screen, md: true });
    }
    if (1280 < windowSize.width && windowSize.width < 1920) {
      setBreakPoint(breakpoints[1280]);
      setScreen({ ...screen, lg: true });
    }
    if (windowSize.width >= 1920) {
      setBreakPoint(breakpoints[1920]);
      setScreen({ ...screen, xl: true });
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [windowSize.width]);
  return screen;
};

export default useBreakpoint;
