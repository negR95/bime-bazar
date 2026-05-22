"use client";

import React from "react";
import BottomSheet from "#/components/BottomSheet";
import type { Address } from "#/services/api";
import { useSheet } from "../utils";
import RemoveAddress from "./RemoveAddress";
import SelectAddress from "./SelectAddress";
import SubmitError from "./SubmitError";

const Sheets = () => {
  const [open, setOpen] = React.useState(false);
  const [addressToRemove, setAddressToRemove] = React.useState<Address>();
  const [sheet, setSheet] = useSheet();

  const onClose = () => {
    setOpen(false);
    setSheet("unset");
  };

  const content = {
    unset: null,
    "select-address": (
      <SelectAddress
        $onClose={onClose}
        setAddressToRemove={setAddressToRemove}
      />
    ),
    "remove-address": (
      <RemoveAddress $onClose={onClose} address={addressToRemove} />
    ),
    "submit-error": <SubmitError $onClose={onClose} />,
  }[sheet];

  React.useEffect(() => {
    setOpen(sheet !== "unset");
  }, [sheet]);

  return (
    <BottomSheet $open={open} $onClose={onClose}>
      {content}
    </BottomSheet>
  );
};

export default Sheets;
