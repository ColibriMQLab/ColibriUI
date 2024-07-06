import { useEffect } from "react";

const useScrollLock = () => {
  useEffect(() => {
    const body = document.querySelector("body");
    if (!body) return undefined;

    const { overflow, width } = body.style;

    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";

    if (scrollBarWidth > 0) {
      body.style.width = `calc(100% - ${scrollBarWidth}px)`;
    }

    return () => {
      body.style.overflow = overflow;
      body.style.width = width;
    };
  }, []);
};

export default useScrollLock;
