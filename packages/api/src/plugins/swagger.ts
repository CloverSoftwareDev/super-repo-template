import fp from 'fastify-plugin'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import { jsonSchemaTransform } from 'fastify-type-provider-zod'

export default fp(async (fastify) => {
  await fastify.register(swagger, {
    openapi: {
      info: {
        title: 'Super Repo API',
        description: 'API documentation for the Super Repo Template',
        version: '0.0.1',
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Local server',
        },
      ],
    },
    transform: jsonSchemaTransform,
  })

  await fastify.register(swaggerUi, {
    routePrefix: '/docs',
  })
})
