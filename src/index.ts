import { serve, type HttpBindings } from '@hono/node-server'
import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'

type Bindings = HttpBindings & {
  /* ... */
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('*', serveStatic({ root: 'public' }))

app.get('/', (c) => {
  return c.json({
    author: 'Leuthra',
    message: 'Hello World',
  })
})

app.get('/remote', (c) => {
  return c.json({
    author: 'Leuthra',
    remoteAddress: c.env.incoming.socket.remoteAddress,
  })
})

app.notFound((c) => {
  return c.json({
    author: 'Leuthra',
    message: 'Not Found',
  })
})

app.onError((err, c) => {
  console.log(`${err}`)
  return c.json({
    author: 'Leuthra',
    message: 'Internal Server Error',
  })
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({ fetch: app.fetch, port })
