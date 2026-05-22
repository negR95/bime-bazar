import Link from "next/link";
import { Button } from "#/components/Button";
import { CarDetails } from "#/pages/OrderSubmitPage/CarDetails";

export const OrderSuccessPage = () => {
  return (
    <div className="flex flex-col h-dvh justify-between">
      <CarDetails isSuccessPage />

      <div className="px-4 py-2">
        <Link href="/order/submit">
          <Button $color="secondary" className="mr-auto">
            بازگشت
          </Button>
        </Link>
      </div>
    </div>
  );
};
