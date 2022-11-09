import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const useAutoScrollTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    document.getElementById("app")?.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [pathname]);
};

export default useAutoScrollTop;
