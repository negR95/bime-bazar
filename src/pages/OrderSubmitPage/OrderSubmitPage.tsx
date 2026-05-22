import { CarDetails } from "./CarDetails";
import { OwnerDetails } from "./OwnerDetails";

export const OrderSubmitPage = () => {
  return (
    <main className="flex flex-col items-center gap-4">
      <CarDetails />
      <OwnerDetails />
    </main>
  );
};
