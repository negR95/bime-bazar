import { Button } from "#/components/Button";

type Props = { $onClose: () => void };

export const SubmitError = (props: Props) => {
  const { $onClose } = props;

  return (
    <section>
      <div className="px-2 pt-4 text-sm font-medium">
        <p>متاسفانه در ثبت اطلاعات شما، خطایی رخ داده است.</p>
        <p>مجددا، تلاش کنید. </p>
      </div>

      <div className="flex gap-2 p-2 shadow">
        <Button $full onClick={() => {}} $color="secondary">
          تلاش مجدد
        </Button>
        <Button $full onClick={$onClose} $color="secondary" $variant="outlined">
          بازگشت
        </Button>
      </div>
    </section>
  );
};
