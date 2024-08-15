import { useDispatch, useSelector, useStore } from "react-redux";
import type { RootState, AppDispatch, AppStore } from "./store";
import React, { useEffect } from "react";
import { debounce } from "lodash";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

export const useOutsideClick = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void
) => {
  useEffect(() => {
    const handleDetectClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };

    document.addEventListener("click", handleDetectClick);

    return () => document.removeEventListener("click", handleDetectClick);
  }, [ref, callback]);
};

export const handleScrollDown = (ref: React.RefObject<HTMLDivElement>) => {
  if (ref.current) {
    ref.current.scrollTo({
      top: ref.current.scrollHeight,
      behavior: "smooth",
    });
  }
};

export const detectScroll = debounce((ref, callback) => {
  if (ref.current) {
    const { scrollTop } = ref.current;

    if (scrollTop === 0) {
      callback && callback();
    }
  }
}, 300);
