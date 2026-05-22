"use client";

import React from "react";
import ReactDOM from "react-dom";
import { twMerge } from "tailwind-merge";
import useIsClient from "#/hooks/useIsClient";
import useOutsideClick from "#/hooks/useOutsideClick";
import { Overlay } from "./Overlay";

type Props = React.PropsWithChildren<{
  $open?: boolean;
  $onClose: (event?: Event) => void;
}>;

export const BottomSheet = (props: Props) => {
  const { children, $open, $onClose } = props;
  const isClient = useIsClient();
  const ref = useOutsideClick($onClose);

  if (isClient === false) return null;
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
