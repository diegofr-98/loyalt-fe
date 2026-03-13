import { type Business, BusinessSchema, type CustomersResponse } from "./types";

const BASE_URL = import.meta.env.VITE_BACKEND_URL + "/api/v1";

export const fetchBusinessByOwnerId = async (
  ownerId: string,
  token: string
): Promise<Business | null> => {
    const response = await fetch(`${BASE_URL}/business/${ownerId}`,{ headers: { Authorization: `Bearer ${token}` } });

    if(!response.ok) {
        return null;
    }

    const json = await response.json();
    const parsed = BusinessSchema.safeParse(json);

    if(!parsed.success) {
        return null;
    }

    return parsed.data;
};

export const createBusiness = async (
  businessName: string,
  businessTypeId: string,
  logoUrl: string,
  token: string
) => {
  const response = await fetch(`${BASE_URL}/business`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      businessName,
      businessTypeId,
      logoUrl,
    }),
  });

  return response.json();
};

export const fetchCustomersByBusinessId = async (
  businessId: string,
  token: string,
  page = 0,
  size = 10
): Promise<CustomersResponse> => {
  const response = await fetch(`${BASE_URL}/business/${businessId}/customers?page=${page}&size=${size}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};

export const fetchCustomersAnalyticsByBusinessId = async (
  businessId: string,
  token: string
) => {
  const response = await fetch(`${BASE_URL}/analytics/${businessId}/customers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.json();
}