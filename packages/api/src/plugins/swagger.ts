import fp from 'fastify-plugin'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import { jsonSchemaTransform } from 'fastify-type-provider-zod'

export default fp(async (fastify) => {
  const apiUrl = process.env.API_URL || 'http://localhost:3000'

  await fastify.register(swagger, {
    openapi: {
      info: {
        title: 'Super Repo API',
        description: 'API documentation for the Super Repo Template',
        version: '0.0.1',
      },
      servers: [
        {
          url: apiUrl,
          description: process.env.API_URL ? 'Production server' : 'Local server',
        },
      ],
      tags: [
        { name: 'Auth', description: 'Authentication endpoints' },
        { name: 'Users', description: 'User management endpoints' },
        { name: 'Addresses', description: 'Address management endpoints' },
      ],
    },
    transform: jsonSchemaTransform,
  })

  await fastify.register(swaggerUi, {
    routePrefix: '/api',
  })
})
