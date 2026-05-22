import CarDetails from "./CarDetails";
import OwnerDetails from "./OwnerDetails";

const OrderSubmitPage = () => {
  return (
    <main className="flex flex-col items-center gap-4">
      <CarDetails />
      <OwnerDetails />
    </main>
  );
};

export default OrderSubmitPage;
