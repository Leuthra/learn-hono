import { serve, type HttpBindings } from '@hono/node-server'
import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'

type Bindings = HttpBindings & {
  /* ... */
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/remote', (c) => {
  return c.json({
    remoteAddress: c.env.incoming.socket.remoteAddress,
  })
})

app.use('*', serveStatic({ root: 'public' }))

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
