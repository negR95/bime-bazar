"use client";

import type { PropsWithChildren } from "react";
import React from "react";
import type { OwnerDetailsFormikValues } from "#/_pages/OrderSubmitPage/OwnerDetails/utils";
import { Provider } from "./context";

export const GlobalContext = (props: PropsWithChildren) => {
  const { children } = props;
  const value = React.useState<OwnerDetailsFormikValues | null>(null);
  return <Provider value={value}>{children}</Provider>;
};
