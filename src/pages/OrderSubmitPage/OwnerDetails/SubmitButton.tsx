import { useFormikContext } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "#/components/Button";
import { api } from "#/services/api";
import { useMutation } from "#/services/hooks";
import type { OwnerDetailsFormikValues } from "./utils";

export const SubmitButton = () => {
  const router = useRouter();
  const { values, dirty, isValid } =
    useFormikContext<OwnerDetailsFormikValues>();

  const {
    mutate: submitOrder,
    data,
    loading: isSubmitting,
    error,
  } = useMutation(api.saveOrder);

  const handleSubmitOrder = async () => {
    if (!values.selectedAddress?.id) return;

    await submitOrder({
      addressId: values.selectedAddress.id,
      nationalId: values.nationalId,
      phoneNumber: values.phoneNumber,
    });
  };

  React.useEffect(() => {
    if (data && !error) router.push("/order/success");
  }, [data, error, router]);

  return (
    <Button
      type="submit"
      $color="secondary"
      disabled={!dirty || !isValid || isSubmitting}
      $loading={isSubmitting}
      onClick={handleSubmitOrder}
    >
      تایید و ادامه
    </Button>
  );
};
