"use client";

import React from "react";
import type { OwnerDetailsFormikValues } from "#/_pages/OrderSubmitPage/OwnerDetails/utils";

export type GlobalContextType = [
  OwnerDetailsFormikValues | null,
  React.Dispatch<React.SetStateAction<OwnerDetailsFormikValues | null>>,
];

const globalContext = React.createContext<GlobalContextType>([null, () => {}]);

export const { Provider } = globalContext;
export const useGlobalContext = () => React.useContext(globalContext);
