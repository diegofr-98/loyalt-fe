import { type Business, BusinessSchema, type CustomersResponse } from "./types";

const BASE_URL = import.meta.env.VITE_BACKEND_URL + "/api/v1";

export const fetchBusinessByOwnerId = async (
  ownerId: string,
  token: string
): Promise<Business | null> => {
    const response = await fetch(`${BASE_URL}/business/${ownerId}`,{ 
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      } });

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
      "Content-Type": "application/json",
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
      "Content-Type": "application/json",
    },
  })

  return response.json();
}

export const fetchPromosByBusinessId = async (
  businessId: string,
  token: string
) => {
  const response = await fetch(`${BASE_URL}/promotions/business/${businessId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

  return response.json();
}

export const fetchRewardsByBusinessId = async (
  businessId: string,
  token: string
) => {
  const response = await fetch(`${BASE_URL}/rewards/business/${businessId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.json();
}

export const createTransaction = async (
  businessId: string,
  customerId: string,
  points: number,
  token: string
) => {
  const response = await fetch(`${BASE_URL}/customer/transaction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      businessId,
      customerId,
      points,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(error || "Error creting transaction")
  }

  return response.json()
}

export const createRedemption = async (
  businessId: string,
  customerId: string,
  rewardId: string,
  points: number,
  token: string
) => {
  const response = await fetch(`${BASE_URL}/customer/redemption`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      businessId,
      customerId,
      rewardId,
      pointsUsed: points,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(error || "Error creting redemption")
  }

  return response.json()
}

export const createCustomer = async (
    email: string,
    phoneNumber: string
  ) => {
  const response = await fetch(`${BASE_URL}/customer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      phoneNumber,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(error || "Error creting redemption")
  }

  return response.json()
}

export const createCustomerBusiness = async (
    customerId: string,
    businessId: string,
) => {
  const response = await fetch(`${BASE_URL}/customer/customer-business`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      customerId,
      businessId,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(error || "Error linking customer with business")
  }

  return response.json()
}

export const createCampaign = async (payload: {
  businessId: string
  name: string
  startDate: string
  finishDate: string
  points: number
  token: string
}) => {

  const { token, ...body } = payload

  const response = await fetch(`${BASE_URL}/promotions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(error || "Error creating campaign")
  }

  return response.json()
}

export const updateCampaign = async (payload: {
  businessId: string
  name: string
  startDate: string
  finishDate: string
  points: number
  id:string
  token: string

  }) => {

  const {id, token, ...body } = payload

  const response = await fetch(`${BASE_URL}/promotions/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(error || "Error creating campaign")
  }

  return response.json()
}

export const createReward = async (payload: {
  businessId: string
  name: string
  costPoints: number
  imgUrl: string
  active: boolean
  token: string
}) => {

  const { token, ...body } = payload

  const response = await fetch(`${BASE_URL}/rewards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(error || "Error creating campaign")
  }

  return response.json()
}


export const updateReward = async (payload: {
  id:string
  businessId: string
  name: string
  costPoints: number
  imgUrl: string
  active: boolean
  token: string

  }) => {

  const {id, token, ...body } = payload

  const response = await fetch(`${BASE_URL}/rewards/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(error || "Error creating campaign")
  }

  return response.json()
}

export const deleteReward = async (
  id: string,
  token: string,
) => {
  const response = await fetch(`${BASE_URL}/rewards/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(error || "Error deleting reward")
  }

  if (response.status === 204) {
    return null
  }

  const text = await response.text()

  if (!text) {
    return null
  }

  return JSON.parse(text)
}


export const getCampaign = async (
  id:string,
  token:string,
) => {
  const response = await fetch(`${BASE_URL}/promotions/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },

  })


  return response.json()
}

export const getAllCampaigns = async (
  businessId: string,
  token:string,
) => {
  const response = await fetch(`${BASE_URL}/promotions/business/${businessId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },

  })

  return response.json()
}
