import Image from "next/image";

type Props = React.PropsWithChildren<{ $title: string }>;

export const Section = (props: Props) => {
  const { children, $title } = props;

  return (
    <section className="w-full">
      <header className="h-14 flex px-2 items-center gap-2 shadow-(--bb-shadow)">
        <Image
          alt="car-icon"
          src="/images/car-icon.svg"
          width={32}
          height={32}
          loading="eager"
        />

        <h4 className="text-lg font-medium">{$title}</h4>
      </header>

      <div className="p-6">{children}</div>
    </section>
  );
};
