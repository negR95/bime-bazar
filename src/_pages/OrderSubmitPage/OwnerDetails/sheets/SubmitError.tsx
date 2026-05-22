import { useFormikContext } from "formik";
import Button from "#/components/Button";
import type { OwnerDetailsFormikValues } from "../utils";

type Props = { $onClose: () => void };

const SubmitError = (props: Props) => {
  const { $onClose } = props;
  const { submitForm } = useFormikContext<OwnerDetailsFormikValues>();

  return (
    <section>
      <div className="flex flex-col gap-2 mb-3 px-2 pt-4 text-sm font-medium">
        <p>متاسفانه در ثبت اطلاعات شما، خطایی رخ داده است.</p>
        <p>مجددا، تلاش کنید. </p>
      </div>

      <div className="flex gap-2.5 p-2.5 shadow">
        <Button $full onClick={submitForm} $color="secondary">
          تلاش مجدد
        </Button>

        <Button $full onClick={$onClose} $color="secondary" $variant="outlined">
          بازگشت
        </Button>
      </div>
    </section>
  );
};

export default SubmitError;
