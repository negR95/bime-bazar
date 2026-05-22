import Button from "#/components/Button";
import CloseIcon from "#/components/CloseIcon";
import type { Address } from "#/services/api";
import { removedAdressesIds, useSheet } from "../utils";

type Props = {
  $onClose: () => void;
  address?: Address;
};

const RemoveAddress = (props: Props) => {
  const { $onClose, address } = props;
  const [, setSheet] = useSheet();

  return (
    <section>
      <header className="flex justify-between items-center h-14 px-3 border-b border-(--bb-divider)">
        <h4 className="text-md font-medium">حذف آدرس</h4>

        <button
          type="button"
          onClick={$onClose}
          className="hover:bg-gray-50 cursor-pointer"
        >
          <CloseIcon />
        </button>
      </header>

      <p className="px-2.5 pt-4 text-sm font-medium">
        آیا از حذف آدرس خود، مطمین هستید؟
      </p>

      <div className="mx-2.5 my-4 p-2 bg-[#f2f2f2] flex flex-col gap-2">
        <span className="text-sm font-medium">{address?.name}</span>
        <p className="text-xs text-[#757575]">{address?.details}</p>
      </div>

      <div className="flex gap-2.5 p-2.5 shadow">
        <Button
          $full
          onClick={() => {
            if (!address) return $onClose();
            removedAdressesIds.add(address.id);
            setSheet("select-address");
          }}
          $color="secondary"
        >
          تایید
        </Button>

        <Button
          $full
          onClick={() => setSheet("select-address")}
          $color="secondary"
          $variant="outlined"
        >
          بازگشت
        </Button>
      </div>
    </section>
  );
};

export default RemoveAddress;
