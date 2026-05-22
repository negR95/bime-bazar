"use client";

import { useId } from "react";
import { twMerge } from "tailwind-merge";

type Props = React.ComponentProps<"input"> & { $error?: string };

export const TextInput = (props: Props) => {
  const { className, id, $error, ...rest } = props;

  const uniqueId = useId();
  const inputId = id || uniqueId;
  const hintId = `${inputId}-hint`;

  return (
    <div className="flex flex-col gap-1">
      <input
        {...rest}
        id={inputId}
        aria-invalid={!!$error}
        aria-describedby={$error ? hintId : undefined}
        className={twMerge(
          "w-full h-12 px-4 focus:outline-none focus:border-gray-900 border border-(--bb-border) text-(--bb-input-text) text-sm font-medium placeholder:text-(--bb-input-text)",
          $error &&
            "border-red-500 focus:border-red-500 text-red-500 placeholder:text-red-500",
          className,
        )}
      />

      {<span className="text-xs text-red-500 h-4">{$error}</span>}
    </div>
  );
};
