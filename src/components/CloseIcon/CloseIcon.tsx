import Image from "next/image";

type Props = { $color?: "neutral" | "red"; $size?: "24x" | "10x" };

export const CloseIcon = (props: Props) => {
  const { $color = "neutral", $size = "24x" } = props;

  const size = { "10x": 10, "24x": 24 }[$size];

  return (
    <Image
      alt="close-icon"
      src={`/images/close-icon${$color === "neutral" ? "" : `-${$color}`}.svg`}
      width={size}
      height={size}
      loading="eager"
    />
  );
};
