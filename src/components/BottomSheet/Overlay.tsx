/** biome-ignore-all lint/a11y: OVERLAY */

import { twMerge } from "tailwind-merge";

type Props = {
  $show?: boolean;
  $onClick?: (event: never) => void;
};

export const Overlay = (props: Props) => {
  const { $show, $onClick } = props;

  return (
    <div
      onClick={$onClick}
      className={twMerge(
        "fixed inset-0 transition duration-300 bg-(--bb-overlay) max-w-[360px] mx-auto opacity-0 pointer-events-none z-999",
        $show && "opacity-100 pointer-events-auto",
      )}
    />
  );
};
