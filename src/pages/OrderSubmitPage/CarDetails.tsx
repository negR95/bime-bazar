import Image from "next/image";
import { Section } from "#/components/Section";

const Details = (props: { rightText: string; leftText: string }) => {
  return (
    <div className="flex items-center gap-2 px-5 text-sm">
      <p className="text-(--bb-gray-900)">{props.rightText}</p>
      <hr className="flex-1 border-(--bb-divider) border-dashed" />
      <p>{props.leftText}</p>
    </div>
  );
};

export const CarDetails = (props: { isSuccessPage?: boolean }) => {
  const { isSuccessPage = false } = props;

  return (
    <Section $title="مشخصات بیمه نامه">
      {isSuccessPage && (
        <div className="flex flex-col justify-center items-center">
          <Image
            alt="success"
            src="/images/success.svg"
            width={60}
            height={66}
            className="mx-auto mb-6"
            loading="eager"
          />
          <h4 className="mb-8">
            ثبت اطلاعات شما، با <span className="text-[#34A862]">موفقیت</span>{" "}
            انجام شد.
          </h4>
        </div>
      )}

      <Image
        alt="car-plate"
        src="/images/car-plate.svg"
        width={280}
        height={50}
        className="mx-auto mb-6"
        loading="eager"
      />
      <div className="flex flex-col gap-2">
        <Details rightText="شرکت بیمه‌گر" leftText="پارسیان" />
        <Details rightText="برند خودرو" leftText="پژو" />
        <Details rightText="مدل خودرو" leftText="206 تیپ 6" />
      </div>
    </Section>
  );
};
