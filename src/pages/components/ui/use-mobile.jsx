import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => {
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia === "undefined"
    ) {
      return false; // SSR: tạm thời coi là non-mobile
    }
    return window.matchMedia(`(max-width:${MOBILE_BREAKPOINT - 1}px)`).matches;
  });

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia === "undefined"
    )
      return;

    const mql = window.matchMedia(`(max-width:${MOBILE_BREAKPOINT - 1}px)`);
    const handler = (e) => setIsMobile(e.matches);

    // Safari cũ fallback
    if (mql.addEventListener) {
      mql.addEventListener("change", handler);
      return () => mql.removeEventListener("change", handler);
    } else {
      mql.addListener(handler);
      return () => mql.removeListener(handler);
    }
  }, []);

  return !!isMobile; // hoặc `!!isMobile` nếu bạn muốn chắc chắn là boolean
};

// export const useIsMobile = () => {
//     const [isMobile, setIsMobile] = useState(undefined);

//     useEffect(() => {
//         const mql = window.matchMedia(`(max-width:${MOBILE_BREAKPOINT - 1}px)`);
//         const onChange = () => {
//             setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
//         };
//         mql.addEventListener("change", onChange);
//         setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
//         return () => mql.removeEventListener("change", onChange)
//     }, [])

//     return !!isMobile;
// }
