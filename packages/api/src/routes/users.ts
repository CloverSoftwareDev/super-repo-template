import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { userSchema, userUpdateSchema, userListSchema } from '../schemas/user.js'
import { supabase } from '../lib/supabase.js'

const paramsSchema = z.object({
  id: z.string().uuid(),
})

const messageResponseSchema = z.object({
  message: z.string(),
})

export async function usersRoutes(fastify: FastifyInstance) {
  // GET /users
  fastify.get('/users', {
    schema: {
      description: 'Get all users',
      tags: ['Users'],
      response: {
        200: userListSchema,
      },
    },
  }, async (_request, reply) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return reply.status(500).send({ message: error.message })
    }

    return reply.status(200).send(data?.map(user => ({
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    })) ?? [])
  })

  // GET /users/:id
  fastify.get('/users/:id', {
    schema: {
      description: 'Get a user by ID',
      tags: ['Users'],
      params: paramsSchema,
      response: {
        200: userSchema,
      },
    },
  }, async (request, reply) => {
    const { id } = request.params as { id: string }

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      return reply.status(404).send({ message: 'User not found' })
    }

    return reply.status(200).send({
      id: data.id,
      email: data.email,
      name: data.name,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    })
  })

  // PUT /users/:id
  fastify.put('/users/:id', {
    schema: {
      description: 'Update a user by ID',
      tags: ['Users'],
      params: paramsSchema,
      body: userUpdateSchema,
      response: {
        200: userSchema,
      },
    },
  }, async (request, reply) => {
    const { id } = request.params as { id: string }
    const body = request.body as { email?: string; name?: string }

    const { data, error } = await supabase
      .from('users')
      .update({
        ...(body.email && { email: body.email }),
        ...(body.name && { name: body.name }),
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (error || !data) {
      return reply.status(404).send({ message: 'User not found' })
    }

    return reply.status(200).send({
      id: data.id,
      email: data.email,
      name: data.name,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    })
  })

  // DELETE /users/:id
  fastify.delete('/users/:id', {
    schema: {
      description: 'Delete a user by ID',
      tags: ['Users'],
      params: paramsSchema,
      response: {
        200: messageResponseSchema,
      },
    },
  }, async (request, reply) => {
    const { id } = request.params as { id: string }

    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id)

    if (error) {
      return reply.status(500).send({ message: error.message })
    }

    return reply.status(200).send({ message: 'User deleted successfully' })
  })
}
