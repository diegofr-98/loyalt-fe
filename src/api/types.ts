import { z } from "zod";

export const BusinessSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  businessTypeId: z.string().uuid(),
  createdAt: z.string().datetime(),
  ownerId: z.string().uuid(),
  googleClassId: z.string(),
  programName: z.string(),
  active: z.boolean(),
  logoURL: z.string().url()
});

export type Business = z.infer<typeof BusinessSchema>;

export type CustomersResponse = {
  content: Customer[]
  totalPages: number
  totalElements: number
  number: number
}

export type Customer = {
  id: string
  customerId: string
  email: string
  phone: string
  points: number
  googleObjectId: string
  createdAt: string
}

export type CreateCustomer = {
  customerId:string
  businessId: string
}



export type Campaign = {
  name: string
  startDate: string
  finishDate: string
  points: number
  uuid:string
  businessId?:string

}
export type Reward = {
  uuid: string
  businessId: string
  name: string
  costPoints: number
}