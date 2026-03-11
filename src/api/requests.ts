import { type Business, BusinessSchema } from "./types";

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
  logoURL: string,
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
      logoURL,
    }),
  });

  return response.json();
};