import { createCustomer, createCustomerBusiness } from "../api/requests.ts"

export const useCustomer = () => {

    const registerCustomer = async (
        email: string,
        phoneNumber: string,
        businessId: string
    ) => {

        const customer = await createCustomer(email, phoneNumber)

        const customerBusiness = await createCustomerBusiness(
            customer.customerId,
            businessId
        )

        return {
            customer,
            customerBusiness
        }
    }

    return { registerCustomer }
}