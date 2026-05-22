import Link from "next/link";
import Button from "#/components/Button";
import CarDetails from "#/_pages/OrderSubmitPage/CarDetails";

const OrderSuccessPage = () => {
  return (
    <div className="flex flex-col h-dvh justify-between">
      <CarDetails isSuccessPage />

      <div className="flex justify-end px-4 py-2">
        <Link href="/order/submit">
          <Button $color="secondary">بازگشت</Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
