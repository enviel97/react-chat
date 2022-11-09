import { Devices, DevicesValue } from "@common/helper/breakpoint";
import { useState, useCallback, useLayoutEffect } from "react";

const useBreakpoint = () => {
  const hasWindow = typeof window !== "undefined";

  const getWindowDimensions = useCallback(() => {
    const width = hasWindow ? window.innerWidth : 0;
    const height = hasWindow ? window.innerHeight : 0;
    return { width, height };
  }, [hasWindow]);

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useLayoutEffect(() => {
    if (hasWindow) {
      const handleResize = () => {
        setWindowDimensions(getWindowDimensions());
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [hasWindow, getWindowDimensions]);

  return {
    down: (devices: Devices) => windowDimensions.width <= DevicesValue[devices],
    up: (devices: Devices) => windowDimensions.width >= DevicesValue[devices],
  };
};

export default useBreakpoint;
