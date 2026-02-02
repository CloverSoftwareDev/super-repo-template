import Fastify from 'fastify'
import { validatorCompiler, serializerCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod'
import swaggerPlugin from './plugins/swagger.js'
import staticPlugin from './plugins/static.js'
import { supabase } from './lib/supabase.js'
import { authRoutes } from './routes/auth.js'
import { usersRoutes } from './routes/users.js'
import { addressesRoutes } from './routes/addresses.js'
import dotenv from 'dotenv'

dotenv.config()

const fastify = Fastify({
  logger: true,
}).withTypeProvider<ZodTypeProvider>()

fastify.setValidatorCompiler(validatorCompiler)
fastify.setSerializerCompiler(serializerCompiler)

// Register Plugins
fastify.register(swaggerPlugin)
fastify.register(staticPlugin)

// Register Routes
fastify.register(authRoutes)
fastify.register(usersRoutes)
fastify.register(addressesRoutes)

// Health Check
fastify.get('/health', async () => {
    const { error } = await supabase.from('test').select('*').limit(1)
    return { status: 'ok', database: error ? 'error' : 'connected' }
})

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3000
    await fastify.listen({ port, host: '0.0.0.0' })
    console.log(`Server listening on http://localhost:${port}`)
    console.log(`Docs available at http://localhost:${port}/api`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
