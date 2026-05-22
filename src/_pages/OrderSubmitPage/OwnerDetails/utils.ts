import React from "react";
import * as Yup from "yup";

export type OwnerDetailsFormikValues = {
  nationalId: string;
  phoneNumber: string;
  selectedAddress: {
    id: string;
    text: string;
  } | null;
};

export const initialValues: OwnerDetailsFormikValues = {
  nationalId: "",
  phoneNumber: "",
  selectedAddress: null,
};

const TEN_DIGI_REGEX = /^\d{10}$/;
const ONE_PLUS_NINE_DIGIT_REGEX = /^(\d)\1{9}$/;

const isValidIranianNationalId = (nationalId: string) => {
  if (!nationalId) return false;
  if (!TEN_DIGI_REGEX.test(nationalId)) return false;
  if (ONE_PLUS_NINE_DIGIT_REGEX.test(nationalId)) return false;

  const check = parseInt(nationalId[9], 10);
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(nationalId[i], 10) * (10 - i);
  const remainder = sum % 11;

  if (remainder < 2) return check === remainder;
  else return check === 11 - remainder;
};

export const validationSchema = Yup.object().shape({
  nationalId: Yup.string()
    .required("کد ملی الزامی است.")
    .test("is-valid-national-id", "کد ملی وارد شده نامعتبر است.", (value) =>
      isValidIranianNationalId(value || ""),
    ),

  phoneNumber: Yup.string()
    .required("شماره تلفن همراه الزامی است.")
    .matches(
      /^(09\d{9}|9\d{9})$/,
      "شماره تلفن همراه نامعتبر است (مثال: 09123456789 یا 9123456789)",
    ),

  selectedAddress: Yup.object()
    .shape({
      id: Yup.string(),
      text: Yup.string(),
    })
    .required("لطفاً یک آدرس را انتخاب کنید."),
});

export const removedAdressesIds = new Set<string>();

type SheetContent =
  | "unset"
  | "select-address"
  | "remove-address"
  | "submit-error";

const INTERNAL_SHEET_CHANGE_EVENT_NAME = "internal-sheet-change";
export const useSheet = () => {
  const [currentSheet, setCurrentSheet] = React.useState<SheetContent>(() => {
    if (typeof window !== "undefined")
      return window.history.state?.virtualSheetContent || "unset";
    return "unset";
  });

  const sheetRef = React.useRef(currentSheet);

  React.useEffect(() => {
    sheetRef.current = currentSheet;
  }, [currentSheet]);

  React.useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const state = event.state;
      if (state?.virtualSheetContent)
        setCurrentSheet(state.virtualSheetContent);
      else setCurrentSheet("unset");
    };

    const handleCustomSheetChange = (event: Event) => {
      const customEvent = event as CustomEvent<SheetContent>;
      setCurrentSheet(customEvent.detail);
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener(
      INTERNAL_SHEET_CHANGE_EVENT_NAME,
      handleCustomSheetChange,
    );

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener(
        INTERNAL_SHEET_CHANGE_EVENT_NAME,
        handleCustomSheetChange,
      );
    };
  }, []);

  const setSheet = React.useCallback((newSheet: SheetContent) => {
    if (sheetRef.current === newSheet) return;

    if (newSheet === "unset") {
      window.dispatchEvent(
        new CustomEvent(INTERNAL_SHEET_CHANGE_EVENT_NAME, { detail: "unset" }),
      );
      window.history.back();
      return;
    }

    const currentState = window.history.state || {};
    window.history.pushState(
      { ...currentState, virtualSheetContent: newSheet },
      "",
      window.location.href,
    );

    window.dispatchEvent(
      new CustomEvent(INTERNAL_SHEET_CHANGE_EVENT_NAME, { detail: newSheet }),
    );
  }, []);

  return [currentSheet, setSheet] as const;
};
