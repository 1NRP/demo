#!/usr/bin/env deno run --version v2.4.0

// Vercel-Deno automatically adds the "--allow-all" flag to the "run" command, 
// which can't be used with other permission flags from Deno version 2.0 onwards.

// Or, #!/usr/bin/env DENO_DIR=/tmp deno run --version v2.4.0 --allow-net --allow-read --allow-write --allow-env --env="./.env"

// Main Server File for handling all routes and requests.
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
	ProtectedRoute,
	SaveLink,
	SaveNote,
	ServeStaticFile,
	TgChannels,
} from '../Functions.js'

const CORS_ALLOWED_ORIGINS = ['https://1nrp.github.io'] // Allowed origins for CORS.
const ProtectedRoutes = ['/blob', '/fyerstoken', '/getnote', '/savenote', '/deletenote', '/blobserver'] // Protected Routes. Require Authentication.
const PORT = 3000

// deno task run  ( For Local Development ).
// Deno.serve({ port: PORT }, MainHandler)

export default MainHandler; // For Deployments On Vercel.

const Router = new Map()
const Route = (method, pathname, handler) => Router.set(`${method.toUpperCase()}:${pathname.toLowerCase()}`, handler)

Route('GET', '/', () => ServeStaticFile('./Index.html'))
Route('GET', '/upload.js', () => ServeStaticFile('./VercelUpload.js'))
Route('POST', '/login', LoginHandler) // Login route.
Route('GET', '/login', () => ServeStaticFile('./Login.html'))
Route('POST', '/deletelink', DeleteLink)
Route('GET', '/getm3u8', GetM3U8)
Route('GET', '/getlink', GetLink)
Route('POST', '/savelink', SaveLink)
Route('GET', '/kv-and-blob-database-deletion-prevention-cron-job', CronJob)
Route('POST', '/checklinkexistence', CheckIfExists)
Route('GET', '/tgchannels', TgChannels)
Route('GET', '/cors-proxy', CorsProxy)
Route('GET', '/jsnb', JSNotebook)
Route('POST', '/jsnb', JSNotebook)
Route('GET', '/blob', () => ServeStaticFile('./Blob.html'))
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
		if (ProtectedRoutes.includes( path.toLowerCase() )) {
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
