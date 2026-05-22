import type React from "react";
import { twMerge } from "tailwind-merge";
import { Loading } from "./Loading";

type Props = React.ComponentProps<"button"> & {
  $variant?: "solid" | "outlined";
  $color?: "primary" | "secondary";
  $full?: boolean;
  $loading?: boolean;
};

const VARIANT_COLOR = {
  "solid-primary": "bg-(--bb-primary) border border-transparent",
  "solid-secondary": "bg-(--bb-secondary) text-white border border-transparent",
  "outlined-primary":
    "border border-(--bb-primary) text-(--bb-primary) bg-transparent",
  "outlined-secondary":
    "border border-(--bb-secondary) text-(--bb-secondary) bg-transparent",
};

const DISABLED_VARIANT = {
  solid: "bg-(--bb-disabled) text-(--bb-text-disabled) border-transparent",
  outlined: "border-(--bb-disabled) text-(--bb-text-disabled)",
};

const LOADING_VARIANT = {
  solid: "opacity-80",
  outlined: "opacity-80",
};

export const Button = (props: Props) => {
  const {
    children,
    $variant = "solid",
    $color = "primary",
    $full = false,
    $loading = false,
    type = "button",
    disabled,
    className,
    ...rest
  } = props;

  return (
    <button
      {...rest}
      type={type}
      disabled={disabled || $loading}
      className={twMerge(
        "min-h-12 px-8 text-md font-semibold cursor-pointer flex justify-center items-center gap-x-2",
        VARIANT_COLOR[`${$variant}-${$color}`],
        disabled && "cursor-not-allowed",
        disabled && DISABLED_VARIANT[$variant],
        $loading && "cursor-wait",
        $loading && LOADING_VARIANT[$variant],
        $full && "w-full",
        className,
      )}
    >
      {$loading && <Loading />}
      {children}
    </button>
  );
};
