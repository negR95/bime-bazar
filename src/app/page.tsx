import Link from "next/link";
import Button from "#/components/Button";

const HomePage = () => {
  return (
    <div className="h-dvh flex flex-col items-center justify-center">
      <Link href="/order/submit">
        <Button>ثبت سفارش جدید</Button>
      </Link>
    </div>
  );
};

export default HomePage;
