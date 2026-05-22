import React from "react";

const useOutsideClick = <RefType extends HTMLElement>(
  callback: (event: MouseEvent) => void,
) => {
  const ref = React.useRef<RefType>(null);

  const handler = React.useCallback(
    (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      callback(event);
    },
    [callback],
  );

  React.useEffect(() => {
    window.document.addEventListener("mouseup", handler);
    return () => window.document.removeEventListener("mouseup", handler);
  }, [handler]);

  return ref;
};

export default useOutsideClick;
