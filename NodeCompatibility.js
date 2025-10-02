import { readFile, writeFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import { Writable } from 'node:stream'

export { Deno, fetch }

// Add more methods to 'Deno' object as needed from "https://github.com/denoland/node_shims/tree/main/packages/shim-deno/src/deno/stable/functions"

const Deno = {
  serve: Serve,
  readFile,
  writeFile,
  readTextFile: async function (filePath) {
    return await readFile(filePath, { encoding: 'utf8' })
  },
  writeTextFile: async function (filePath, data) {
    return await writeFile(filePath, data, { encoding: 'utf8' })
  },
  env: {
    get: (value) => process.env[value],
  },
}

// patch 'fetch' to support 'duplex' option in Node.js 18+.
const _nativeFetch = globalThis.fetch // Keep reference to the original built-in fetch.
const fetch = async (url, options = {}) => {
  if (options.body && !options.duplex) options.duplex = 'half' // If there's a body and no duplex specified → enforce duplex: 'half'
  return _nativeFetch(url, options)
}

// Serve handler that takes a Web-standard Request and returns a Response similar to Deno.serve() and Cloudflare Workers.
export async function Serve( options = {}, Handler ) {
  // Default options.
  const port = options.port ?? 3000
  const hostname = options.hostname ?? '0.0.0.0'

  const server = createServer(async (req, res) => {
    try {
      // Convert Node req -> Web Request.
      const request = new Request(`http://${req.headers.host}${req.url}`, {
        method: req.method,
        headers: req.headers,
        body: req.method !== 'GET' && req.method !== 'HEAD' ? req : undefined,
        duplex: 'half', // required for streaming bodies in Node fetch.
      })

      // Call the actual handler.
      const response = await Handler(request)

      // Convert Web Response -> Node res.
      res.writeHead(response.status ?? 200, Object.fromEntries(response.headers ?? []))

      if (response.body) {
        // Pipe Web ReadableStream to Node.js res.
        const body = response.body
        if (body.pipeTo) {
          await body.pipeTo(Writable.toWeb(res))
        } else {
          res.end(await response.text())
        }
      } else {
        res.end()
      }
    } catch (err) {
      console.error('Handler error:', err)
      res.statusCode = 500
      res.end('Internal Server Error')
    }
  })

  server.listen(port, hostname, () => {
    console.log(`HTTP Server Listening On http://${hostname}:${port}`)
  })

  return server
}
