import { Button } from "#/components/Button";
import { api } from "#/services/api";
import { useMutation } from "#/services/hooks";
import { useFormikContext } from "formik";
import type { OwnerDetailsFormikValues } from "./utils";

type Props = { $onClose: () => void };

export const SubmitError = (props: Props) => {
  const { $onClose } = props;
  const { values } = useFormikContext<OwnerDetailsFormikValues>();

  const { mutate: submitOrder, loading: isSubmitting } = useMutation(
    api.saveOrder,
  );

  const handleSubmitOrder = async () => {
    if (!values.selectedAddress?.id) return;

    await submitOrder({
      addressId: values.selectedAddress.id,
      nationalId: values.nationalId,
      phoneNumber: values.phoneNumber,
    });
  };

  return (
    <section>
      <div className="flex flex-col gap-2 mb-3 px-2 pt-4 text-sm font-medium">
        <p>متاسفانه در ثبت اطلاعات شما، خطایی رخ داده است.</p>
        <p>مجددا، تلاش کنید. </p>
      </div>

      <div className="flex gap-2.5 p-2.5 shadow">
        <Button
          $full
          onClick={handleSubmitOrder}
          $loading={isSubmitting}
          $color="secondary"
        >
          تلاش مجدد
        </Button>
        <Button $full onClick={$onClose} $color="secondary" $variant="outlined">
          بازگشت
        </Button>
      </div>
    </section>
  );
};
