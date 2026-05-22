import { client } from "./client";

export interface Address {
  id: string;
  name: string;
  details: string;
}

export type AddressResponse = Address[];

export interface SaveOrderRequest {
  nationalId: string;
  phoneNumber: string;
  addressId: string;
}

export interface SaveOrderResponse {
  success?: boolean;
  message?: string;
}

export const api = {
  getAddresses: async () => {
    const response = await client.get<AddressResponse>("/my-addresses/");
    return response.data;
  },

  saveOrder: async (data: SaveOrderRequest) => {
    const response = await client.post<SaveOrderResponse>(
      "/order/completion/",
      data,
    );
    return response.data;
  },
};
