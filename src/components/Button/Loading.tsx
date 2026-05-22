import Image from "next/image";

export const Loading = () => {
  return (
    <Image
      alt="loading"
      src="/images/loading.svg"
      width={20}
      height={20}
      className="animate-spin"
    />
  );
};
