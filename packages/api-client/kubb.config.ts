import { defineConfig } from '@kubb/core'
import { definePlugin as createSwagger } from '@kubb/swagger'
import { definePlugin as createSwaggerTs } from '@kubb/swagger-ts'
import { definePlugin as createSwaggerTanstackQuery } from '@kubb/swagger-tanstack-query'
import { definePlugin as createSwaggerFaker } from '@kubb/swagger-faker'

export default defineConfig({
  root: '.',
  input: {
    path: 'http://localhost:3000/documentation/json', // Or path to local json file if downloaded
  },
  output: {
    path: './src/gen',
  },
  plugins: [
    createSwagger({
      output: false,
      validate: true,
    }),
    createSwaggerTs({
      output: {
        path: 'models',
      },
    }),
    createSwaggerTanstackQuery({
      output: {
        path: 'hooks',
      },
      client: {
         importPath: '../../client.ts' 
      }
    }),
    createSwaggerFaker({
      output: {
        path: 'mocks',
      },
    }),
  ],
})
