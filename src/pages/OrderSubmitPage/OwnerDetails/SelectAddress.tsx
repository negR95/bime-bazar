import { useFormikContext } from "formik";
import React from "react";
import { Button } from "#/components/Button";
import { CloseIcon } from "#/components/CloseIcon";
import { type Address, api } from "#/services/api";
import { useQuery } from "#/services/hooks";
import type { OwnerDetailsFormikValues } from "./utils";

type Props = {
  $onClose: () => void;
  setSheet: React.Dispatch<React.SetStateAction<SheetContent>>;
  setAddressToRemove: (address: Address) => void;
};

export const SelectAddress = (props: Props) => {
  const { $onClose, setSheet, setAddressToRemove } = props;
  const [selectedAddress, setSelectedAddress] = React.useState<Address | null>(
    null,
  );
  const { setFieldValue } = useFormikContext<OwnerDetailsFormikValues>();
  const { data: addresses, loading } = useQuery(api.getAddresses);

  return (
    <section>
      <header className="flex justify-between items-center h-14 px-4 border-b border-(--bb-divider)">
        <h4 className="text-md font-medium">انتخاب آدرس</h4>

        <button
          type="button"
          onClick={$onClose}
          className="hover:bg-gray-50 cursor-pointer"
        >
          <CloseIcon />
        </button>
      </header>

      <div className="flex flex-col max-h-[35dvh] h-full overflow-y-auto">
        {loading ? (
          <p className="flex items-center justify-center p-4 text-sm text-gray-500 h-48">
            در حال دریافت آدرس‌ها...
          </p>
        ) : (
          addresses?.map((address) => (
            <div key={address.id} className="h-14 flex flex-row pr-4 py-2">
              <label className="flex flex-row">
                <input
                  type="radio"
                  className="self-start"
                  checked={address.id === selectedAddress?.id}
                  onChange={() => setSelectedAddress(address)}
                />

                <div className="flex flex-col flex-1 gap-2 mr-2">
                  <p className="text-sm font-medium leading-[14px]">
                    {address.name}
                  </p>

                  <p className="text-[12px] text-gray-500 truncate w-[280px]">
                    {address.details}
                  </p>
                </div>
              </label>

              <button
                type="button"
                className="p-1 mr-1 hover:bg-gray-50 cursor-pointer self-start"
                onClick={(event) => {
                  event.stopPropagation();
                  setAddressToRemove(address);
                  setSheet("remove-address");
                }}
              >
                <CloseIcon $color="red" $size="10x" />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="p-2 shadow">
        <Button
          $full
          disabled={selectedAddress === null}
          onClick={() => {
            if (selectedAddress !== null) {
              setFieldValue("selectedAddress.id", selectedAddress.id);
              setFieldValue("selectedAddress.text", selectedAddress.details);
            }
            $onClose();
          }}
          $color="secondary"
        >
          انتخاب
        </Button>
      </div>
    </section>
  );
};
