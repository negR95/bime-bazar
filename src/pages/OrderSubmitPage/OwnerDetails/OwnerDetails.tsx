"use client";

import { Formik } from "formik";
import React from "react";
import { twMerge } from "tailwind-merge";
import { BottomSheet } from "#/components/BottomSheet";
import { Button } from "#/components/Button";
import { Section } from "#/components/Section";
import { TextInput } from "#/components/TextInput";
import type { Address } from "#/services/api";
import { RemoveAddress } from "./RemoveAddress";
import { SelectAddress } from "./SelectAddress";
import { SubmitButton } from "./SubmitButton";
import { SubmitError } from "./SubmitError";
import { initialValues, validationSchema } from "./utils";

const NOT_DIGIT_REGEX = /\D/g;

export const OwnerDetails = () => {
  const [open, setOpen] = React.useState(false);
  const [sheet, setSheet] = React.useState<SheetContent>("unset");
  const [addressToRemove, setAddressToRemove] = React.useState<Address>();

  const onClose = () => {
    setOpen(false);
    setSheet("unset");
  };

  return (
    <Section $title="مشخصات مالک خودرو">
      <h4 className="text-md font-medium mb-2">
        لطفا اطلاعات شخصی مالک خودرو را وارد کنید:
      </h4>

      <Formik
        onSubmit={() => {}}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleSubmit,
          handleBlur,
          setFieldValue,
        }) => {
          const BOTTOM_SHEETS = {
            unset: null,
            "select-address": (
              <SelectAddress
                $onClose={onClose}
                setSheet={setSheet}
                setAddressToRemove={setAddressToRemove}
              />
            ),
            "remove-address": (
              <RemoveAddress
                $onClose={onClose}
                address={addressToRemove}
                setSheet={setSheet}
              />
            ),
            "submit-error": <SubmitError $onClose={onClose} />,
          };

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
                  values.selectedAddress && "text-[#757575]",
                  "text-sm mb-3 ",
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

              <div className="flex flex-col gap-6 items-end">
                <BottomSheet $open={open} $onClose={onClose}>
                  {BOTTOM_SHEETS[sheet]}
                </BottomSheet>

                <Button
                  type="button"
                  className={twMerge(values.selectedAddress && "invisible")}
                  $full
                  onClick={(event) => {
                    event.stopPropagation();
                    setOpen(true);
                    setSheet("select-address");
                  }}
                >
                  انتخاب از آدرس‌های من
                </Button>

                <SubmitButton setSheet={setSheet} />
              </div>
            </form>
          );
        }}
      </Formik>
    </Section>
  );
};
