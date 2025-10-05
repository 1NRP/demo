import {
  BlobServer,
  CheckIfExists,
  CorsProxy,
  DatabaseDeletionPreventionCRONJob as CronJob,
  DeleteLink,
  DeleteNote,
  FyersToken,
  GetLink,
  GetM3U8,
  GetNote,
  JSNotebook,
  LoginHandler,
  LoginStatus,
  ProtectedRoute,
  SaveLink,
  SaveNote,
  ServeStaticFile,
  TgChannels,
} from './Functions.js'

// Node.js Compatibility.
// if ( process && process.env.NRP_DEPLOYMENT_ENVIRONMENT == 'Vercel' ) { // Deno might be having 'process' var defined for Node.js compatibility. So check for other parameters.
  const { Deno, fetch } = await import('./NodeCompatibility.js')
  globalThis.Deno = Deno
  globalThis.fetch = fetch
  console.log("Running On Vercel. Imported Custom Deno Object.")
// }

// Node.js Compatibility.
// if (!Deno.version && typeof process !== 'undefined' && process.versions?.node) { // Deno might be having 'process' var defined for Node.js compatibility. So check for Deno.version absense.
//   const { Deno, fetch } = await import('./NodeCompatibility.js')
//   globalThis.Deno = Deno
//   globalThis.fetch = fetch
//   console.log(
//     'Running in Node.js. Imported Deno functions for Node Compatibility. Patched fetch() to support duplex option.',
//   )
// }

const CORS_ALLOWED_ORIGINS = ['https://1nrp.github.io'] // Allowed origins for CORS.
const ProtectedRoutes = ['/blob', '/fyerstoken', '/getnote', '/jsnb', '/savenote', '/loginstatus', '/deletenote', '/blobserver'] // Protected Routes. Require Authentication.
const PORT = 3000

// deno task run  ( For Local Development ).
Deno.serve({ port: PORT }, MainHandler)

// export default MainHandler; // For Serverless Deployment On Deno Deploy, Cloudflare Workers etc.

const Router = new Map()
const Route = (method, pathname, handler) => Router.set(`${method.toUpperCase()}:${pathname.toLowerCase()}`, handler)

Route('GET', '/', () => ServeStaticFile('./Index.html'))
Route('GET', '/login', () => ServeStaticFile('./Login.html'))
Route('GET', '/blob', () => ServeStaticFile('./Blob.html'))
Route('GET', '/notes', () => ServeStaticFile('./Notes.html'))
Route('GET', '/upload.js', () => ServeStaticFile('./VercelUpload.js'))
Route('GET', '/vue', () => ServeStaticFile('./Vue.html'))

Route('GET', '/loginstatus', LoginStatus)
Route('POST', '/login', LoginHandler) // Login route.
Route('POST', '/deletelink', DeleteLink)
Route('GET', '/getm3u8', GetM3U8)
Route('GET', '/getlink', GetLink)
Route('POST', '/savelink', SaveLink)
Route('GET', '/kv-and-blob-database-deletion-prevention-cron-job', CronJob)
Route('POST', '/checklinkexistence', CheckIfExists)
Route('GET', '/tgchannels', TgChannels)
Route('GET', '/corsproxy', CorsProxy)
Route('GET', '/jsnb', JSNotebook)
Route('POST', '/jsnb', JSNotebook)
Route('GET', '/fyerstoken', FyersToken)
Route('POST', '/fyerstoken', FyersToken)
Route('GET', '/getnote', GetNote)
Route('POST', '/savenote', SaveNote)
Route('POST', '/deletenote', DeleteNote)
Route('GET', '/blobserver', BlobServer)
Route('POST', '/blobserver', BlobServer)

async function MainHandler(req) {
  const path = new URL(req.url).pathname
  const method = req.method

  // Handle CORS preflight (OPTIONS) requests.
  if (method === 'OPTIONS') {
    const origin = req.headers.get('Origin')
    if (origin && CORS_ALLOWED_ORIGINS.includes(origin)) {
      return new Response(null, {
        status: 204, // No Content.
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      })
    }
    return new Response(null, { status: 204 }) // Standard response for non-matching origins.
  }

  // Find and execute the route handler
  const Handler = Router.get(`${method}:${path.toLowerCase()}`)
  let response

  if (Handler) {
    // console.log(`HTTP Request Received: \n Method: ${method}, \n Path: ${path}`)
    if ( ProtectedRoutes.includes(path.toLowerCase()) ) {
      response = await ProtectedRoute(Handler, req)
    } else {
      response = await Handler(req)
    }
  } else {
    response = new Response('404 Not Found', { status: 404 })
  }

  // Add CORS headers to the actual response.
  const origin = req.headers.get('Origin')
  if (origin && CORS_ALLOWED_ORIGINS.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin)
    response.headers.set('Access-Control-Allow-Credentials', 'true')
  }

  return response
}
