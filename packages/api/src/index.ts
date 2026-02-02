import Fastify from 'fastify'
import { validatorCompiler, serializerCompiler, ZodTypeProvider } from 'fastify-type-provider-zod'
import swaggerPlugin from './plugins/swagger.js'
import { supabase } from './lib/supabase.js'

const fastify = Fastify({
  logger: true,
}).withTypeProvider<ZodTypeProvider>()

fastify.setValidatorCompiler(validatorCompiler)
fastify.setSerializerCompiler(serializerCompiler)

// Register Plugins
fastify.register(swaggerPlugin)

// Health Check
fastify.get('/health', async () => {
    const { error } = await supabase.from('test').select('*').limit(1)
    return { status: 'ok', database: error ? 'error' : 'connected' }
})

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' })
    console.log(`Server listening on http://localhost:3000`)
    console.log(`Docs available at http://localhost:3000/docs`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
