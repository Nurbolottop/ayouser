import { useRef } from "react";

export const useDebounce = (callback: Function, delay = 1000) => {
  const timer: any = useRef(null);

  return (arg: any) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      callback(arg);
    }, delay);
  };
};
