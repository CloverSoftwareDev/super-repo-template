import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { addressSchema, addressCreateSchema, addressUpdateSchema, addressListSchema } from '../schemas/address.js'
import { supabase } from '../lib/supabase.js'

const paramsSchema = z.object({
  id: z.string().uuid(),
})

const messageResponseSchema = z.object({
  message: z.string(),
})

export async function addressesRoutes(fastify: FastifyInstance) {
  // GET /addresses
  fastify.get('/addresses', {
    schema: {
      description: 'Get all addresses',
      tags: ['Addresses'],
      response: {
        200: addressListSchema,
      },
    },
  }, async (_request, reply) => {
    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return reply.status(500).send({ message: error.message })
    }

    return reply.status(200).send(data?.map(addr => ({
      id: addr.id,
      userId: addr.user_id,
      street: addr.street,
      city: addr.city,
      state: addr.state,
      zipCode: addr.zip_code,
      country: addr.country,
      createdAt: addr.created_at,
      updatedAt: addr.updated_at,
    })) ?? [])
  })

  // POST /addresses
  fastify.post('/addresses', {
    schema: {
      description: 'Create a new address',
      tags: ['Addresses'],
      body: addressCreateSchema,
      response: {
        201: addressSchema,
      },
    },
  }, async (request, reply) => {
    const body = request.body as { street: string; city: string; state: string; zipCode: string; country: string }

    // Get authenticated user (simplified - in production, use proper auth middleware)
    const authHeader = request.headers.authorization
    let userId = null
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.replace('Bearer ', '')
      const { data } = await supabase.auth.getUser(token)
      userId = data.user?.id
    }

    if (!userId) {
      return reply.status(401).send({ message: 'Unauthorized' })
    }

    const { data, error } = await supabase
      .from('addresses')
      .insert({
        user_id: userId,
        street: body.street,
        city: body.city,
        state: body.state,
        zip_code: body.zipCode,
        country: body.country,
      })
      .select()
      .single()

    if (error) {
      return reply.status(500).send({ message: error.message })
    }

    return reply.status(201).send({
      id: data.id,
      userId: data.user_id,
      street: data.street,
      city: data.city,
      state: data.state,
      zipCode: data.zip_code,
      country: data.country,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    })
  })

  // GET /addresses/:id
  fastify.get('/addresses/:id', {
    schema: {
      description: 'Get an address by ID',
      tags: ['Addresses'],
      params: paramsSchema,
      response: {
        200: addressSchema,
      },
    },
  }, async (request, reply) => {
    const { id } = request.params as { id: string }

    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      return reply.status(404).send({ message: 'Address not found' })
    }

    return reply.status(200).send({
      id: data.id,
      userId: data.user_id,
      street: data.street,
      city: data.city,
      state: data.state,
      zipCode: data.zip_code,
      country: data.country,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    })
  })

  // PUT /addresses/:id
  fastify.put('/addresses/:id', {
    schema: {
      description: 'Update an address by ID',
      tags: ['Addresses'],
      params: paramsSchema,
      body: addressUpdateSchema,
      response: {
        200: addressSchema,
      },
    },
  }, async (request, reply) => {
    const { id } = request.params as { id: string }
    const body = request.body as { street?: string; city?: string; state?: string; zipCode?: string; country?: string }

    const { data, error } = await supabase
      .from('addresses')
      .update({
        ...(body.street && { street: body.street }),
        ...(body.city && { city: body.city }),
        ...(body.state && { state: body.state }),
        ...(body.zipCode && { zip_code: body.zipCode }),
        ...(body.country && { country: body.country }),
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (error || !data) {
      return reply.status(404).send({ message: 'Address not found' })
    }

    return reply.status(200).send({
      id: data.id,
      userId: data.user_id,
      street: data.street,
      city: data.city,
      state: data.state,
      zipCode: data.zip_code,
      country: data.country,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    })
  })

  // DELETE /addresses/:id
  fastify.delete('/addresses/:id', {
    schema: {
      description: 'Delete an address by ID',
      tags: ['Addresses'],
      params: paramsSchema,
      response: {
        200: messageResponseSchema,
      },
    },
  }, async (request, reply) => {
    const { id } = request.params as { id: string }

    const { error } = await supabase
      .from('addresses')
      .delete()
      .eq('id', id)

    if (error) {
      return reply.status(500).send({ message: error.message })
    }

    return reply.status(200).send({ message: 'Address deleted successfully' })
  })
}
