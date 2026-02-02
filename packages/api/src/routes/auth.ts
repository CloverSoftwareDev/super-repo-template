import type { FastifyInstance } from 'fastify'
import { registerSchema, loginSchema, authResponseSchema, meResponseSchema, messageResponseSchema } from '../schemas/auth.js'
import { supabase } from '../lib/supabase.js'

export async function authRoutes(fastify: FastifyInstance) {
  // POST /auth/register
  fastify.post('/auth/register', {
    schema: {
      description: 'Register a new user',
      tags: ['Auth'],
      body: registerSchema,
      response: {
        201: authResponseSchema,
      },
    },
  }, async (request, reply) => {
    const { email, password, name } = request.body as { email: string; password: string; name: string }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    })

    if (error) {
      return reply.status(400).send({ message: error.message })
    }

    return reply.status(201).send({
      accessToken: data.session?.access_token ?? '',
      refreshToken: data.session?.refresh_token,
      user: {
        id: data.user?.id ?? '',
        email: data.user?.email ?? '',
        name: name,
      },
    })
  })

  // POST /auth/login
  fastify.post('/auth/login', {
    schema: {
      description: 'Login with email and password',
      tags: ['Auth'],
      body: loginSchema,
      response: {
        200: authResponseSchema,
      },
    },
  }, async (request, reply) => {
    const { email, password } = request.body as { email: string; password: string }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return reply.status(401).send({ message: error.message })
    }

    return reply.status(200).send({
      accessToken: data.session?.access_token ?? '',
      refreshToken: data.session?.refresh_token,
      user: {
        id: data.user?.id ?? '',
        email: data.user?.email ?? '',
        name: data.user?.user_metadata?.name ?? '',
      },
    })
  })

  // POST /auth/logout
  fastify.post('/auth/logout', {
    schema: {
      description: 'Logout the current user',
      tags: ['Auth'],
      response: {
        200: messageResponseSchema,
      },
    },
  }, async (_request, reply) => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      return reply.status(400).send({ message: error.message })
    }

    return reply.status(200).send({ message: 'Logged out successfully' })
  })

  // GET /auth/me
  fastify.get('/auth/me', {
    schema: {
      description: 'Get the current authenticated user',
      tags: ['Auth'],
      response: {
        200: meResponseSchema,
      },
    },
  }, async (request, reply) => {
    const authHeader = request.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) {
      return reply.status(401).send({ message: 'Unauthorized' })
    }

    const token = authHeader.replace('Bearer ', '')
    const { data, error } = await supabase.auth.getUser(token)

    if (error || !data.user) {
      return reply.status(401).send({ message: 'Unauthorized' })
    }

    return reply.status(200).send({
      id: data.user.id,
      email: data.user.email ?? '',
      name: data.user.user_metadata?.name ?? '',
    })
  })
}
