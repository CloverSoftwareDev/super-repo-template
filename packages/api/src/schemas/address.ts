import { z } from 'zod'

export const addressSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  street: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zipCode: z.string().min(1),
  country: z.string().min(1),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export const addressCreateSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zipCode: z.string().min(1),
  country: z.string().min(1),
})

export const addressUpdateSchema = z.object({
  street: z.string().min(1).optional(),
  city: z.string().min(1).optional(),
  state: z.string().min(1).optional(),
  zipCode: z.string().min(1).optional(),
  country: z.string().min(1).optional(),
})

export const addressListSchema = z.array(addressSchema)

export type Address = z.infer<typeof addressSchema>
export type AddressCreate = z.infer<typeof addressCreateSchema>
export type AddressUpdate = z.infer<typeof addressUpdateSchema>
