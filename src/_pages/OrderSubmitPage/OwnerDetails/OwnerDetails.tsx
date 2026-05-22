"use client";

import { Formik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import { twMerge } from "tailwind-merge";
import Button from "#/components/Button";
import { useGlobalContext } from "#/components/GlobalContext";
import Section from "#/components/Section";
import TextInput from "#/components/TextInput";
import { api } from "#/services/api";
import { useMutation } from "#/services/hooks";
import Sheets from "./sheets/Sheets";
import { initialValues, useSheet, validationSchema } from "./utils";

const NOT_DIGIT_REGEX = /\D/g;

const OwnerDetails = () => {
  const router = useRouter();
  const [, setSheet] = useSheet();
  const [initValues, setInitValues] = React.useState(initialValues);
  const [gCtx, setGCtx] = useGlobalContext();

  const {
    mutate: submitOrder,
    loading: isSubmitting,
    error,
  } = useMutation(api.saveOrder);

  React.useEffect(() => {
    if (!gCtx) return;
    setInitValues(gCtx);
  }, [gCtx]);

  React.useEffect(() => {
    if (error == null) return;
    setSheet("submit-error");
  }, [error, setSheet]);

  return (
    <Section $title="مشخصات مالک خودرو">
      <h4 className="text-md font-medium mb-2">
        لطفا اطلاعات شخصی مالک خودرو را وارد کنید:
      </h4>

      <Formik
        onSubmit={async (values) => {
          if (!values.selectedAddress?.id) return;

          await submitOrder({
            addressId: values.selectedAddress.id,
            nationalId: values.nationalId,
            phoneNumber: values.phoneNumber,
          });

          setGCtx(values);
          router.push("/order/success");
        }}
        initialValues={initValues}
        validationSchema={validationSchema}
        enableReinitialize
        validateOnMount
      >
        {({
          values,
          isValid,
          errors,
          touched,
          handleSubmit,
          handleBlur,
          setFieldValue,
        }) => {
          const handleNumericChange = (
            event: React.ChangeEvent<HTMLInputElement>,
          ) => {
            const { name, value } = event.target;
            setFieldValue(name, value.replace(NOT_DIGIT_REGEX, ""));
          };

          return (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2 mb-10">
                <TextInput
                  type="text"
                  inputMode="numeric"
                  placeholder="کد ملی"
                  name="nationalId"
                  value={values.nationalId}
                  onChange={handleNumericChange}
                  onBlur={handleBlur}
                  $error={touched.nationalId ? errors.nationalId : undefined}
                />

                <TextInput
                  type="text"
                  inputMode="tel"
                  placeholder="شماره تلفن همراه"
                  name="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handleNumericChange}
                  onBlur={handleBlur}
                  $error={touched.phoneNumber ? errors.phoneNumber : undefined}
                />
              </div>

              <h4 className="text-md font-medium mb-2">
                آدرس جهت درج روی بیمه‌نامه
              </h4>

              <p
                className={twMerge(
                  "text-sm mb-3",
                  values.selectedAddress && "text-[#757575]",
                  touched.selectedAddress
                    ? errors.selectedAddress && "text-red-500"
                    : false,
                )}
              >
                {touched.selectedAddress
                  ? errors.selectedAddress &&
                    "لطفا آدرسی را که می‌‌خواهید روی بیمه‌نامه درج شود، وارد کنید."
                  : values.selectedAddress?.text ||
                    "لطفا آدرسی را که می‌‌خواهید روی بیمه‌نامه درج شود، وارد کنید."}
              </p>

              <div className="flex flex-col gap-6 items-end mt-auto">
                <Sheets />

                <Button
                  type="button"
                  className={twMerge(values.selectedAddress && "invisible")}
                  $full
                  onClick={(event) => {
                    event.stopPropagation();

                    setSheet("select-address");
                  }}
                >
                  انتخاب از آدرس‌های من
                </Button>

                <Button
                  type="submit"
                  $color="secondary"
                  disabled={!isValid || isSubmitting}
                  $loading={isSubmitting}
                >
                  تایید و ادامه
                </Button>
              </div>
            </form>
          );
        }}
      </Formik>
    </Section>
  );
};

export default OwnerDetails;
