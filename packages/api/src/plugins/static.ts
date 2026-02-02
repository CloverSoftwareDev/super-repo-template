import fp from 'fastify-plugin'
import fastifyStatic from '@fastify/static'
import path from 'node:path'

export default fp(async (fastify) => {
  // Path relative to dist folder after build
  const publicPath = path.resolve(process.cwd(), 'public')

  await fastify.register(fastifyStatic, {
    root: publicPath,
    prefix: '/',
    decorateReply: false,
  })

  fastify.log.info(`Serving static files from: ${publicPath}`)
})
