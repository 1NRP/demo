import { Deno } from './NodeCompatibility.js'

// Node.js Compatibility.
if ( !process?.env?.NRP_DEPLOYMENT_ENVIRONMENT == 'Vercel' && !Deno?.version && process?.versions?.node ) {
  const { Deno, fetch } = await import('./NodeCompatibility.js')
  globalThis.Deno = Deno
  globalThis.fetch = fetch
}

const UPSTASH = {
  url: Deno.env.get('UPSTASH_REDIS_REST_URL'),
  token: Deno.env.get('UPSTASH_REDIS_REST_TOKEN'),

  GET: async (key) => {
    return await fetch(`${UPSTASH.url}/GET/${key}`, {
      headers: {
        'Authorization': `Bearer ${UPSTASH.token}`,
      },
    })
  },
  SET: async (key, value) => {
    return await fetch(`${UPSTASH.url}/SET/${key}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        'Authorization': `Bearer ${UPSTASH.token}`,
      },
      body: value,
    })
  },
  LPUSH: async (key, value) => {
    return await fetch(`${UPSTASH.url}/LPUSH/${key}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        'Authorization': `Bearer ${UPSTASH.token}`,
      },
      body: value,
    })
  },
  LRANGE: async (key, start = 0, end = -1) => {
    return await fetch(`${UPSTASH.url}/LRANGE/${key}/${start}/${end}`, {
      headers: {
        'Authorization': `Bearer ${UPSTASH.token}`,
      },
    })
  },
  LREM: async (key, value) => {
    return await fetch(UPSTASH.url + '/LREM/' + key + '/0/', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        'Authorization': 'Bearer ' + UPSTASH.token,
      },
      body: value,
    })
  },
  LPOS: async (key, value) => {
    return await fetch(`${UPSTASH.url}/LPOS/${key}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        'Authorization': `Bearer ${UPSTASH.token}`,
      },
      body: value,
    })
  },
}

// Cryptographic Functions.
export async function CreateKeyPair() {
  const keyPair = await crypto.subtle.generateKey(
    {
      name: 'RSASSA-PKCS1-v1_5',
      modulusLength: 2048, // Minimum Recommended Length.
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: 'SHA-256',
    },
    true,
    ['sign', 'verify'],
  )

  const spki = await crypto.subtle.exportKey('spki', keyPair.publicKey)
  const pkcs8 = await crypto.subtle.exportKey('pkcs8', keyPair.privateKey)

  function toPem(keyBuffer, type) {
    const base64 = btoa(String.fromCharCode(...new Uint8Array(keyBuffer)))
      .replace(/(.{64})/g, '$1\n') // 64-char line wrapping

    if (type === 'private') {
      return `-----BEGIN PRIVATE KEY-----\n${base64}\n-----END PRIVATE KEY-----`
    } else {
      return `-----BEGIN PUBLIC KEY-----\n${base64}\n-----END PUBLIC KEY-----`
    }
  }

  // Convert line breaks to \n and wrap in quotes for .env file.
  function pemForEnv(pem) {
    return `"${pem.replace(/\n/g, '\\n')}"`
  }

  const privatePem = toPem(pkcs8, 'private')
  const publicPem = toPem(spki, 'public')

  // Copy the keys and paste as environment variables in '.env' file.
  console.log('Private Key for .env:', pemForEnv(privatePem))
  console.log('Public Key for .env:', pemForEnv(publicPem))
}

// Helper: base64url encode/decode.
function base64urlEncode(buf) {
  const bytes = buf instanceof ArrayBuffer ? new Uint8Array(buf) : buf
  let binary = ''
  for (let b of bytes) binary += String.fromCharCode(b)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function base64urlDecode(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/')
  const pad = str.length % 4
  if (pad) str += '='.repeat(4 - pad)
  const bin = atob(str)
  return new Uint8Array([...bin].map((c) => c.charCodeAt(0)))
}

// Helper: parse PEM string into ArrayBuffer.
function pemToArrayBuffer(pem) {
  const b64 = pem.replace(/-----.*-----/g, '').replace(/\s+/g, '')
  const bin = atob(b64)
  const buf = new ArrayBuffer(bin.length)
  const view = new Uint8Array(buf)
  for (let i = 0; i < bin.length; i++) view[i] = bin.charCodeAt(i)
  return buf
}

// Hash Passwords using Web Crypto API.
export async function CreatePasswordHash(password) {
  const salt = Deno.env.get('USERNAME_PASSWORD_SALT') ?? "" // crypto.getRandomValues(new Uint8Array(16)) 
  const encoder = new TextEncoder()
  const dataBytes = encoder.encode(password + salt)
  const hash = await crypto.subtle.digest( 'SHA-256', dataBytes )
  const hashArray = Array.from(new Uint8Array(hash))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}

// Create Hash using Web Crypto API.
export async function CreateHash(text) {
  const dataBytes = new TextEncoder().encode(text)
  const hash = await crypto.subtle.digest('SHA-256', dataBytes)
  const hashArray = Array.from(new Uint8Array(hash))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}

export async function CreateJWT(username) {
  const privatePem = Deno.env.get('JWT_PRIVATE_KEY_PEM').replace(/\\n/g, '\n') // Replace literal backslashes with newlines.

  const jwtSecretKey = await crypto.subtle.importKey(
    'pkcs8',
    pemToArrayBuffer(privatePem),
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign'],
  )

  const header = { alg: 'RS256', typ: 'JWT' }
  const payload = {
    sub: username,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (2 * 24 * 60 * 60), // Expires in 2 days.
  }

  const encoder = new TextEncoder()
  const encodedHeader = base64urlEncode(encoder.encode(JSON.stringify(header)))
  const encodedPayload = base64urlEncode(encoder.encode(JSON.stringify(payload)))

  const signatureData = encoder.encode(`${encodedHeader}.${encodedPayload}`)
  const signature = await crypto.subtle.sign(
    { name: 'RSASSA-PKCS1-v1_5' },
    jwtSecretKey,
    signatureData,
  )

  const encodedSignature = base64urlEncode(new Uint8Array(signature))

  return `${encodedHeader}.${encodedPayload}.${encodedSignature}`
}

export async function VerifyJWT(token) {
  const publicPem = Deno.env.get('JWT_PUBLIC_KEY_PEM').replace(/\\n/g, '\n') // Replace literal backslashes with newlines.
  if (!publicPem) throw new Error('Missing JWT_PUBLIC_KEY_PEM')

  const publicKey = await crypto.subtle.importKey(
    'spki',
    pemToArrayBuffer(publicPem),
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['verify'],
  )

  try {
    const [encodedHeader, encodedPayload, encodedSignature] = token.split('.')
    if (!encodedHeader || !encodedPayload || !encodedSignature) return null

    const signatureData = new TextEncoder().encode(`${encodedHeader}.${encodedPayload}`)
    const signature = base64urlDecode(encodedSignature)

    const isValid = await crypto.subtle.verify(
      { name: 'RSASSA-PKCS1-v1_5' },
      publicKey,
      signature,
      signatureData,
    )
    if (!isValid) return null

    const payloadBytes = base64urlDecode(encodedPayload)
    const payload = JSON.parse(new TextDecoder().decode(payloadBytes))

    if (payload.exp < Math.floor(Date.now() / 1000)) {
      console.warn('Token expired')
      return null
    }

    return payload
  } catch (error) {
    console.error('JWT Verification Error:', error)
    return null
  }
}

// Blob Server.
export async function BlobServer(req) {
  if (req.method === 'POST') { // The token generation request is a "POST" request.
    const body = await req.blob()
    const { handleUpload } = await import('@vercel/blob/client')
    try {
      const jsonResponse = await handleUpload({
        body,
        request: req,
        onBeforeGenerateToken: async (_pathname) => { // (_pathname, clientPayload )
          return {
            allowedContentTypes: ['image/*', 'video/*', 'audio/*', 'text/*', 'application/*'], // Accept all common MIME types.
            addRandomSuffix: false,
            tokenPayload: 'Blob Upload Completed.',
          }
        },
        onUploadCompleted: async (_blob, tokenPayload) => {
          return tokenPayload
        },
      })
      return new Response(jsonResponse, {
		  status: 200,
		  headers: { 'Content-Type': 'application/json' }
	  })
    } catch (error) {
      console.error('Error while handling the upload:', error)
      return new Response(JSON.stringify({ error: error.message }))
    }
  } else {
    const TASK = new URL(req.url).searchParams.get('TASK')

    if (TASK === 'List') {
      try {
        const { list: List } = await import('@vercel/blob')
        const FOLDER_NAME = new URL(req.url).searchParams.get('FOLDER_NAME')
        const { blobs } = await List({
          prefix: FOLDER_NAME,
        })
        return new Response(JSON.stringify(blobs), { headers: { 'Content-Type': 'application/json' } })
      } catch (error) {
        console.error(error)
        return new Response(JSON.stringify({ error: 'An error occurred.' }))
      }
    } else if (TASK === 'Delete') {
      try {
        const { del: Delete } = await import('@vercel/blob')
        const URL = new URL(req.url).searchParams.get('URL')
        await Delete(URL)
        return new Response(JSON.stringify({ message: 'Blob deleted.' }))
      } catch (error) {
        console.error(error)
        return new Response(JSON.stringify({ error: 'An error occurred.' }))
      }
    } else if (TASK === 'Rename') { // Vercel Blob SDK does not provide a renaming feature. So this is a workaround.
      try {
        const { copy: Copy, del: Delete } = await import('@vercel/blob')
        const params = Object.fromEntries(new URL(req.url).searchParams)
        const { FILE_URL, NEW_PATHNAME } = params
        await Copy(FILE_URL, NEW_PATHNAME, {
          access: 'public',
        })
        await Delete(FILE_URL)
        return new Response(JSON.stringify({ message: 'Blob renamed.' }))
      } catch (error) {
        console.error(error)
        return new Response(JSON.stringify({ error: 'An error occurred.' }), { ststus: 500 })
      }
    } else {
      return new Response(JSON.stringify({ error: 'Invalid request.' }), { status: 400 })
    }
  }
}

export function ParseCookies(cookieHeader) {
  const cookies = {}
  if (cookieHeader) {
    cookieHeader.split(';').forEach((cookie) => {
      const parts = cookie.match(/(.*?)=(.*)$/)
      if (parts) {
        const name = parts[1].trim()
        const value = parts[2].trim()
        cookies[name] = value
      }
    })
  }
  return cookies
}

export const FileTypes = {
  txt: 'text/plain',
  html: 'text/html',
  css: 'text/css',
  js: 'application/javascript',
  json: 'application/json',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  ico: 'image/x-icon',
  svg: 'image/svg+xml',
  pdf: 'application/pdf',
  doc: 'application/msword',
  m3u8: 'application/x-mpegURL',
  mp4: 'video/mp4',
  mp3: 'audio/mpeg',
  wav: 'audio/wav',
  mp3: 'audio/mpeg',
  ogg: 'audio/ogg',
  webm: 'video/webm',
  flv: 'video/x-flv',
}

export async function ServeStaticFile(FilePath) {
  let File
  const Environment = Deno.env.get('NRP_DEPLOYMENT_ENVIRONMENT')

  if (Environment == 'Vercel') { // For Vercel bundling compatibility of static files.
    const files = await import('./StaticFiles.js')
    const exportName = FilePath.split('/').pop().split('.').shift()
    File = files[exportName]
  
  } else {
    File = await Deno.readFile(FilePath)
  }

  try {
    const type = FileTypes[FilePath.split('.').pop() || 'html']
    return new Response(new Blob([File], { type }), {
      headers: { 'Content-Type': type },
    })
  } catch (error) {
    console.error(`Error serving ${FilePath}: `, error)
    return new Response('An Error Occurred While Serving The File Request.', { status: 500 })
  }
}

export async function LoginHandler(req) {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 })
  try {
    const { username, password } = await req.json()
    if (Deno.env.get('USERNAME') === username && Deno.env.get('PASSWORD') === password) {
      const t0 = performance.now()
      const token = await CreateJWT(username)
      const t1 = performance.now()
      console.log(' "CreateJWT" Time Taken: ', +((t1 - t0).toFixed(2)), 'Miliseconds.')

      const headers = new Headers()
      headers.set('Content-Type', 'application/json')
      headers.set('Set-Cookie', `jwt_token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=7200`)
      return new Response(JSON.stringify({ success: true, message: 'Login successful' }), { headers })
    } else {
      return new Response(JSON.stringify({ success: false, message: 'Invalid credentials' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  } catch (e) {
    return new Response(JSON.stringify({ success: false, message: 'Invalid request body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export async function LoginStatus() {
  return new Response(JSON.stringify({ loggedIn: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}

export async function ProtectedRoute(Handler, req) {
  const redirectPage = `
	<html>
  <head>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="icon" sizes="192x192" href="https://1nrp.github.io/1/Images/N-Logo1.png">
      <title> Unauthorized: Redirecting To Sign In Page... </title>
  </head>
	<body style="background-color: #02121b">
      <h2 style="color:#d88; font-weight: 800; text-align: center; font-size: 30px; margin-top: 20vh;"> Unauthorized: Missing Token. </h2>
      <h3 style="color: #e6b61a; font-weight: 600; text-align: center; font-size: 20px;"> Redirecting To Sign In Page... </h3>
      <script> setTimeout(() => { window.location.href = '/login' }, 1000) </script>
	</body>
  </html>
	`
  const cookies = ParseCookies(req.headers.get('Cookie'))
  const token = cookies.jwt_token

  if (!token) {
    return new Response(redirectPage, { status: 401, headers: { 'Content-Type': 'text/html' } })
  }

  const t0 = performance.now()
  const payload = await VerifyJWT(token)
  const t1 = performance.now()
  console.log(' "VerifyJWT" Time Taken: ', +((t1 - t0).toFixed(2)), 'Miliseconds.')

  if (!payload) {
    return new Response(redirectPage.replace('Missing Token', 'Invalid Token'), {
      status: 401,
      headers: { 'Content-Type': 'text/html' },
    })
  }

  // Pass the request and the verified payload to the actual handler.
  return await Handler(req /* ,payload */)
}

export async function TeraboxCloudflare(request) {
  const { URL: shortURL, CacheOption, AccessToken: Token } = Object.fromEntries(new URL(request.url).searchParams)
  const Cache = CacheOption === 'Yes' // Convert Cache to boolean.

  if (Token !== 'cloudF-code-0088') {
    return new Response('Wrong Access Token Code. Request Is Unauthorized', { status: 401 })
  }
  if (!shortURL) {
    return new Response('URL parameter is required', { status: 403 })
  }

  try {
    // Not Adding The Cookie Header Only Fetches 30 Seconds Of The Video. Get it by Inspecting the Network Tab of the Terabox Webpage.
    const tbHeaders = new Headers()
    const Cookie =
      'csrfToken=d4XE8GgrDLUWGi0VrMhBGhoj; browserid=MplsviPBWAXvHjkmrC50dtNbTtZ-TZoz-SwtrA2TOr1GDCXPUyQNkKiIEg0=; lang=en; TSID=TVXQQOOR4DxS9SWcPPDzjRWcwWUuHZgC; __bid_n=196b99dccf129ec2e74207; g_state={"i_l":0}; ndus=YuAqZKCteHuiYFHuyxk-Lx0nXsIscEwH1afty9gM; ndut_fmt=686106BA8EABE19FE3B1B80A4B2D9A932FEFE4938C490620A3404BE764E6DB76'
    tbHeaders.set('Cookie', Cookie)

    const apiUrl = `https://www.terabox.app/api/shorturlinfo?shorturl=${shortURL}&root=1`
    const infoResponse = await fetch(apiUrl, Cache ? { cf: { cacheTtl: 31536000, cacheEverything: true } } : {})

    if (!infoResponse.ok) {
      throw new Error(`Failed to fetch short URL info: ${infoResponse.statusText}`)
    }

    const { shareid, uk, list: [{ fs_id }] } = await infoResponse.json() // Accessing the list array in  infoData, then extracting the 'fs_id' property from the first object in that array. To access from third element, write " list: [,,{ fs_id } ] ".
    //const m3u8Url = `https://www.terabox.app/share/streaming?uk=${uk}&shareid=${shareid}&type=M3U8_AUTO_360&fid=${fs_id}&sign=1&timestamp=1&clienttype=1&channel=1`;
    const m3u8Url =
      `https://dm.1024tera.com/share/streaming?uk=${uk}&shareid=${shareid}&type=M3U8_FLV_264_480&fid=${fs_id}&sign=e079e32543e8a8e08d13776fc9e6c3fdaec67489&timestamp=1746887076&jsToken=1F1DA1DCB0EDBEBF4D4026783231FF6C9B4DB9B51B9760AA7BDD646E468831907207153BCE380C6E022CF085CFB889982CF47DC211FCCFBE69AE839F30F263E0CEBA873FED7A8A6AE0102FEF4265151A7491413528A981953B8CCE16C5FD12EE&esl=1&isplayer=1&ehps=1&clienttype=0&app_id=250528&web=1&channel=dubox&short_link=5`

    const m3u8Response = await fetch(m3u8Url, { headers: tbHeaders })
    const head = {
      'Content-Type': 'application/x-mpegURL',
      'Access-Control-Allow-Origin': 'https://1nrp.github.io',
      'Cache-Control': 'max-age=259200',
    }
    const response = new Response(m3u8Response.body, {
      status: 200,
      headers: head,
    })

    return response
  } catch (error) {
    console.error('Error:', error)
    return new Response('An error occurred.', { status: 500 })
  }
}

export async function CorsProxy(req) {
  try {
    const Link = new URL(req.url).searchParams.get('URL')
    const response = await fetch(Link)
    
    const resp = new Response(response.body)
    resp.headers.set('Cache-Control', 'public, max-age=3600')
    resp.headers.set('Access-Control-Allow-Origin', 'https://1nrp.github.io')
    return resp
  } catch (error) {
    console.error('Error:', error)
  }
}

export async function DatabaseDeletionPreventionCRONJob() {
  const { put: PUT } = await import('@vercel/blob')
  try {
    const today = new Date().toLocaleDateString('en-GB').replaceAll('/', '-') // Format the date to YYYY-MM-DD instead of MM/DD/YYYY to avoid issues of creating a new folder with the date as the name.
    const date = `[ Date: ${today} ]` // Can be used to differentiate names of the saved Blob files in database, as the names will be prefixed with different dates.
    // For Vercel KV.
    const kvText =
      `⭐ Saved to KV database on: ${today}. "Vercel-KV-Database-Deletion-Prevention". This text is sent to the "Miscellaneous" Key in Vercel KV database every 10 days to ensure the database does not get deleted due to inactivity, as Vercel deletes a database if not used (GET or POST) for more than 1 month. Delete this text from the "Miscellaneous" store if not wanted.`
    const saveKV = await UPSTASH.LPUSH('Miscellaneous', kvText)
    // For Vercel BLOB.
    const blobFileName = `Database-Deletion-Prevention/${date} Vercel-Blob-Database-Deletion-Prevention.txt`
    const textContent =
      `${date} Vercel-BLOB-Database-Deletion-Prevention. This text is sent to the Vercel Blob database every 10 days to ensure the database does not get deleted due to inactivity, as Vercel deletes a database if not used (GET or POST) for more than 1 month.`
    //const token = process.env.BLOB_READ_WRITE_TOKEN;  // Uncomment if needed.
    const saveBlob = await PUT(blobFileName, textContent, {
      access: 'public',
      addRandomSuffix: false,
      ContentType: 'text/plain',
      // token: token,  // Automatically taken if using Vercel functions.
    })
    // console.log("KV Response: ", saveKV);
    // console.log("Blob Response: ", saveBlob);
    return new Response(saveBlob)
  } catch (error) {
    console.error('An Error Occured While Executing CRON Job: ', error)
    return new Response('An error occurred while executing cron job.', { status: 500 })
  }
}

// Fyers Functions.

// Auth_Code Generation URL: https://api-t1.fyers.in/api/v3/generate-authcode?client_id=SPXXXXE7-100&redirect_uri=https://1nrp.vercel.app/fyersToken&response_type=code&state=NRP-Algo
// THe 'client_id' in the Auth_Code Generation URL is the same as the Fyers 'app_id'.
// Update the Refresh Token every 15 days by visiting the Auth_Code Generation URL.

export async function FyersToken(req) {
  try {
    const appHash = Deno.env.get('FYERS_APP_HASH') // The 'appID' and 'appSecret' are already Hashed and stored in environment variables.
    const url = new URL(req.url)
    const auth_code = url.searchParams.get('auth_code')
    const Token = url.searchParams.get('Token')

    if (auth_code) {
      // Save the date of creating the refresh_token to "Miscellaneous" key in "Cloud Notes".
      const timestamp = Date.now() + (15 * 24 * 60 * 60 * 1000)
      const expiryDate = new Date(timestamp).toLocaleDateString('en-GB', { timeZone: 'Asia/Kolkata' }) // Date() method Automatically accounts for monthly variations of number of days.
      const kvText = `⭐ ⭐ ⭐ Fyers Refresh Token Was Last Saved to KV database at: [ ${
        new Date().toLocaleString('en-GB', { timeZone: 'Asia/Kolkata' })
      } ]. It Will Expire On: [ ${expiryDate} At 6:00 AM ]. Re-Generate This Token On Or Before Expiry Date By Visiting The Auth_Code Generation URL: [ https://api-t1.fyers.in/api/v3/generate-authcode?client_id=SPXXXXE7-100&redirect_uri=https://1nrp.vercel.app/fyersToken&response_type=code&state=NRP-Algo ]. The "client_id" Is Same As The Fyers "app_id" Which Can Be Found On The Fyers API Dashboard.`
      await UPSTASH.LPUSH('Miscellaneous', kvText)
      // Generate and save the refresh_token.
      const response = await fetch('https://api-t1.fyers.in/api/v3/validate-authcode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ grant_type: 'authorization_code', appIdHash: appHash, code: auth_code }),
      })

      const { refresh_token: refreshToken } = await response.json()
      const resp = await UPSTASH.SET('FYERS_REFRESH_TOKEN', refreshToken)
      return new Response('Refresh Token saved successfully to KV.')
    } else if (Token === 'refresh_token') {
      return await UPSTASH.GET('FYERS_REFRESH_TOKEN')
    } else if (req.method === 'POST' && Token === 'access_token') {
      return await UPSTASH.SET('FYERS_ACCESS_TOKEN', req.body)
    } else if (req.method === 'GET' && Token === 'access_token') {
      return await UPSTASH.GET('FYERS_ACCESS_TOKEN')
    } else {
      return new Response('Invalid Request. No Token parameter provided in the request URL.')
    }
  } catch (error) {
    console.error(error) // Log the error for debugging.
    return new Response('An error occurred.', { status: 500 })
  }
}

export async function JSNotebook(req) {
  if (req.method == 'GET') {
    try {
      return await UPSTASH.GET('JAVASCRIPT_NOTEBOOK')
    } catch (error) {
      return new Response(JSON.stringify({ error: 'An error occurred while fetching Notebook from KV.' }), {
        status: 500,
      })
    }
  } else if (req.method == 'POST') {
    try {
      return await UPSTASH.SET('JAVASCRIPT_NOTEBOOK', req.body)
    } catch (error) {
      return new Response(JSON.stringify({ error: 'An error occurred while saving Notebook to KV.' }), { status: 500 })
    }
  } else {
    return new Response('notFoundError: Neither GET nor POST request was received.')
  }
}

export { DeleteNote, GetNote, SaveNote } // Export The Note Functions.

async function SaveNote(req) {
  try {
    const { lastSentence, REDIS_KEY } = await req.json()
    return await UPSTASH.LPUSH(REDIS_KEY, lastSentence)
  } catch (error) {
    console.error('Error Name: ', error.name, 'Error Message: ', error.message)
    return new Response('An error occurred while sending to KV.', { status: 500 })
  }
}

async function GetNote(req) {
  try {
    const REDIS_KEY = new URL(req.url).searchParams.get('REDIS_KEY')
    return await UPSTASH.LRANGE(REDIS_KEY)
  } catch (error) {
    console.error('Error:', error)
    return new Response('An error occurred while sending to KV.', { status: 500 })
  }
}

async function DeleteNote(req) {
  try {
    const REDIS_KEY = new URL(req.url).searchParams.get('REDIS_KEY')
    return await UPSTASH.LREM(REDIS_KEY, req.body)
  } catch (error) {
    console.error('Error: ', error)
    return new Response('An error occurred while sending to KV.', { status: 500 })
  }
}

export { CheckIfExists, DeleteLink, GetLink, GetM3U8, SaveLink, TgChannels }

async function GetLink() {
  try {
    const response = await UPSTASH.LRANGE('TB_Links')
    const resp = new Response(response.body)
    resp.headers.set('Cache-Control', 'public, max-age=10, stale-while-revalidate=172800')
    return resp
  } catch (error) {
    console.error(error) // Log the error for debugging.
    return new Response('An error occurred while fetching from KV.', { status: 500 })
  }
}

async function CheckIfExists(req) {
  try {
    return await UPSTASH.LPOS('TB_Links', req.body)
  } catch (error) {
    console.error(error)
    return new Response('An error occurred while checking if exists or not in KV.', { status: 500 })
  }
}

async function DeleteLink(req) {
  try {
    return await UPSTASH.LREM('TB_Links', req.body)
  } catch (error) {
    console.error(error)
    return new Response('An error occurred while sending to KV.', { status: 500 })
  }
}

async function SaveLink(req) {
  try {
    return await UPSTASH.LPUSH('TB_Links', req.body)
  } catch (error) {
    console.error(error)
    return new Response('An error occurred while sending to KV.', { status: 500 })
  }
}

async function TgChannels() {
  try {
    const response = await UPSTASH.LRANGE('TG_Channels')
    const resp = new Response(response.body)
    resp.headers.set('Cache-Control', 'public, max-age=600, stale-while-revalidate=604800') // Cache for 10 minutes (600 seconds). Revalidate after 1 week (6,04,800 seconds).
    return resp
  } catch (error) {
    console.error(error) // Log the error for debugging.
    return new Response('An error occurred while fetching from KV.', { status: 500 })
  }
}

async function GetM3U8(request) {
  const link = new URL(request.url)
  const { URL: shortURL, CacheOption: Cache, AccessToken: Token } = Object.fromEntries(link.searchParams)

  if (Token !== 't9EmqwvV1OO4AiMq1bIxv8F9I3sxx7lgONdyPfZmOBMktgAmR2pNNfHmBoVjeQIc7') {
    return new Response('Wrong Access Token Code. Request Is Unauthorized', { status: 401 })
  }
  if (!shortURL) {
    return new Response('URL parameter is required', { status: 403 })
  }

  try {
    //const surl = shortURL.slice(1);
    //const cook = await fetch('https://www.1024tera.com');
    //const cookie = cook.headers.get('Set-Cookie');

    // Not Adding The Cookie Header Only Fetches 30 Seconds Of The Video. Get it by Inspecting the Network Tab of the Terabox Webpage.
    const tbHeaders = new Headers()
    const cookie =
      'csrfToken=d4XE8GgrDLUWGi0VrMhBGhoj; browserid=MplsviPBWAXvHjkmrC50dtNbTtZ-TZoz-SwtrA2TOr1GDCXPUyQNkKiIEg0=; lang=en; TSID=TVXQQOOR4DxS9SWcPPDzjRWcwWUuHZgC; __bid_n=196b99dccf129ec2e74207; g_state={"i_l":0}; ndus=YuAqZKCteHuiYFHuyxk-Lx0nXsIscEwH1afty9gM; ndut_fmt=686106BA8EABE19FE3B1B80A4B2D9A932FEFE4938C490620A3404BE764E6DB76'
    tbHeaders.set('Cookie', cookie)

    //tbHeaders.append('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0');
    //tbHeaders.append('Accept', '*/*');
    //tbHeaders.append('Accept-Language', 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6');
    //tbHeaders.append('Accept-Encoding', 'gzip, deflate, br');
    //tbHeaders.append('Referer', 'https://www.terabox.app/sharing/link?surl=' + surl);
    //tbHeaders.append('Origin', 'https://www.terabox.app');
    //tbHeaders.append('Host', 'https://www.terabox.app');

    // Fetch short URL info.
    const apiUrl = `https://www.terabox.app/api/shorturlinfo?shorturl=${shortURL}&root=1`
    const options = Cache = 'Yes'
      ? { headers: tbHeaders, cf: { cacheTtl: 31536000, cacheEverything: true } }
      : { headers: tbHeaders }
    const infoResponse = await fetch(apiUrl, options)

    if (!infoResponse.ok) {
      throw new Error(`Failed to fetch short URL info: ${infoResponse.statusText}`)
    }

    const infoData = await infoResponse.json()
    // console.log('TB Response Data:', infoData);

    // Extract required values.
    const { shareid, uk } = infoData
    const { fs_id } = infoData.list[0]
    // Fetch the M3U8 text.
    // const m3u8Url = `https://www.terabox.app/share/streaming?uk=${uk}&shareid=${shareid}&type=M3U8_AUTO_360&fid=${fs_id}&sign=1&timestamp=1&clienttype=1&channel=1`;
    const m3u8Url =
      `https://dm.1024tera.com/share/streaming?uk=${uk}&shareid=${shareid}&type=M3U8_FLV_264_480&fid=${fs_id}&sign=e079e32543e8a8e08d13776fc9e6c3fdaec67489&timestamp=1746887076&jsToken=1F1DA1DCB0EDBEBF4D4026783231FF6C9B4DB9B51B9760AA7BDD646E468831907207153BCE380C6E022CF085CFB889982CF47DC211FCCFBE69AE839F30F263E0CEBA873FED7A8A6AE0102FEF4265151A7491413528A981953B8CCE16C5FD12EE&esl=1&isplayer=1&ehps=1&clienttype=0&app_id=250528&web=1&channel=dubox&short_link=5`

    const response = await fetch(m3u8Url, { headers: tbHeaders })
    const resp = new Response(response.body)
    resp.headers.set('Content-Type', 'application/x-mpegURL')
    resp.headers.set('Cache-Control', 'max-age=86400')

    return resp
  } catch (error) {
    console.error('Error:', error)
    return new Response('An error occurred.', { status: 500 })
  }
}
