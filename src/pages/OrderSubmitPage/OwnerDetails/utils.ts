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
