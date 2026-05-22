"use client";

import React from "react";
import ReactDOM from "react-dom";
import { twMerge } from "tailwind-merge";
import { useOutsideClick } from "#/utils";
import { Overlay } from "./Overlay";

type Props = React.PropsWithChildren<{
  $open?: boolean;
  $onClose: (event?: Event) => void;
}>;

export const BottomSheet = (props: Props) => {
  const { children, $open, $onClose } = props;
  const [mounted, setMounted] = React.useState(false);
  const ref = useOutsideClick($onClose);

  React.useEffect(() => {
    if ($open) {
      window.history.pushState({ bottomSheetOpen: true }, "");
      window.addEventListener("popstate", $onClose);
    } else if (window.history.state?.bottomSheetOpen) window.history.back();
    return () => window.removeEventListener("popstate", $onClose);
  }, [$open, $onClose]);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (mounted === false) return null;
  return ReactDOM.createPortal(
    <React.Fragment>
      <Overlay $show={$open} $onClick={$onClose} />
      <section
        ref={ref}
        className={twMerge(
          "fixed inset-x-0 bottom-0 bg-white max-w-[360px] mx-auto transition-transform duration-300 z-1000",
          $open ? "translate-y-0" : "translate-y-full",
        )}
      >
        {children}
      </section>
    </React.Fragment>,
    window.document.body,
  );
};
